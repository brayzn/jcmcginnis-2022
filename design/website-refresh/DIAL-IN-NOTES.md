# Dial-in notes — Ash prototype craft pass

**Date:** October 2026. **Scope:** `prototype/` only. No content, `src/`, routes, or essays touched.
No prose rewritten.

## What changed, and why

### Bugs found while doing the pass

- **Labels were rendering at body size.** `.then p`, `.about-section p`, and `.home-main > p`
  outranked `.label`, so the Then / Now labels and the About era labels rendered at 17–18px, and the
  P.S. rendered at 20px. Fixed at the root: the base `p`/`a` resets now sit in `:where(.proto)`, so
  component classes win without `!important`. Every `!important` is gone.
- **Rev. 01 showed change bars.** Opening Rev. 01 from History kept the history class, so the old
  text got "Rev. 01" and "Rev. 02" bars. Change bars now render only on the current version in
  History mode. Rev. 01 is a plain old version.
- **TOC anchors were broken.** The hrefs didn't match the heading ids, and any in-page `#` link
  fired `hashchange`, which re-rendered the page and reset to Rev. 02. The TOC is now generated from
  the headings. In-page links (TOC, README TL;DR, About rail) scroll to the target and move focus to
  it. The lab hash is left alone.
- **Nested `<main>`.** The lab stage was a `<main>`, and every view rendered another one inside it.
  The stage is now a `<div>`. Every view, the essay included, has exactly one `<main>`.
- **Oxide text was 4.50:1** (`#b84a28` on paper, 4.497 before rounding), which fails AA for small
  labels. Added `--accent-text: #ab4425` (5.08:1) for oxide _text_. `--accent` is unchanged for
  bars, dots, and rules. To the eye, the palette is the same.

### History and Rev. 01

- **Change bars:** a run of rewritten paragraphs is now one continuous bar with one "Rev. 02" label,
  not five bars with five labels (this uses `:has()`). The label sits in the outer gutter only when
  the page is ≥1200px wide. Narrower, it moves inside the bar so it can't overflow the paper.
- **Sidebar:** History now has one panel: Versions → What changed → Back to reading. The duplicate
  "History / Rev. 02 / First published" rail no longer sits above it. The margin rule stays gray in
  History; oxide is used only for the marks.
- **One version list** is shared by History and Rev. 01. The version you're reading has a filled dot
  and `aria-current`. The others are links.
- **Then / Now** spans the full essay width. "Now" gets an oxide rule and label; "Then" is muted.
  The note is set as Newsreader italic prose, not 11px mono. The collapsed "Then and now" in the
  version log is hidden in History mode so the comparison isn't shown twice.
- **Rev. 01** before: four repeats of "Rev. 01 · January 2026" (kicker, meta, banner, rail). Now:
  the kicker is the same as the current version's ("Writing / Leadership"), the meta drops the
  revision, and the banner does the work: an oxide top rule, 18px serif, and both links. The margin
  shows the shared version list.
- **Phones:** in History, the version panel moves above the marked text so the bars have context.
  Reading mode keeps the margin after the body.
- **Endmark ■** now closes the last paragraph instead of floating under "Read alongside". It has
  empty alt text, so screen readers skip it. Folio is 10px.

### Type, rhythm, links

- One title size (56 → 44 → 38) for Essay, About, and Archive. README keeps its 76px masthead.
- Home: lede 40 → 42 so it outranks the beliefs (30 → 28). Section heads now share one pattern: a
  2px rule, then a 23px Newsreader heading. Spacing is consistent (64px between sections, 26/24
  inside beliefs). Belief numbers now sit on the text baseline.
- Margin prose (see-also reasons, Still thinking, What changed, alongside notes) moved from mono to
  the serif at 15px. Mono stays for labels, dates, and metadata, as the type roles say.
- Rail: "Now" is set in the serif, and the Currently question in Newsreader italic. On phones the
  rail becomes a 2×2 colophon under the letter.
- About: era labels are fixed, the rail entries link to their sections, and the body is 19px with a
  34em measure (~66ch).
- README: removed the doubled rule under the masthead and added bottom padding on the expectation
  blocks. Section numbers are muted, so they no longer read as copies of the oxide question numbers.
  The +/– markers on `<details>` are consistent.
