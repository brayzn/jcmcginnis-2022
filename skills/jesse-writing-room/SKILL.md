---
name: jesse-writing-room
description:
  Use for serious blog and essay drafting, rewriting, or final review in this repo when the user
  asks for a writing room, adversarial readers, editor team, Tobi/CEO/Jesse review,
  publish-readiness review, or help landing a high-voice essay. Coordinates read-only reader and
  editor subagents in iterative loops, preserves Jesse's raw direct voice, and guides the parent
  agent through synthesis, edits, linting, and commits until the piece converges.
---

# Jesse Writing Room

## Core Rule

Subagents review. The parent agent decides and edits.

Never let subagents modify prose files. Use them to surface perspectives, risks, tensions, and
candidate rewrites. The parent agent owns taste, synthesis, file edits, validation, commits, and
pushes.

Do not ask one subagent to represent a whole team when separate actors are feasible. Prefer distinct
single-purpose reviewers with narrow briefs. Use a combined panel only when the agent/thread limit
or the user's time constraint makes separate actors impractical, and say so.

## Workflow

1. Read the current draft at `site/src/content/essays/<slug>/index.md` (or a draft under
   `site/src/content/drafts/`), the current diff, and nearby house-style essays before forming
   opinions.
2. Keep the user's latest edits as the source of truth unless they create a real defect.
3. Spawn read-only panels only when the user asks for the writing room, adversarial agents, readers,
   editors, or a serious final review.
4. Default to loop mode: review, synthesize, edit, validate, reread, and repeat until the piece
   reaches the user's goal or the remaining concerns are only taste/publication risk.
5. If the user asks for a single review, do one read-only pass and stop with findings.
6. Run reader and editor actors separately. Do not let readers simulate editors or editors simulate
   audience personas.
7. Ask actors for must-fixes, risks, and candidate rewrites. Do not ask them to make files perfect.
8. Synthesize tensions yourself. Apply only edits that improve the piece more than they sand it
   down.
9. Repeat only while changes are materially improving structure, argument, voice, or proof.
10. Stop when remaining concerns are taste, publication risk, or quote-mining risk rather than
    defects.
11. Run `mise run site:lint` after edits. Commit and push only when requested or when the current
    loop has converged and the user asked for commits after loops.

## Revision workflow

Run the revision command before the first edit of a rewrite:

```bash
npm --prefix site run revision:start -- <slug> --summary "..." --then "..." --now "..." --note "..."
```

- It archives the current body from `HEAD` as the outgoing `rev-NN.md` and appends the new current
  version dated today. Commit or restore a dirty `index.md` first; the script refuses it.
- `site/src/content/essays/<slug>/rev-NN.md` files are published history, not drafts. Read them,
  never edit them.
- Preserve the original publication date. The rewrite gets a new version date, a prose summary, and
  a Then/Now pair. The author writes the note; no fabricated revisions and no version for a small
  edit.
- A draft in `site/src/content/drafts/` is a draft, not Rev. 01. Do not promote an alpha into a
  revision by renaming it.
- Mark only meaningful rewritten passages in `index.md`:

  ```md
  <!-- prettier-ignore -->
  :::changed{since="rev-01"}
  The rewritten passage.
  :::
  ```

  The directive must start its own line and close with `:::` on its own line.

- Validate before calling the rewrite done: `mise run site:lint` plus the site build.

## House Taste

- Prefer raw, direct, high-heat prose over corporate polish.
- Let scenes, mechanisms, and consequences carry meaning before abstract takeaways.
- Preserve useful provocation. Do not neutralize lines merely because they are sharp.
- Avoid consensus prose. The goal is not to please every reviewer.
- Use formatting sparingly. Prefer plain body prose unless emphasis solves a real reading problem.
- Treat public/company examples as evidence, not product tours.
- Protect the essay's central thesis. Do not let panel feedback turn the piece into a safer,
  smoother version of a weaker argument.

## Panels

Load `references/actors.md` when spawning panels or when exact prompt wording would help. Build
actor prompts from the shared contract plus the relevant actor brief.

Use two default sets of individual actors:

- Reader actors: modelled Jesse, Tobi-style founder/operator, CEO reader.
- Editor actors: literary/prose editor, line editor, structure editor, rhetoric editor,
  anti-LinkedIn-slop editor, web/scannability editor, copy chief.

Keep actors read-only and independent. If an agent crosses roles, treat only the relevant part as
valid, close it, and rerun the missing actor cleanly when the missing perspective matters.

When actor count is too high for the available subagent limit, prioritize:

1. Modelled Jesse, Tobi-style founder/operator, CEO reader.
2. Line editor, structure editor, anti-LinkedIn-slop editor.
3. Literary/prose editor, rhetoric editor, web/scannability editor, copy chief.

If forced to batch actors, batch adjacent editor functions before batching reader personas.

## Synthesis Heuristics

- Reader objections are strongest when they identify credibility, audience-fit, or argument defects.
- Editor objections are strongest when they identify rhythm, structure, density, or voice defects.
- A phrase is worth restoring when it compresses a model and adds force without reopening an
  explanatory lap.
- A cut is worth keeping when it preserves the bridge and gets to proof faster.
- A section is done when a broad pass is more likely to make it safer, smoother, and worse.
- The user's own edits usually reveal the desired direction. Treat them as training signal, not as
  noise to normalize.

## Validation

For changed posts, run:

```bash
mise run site:lint
npm --prefix site run check
```

Or from `site/`:

```bash
npm run check
npm run build
```

`mise run site:lint` runs the type check, version validation, and Prettier check. `mise run lint -a`
remains the formatter for the legacy Bridgetown app only; it does not touch `site/`. If committing,
keep commit messages short and specific, then push the active branch when requested.
