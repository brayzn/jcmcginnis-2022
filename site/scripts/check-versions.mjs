import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";

const base = fileURLToPath(new URL("../src/content/essays/", import.meta.url));
const ID = /^rev-\d{2,}$/;
const BODY = /^rev-\d{2,}\.md$/;
const DIR = /^[a-z0-9-]+$/;

const frontmatter = (file) => {
  const text = readFileSync(file, "utf8");
  const match = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!match) return { data: null, body: text };
  return { data: parse(match[1]) ?? {}, body: text.slice(match[0].length) };
};

const day = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

const text = (value) => typeof value === "string" && value.trim() !== "";

export function essayLastModified() {
  const dates = new Map();
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const index = join(base, entry.name, "index.md");
    if (!existsSync(index)) continue;
    const { data } = frontmatter(index);
    const current = data?.versions?.find((version) => version.current === true);
    const date = day(current?.date);
    if (date) dates.set(entry.name, date);
  }
  return dates;
}

export function checkVersions() {
  const problems = [];
  const root = readdirSync(base, { withFileTypes: true });

  for (const entry of root) {
    if (!entry.isDirectory()) {
      problems.push(`essays/: unexpected file ${entry.name}`);
    }
  }

  const folders = root
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const folder of folders) {
    if (!DIR.test(folder)) {
      problems.push(
        `${folder}: folder name must be the URL slug (a-z, 0-9, hyphen)`,
      );
    }

    const dir = join(base, folder);
    const contents = readdirSync(dir, { withFileTypes: true });

    for (const item of contents) {
      if (item.isDirectory()) {
        problems.push(
          `${folder}/${item.name}: nested directories are not essay content`,
        );
      } else if (item.name !== "index.md" && !BODY.test(item.name)) {
        problems.push(`${folder}/${item.name}: unexpected file`);
      }
    }

    const index = join(dir, "index.md");
    let parsed;
    try {
      parsed = frontmatter(index);
    } catch {
      problems.push(`${folder}: missing index.md`);
      continue;
    }
    if (!parsed.data) {
      problems.push(`${folder}/index.md: missing frontmatter`);
      continue;
    }

    const data = parsed.data;
    const versions = Array.isArray(data.versions) ? data.versions : [];
    const ids = versions.map((version) => version.id);
    const current = versions.filter((version) => version.current === true);

    if (versions.length === 0) {
      problems.push(`${folder}: no versions`);
      continue;
    }

    if (current.length !== 1) {
      problems.push(
        `${folder}: expected exactly one current version, found ${current.length}`,
      );
    }

    if (versions.at(-1)?.current !== true) {
      problems.push(`${folder}: the current version must be last`);
    }

    if (new Set(ids).size !== ids.length) {
      problems.push(`${folder}: duplicate version ids`);
    }

    const known = new Set(ids);
    for (const [index, version] of versions.entries()) {
      if (!ID.test(version.id)) {
        problems.push(
          `${folder}: version id "${version.id}" must match rev-NN`,
        );
      }
      if (!text(version.summary)) {
        problems.push(
          `${folder}: version ${version.id} needs a non-empty summary`,
        );
      }
      if (!day(version.date)) {
        problems.push(
          `${folder}: version ${version.id} has an unparseable date`,
        );
      }
      if (index > 0) {
        const pair = version.thenNow;
        if (!pair || !text(pair.then) || !text(pair.now) || !text(pair.note)) {
          problems.push(
            `${folder}: version ${version.id} needs a Then/Now pair`,
          );
        }
      }
    }

    const dates = versions.map((version) => day(version.date));
    if (
      dates.some(
        (date, index) =>
          index > 0 && (date === null || date <= dates[index - 1]),
      )
    ) {
      problems.push(`${folder}: versions must be in ascending date order`);
    }

    const currentId = current[0]?.id;
    const bodies = contents
      .filter((item) => item.isFile() && BODY.test(item.name))
      .map((item) => basename(item.name, ".md"));

    if (currentId && bodies.includes(currentId)) {
      problems.push(
        `${folder}: the current version ${currentId} must not have a body file`,
      );
    }

    for (const id of bodies) {
      if (!known.has(id)) {
        problems.push(`${folder}/${id}.md: body has no matching version entry`);
      }
      const body = readFileSync(join(dir, `${id}.md`), "utf8");
      if (/^---\s*\n/.test(body)) {
        problems.push(`${folder}/${id}.md: old bodies must be body-only`);
      }
      if (body.trim() === "") {
        problems.push(`${folder}/${id}.md: old body is empty`);
      }
    }

    for (const version of versions) {
      if (version.current) continue;
      if (!bodies.includes(version.id)) {
        problems.push(`${folder}: missing old body ${version.id}.md`);
      }
    }

    for (const line of parsed.body.split("\n")) {
      if (!line.includes(":::changed")) continue;
      const directive = /^\s*:::\s*changed\s*\{([^}]*)\}\s*$/.exec(line);
      if (!directive) {
        problems.push(
          `${folder}: a :::changed bar must start its own line and close with ::: on a separate line`,
        );
        continue;
      }
      const since = /since\s*=\s*"([^"]+)"/.exec(directive[1])?.[1];
      if (!since) {
        problems.push(`${folder}: a :::changed bar is missing since="rev-NN"`);
      } else if (!known.has(since)) {
        problems.push(
          `${folder}: a :::changed bar names unknown version ${since}`,
        );
      } else if (since === currentId) {
        problems.push(
          `${folder}: a :::changed bar must name an earlier version, not ${since}`,
        );
      }
    }
  }

  if (problems.length > 0) {
    const message = `Version check failed:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`;
    throw new Error(message);
  }

  return `Version check passed for ${folders.length} essay(s).`;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    console.log(checkVersions());
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