- Links: running-text and meta links are always underlined (1px, offset 0.22em, 40% currentColor,
  solid on hover). List-title links underline on hover; the row itself is the affordance. The active
  nav item gets an oxide underline and `aria-current="page"`.
- Focus: a 2px oxide outline on links, summaries, and lab buttons.
- Fonts: metric-matched `@font-face` fallbacks (Georgia, Menlo). They were measured _at use size_,
  because optical sizing changes width: Source Serif `size-adjust` 102%, Newsreader 94%, Plex Mono
  99.7%.
- Breakpoints: one medium step (≤1000) that narrows the rails, then ≤760 for one column, then ≤480
  for phones.

### Lab chrome

The only lab changes are an addressable Rev. 01 (`#essay/history/rev-01`) and the in-page anchor
fix. Lab CSS is untouched. I removed three unused render functions (`revisionEntries`,
`revisionMargin`, `revisionEndnote`) and about 400 lines of CSS no markup used.

## Verification

- `verify-ui.js` ran once through `bb browser-automation`, in a headless session that was then
  closed. Report and screenshots are in thread storage, not the repo.
- **Layout:** 35 checks (7 views × 320/390/768/1280/1600). None overflowed horizontally. Each view
  has one `h1`, no skipped heading levels, and one `<main>`. No visible link lacks an underline
  except the allow-listed list titles.
- **Contrast:** the lowest text contrast on any view is 4.96:1 (muted).
- **Measure:** the essay body is 64–66ch at 20px on desktop and 18px on phones.
- **States:** History has 5 marked passages and 1 label, a version panel, no TOC, and Then / Now
  once. Rev. 01 is archived, with no history class, 0 bars, the banner, and the version list marked.
  "Read the current version" returns to Rev. 02 reading. TOC, README TL;DR, and the About rail
  scroll (target lands at 120px) and stay on the same view. The Mobile·390 frame does not overflow,
  and the Notes panel opens.
- **Keyboard:** 14 Tab stops, all with a visible 2px outline.
- **Reduced motion:** transitions are 0s and there are no animations.
- **Font fallback:** the batched run caught a 20% height difference on the body paragraph. The first
  fallback values were measured at 100px, where optical sizing makes the face narrower. I
  re-measured at use size and re-checked with local headless Chrome (not a second bb run):
  paragraph, lede, belief, About body, and deck now match the web fonts to the pixel at 1280.

## Open questions (content: flagged, not changed)

1. The home lede ("I lead product engineering at GrowthLoop") and the rail's "Now" line say the same
   thing. The location also appears in both the rail and the footer.
2. One change has three summaries: the History "What changed", the version log, and the Then / Now
   note. The first two are the same sentence. The author should write one summary and one note.
3. The Rev. 01 log row says "First published." and its status column also says "First published".
4. README states `2025.01` three times: in the kicker, the meta line, and the colophon.
5. Beliefs 2 and 3, and "Trust First" in Recently revised, link to _Directed Chaos_ because the
   other essays don't exist in the prototype. The "Essay" meta label is weak next to "Revised
   October 2026".
6. `site.revision` (the illustrative before/after) is now unused data. The removed endnote said
   "added what I got wrong", which no version shows. Decide whether that claim belongs anywhere.
7. "Forty people" (About) vs. "25 engineers and 2 PMs" (the essay) is still unresolved. It is
   already listed in the README.

## Open questions (implementation)

- **Route shape:** the prototype uses `#essay/<mode>/rev-01`. Production needs a canonical essay URL
  plus a shareable version URL.
- **Continuous change bars need `:has()`.** Without it, each paragraph gets its own bar with gaps
  between them. That still works.
- **Fallback metrics** were measured in Chrome on macOS. Check Windows (Georgia/Consolas) and Linux,
  where neither Georgia nor Menlo may exist and the generic fallback shifts the layout.
- **Soft hint on phones:** in reading mode the history rail sits after the essay, so the only hint
  above the fold is "Revised October 2026" in the meta. Should that meta link to History?
- **Workspace:** the refined prototype has been copied into the project checkout;
  `design/website-refresh/prototype/` is the canonical copy. The pre-edit version and verification
  artifacts were kept in the design-builder thread storage for comparison.
