# WARP.md

Guidance for WARP (warp.dev) when working in this repository. Read `AGENTS.md` and `README.md` for
the full workspace rules and writing workflow.

## Project overview

Personal website and blog for Jesse McGinnis. This repository holds two apps during the migration:

- **Astro app:** `site/`, the current implementation target, deployed to Cloudflare Pages previews
  at <https://jcmcginnis.pages.dev/>. Production branch is `main`.
- **Legacy Bridgetown app:** the repo root, still serving <https://jcmcginnis.com> from GitHub Pages
  until the DNS cutover.

`site/src/content/` is canonical for the Astro app. Do not edit `src/_posts` and `site/src/content`
as two sources of truth.

## Commands

### Astro site

```bash
mise run site:up      # Install dependencies (npm ci in site/)
mise run site:start   # Dev server at http://localhost:4321
mise run site:build   # Validate versions, then build site/dist/
mise run site:lint    # astro check + check:versions + Prettier check
```

From `site/`, the equivalent npm commands are `npm ci`, `npm run dev`, `npm run build`, and
`npm run check && npm run lint`.

### Legacy Bridgetown app

```bash
mise run up
mise run start   # http://localhost:4000
mise run build
mise run lint    # or: mise run lint -a
```

Root `mise run lint` covers the Bridgetown app only; root Prettier ignores `site/`.

## Architecture

### Astro app (`site/`)

- **Build:** `astro build` to static output in `site/dist/`. `prebuild` runs `check:versions`.
- **Content collections:** defined in `site/src/content.config.ts`.
  - `essays` loads `src/content/essays/*/index.md`.
  - `essayVersions` loads `src/content/essays/*/rev-*.md`.
  - `talks` loads `src/content/talks/*.md`.
  - `src/content/drafts/` is outside the collections and generates no routes.
- **Content model:** one folder per essay. The folder name is the URL slug. `index.md` holds the
  current body, metadata, and the `versions` log. `rev-NN.md` files are old published bodies,
  body-only; their metadata lives in the current essay's `versions` array.
- **Routes:** `src/pages/` supplies the site pages. Essay routes are `/blog/<slug>/`,
  `/blog/<slug>/history/`, and `/blog/<slug>/history/<rev>/`; history and old-version routes are
  `noindex` and canonical to the current essay.
- **Presentation:** `src/layouts/Base.astro`, `src/components/` (Header, Footer, Essay), and
  `src/styles/` (Ash CSS, self-hosted fonts). No Tailwind in the Astro app.
- **Data:** `src/data/` holds `career.yml`, `readme.yml`, `menu.yml`, `socials.yml`,
  `site_metadata.yml`, and `redirects.yml`.
- **Scripts:** `site/scripts/` holds `revision-start.mjs`, `check-versions.mjs`, and
  `check-routes.mjs`.

### Legacy Bridgetown app (root)

- **Build:** Bridgetown 2.0 with ERB layouts, Tailwind CSS 4, and esbuild.
- **Content:** `src/_posts/` and `src/_talks/`, with layouts in `src/_layouts/` and partials in
  `src/_partials/`.
- **Status:** frozen except for urgent fixes. New editorial work goes to `site/src/content/`. The
  app and its GitHub Pages workflow are retired after the DNS cutover.

## Writing workflow

- New essay: `site/src/content/essays/<slug>/index.md`, first version `rev-01`.
- Draft: `site/src/content/drafts/`. Drafts never get routes or versions.
- Rewrite: run
  `npm --prefix site run revision:start -- <slug> --summary "..." --then "..." --now "..." --note "..."`
  before the first edit. It archives the body from `HEAD` as the outgoing `rev-NN.md` and appends
  the new current version. Then mark meaningful passages with `:::changed{since="rev-NN"}`.
- Keep the original publication date; add a new version date for the rewrite. Do not edit old bodies
  or fabricate revisions.

## Deployment

- **Live:** GitHub Pages builds the root Bridgetown app from `main`.
- **Preview:** Cloudflare Pages builds `site/` (root directory `site`, command
  `npm ci && npm run build`, output `dist`). Production branch is `main`.
- DNS is not cut over. Do not change DNS or add custom domains without explicit approval; do not
  delete the Pages project.
- CI for the Astro app is `.github/workflows/site-ci.yml`; it runs `npm run check`, `npm run build`,
  and `npm run check:routes`.

## Formatting

Follow `.editorconfig` (LF, final newline, UTF-8, two-space indentation). Markdown wraps at 100
columns. Use `mise run site:lint` for the Astro app and `mise run lint -a` for the legacy Bridgetown
app. The `:::changed` directive must start its own line and close with `:::` on its own line; keep
`<!-- prettier-ignore -->` above it.
