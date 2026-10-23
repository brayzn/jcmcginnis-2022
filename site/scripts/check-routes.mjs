import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
const site = "https://jcmcginnis.com";
const essayBase = join(root, "src/content/essays");
const draftBase = join(root, "src/content/drafts");
const fixtureBase = join(root, "tests/fixtures");
const BODY = /^rev-\d{2,}\.md$/;

const PAGES = [
  "/",
  "/about/",
  "/archive/",
  "/blog/",
  "/category/leadership/",
  "/category/musings/",
  "/readme/",
  "/talks/",
  "/talks/2022/qcon/",
  "/talks/2023/gartner/",
  "/talks/2023/uplimit/",
  "/404.html",
];

const FILES = [
  "/feed.xml",
  "/sitemap-index.xml",
  "/sitemap-0.xml",
  "/manifest.json",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/_headers",
  "/_redirects",
  "/robots.txt",
];

const REDIRECTS = new Map([
  ["/blog/personal-readme/", "/readme/"],
  ["/blog/high-trust-remote-teams-qcon-2022/", "/talks/2022/qcon/"],
  ["/blog/high-trust-remote-teams-gartner-2023/", "/talks/2023/gartner/"],
  ["/blog/leading-high-trust-teams-uplimit/", "/talks/2023/uplimit/"],
  ["/category/talks/", "/talks/"],
  ["/category/talks-workshops/", "/talks/"],
]);

const MEDIA = ["assets/img", "fonts"];

const walk = (dir, base = dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory()
      ? walk(path, base)
      : [relative(base, path).split(sep).join("/")];
  });

const decode = (value) =>
  value.replace(/&(amp|quot|#39|lt|gt);/g, (_, entity) => {
    return { amp: "&", quot: '"', "#39": "'", lt: "<", gt: ">" }[entity];
  });

const textOf = (html, tag) => {
  const match = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "i").exec(
    html,
  );
  return match ? decode(match[1].trim()) : null;
};

const attributes = (tag) => {
  const attrs = {};
  for (const match of tag.matchAll(
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*"([^"]*)"/g,
  )) {
    attrs[match[1].toLowerCase()] = decode(match[2]);
  }
  return attrs;
};

const tags = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((match) =>
    attributes(match[0]),
  );

const metaByName = (html, name) =>
  tags(html, "meta").find((meta) => meta.name === name);

const metaByProperty = (html, property) =>
  tags(html, "meta").find((meta) => meta.property === property);

const linkByRel = (html, rel) =>
  tags(html, "link").find((link) => link.rel === rel);

const routeFile = (route) => {
  if (route === "/") return "index.html";
  if (route.endsWith("/")) return `${route.slice(1)}index.html`;
  return route.slice(1);
};

const fileRoute = (file) => {
  if (file === "index.html") return "/";
  if (file.endsWith("/index.html")) {
    return `/${file.slice(0, -"index.html".length)}`;
  }
  return `/${file}`;
};

const toDate = (value) => (value instanceof Date ? value : new Date(value));

const readEssays = () =>
  readdirSync(essayBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const dir = join(essayBase, entry.name);
      const text = readFileSync(join(dir, "index.md"), "utf8");
      const match = /^---\n([\s\S]*?)\n---/.exec(text);
      const data = match ? (parse(match[1]) ?? {}) : {};
      const versions = Array.isArray(data.versions) ? data.versions : [];
      const current = versions.find((version) => version.current);
      const bodies = readdirSync(dir).filter((file) => BODY.test(file));
      return {
        slug: entry.name,
        data,
        versions,
        bodies,
        feed: data.feed !== false,
        published: toDate(versions[0]?.date),
        updated: toDate(current?.date),
      };
    });

const collectLinks = (html) =>
  [...html.matchAll(/\b(?:href|src)\s*=\s*"([^"]*)"/gi)].map((match) =>
    decode(match[1]),
  );

const isExternal = (value) =>
  /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");

const resolveLink = (value, files, sources) => {
  const path = decodeURIComponent(value.split("#")[0].split("?")[0]);
  if (path === "") return true;
  if (!path.startsWith("/")) return false;
  if (files.has(routeFile(path))) return true;
  if (path.endsWith("/")) return files.has(`${path.slice(1)}index.html`);
  return (
    files.has(path.slice(1)) || sources.has(path) || sources.has(`${path}/`)
  );
};

