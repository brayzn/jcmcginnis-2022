# 0001 — Astro and Cloudflare Pages for jcmcginnis.com

- **Status:** Accepted, October 2026.
- **Deciders:** Jesse McGinnis.
- **Issues:** #38, #42, #41. Related: #39, #47, #52, #51.

## Context

The site is Bridgetown 2 + ERB + Tailwind 4, rendered static. It is small: one writer, a handful of
collections (posts, talks), and no CMS. Nothing is slow or broken. Build time is not the reason to
move.

The website refresh replaces the layouts and adds versioned essays: a current body, a history mode,
and old versions that stay readable. Those are new presentation and content-model work, not a port
of the existing templates. Since the presentation layer is being rewritten anyway, the migration and
the redesign can be the same job.

Two properties push the choice past "keep Bridgetown":

- **Model ergonomics.** The version model needs schema-validated frontmatter, typed collections, and
  a cross-file check (one current version, an old body for every retired version). That is native in
  Astro and custom code in Bridgetown.
- **One toolchain.** Build, CI, scripts, and lint run on Node. Agents can extend a component model
  without learning a bespoke Ruby helper layer.

Hosting must stay static. Cloudflare Pages gives every PR a preview URL without changing the
static-hosting model, and keeps the fallback path boring.

## Decision

### 1. App location

Astro lives in `site/`. Bridgetown stays at the repo root and keeps deploying the current site to
GitHub Pages until cutover.

```
site/
  astro.config.mjs
  package.json
  src/
    content/
    data/
    layouts/
    components/
    pages/
  public/
  dist/
```

Cloudflare Pages project settings:

- Root directory: `site`
- Build command: `npm ci && npm run build`
- Output directory: `dist` (relative to `site/`)
- Static output: no SSR adapter, no client-side router, JS as progressive enhancement only.

No long-lived `astro` branch. Work lands in small PRs against `main`. The old deploy is unaffected
because it only reads the root Bridgetown files. At cutover, `site/` can stay the app root or move
to the repo root in a separate mechanical PR; do not mix that move with the redesign.

### 2. Content model and routes

One folder per essay. The current body and its history live together.

```
site/src/content/essays/<essay>/
  index.md     # current body, metadata, version log
  rev-01.md    # old body, full post
```

Two collections over the same folder:

- `essays` loads `*/index.md` (current essays).
- `essayVersions` loads `*/rev-*.md` (old versions).

A version is a **published** body. Pre-publication drafts live outside `essays/` (in
`site/src/content/drafts/` or `notes/website-refresh/drafts/`) and never become `rev-NN`. _Directed
Chaos_ starts with `rev-01` current, dated 2026-01-01; the 2025-12-30 alpha is a draft, not Rev. 01.
History is proven on a fixture or the next real rewrite, never a fabricated version.

Folder name is the URL slug; there is no `slug` frontmatter. Old bodies are body-only; metadata
lives in the essay's `versions` array. `thenNow` belongs to the version it describes. `categories`
stays an array. Change bars use `.md` plus the `:::changed{since="..."}` remark directive. Set
`prerenderConflictBehavior: "error"` so duplicate routes fail the build.

Existing essay URLs stay canonical; history and old-version routes are additive.

| Route                         | Content                          | Indexing                                           |
| ----------------------------- | -------------------------------- | -------------------------------------------------- |
| `/blog/<slug>/`               | current reading mode             | self-canonical, indexable                          |
| `/blog/<slug>/history/`       | current version with change bars | canonical to current, `noindex,follow`, no sitemap |
| `/blog/<slug>/history/<rev>/` | old version in full, with banner | canonical to current, `noindex,follow`, no sitemap |

RSS has one item per published essay; `<link>` and `<guid>` are the current URL; `<pubDate>` is the
first publication date; a revision does not re-send the item. Sitemap excludes drafts, history, and
old-version routes.

Shared data moves to `site/src/data/` (`career.yml`, `readme.yml`, `menu.yml`, `socials.yml`,
`site_metadata.yml`, `redirects.yml`).

### 3. One source of truth

One canonical location at a time.

- **During the build:** `src/_posts/` and `src/_talks/` stay live. New editorial work stays in
  `notes/website-refresh/`.
- **#49 migrates content** to `site/src/content/`. After that, `site/src/content/` is canonical and
  `src/_posts/` is frozen and read-only.
- If a post must go live during the window, delay it or write it to both places with a note on #49.
  Never silently let the two diverge.
- `AGENTS.md` and the writing skill move to the new paths in #51, not before the migration.

### 4. Cutover

1. Astro lands in `site/`; CI builds it; Cloudflare Pages creates a preview for each PR.
2. The GitHub Pages workflow keeps building the root Bridgetown site from `main`.
3. #47 must be green: every current URL returns 200 or a documented 301, with RSS, sitemap,
   canonical/OG metadata, JSON-LD, 404, and the talks/category/archive routes working.
4. #52 and #51 switch production to Cloudflare Pages. GitHub Pages stays available as a fallback for
   one release, then the Bridgetown workflow and build dependencies are retired.

No giant migration branch. No DNS change before #47 is green.

## Alternatives considered

- **Stay on Bridgetown.** Smallest migration and no coexistence window. Rejected: it keeps the ERB
  layout layer the refresh is replacing and needs custom Ruby for the version model.
- **Astro at root, Bridgetown in `legacy/`.** Cleaner final layout, but a large diff now and it
  disrupts the live deploy while the refresh is still in flight.
- **Long-lived `astro` branch.** Avoids two app roots on `main`, but invites drift and ends in one
  large merge.
- **Eleventy.** Strong Markdown story, but no typed content collections out of the box and more
  custom glue for the version/history UI.
- **Next.js.** More framework than a static site needs: React, a client runtime, and a heavier
  toolchain for pages that only need progressive enhancement.

## Consequences

- **Migration cost:** scaffolding (#46), content move (#49), route/redirect parity (#47), and doc
  and skill updates at cutover (#51).
- **Two app roots during the transition.** `src/` is Bridgetown and `site/src/` is Astro.
  Contributors must know which is canonical; the ADR and refresh index are the reference.
- **GitHub Pages stays live as a fallback** until the Cloudflare release is boring. Do not retire it
  early.
- **The `mise` command surface is preserved.** `mise run up/start/build/lint` keep their names;
  internals swap at cutover so the writing skill does not change.
- **Docs change late, on purpose.** Root `README.md`, `WARP.md`, `AGENTS.md`, and the writing skill
  describe Bridgetown until #51. Until then, this ADR and the refresh READMEs are the exception.
- **Design risk:** the Ash CSS may need rework to survive Astro. The spike (#39) tests that before
  the fan-out.

## Links

- #38 — Epic: move jcmcginnis.com to Astro + Cloudflare Pages
- #39 — Spike: Astro + Ash shell + one versioned essay
- #41 — Decision: content model, version routes, and authoring contract
- #42 — Decision: repo layout, content source of truth, and cutover strategy
- #47 — Parity: routes, redirects, RSS, and SEO
- #51 — Cutover: verify, switch DNS, and update docs
- #52 — Cloudflare Pages: preview and production pipeline
