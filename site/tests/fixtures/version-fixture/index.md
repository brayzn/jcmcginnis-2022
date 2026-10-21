---
title: Version Fixture
description: Test fixture for the version model. Not a real essay.
categories: ["Test"]
featured: false
feed: false
versions:
  - id: rev-01
    date: 2026-01-01
    summary: First published.
    current: false
  - id: rev-02
    date: 2026-02-01
    summary: Rewrote the opening, added the second section, and left the rest alone.
    current: true
    thenNow:
      then: >
        The first version opened with a definition of the problem. Definitions are safe; they keep
        the reader at arm's length.
      now: >
        This version opens with a scene: a small room, a whiteboard, and a decision nobody wants to
        own. The problem arrives after the reader can feel it.
      note: >
        Fixture pair showing the curated Then/Now shape. One marked passage, one old body, no
        invented revision history.
---

A fixture essay exists to prove one thing: a published essay can carry history without pretending a
draft was a version.

<!-- prettier-ignore -->
:::changed{since="rev-01"}
This version opens with a scene: a small room, a whiteboard, and a decision nobody wants to own.
The first version opened with a definition instead.
:::

Everything after the marked passage is unchanged between versions, which is the point. Bars should
mark only the passages that earned one.

The route table is the test: current reading, history, and an explicit old version. Old bodies are
frozen; corrections become a new revision.
