# Astro site

The Astro app for jcmcginnis.com. It lives in `site/` alongside the Bridgetown site at the repo
root. Bridgetown keeps deploying production until cutover; this app builds and deploys to Cloudflare
Pages previews.

## Commands

Run from the repo root with `mise`, or from `site/` with `npm`.

| Task                  | npm (in `site/`)                | What it does                                       |
| --------------------- | ------------------------------- | -------------------------------------------------- |
| `mise run site:up`    | `npm ci`                        | Install dependencies from the lockfile             |
| `mise run site:start` | `npm run dev`                   | Start the dev server at `http://localhost:4321`    |
| `mise run site:build` | `npm run build`                 | Validate versions, then build `site/dist/`         |
| `mise run site:lint`  | `npm run check && npm run lint` | `astro check`, `check:versions`, and Prettier      |
|                       | `npm run check:routes`          | Check the built `dist/` against the route contract |
|                       | `npm run format`                | Write Prettier formatting                          |

`npm run build` runs `check:versions` through `prebuild`; a version-model error fails the build
instead of shipping a silent page. `npm run check` runs `astro check` and the same version check.

Node is pinned in `site/.nvmrc` (24.11.1) because the Cloudflare Pages root directory is `site/`.

## Content model

An essay is a folder under `site/src/content/essays/`. The folder name is the URL slug. There is no
`slug` frontmatter.

```
site/src/content/essays/
  directed-chaos/
    index.md      # current body + metadata + the versions log
    rev-01.md     # an older published body, body-only
```

- `index.md` is the current body. Its frontmatter carries title, description, categories, flags, and
  a `versions` array.
- `rev-NN.md` files are old published bodies. They contain **only** the body: no frontmatter. Their
  metadata lives in the essay's `versions` array.
- A version is a **published** body. `rev-01` is the first publication; later revisions get new ids.
- `versions` is ascending by date, with exactly one `current: true` entry last. Every version has a
  non-empty summary; revisions also need a Then/Now pair (`then`, `now`, `note`).
- A version may set `title` and `description`. When a revision changes either one, set them on the
  version so `/blog/<slug>/history/<rev>/` keeps showing the old artifact; a version without them
  falls back to the essay's current title and description.
- `date` (original publication) is `versions[0].date`; `revised` is the current version's date.
  Never author those at the essay level.
- Change bars use `:::changed{since="rev-01"}` in `index.md`. `since` must name an earlier version.
  The directive must start its own line and close with `:::` on its own line; Prettier reflows it
  otherwise, so keep `<!-- prettier-ignore -->` immediately above it.

  ```md
  <!-- prettier-ignore -->
  :::changed{since="rev-01"}
  The rewritten passage.
  :::
  ```

Routes:

| Route                         | Content                       | Indexing                        |
| ----------------------------- | ----------------------------- | ------------------------------- |
| `/blog/<slug>/`               | current body                  | indexable                       |
| `/blog/<slug>/history/`       | current body with change bars | `noindex`, canonical to current |
| `/blog/<slug>/history/<rev>/` | old body                      | `noindex`, canonical to current |

History and old-version routes are not part of the production content set until an essay has more
than one published version. The version fixture used by the spike lives in `site/tests/fixtures/`,
outside the built collections, so it generates no routes.

### Drafts

Drafts live in `site/src/content/drafts/`, never in `essays/`. Drafts generate no route, feed item,
sitemap URL, archive entry, or home-page row. A draft becomes an essay only when it is published as
`rev-01`.

### Starting a revision

```
cd site
npm run revision:start -- <folder> --summary "..." --then "..." --now "..." --note "..."
```

The script refuses a dirty `index.md`, archives the deployed body from `HEAD` as a body-only
`rev-NN.md`, and appends the new current version. Then mark meaningful passages with `:::changed`
and run `npm run check && npm run build`.

## Fonts and images

The Ash faces are self-hosted from `site/public/fonts/`:

- **Newsreader** (display) — variable weight and optical size, normal and italic, Latin subset.
- **Source Serif 4** (reading body) — variable weight and optical size, normal and italic, Latin.
- **IBM Plex Mono** (labels and dates) — regular and medium, Latin.

Inter is gone: it only served the prototype's lab chrome. `src/styles/fonts.css` declares each face
with `font-display: swap`; `Base.astro` preloads the Newsreader and Source Serif 4 normal faces. The
metric-matched Georgia and Menlo fallbacks in `lab.css` keep the swap from shifting layout.

The files were copied from the Fontsource npm packages on 2026-10-21
(`@fontsource-variable/newsreader`, `@fontsource-variable/source-serif-4`,
`@fontsource/ibm-plex-mono`, 5.3.x). All three are licensed under the SIL Open Font License 1.1; the
full license texts ship beside the fonts in `public/fonts/LICENSE-*.txt`. To update a face, copy the
new `woff2` from the package over the file with the same name and confirm the license text is still
current.

Essay images keep the Bridgetown URLs under `/assets/img/`; the files are copied into
`site/public/assets/img/` with the same names. `public/favicon.svg`, `apple-touch-icon.png`, and
`manifest.json` provide the icon parity, and the manifest points at the 180px apple-touch icon.

## Feeds and indexing

- `/feed.xml` (`src/pages/feed.xml.ts`) has one item per published essay with `feed: true`. The link
  and GUID are the current essay URL and `pubDate` is the first publication date, so a revision does
  not re-send the item.
- `@astrojs/sitemap` writes `dist/sitemap-index.xml` and `dist/sitemap-0.xml`. History and
  old-version routes and `/404.html` are excluded; essay URLs carry `lastmod` from their current
  version date. `robots.txt` points at the sitemap index.
- `Base.astro` emits canonical, Open Graph, Twitter, and Person/WebSite JSON-LD. Essays pass their
  `image` through as `og:image` and use `og:type=article`; essays without an image omit the image
  tags and fall back to a `summary` card.

## Hosting files

`site/public/` is copied verbatim into `dist/`:

- `_headers` — conservative baseline headers plus immutable caching for `/_astro/*`.
- `_redirects` — the six legacy 301s from `src/_data/redirects.yml`, with slash and no-slash forms.
- `robots.txt` — points at the production sitemap. Cloudflare Pages sends `X-Robots-Tag: noindex` on
  preview deployments, so previews stay out of indexes.

`src/pages/404.astro` produces `dist/404.html`, which keeps unknown URLs returning a real 404
instead of the Pages SPA fallback.

## CI

`.github/workflows/site-ci.yml` runs on changes under `site/**`: Node from `site/.nvmrc`, `npm ci`,
`npm run check`, `npm run build`, and `npm run check:routes`. `check:routes` reads `dist/`, so it
runs after the build: it compares the built pages, redirects, feed, sitemap, metadata, links, and
images against the production route contract. The Bridgetown workflow is untouched until cutover.
