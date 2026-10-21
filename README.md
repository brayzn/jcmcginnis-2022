# jcmcginnis.com

Personal website and blog for Jesse McGinnis. The repository holds two apps during the move to
Astro:

- **Live:** the Bridgetown 2 app at the repo root, served from GitHub Pages at
  <https://jcmcginnis.com>.
- **Next:** the Astro app in `site/`, deployed to Cloudflare Pages previews at
  <https://jcmcginnis.pages.dev/>. Production branch is `main`. DNS is not cut over.

`site/src/content/` is canonical for the Astro app. Do not edit `src/_posts` and `site/src/content`
as two sources of truth; the root app stays frozen except for urgent fixes until the DNS cutover.

## Website refresh

The refresh has two workstreams: design and editorial. Start at
[`website-refresh/`](website-refresh/) for the shared brief, status, and links. The design package
lives in [`design/website-refresh/`](design/website-refresh/); the prose and rewrite queue live in
[`notes/website-refresh/`](notes/website-refresh/). The architecture decision is
[`docs/adr/0001-astro-cloudflare.md`](docs/adr/0001-astro-cloudflare.md).

## Quick start

Requires [mise](https://mise.jdx.dev/) and Node 24 (pinned in `site/.nvmrc`).

```bash
# Install the Astro site dependencies
mise run site:up

# Start the Astro dev server (http://localhost:4321)
mise run site:start

# Build the Astro site into site/dist/
mise run site:build

# Type-check, validate versions, and format-check the Astro site
mise run site:lint
```

The underlying npm commands work from `site/`:

```bash
cd site
npm run check   # astro check + check:versions
npm run build   # check:versions (prebuild) + astro build
npm run lint    # prettier --check
```

## Writing workflow

Essays live in one folder per essay under `site/src/content/essays/`. The folder name is the URL
slug; there is no `slug` frontmatter.

```
site/src/content/essays/<slug>/
  index.md      # current body, metadata, and the versions log
  rev-NN.md     # an older published body, body-only
```

- **New essay:** create `site/src/content/essays/<slug>/index.md` with frontmatter and a `versions`
  array whose first entry is `rev-01`, `current: true`:

  ```yaml
  ---
  title: Essay Title
  description: One-line description.
  categories: ["Leadership"]
  versions:
    - id: rev-01
      date: 2026-01-01
      summary: First published.
      current: true
  ---
  ```

  The content schema in `site/src/content.config.ts` enforces the rest.

- **Drafts:** write them in `site/src/content/drafts/`. Drafts generate no routes, feed items,
  sitemap URLs, archive entries, or home-page rows. A draft becomes an essay only when it is
  published as `rev-01`.
- **Talks:** `site/src/content/talks/`.
- **Shared data:** `site/src/data/` (`career.yml`, `readme.yml`, `menu.yml`, `socials.yml`,
  `site_metadata.yml`, `redirects.yml`).

### Starting a revision

Run the revision command before the first edit of a rewrite:

```bash
npm --prefix site run revision:start -- <slug> --summary "..." --then "..." --now "..." --note "..."
```

The script refuses a dirty `index.md`, archives the body from `HEAD` as a body-only `rev-NN.md`, and
appends the new current version dated today with your summary and Then/Now pair. Then mark only
meaningful rewritten passages with `:::changed{since="rev-NN"}` and run the site checks.

### Version model and history routes

Every version has an `id` (`rev-NN`), `date`, short prose `summary`, and `current` flag; revisions
also carry a Then/Now pair (`then`, `now`, `note`). Exactly one version is current, and it is last.
The original publication date is the first version's date; a revision keeps it and adds a new
version date. Old bodies are history, not drafts: do not edit them, and do not invent versions for
small edits.

| Route                         | Content                       | Indexing                        |
| ----------------------------- | ----------------------------- | ------------------------------- |
| `/blog/<slug>/`               | current body                  | indexable                       |
| `/blog/<slug>/history/`       | current body with change bars | `noindex`, canonical to current |
| `/blog/<slug>/history/<rev>/` | old body in full              | `noindex`, canonical to current |

## Project structure

```
├── AGENTS.md                # Agent memory and workspace rules
├── README.md                # This file
├── WARP.md                  # Warp-specific guide
├── .cursorrules             # Cursor quick guide
├── docs/adr/                # Architecture decisions (Astro + Cloudflare)
├── design/website-refresh/  # Design package and prototype
├── notes/website-refresh/   # Editorial notes, voice, rewrite queue
├── website-refresh/         # Shared refresh entry point and status
├── site/                    # Astro app (canonical content)
│   ├── astro.config.mjs
│   ├── package.json
│   ├── scripts/             # revision:start, check:versions, check:routes
│   ├── public/              # Fonts, images, headers, redirects, robots
│   ├── src/
│   │   ├── content/         # essays, drafts, talks
│   │   ├── data/            # Shared YAML data
│   │   ├── layouts/         # Base layout
│   │   ├── components/      # Header, Footer, Essay
│   │   ├── lib/             # Collections and data helpers
│   │   ├── pages/           # Astro routes
│   │   └── styles/          # Ash CSS and self-hosted fonts
│   └── dist/                # Build output (gitignored)
└── src/                     # Legacy Bridgetown app (live until DNS cutover)
    ├── _layouts/
    ├── _partials/
    ├── _posts/
    ├── _data/
    └── assets/css/
```

## Legacy Bridgetown app

The root app at `src/` still builds and deploys to GitHub Pages until the DNS cutover. Its commands
are `mise run up`, `mise run start`, `mise run build`, and `mise run lint` (or `mise run lint -a` to
autocorrect). Root `mise run lint` covers Bridgetown only; it does not format `site/`.

Do not create or edit posts in `src/_posts/` as part of normal writing. New editorial work belongs
in `site/src/content/`. If a post must go live on the old site during the transition, delay it or
update both trees with a note; never let them diverge silently.

## Tech stack

- **Astro app (`site/`):** Astro 7, content collections, plain CSS with the Ash type system
  (Newsreader, Source Serif 4, IBM Plex Mono), static output, Cloudflare Pages previews.
- **Legacy app (`src/`):** Bridgetown 2.0, ERB templates, Tailwind CSS 4, GitHub Pages.
- **Task runner:** [mise](https://mise.jdx.dev/).

## License

Content is copyrighted. Code is MIT licensed.
