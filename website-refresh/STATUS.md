# Website refresh — status

**Last updated:** 2026-10-21.

## Design

**Stage:** baseline merged to `main`; craft pass done.

- The Ash direction, prototype, and version model are in `design/website-refresh/`.
- The design-builder pass fixed label sizes, Rev. 01 change bars, broken anchors, nested `<main>`,
  oxide text contrast, and font-swap layout shift. It tightened the type scale, history/version UI,
  Rev. 01 banner, links/focus, and mobile history ordering.
- Verification: 35 layout checks at 320/390/768/1280/1600, no overflow, one `h1`/`<main>` per view,
  lowest text contrast 4.96:1, 14 keyboard focus stops visible.
- **Next:** final refinements after the copy is ready; then implementation of the version model and
  ERB layouts.
- **Open copy:** see `design/website-refresh/DIAL-IN-NOTES.md` (home lede/rail duplication, repeated
  revision summaries, README version repeats, prototype links, unused revision data, 40-people vs
  25-engineers check).
- **Residual tests:** Safari/Firefox with `:has()`, a real VoiceOver/NVDA pass on History and Rev.
  01, and the phone reading-mode hint.

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
- `design/website-refresh/` and `notes/website-refresh/` are outside `src/`; Bridgetown does not
  build them. The baseline is not wired into the live site.
- The `design/website-refresh` branch can be retired; continue from `main`.
- Pushing `main` deploys the current site, not the refresh.

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

- **Design:** read `design/website-refresh/README.md` and `DIAL-IN-NOTES.md`, run the prototype, and
  choose a craft/implementation item that does not depend on unsettled copy.
- **Editorial:** read `notes/website-refresh/OPERATING.md` and `voice-specimen-01.md`, then gather
  the raw material for the confusion movement.

Update this file at the end of the session with the current stage, the unresolved decision, and the
next action.
