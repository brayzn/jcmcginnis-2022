# OPERATING.md — how to work on the writing

The operating manual for a fresh agent working on the jcmcginnis.com refresh. Read this first, then
`README.md`, then `VOICE.md`. The locked passage is the benchmark.

## Read order

1. `OPERATING.md` — how to work.
2. `README.md` — the frame, queue, and design context.
3. `VOICE.md` — the bones and diagnostics.
4. `voice-specimen-01.md` — the locked benchmark.
5. `directed-chaos-draft.md` — the current draft and open questions.
6. `content-audit.md` and `handoff.md` — context, not commands.

## Source of truth

When documents conflict, this order wins:

1. The user's latest instruction.
2. The locked specimen and `VOICE.md`.
3. `README.md`.
4. The content audit and handoff.
5. The research packet.
6. The published and old drafts.

The research packet is a quarry, never a mandate. It can supply a date, a name, a line. It does not
choose the shape, the thesis, or the voice.

## Do not

- Do not rewrite the locked passage unless the user asks.
- Do not let a source document choose the shape or the argument.
- Do not make the essay about the research process. No “the record says” frame.
- Do not sand the voice: no hedging, no corporate transitions, no compulsory conclusions.
- Do not invent scenes, dialogue, motives, or outcomes.
- Do not rewrite the archive for consistency. Leave dated work dated.
- Do not commit prose without approval.
- Do not let subagents edit prose. They review; the parent edits.
- Do not push for private material. Ask; do not assume.

## AI-slop tells

Cut these on sight:

- The “not X, but Y” construction as a reflex.
- The rule of three.
- The compulsory conclusion.
- The generic scene — weather, coffee, a room — with no specific detail.
- The thesis before the detail.
- The summary paragraph that repeats the introduction.
- The metaphor stack.
- “Here's the thing,” “Let me be clear,” “The real work is.”
- Balanced “on one hand / on the other hand” prose.
- A neat lesson at the end.

## Fact vs. memory

- Memory is the story. The record is a check.
- Use the record to verify names, dates, numbers, and sequence. Do not use it to choose the argument.
- If the record contradicts the memory, ask the user which version they want to tell. Do not resolve
  it unilaterally.
- Keep “I remember” for memory. Do not turn the essay into a fact-check.
- Do not publish unverified claims as fact. If a claim matters, check it or frame it as memory.

## Privacy

- The repo is public.
- The user's own notes are fine.
- The research packet contains other people's Slack messages, names, and private DMs. Keep raw DMs
  in thread storage or redact before committing.
- Do not add customer data or PII.

## Session protocol

1. Ask for raw material: memory, a voice note, a DM, a specific scene. No prose yet.
2. Return a small editorial map: what to preserve, what is missing, a proposed shape. Mark gaps; do
   not invent.
3. Calibrate one passage, 300–500 words. Read it aloud. Let the user mark what is theirs and what is
   yours.
4. Build one movement at a time. Do not draft the whole essay in one pass.
5. Challenge the argument and the repetition. Keep the user's choices visible.
6. Read the full piece in the design at 390 and 1280.
7. End the session with the current stage, the unresolved decision, and the next small action.

One substantive essay active at a time. Design and cleanup can run alongside.

## Essay status board

Update this after every session. “Stage” moves material → shape → draft → author review → ready.

| Essay | Stage | Thesis | Locked | Open | Facts to check | Next |
| --- | --- | --- | --- | --- | --- | --- |
| Directed Chaos | Draft | The meeting was the easy part; delegating judgment took months. | Opening; announcement and deer | The first week; who carried it; the coaching | Attendance; deletion mechanics; names and titles | Write the confusion movement |
| Work-life Harmony | Material | Harmony, not balance; work is part of life. | — | One real situation; where following energy becomes an excuse | — | Get the memory |
| Homepage | Not started | A letter from a working writer. | — | Current context; career placement | — | Wait for the voice |
| README | Not started | A working document. | — | Claims review; version; social handles | — | Truth-check |
| Trust First | Decide | Unresolved | — | Rewrite or retire | — | Decide after launch |
| Organizational Changelog | Specimen | The practice is useful. | — | Light edit after launch | — | Use as a design test |
| Free Markets | Specimen | Local truth against central planning. | — | v1.1 tightening | — | Use as a dense-argument test |
| Transitioning Well | Archive | Dated experience. | — | Broken link; afterword | Link | Cleanup |
| Writing Regularly | Archive | Dated note. | — | Obsolete promises | — | Cleanup |

## Directed Chaos movement map

Proposed, not final:

1. The meeting — locked.
2. The kill and the announcement — holds.
3. The confusion — the first week, the practical questions, the mixed reactions.
4. Who carried it and who did not — the leads, the squads, the deer in headlights.
5. The coaching — what Jesse actually did: outcome questions, cadence, standards, the Jorge 1:1.
6. The cost — what broke, who was upset, what he would do differently.
7. The ending — an image, not a lesson.

The thesis: **The meeting was the easy part. Delegating judgment took months.**

Where the cut material goes:

- Exothermic people — companion note.
- Language as infrastructure — companion note.
- QA removal and desired state — separate essay or companion note.
- Champions and the six-week review — part of the new structure, later in the essay.

## Revision protocol

- Keep the original publication date.
- Add a clear revised date.
- Write a short revision note when the position changes.
- Keep the old version available; the changelog spine needs it.
- Preserve the URL.
- If an old claim is no longer defensible, correct it even when the essay is not featured.
- Do not silently rewrite a historical account as if it were written today.

## Definition of done

- It sounds like the user when read aloud.
- The central claim is supported and bounded.
- The structure follows the thought.
- There is enough lived specificity to understand the judgment.
- The ending does not repeat the introduction.
- It reads well in Ash at 390 and 1280, including the quietest and densest passages.
- The user would put it in front of someone.

## Subagents

- Readers and editors review; the parent agent decides and edits.
- Do not let subagents modify prose files.
- Use distinct reader and editor actors when the user asks for a writing room.
- The repo skill is `skills/jesse-writing-room`.

## How to start a session

1. Read this file, `README.md`, `VOICE.md`, and the current draft.
2. Ask what we are working on today: material, shape, draft, or review.
3. Do not start with a rewrite. Start with the missing material or the next movement.
4. End with the status board updated.
