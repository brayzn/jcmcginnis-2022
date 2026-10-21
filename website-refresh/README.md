# Website refresh — workstreams

Two tracks, one outcome. This is the shared entry point for a fresh agent.

**Status:** design and editorial baselines are both on `main` (#36, #37); the editorial rewrite is
in progress. Nothing is live. Both folders are outside `src/`, so Bridgetown does not build them.

## The two tracks

| Track         | Folder                    | Source of truth for                                          |
| ------------- | ------------------------- | ------------------------------------------------------------ |
| **Design**    | `design/website-refresh/` | Layout, type, interaction, the revision model, the prototype |
| **Editorial** | `notes/website-refresh/`  | Prose, voice, facts, the rewrite queue, the audit            |

### Design

Start with `design/website-refresh/README.md`. It contains the locked direction, page architecture,
version model, open content questions, implementation notes, guardrails, and acceptance criteria.
`DIAL-IN-NOTES.md` records the craft pass and the copy problems it flagged but did not rewrite.

Run the prototype:

```sh
cd design/website-refresh/prototype
python3 -m http.server 4179
```

### Editorial

Start with `notes/website-refresh/README.md`, then `OPERATING.md`. The editorial track owns the
voice and the queue. The locked benchmark is `voice-specimen-01.md`; `VOICE.md` holds the moves and
diagnostics; `content-audit.md` and `handoff.md` are context. `directed-chaos-draft.md` is the live
working draft.

## The contract

- **Design owns** the visual system, interaction, version model, and prototype. It uses provisional
  copy.
- **Editorial owns** the prose, voice, facts, and rewrite queue. It does not edit the prototype or
  design code.
- **Version summaries, beliefs, the home letter, About, and README copy are editorial.** Design
  supplies the slots; editorial approves the words.
- **Facts are checked before publication.** Do not invent scenes, dialogue, motives, or outcomes.
  The open checks include 25 engineers + 2 PMs vs “forty people,” the Shopify dates, and the “eight
  years” line.
- **Nobody edits `src/` or deploys** as part of either workstream. Implementation starts only when
  the copy and version model are ready.
- **One substantive rewrite active at a time.** Design and shared cleanup can proceed alongside it.

## Fresh agent start

1. Read this file.
2. Read `STATUS.md` for the current stage, next action, and branch state.
3. Choose a workstream and read its README.
4. For design, run the prototype and inspect the actual rendered pages at desktop and phone widths.
   Do not judge from code alone.
5. For editorial, read `OPERATING.md` and the voice specimen before writing. Ask for missing
   material; do not invent it.
6. Pick the next small action from the workstream's status. End the session by updating `STATUS.md`
   with the stage, the unresolved decision, and the next action.

## Current shape

- **Ash:** neutral paper, oxide accent, Newsreader display, Source Serif 4 body, Plex Mono labels.
- **Home is a position:** letter, three current beliefs, recently revised; career path in About.
- **Essays have versions:** Reading and History modes, change bars, a version panel, a curated Then
  / Now, and old versions readable in full.
- **Archive:** selected writing plus a theme/year index, with revision marks.
- **README:** today's working document re-set in Ash; no terminal chrome.
- **Personal details:** one Shopify proof line on the home; “— J.” sign-off.

## What this is not

- Not a live site, CMS migration, or stack change.
- Not an approved content rewrite. The prototype copy is provisional.
- Not a finished design system. The craft pass is done; final refinements wait on copy.

## Where things live

Both tracks are on `main`: editorial (#36), design + shared index (#37). Keep them together; they
are one refresh. The baseline is not wired into the live site; implementation is a separate step.
Pushing `main` deploys the current site, not the refresh.