export function checkRoutes() {
  const problems = [];
  const files = new Set(walk(dist));
  const pageRoutes = [...files]
    .filter((file) => file.endsWith(".html"))
    .map(fileRoute);
  const essays = readEssays();

  const essayRoutes = essays.map((essay) => `/blog/${essay.slug}/`);
  const historyRoutes = essays.flatMap((essay) => {
    if (essay.versions.length < 2) return [];
    return [
      `/blog/${essay.slug}/history/`,
      ...essay.bodies.map(
        (file) => `/blog/${essay.slug}/history/${file.slice(0, -3)}/`,
      ),
    ];
  });

  const expectedPages = new Set([
    ...PAGES.filter((route) => route.endsWith("/")),
    ...essayRoutes,
    ...historyRoutes,
  ]);
  if (PAGES.includes("/404.html")) expectedPages.add("/404.html");

  const expectedRoutes = new Set([...PAGES, ...essayRoutes, ...historyRoutes]);

  const mediaRoutes = MEDIA.flatMap((dir) =>
    walk(join(root, "public", dir)).map((file) => `/${dir}/${file}`),
  );

  for (const route of [...expectedRoutes, ...FILES, ...mediaRoutes]) {
    if (!files.has(routeFile(route)))
      problems.push(`${route}: missing from dist`);
  }

  for (const route of pageRoutes) {
    if (expectedRoutes.has(route)) continue;
    const history = /^\/blog\/([^/]+)\/history\//.exec(route);
    if (history) {
      const essay = essays.find((entry) => entry.slug === history[1]);
      const kind =
        essay && essay.versions.length < 2
          ? "history route generated for single-version essay"
          : "unexpected history route";
      problems.push(`${route}: ${kind} ${history[1]}`);
    } else {
      problems.push(`${route}: unexpected page route in dist`);
    }
  }

  const draftSlugs = readdirSync(draftBase)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -3));
  const fixtureSlugs = readdirSync(fixtureBase, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const file of files) {
    for (const slug of [...draftSlugs, ...fixtureSlugs]) {
      if (
        file === slug ||
        file.startsWith(`${slug}/`) ||
        file.includes(`/${slug}/`)
      ) {
        problems.push(
          `/${file}: draft or fixture content leaked into dist (${slug})`,
        );
      }
    }
  }

  const redirectFile = join(dist, "_redirects");
  const redirectRules = files.has("_redirects")
    ? readFileSync(redirectFile, "utf8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "" && !line.startsWith("#"))
        .map((line) => {
          const [from, to, status = "301"] = line.split(/\s+/);
          return { from, to, status };
        })
    : [];

  const redirectSources = new Set(redirectRules.map((rule) => rule.from));
  const rulesBySource = new Map();

  for (const rule of redirectRules) {
    if (rulesBySource.has(rule.from)) {
      problems.push(`${rule.from}: duplicate redirect source`);
    }
    rulesBySource.set(rule.from, rule);
    if (rule.status !== "301") {
      problems.push(
        `${rule.from}: redirect status must be 301, found ${rule.status}`,
      );
    }
    if (files.has(routeFile(rule.from))) {
      problems.push(`${rule.from}: redirect source also exists as a real file`);
    }
    if (redirectSources.has(rule.to)) {
      problems.push(`${rule.from}: redirect chain to ${rule.to}`);
    }
    if (!files.has(routeFile(rule.to))) {
      problems.push(
        `${rule.from}: redirect target ${rule.to} is missing from dist`,
      );
    }
  }

  for (const [source, target] of REDIRECTS) {
    for (const form of [source, source.slice(0, -1)]) {
      const rule = rulesBySource.get(form);
      if (!rule) {
        problems.push(`${form}: missing redirect to ${target}`);
      } else if (rule.to !== target) {
        problems.push(`${form}: redirects to ${rule.to}, expected ${target}`);
      }
    }
  }

  const htmlFor = (route) => {
    const file = routeFile(route);
    return files.has(file) ? readFileSync(join(dist, file), "utf8") : null;
  };

  for (const route of expectedPages) {
    const html = htmlFor(route);
    if (!html) continue;

    const title = textOf(html, "title");
    const description = metaByName(html, "description")?.content;
    const canonical = linkByRel(html, "canonical")?.href;
    const ogTitle = metaByProperty(html, "og:title")?.content;
    const ogUrl = metaByProperty(html, "og:url")?.content;
    const robots = metaByName(html, "robots")?.content;
    const isHistory = /^\/blog\/[^/]+\/history\//.test(route);
    const isNotFound = route === "/404.html";
    const expectedCanonical = isHistory
      ? `${site}/blog/${route.split("/")[2]}/`
      : `${site}${route}`;

    if (!title) problems.push(`${route}: missing title`);
    if (!description) problems.push(`${route}: missing description`);
    if (!canonical) {
      if (!isNotFound) problems.push(`${route}: missing canonical`);
    } else if (canonical !== expectedCanonical) {
      problems.push(
        `${route}: canonical is ${canonical}, expected ${expectedCanonical}`,
      );
    }
    if (!ogTitle) {
      problems.push(`${route}: missing og:title`);
    } else if (title && ogTitle !== title) {
      problems.push(`${route}: og:title does not match title`);
    }
    if (!ogUrl) {
      problems.push(`${route}: missing og:url`);
    } else if (canonical && ogUrl !== canonical) {
      problems.push(`${route}: og:url does not match canonical`);
    }

    if (isNotFound) {
      if (!robots || !/\bnoindex\b/.test(robots)) {
        problems.push(`${route}: 404 page must be noindex`);
      }
    } else if (isHistory) {
      if (
        !robots ||
        !/\bnoindex\b/.test(robots) ||
        !/\bfollow\b/.test(robots)
      ) {
        problems.push(`${route}: history page must be noindex, follow`);
      }
    } else if (robots && /\bnoindex\b/.test(robots)) {
      problems.push(`${route}: current page must not be noindex`);
    }

    for (const meta of tags(html, "meta")) {
      if (meta.property !== "og:image" && meta.name !== "twitter:image")
        continue;
      const image = new URL(meta.content, site).pathname;
      if (!files.has(image.slice(1))) {
        problems.push(
          `${route}: ${meta.property ?? meta.name} ${image} is missing from dist`,
        );
      }
    }

    for (const link of collectLinks(html)) {
      if (link.startsWith("#") || isExternal(link)) continue;
      if (!link.startsWith("/")) continue;
      if (!resolveLink(link, files, redirectSources)) {
        problems.push(`${route}: broken internal link ${link}`);
      }
    }
  }

  if (files.has("feed.xml")) {
    const xml = readFileSync(join(dist, "feed.xml"), "utf8");
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
      (match) => ({
        title: textOf(match[1], "title"),
        link: textOf(match[1], "link"),
        guid: textOf(match[1], "guid"),
        pubDate: textOf(match[1], "pubDate"),
      }),
    );
    const published = essays.filter((essay) => essay.feed);
    const byLink = new Map();

    if (items.length !== published.length) {
      problems.push(
        `feed.xml: expected ${published.length} items, found ${items.length}`,
      );
    }

    for (const item of items) {
      if (byLink.has(item.link)) {
        problems.push(`feed.xml: duplicate item for ${item.link}`);
      }
      byLink.set(item.link, item);
      const essay = published.find(
        (entry) => `${site}/blog/${entry.slug}/` === item.link,
      );
      if (!essay) {
        problems.push(`feed.xml: item ${item.link} is not a published essay`);
        continue;
      }
      if (item.guid !== item.link) {
        problems.push(
          `feed.xml: guid for ${item.link} is not the canonical URL`,
        );
      }
      if (item.title !== essay.data.title) {
        problems.push(`feed.xml: title for ${item.link} is ${item.title}`);
      }
      const expectedDate = essay.published.toUTCString();
      if (item.pubDate !== expectedDate) {
        problems.push(
          `feed.xml: pubDate for ${item.link} is ${item.pubDate}, expected ${expectedDate}`,
        );
      }
    }

    for (const essay of published) {
      const link = `${site}/blog/${essay.slug}/`;
      if (!byLink.has(link))
        problems.push(`feed.xml: missing item for ${link}`);
    }
  }

  if (files.has("sitemap-0.xml")) {
    const xml = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
    const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
      loc: textOf(match[1], "loc"),
      lastmod: textOf(match[1], "lastmod"),
    }));
    const byLoc = new Map();
    const expectedSitemap = new Set([
      ...PAGES.filter((route) => route !== "/404.html"),
      ...essayRoutes,
    ]);

    for (const url of urls) {
      if (byLoc.has(url.loc))
        problems.push(`sitemap-0.xml: duplicate ${url.loc}`);
      byLoc.set(url.loc, url);
    }

    for (const route of expectedSitemap) {
      if (!byLoc.has(`${site}${route}`)) {
        problems.push(`sitemap-0.xml: missing ${route}`);
      }
    }

    for (const url of urls) {
      if (!url.loc.startsWith(`${site}/`)) continue;
      const path = new URL(url.loc).pathname;
      if (
        path.includes("/history/") ||
        path === "/404/" ||
        path === "/404.html"
      ) {
        problems.push(`sitemap-0.xml: includes ${path}`);
      }
      const essay = essays.find((entry) => `/blog/${entry.slug}/` === path);
      if (essay) {
        if (!url.lastmod) {
          problems.push(`sitemap-0.xml: ${path} is missing lastmod`);
        } else if (toDate(url.lastmod).getTime() !== essay.updated.getTime()) {
          problems.push(
            `sitemap-0.xml: ${path} lastmod is ${url.lastmod}, expected ${essay.updated.toISOString()}`,
          );
        }
      }
    }
  }

  if (files.has("sitemap-index.xml")) {
    const xml = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
    if (!xml.includes(`${site}/sitemap-0.xml`)) {
      problems.push("sitemap-index.xml: does not reference sitemap-0.xml");
    }
  }

  if (problems.length > 0) {
    const message = `Route check failed:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`;
    throw new Error(message);
  }

  return `Route check passed for ${expectedRoutes.size} pages and ${FILES.length + mediaRoutes.length} files.`;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    console.log(checkRoutes());
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
