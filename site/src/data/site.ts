import { smartQuotes } from "../lib/text";

export const selectedEssays = [
  "directed-chaos",
  "org-changelog",
  "trust-first",
] as const;

export type Belief = {
  text: string;
  essay: string;
};

export const beliefs: Belief[] = [
  {
    text: smartQuotes(
      "Ownership isn't a belief you argue someone into. It's a weight you let them feel.",
    ),
    essay: "directed-chaos",
  },
  {
    text: "Trust is the multiplier.",
    essay: "trust-first",
  },
  {
    text: smartQuotes(
      "By remembering your past, you'll understand your present and shape your future.",
    ),
    essay: "org-changelog",
  },
];

export type HomeLink =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string }
  | { kind: "essay"; text: string; essay: string };

export const home = {
  position: "VP Product Engineering, GrowthLoop",
  now: smartQuotes(
    "Writing about ownership, trust, and the structures that help people take responsibility.",
  ),
  currently: smartQuotes(
    "How do you distribute ownership without losing coherence?",
  ),
  lede: smartQuotes(
    "I lead product engineering at GrowthLoop. I write about the structures that help people take responsibility—and the ones that quietly take it away.",
  ),
  shopify: smartQuotes(
    "I learned to lead at Shopify, where I spent 2016–2025 learning how scale changes the job. Now I'm learning what happens when the machine is smaller and the stakes are closer.",
  ),
  letter: [
    smartQuotes(
      "This site is where I work that out in public: what I believe now, what I've changed my mind about, and what I'm still trying to understand.",
    ),
  ],
  signoff: "— J.",
  ps: [
    { kind: "text", text: "P.S. The longer story is in " },
    { kind: "link", text: "About", href: "/about/" },
    { kind: "text", text: ". The argument starts with " },
    { kind: "essay", text: "Directed Chaos", essay: "directed-chaos" },
    { kind: "text", text: "." },
  ] satisfies HomeLink[],
};
