# Website refresh — status

**Last updated:** 2026-10-23.

## Design

**Stage:** implemented in Astro; deployed to Cloudflare Pages; design QA passes A–C complete;
**SHIP** from both independent reviews; no blockers.

- The Ash direction, prototype, version model, and open copy questions live in
  `design/website-refresh/`. The implementation lives in `site/` and is live on
  <https://jcmcginnis.pages.dev/>; DNS is not cut over.
- Passes A–C fixed the change-bar label, mobile history entry, talk resource hierarchy, prose links,
  history DOM order, 404 indexing, revision stamps, archive/blog roles, category and talk IA, the
  shared 960px shell, About rail, README numbering/quotes, and smart quotes.
- Verification: production plus a real 3-version history fixture at 320/390/768/1024/1280/1600; no
  blockers or top should-fix remain. Residual polish only: two straight apostrophes (About deck,
  Directed Chaos stillThinking), the Rev. 01 version-log “First published” duplicate, and the About
  facts that conflict (Shopify 2016–2025 vs “eight years”; forty people vs 25 engineers + 2 PMs).
- **Next:** editorial copy. The design gate is green; the real revision is the next content test.
- **Open copy:** see `design/website-refresh/DIAL-IN-NOTES.md`; the residual list above is the
  current state.

## Editorial

**Stage:** voice specimen 01 locked; _Directed Chaos_ rewrite in progress; published post unchanged.

- The editorial frame, operating manual, voice notes, audit, handoff, working draft, and locked
  specimen are in `notes/website-refresh/`.
- The next movement is the confusion: the first week, the practical questions, who carried it and
  who did not.
- **Next:** get the raw material for that movement, then write it. `OPERATING.md` tracks the stage.
- **Open:** no approved full rewrite yet; the homepage letter and README truth-check are queued;
  launch scope and featured list remain open.

## Baseline

- Both workstreams are merged to `main`: editorial
  [#36](https://github.com/brayzn/jcmcginnis-2022/pull/36), design + shared index
  [#37](https://github.com/brayzn/jcmcginnis-2022/pull/37).
- `design/website-refresh/` and `notes/website-refresh/` are outside both app roots (`src/`
  Bridgetown, `site/` Astro); neither build picks them up. The refresh is implemented in `site/` and
  deploys to Cloudflare Pages; `jcmcginnis.com` still serves Bridgetown until DNS cutover.
- The `design/website-refresh` branch can be retired; continue from `main`.
- Pushing `main` updates both the GitHub Pages Bridgetown site and the Cloudflare Pages Astro
  deployment.

## Decisions this baseline carries

- Ash surface: neutral paper, oxide accent, Newsreader display, Source Serif 4 body, Plex Mono
  labels.
- Home is a position: letter, beliefs, recently revised; career path in About.
- Essays have versions: Reading and History modes, change bars, version panel, curated Then / Now,
  old versions readable.
- Archive: selected work plus theme/year index, revision marks.
- README: today's working document re-set in Ash; no terminal chrome.
- One Shopify proof line on the home; “— J.” sign-off.

## Fresh agent next action

Pick one:

- **Design:** the design gate is green. Read `design/website-refresh/README.md` and
  `DIAL-IN-NOTES.md`; address residual polish only, or move to the editorial rewrite. Do not reopen
  layout directions that passed QA.
- **Editorial:** read `notes/website-refresh/OPERATING.md` and `voice-specimen-01.md`, then gather
  the raw material for the confusion movement.

Update this file at the end of the session with the current stage, the unresolved decision, and the
next action.
