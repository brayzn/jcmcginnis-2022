# Website refresh — the Ash direction

**Status:** design direction locked; craft pass complete; copy provisional; prototype only.
**Date:** October 2026.
**Owner:** Jesse McGinnis.
**Not live:** this folder is outside `src/` and is not part of the Bridgetown build or deploy.

This package is the handoff for the next design or implementation jam. It contains the chosen direction, the prototype, the decisions behind it, and the parts that are still open. Do not treat the prototype copy as approved writing.

## Start here

Open the prototype:

```sh
cd design/website-refresh/prototype
python3 -m http.server 4179
```

Then open <http://127.0.0.1:4179>. The lab bar at the top switches pages, essay modes, mobile width, and notes. The prototype is plain HTML/CSS/JS; it has no build step and no dependency on the Bridgetown site.

## The direction in one paragraph

The site is a **working record**, not a portfolio. Jesse writes about ownership, trust, and the structures that help people do good work; the site should show the work changing. That means a letter from the current position, a small set of current beliefs linked to the essays that earn them, a visible revision history, and old versions that remain readable. The visual language is **Ash**: a neutral, cool-gray paper, near-black ink, one oxide accent, a Newsreader display voice, a Source Serif 4 reading body, and Plex Mono labels. It should feel precise and alive, not warm-stationery and not a dashboard.

## What is settled

- **Ash** as the surface: neutral paper, oxide ink accent, no cream, no corporate blue.
- **Type roles:** Newsreader for display; Source Serif 4 for reading; IBM Plex Mono for labels, dates, and metadata; Inter only for the lab/UI chrome.
- **The Changelog spine:** essays have versions, dates, and summaries. Revision is a property of the writing, not a separate marketing page.
- **The home is a position:** a short letter, three current beliefs, and a recently-revised ledger. The career journey moves to About.
- **One Shopify proof:** the home letter says Jesse learned to lead at Shopify (2016–2025); About carries the full story. No logos or company parade.
- **“— J.”** as the personal sign-off (home and About in the prototype).
- **The revision rail:** a quiet “Rev. 02 · October 2026 / See history / First published January 2026” in the essay margin. It is the soft hint.
- **History mode:** change bars on the rewritten passages, a version panel, a curated Then / Now, and a version log. Rev. 01 stays readable in full.
- **No terminal chrome.** No gradients, cards, badges, theme toggle, scroll reveals, or decorative monograms.
- **No stack change implied.** The current site is Bridgetown 2 + ERB + Tailwind 4. The refresh should be new layouts, partials, and CSS, with existing routes preserved.

## Page architecture

### Home

- Left rail: current position, now, currently, elsewhere.
- Main: the letter, the Shopify line, “— J.”, a P.S. to About and *Directed Chaos*.
- **What I believe now:** three current beliefs, each linked to the essay that earns it. This replaces a generic selected-writing list at the top of the page.
- **Recently revised:** versions, dates, and short change summaries; links into History mode.
- Full index link.

### Essay

- **Reading:** clean current version. The margin carries the history rail (soft hint), the table of contents, see-also, and “still thinking.”
- **History:** the current version with change bars on rewritten passages; the sidebar is a version panel, not a mixed bag of TOC and change notes. The TOC and see-also leave the sidebar in this mode.
- **Then / Now:** a curated pair of key passages, old vs current, with a prose note. This is the answer to big rewrites: a voice diff, not a line diff.
- **Rev. 01:** the old version is readable in full, with a banner and links to the current version and the history.
- **Version log:** dates, summaries, and links at the end of the essay.
- **Folio:** a quiet print-like foot line.

### About

- Left rail: years and companies.
- Main: “The path” with the Boltmade, Shopify, and GrowthLoop narrative, adapted from `src/_data/career.yml`.
- Ends with “— J.” and a route back to the front page.

### Archive

- Selected work first.
- Two-column index by theme and by year.
- Revision marks stay visible.

### README

