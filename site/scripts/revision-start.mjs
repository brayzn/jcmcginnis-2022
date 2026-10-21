import { execFileSync } from "node:child_process";
import { existsSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";

const USAGE = `Usage: npm run revision:start -- <folder> --summary "..." --then "..." --now "..." --note "..."

Archives the deployed current body as <outgoing-id>.md (body-only, from HEAD),
then appends a new current version with today's date, your summary, and the
Then/Now pair. Refuses on a dirty index.md, a missing summary or pair, or an
existing target file.`;

const fail = (message) => {
  console.error(`revision:start: ${message}`);
  process.exit(1);
};

const args = process.argv.slice(2);
const folder = args[0];
if (!folder || folder.startsWith("--")) fail(USAGE);

const flags = {};
for (let index = 1; index < args.length; index += 1) {
  const arg = args[index];
  if (!arg.startsWith("--")) fail(`unexpected argument: ${arg}\n\n${USAGE}`);
  const [name, inline] = arg.slice(2).split("=");
  const value = inline ?? args[index + 1];
  if (value === undefined) fail(`missing value for --${name}`);
  flags[name] = value;
  if (inline === undefined) index += 1;
}

const summary = flags.summary?.trim();
const then = flags.then?.trim();
const now = flags.now?.trim();
const note = flags.note?.trim();
for (const [name, value] of Object.entries({ summary, then, now, note })) {
  if (!value) fail(`--${name} is required and must not be empty\n\n${USAGE}`);
}

const git = (args, options = {}) =>
  execFileSync("git", args, { encoding: "utf8", ...options });

const root = git(["rev-parse", "--show-toplevel"]).trim();
const relative = `site/src/content/essays/${folder}/index.md`;
const absolute = join(root, relative);
const dir = join(root, "site/src/content/essays", folder);

if (!existsSync(absolute)) fail(`${relative} does not exist`);

const status = git(["status", "--porcelain", "--", relative]).trim();
if (status !== "") {
  fail(
    `${relative} has uncommitted changes; commit or restore it before starting a revision`,
  );
}

let source;
try {
  source = git(["show", `HEAD:${relative}`]);
} catch {
  fail(`${relative} is not committed; the archived body must come from HEAD`);
}

const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(source);
if (!match) fail(`${relative} has no frontmatter`);
const data = parse(match[1]) ?? {};
const body = match[2].replace(/^\n+/, "");
const versions = Array.isArray(data.versions) ? data.versions : [];

if (versions.length === 0) fail(`${relative} has no versions`);

const current = versions.filter((version) => version.current === true);
if (current.length !== 1)
  fail(`${relative} must have exactly one current version`);
if (versions.at(-1)?.current !== true)
  fail(`${relative}: the current version must be last`);

const ids = versions.map((version) => version.id);
if (new Set(ids).size !== ids.length)
  fail(`${relative} has duplicate version ids`);
if (ids.some((id) => !/^rev-\d{2,}$/.test(id)))
  fail(`${relative} has an invalid version id`);

const dates = versions.map((version) => new Date(version.date).getTime());
if (dates.some((date, index) => index > 0 && !(date > dates[index - 1]))) {
  fail(`${relative}: versions must be in ascending date order`);
}

const outgoing = versions.at(-1);
const number = Math.max(...ids.map((id) => Number(id.slice(4))));
const width = Math.max(2, outgoing.id.slice(4).length);
const nextId = `rev-${String(number + 1).padStart(width, "0")}`;
const archiveName = `${outgoing.id}.md`;
const archivePath = join(dir, archiveName);

for (const target of [archiveName, `${nextId}.md`]) {
  if (existsSync(join(dir, target))) fail(`${target} already exists`);
  try {
    git(
      ["cat-file", "-e", `HEAD:site/src/content/essays/${folder}/${target}`],
      {
        stdio: "ignore",
      },
    );
    fail(`${target} already exists in HEAD`);
  } catch {
    // Missing from HEAD is expected; any other git failure surfaces on the next step.
  }
}

const today = new Date().toISOString().slice(0, 10);
const next = {
  ...data,
  versions: [
    ...versions.slice(0, -1),
    { ...outgoing, current: false },
    {
      id: nextId,
      date: today,
      summary,
      current: true,
      thenNow: { then, now, note },
    },
  ],
};

const index = `---\n${stringify(next)}---\n\n${body}`;
const archive = `${body}\n`;

const indexTemp = `${absolute}.${process.pid}.tmp`;
const archiveTemp = `${archivePath}.${process.pid}.tmp`;
writeFileSync(archiveTemp, archive, { mode: 0o644 });
writeFileSync(indexTemp, index, { mode: 0o644 });
renameSync(archiveTemp, archivePath);
renameSync(indexTemp, absolute);

console.log(
  `Archived ${outgoing.id} as ${archiveName} (body-only, from HEAD).`,
);
console.log(`Current version is now ${nextId} dated ${today}.`);
console.log("Next:");
console.log(
  `  1. Mark meaningful passages in index.md with :::changed{since="${outgoing.id}"}.`,
);
console.log("  2. Review the summary and Then/Now in the version log.");
console.log("  3. Run `npm run check` and `npm run build`.");
