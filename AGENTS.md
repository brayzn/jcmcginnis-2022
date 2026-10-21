# Agent memory (learned from project transcripts)

## Learned User Preferences

- When editing homepage and career copy, prefers raw, direct, high-heat language over corporate
  polish, manifesto-style lesson summaries, or generic executive-metrics framing; let concrete
  scenes and choices carry meaning before abstract takeaways.
- Keeps the phrase "truth-seeking" on purpose as voice and an audience filter; retain it unless the
  user explicitly asks to change it.
- Career timeline prose should read as crafted eras with earned transitions, not a transcript
  condensed onto the page; avoid facts or anecdotes that land without setup.
- Aggressive cuts are fine when tightening, but preserve selected product and company names that
  establish credibility and connect to LinkedIn or other public proof of scope.
- The current-employer chapter should read as a story in progress when that role is ongoing, not a
  fully resolved case study.
- Distinct blocks (for example the book section) may be explicitly parked for a later site-wide
  review rather than rewritten in passing.
- For personal framing, prefers opening with concrete constraints (for example a single shared
  computer) over heavy "woe is me" poverty lead-ins when both could work.
- When naming institutions, use full forms where it aids clarity (for example "University of
  Waterloo" rather than shorthand alone).
- For serious blog/essay work, prefer the repo skill at `skills/jesse-writing-room`. Keep subagents
  read-only and use distinct reader/editor actors when feasible; the parent agent synthesizes, makes
  taste calls, and edits. Do not let subagents modify prose files. Preserve raw, direct, high-heat
  voice. Run `mise run site:lint` for site prose and `mise run lint -a` for the root Bridgetown app
  before commits.

## Learned Workspace Facts

- `notes/interview-transcript-raw.md` is the large, detailed interview source for grounding
  `site/src/data/career.yml`; read it in slices rather than loading the entire file into context at
  once.
- `notes/interview-transcript.md` is a shorter summarized interview used in the same career-copy
  workflow.
- Career timeline UI work targets a multi-chapter presentation that still works for eras with only
  one chapter and can show a return to the same employer as a new era or major marker.
- Secondary chapter labels (sub-lettering) need careful layout so alignment and rhythm stay visually
  smooth.
- The Astro app lives in `site/`. Its content is canonical for the Astro app:
  `site/src/content/essays/<slug>/index.md` is the current essay body,
  `site/src/content/essays/<slug>/rev-NN.md` is an older published body (body-only; do not edit old
  bodies), `site/src/content/drafts/` holds drafts (they generate no routes), and
  `site/src/content/talks/` holds talks. Shared data is in `site/src/data/`: `career.yml`,
  `readme.yml`, `menu.yml`, `socials.yml`, `site_metadata.yml`, and `redirects.yml`.
- Never edit `src/_posts` and `site/src/content` as two sources of truth. `site/src/content` is
  canonical for the Astro app. The root Bridgetown app at `src/` still serves GitHub Pages until the
  DNS cutover.
- Start a rewrite with
  `npm --prefix site run revision:start -- <slug> --summary "..." --then "..." --now "..." --note "..."`.
  It archives the current body from `HEAD` as the outgoing `rev-NN.md` and appends the new current
  version. Do not hand-edit old bodies or fabricate revisions.
- Site checks: `mise run site:lint` and `mise run site:build`; or
  `cd site && npm run check && npm run build`. Root `mise run lint -a` still covers the Bridgetown
  app; it does not format `site/` (root Prettier ignores it).
- Cloudflare Pages project: `jcmcginnis`, production branch `main`, preview at
  <https://jcmcginnis.pages.dev/>. DNS is not cut over: `jcmcginnis.com` still serves the Bridgetown
  app from GitHub Pages. Do not change DNS or add custom domains without explicit approval; do not
  delete the Pages project.