- Today’s README re-set in Ash, not rewritten: `README.md`, the TL;DR, What I Expect, How I Show Up, What Inspires Me, the quotes, and a collapsed Sagan coda.
- Version remains `2025.01` until the content is actually reviewed.
- The terminal chrome does not come back.

## The version model

This is the core idea. An essay is not a single artifact; it has versions.

Each version needs:

- `id` (e.g. `rev-02`)
- `label` (e.g. “Rev. 02”)
- `date`
- `current` flag
- a short **prose summary** of what changed and why
- the body of the essay at that version

The current version is canonical. Old versions remain readable. The home and archive link to an essay’s history; the essay’s reading mode carries the soft hint.

**History mode** should:

- mark only meaningful rewritten passages;
- show the version panel and the current version’s summary;
- show a curated Then / Now rather than an automated diff of every sentence;
- link to the full old version.

**Authoring model:** write the summary; mark the passages that matter; let AI help produce a draft diff or structural summary, but the author writes the note. Do not mark every small edit. Big rewrites should become versions, not noisy change bars.

**Implementation note:** the prototype uses client state, not routes. In production, keep the current essay URL canonical and add shareable history/version URLs. The exact route shape is open. Do not silently present an old version as current; the banner and rail must make the version explicit.

## What is still open

Everything below is content or implementation, not a design direction:

- Final home beliefs, letter copy, Shopify sentence, P.S., and “— J.” placement.
- Final revision summaries and which passages are marked.
- The real *Directed Chaos* rewrite. The Rev. 02 opening in the prototype is the approved voice specimen from the writing thread; the rest is the current essay, not the final rewrite.
- Factual checks: 25 engineers + 2 PMs vs. “forty people”; Shopify dates (2016–2025); the “eight years” line in the career copy.
- The README’s final content, including whether to add “What you can expect from me,” “How we disagree,” and “Where I need help.” The prototype preserves today’s structure rather than replacing it.
- How long About should be, and which career chapters stay.
- Whether “— J.” appears on About and README or only on the home.
- The production revision data model and route shape.
- Final font loading, licensing confirmation, and performance budget.

## Guardrails for the next jam

- Preserve the Ash palette and the display/body/label type roles.
- Preserve reading comfort before adding expression. The essay body is the product.
- Preserve the revision rail, version panel, Then / Now, and old-version access.
- Preserve the home’s “position” structure: letter, beliefs, recent changes.
- Keep Shopify to one proof line on the home; the full story belongs in About.
- Do not add decorative complexity: no gradients, glass, cards, badges, monograms, scroll reveals, or theme toggle.
- Do not rewrite essays or settle content in a design pass. Flag content gaps.
- Do not deploy from `design/`. This package is not wired into the site.
- Keep existing routes and URLs. Add version/history routes only when the content model is ready.

## Acceptance criteria

- Essay reads comfortably at 390, 768, 1280, and 1600 px.
- History mode is legible and not noisy; the sidebar is coherent.
- Rev. 01 is clearly marked as old, and the current version is clearly marked current.
- Home feels like a position, not a bio with lists.
- About gives the career journey a real home without turning the home into a résumé.
- README feels like today’s README, evolved, not replaced.
- Keyboard focus is visible; links are identifiable; contrast is checked; reduced-motion is respected; zoom/reflow works.
- No layout shift from font loading; no route regressions.

## Exploration history

The earlier rounds are archived under `explorations/` inside this package, for context only:

- `explorations/direction-lab/` — Changelog, Index, Letterhead, Desk spines.
- `explorations/round-2/` — four temperatures.
- `explorations/round-3/` — Ash convergence.
- `explorations/round-4/` — revision treatments and the evolved README.
- `explorations/round-5/` — revision rail, display type, ledger home, folio.

The build target is `design/website-refresh/prototype/`. The earlier rounds should not be treated as competing directions.

## Next useful step

The craft pass is complete; `DIAL-IN-NOTES.md` records what changed, the verification, and the specific copy problems to resolve. Next: settle the copy questions listed there and in this README, then do the implementation pass — version data model, ERB layouts, CSS, and content. Commit the design package; do not wire it live until the copy and revision model are ready.
