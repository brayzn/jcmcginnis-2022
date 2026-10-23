import { parse } from "yaml";
import source from "../data/readme.yml?raw";
import { smartQuotes } from "./text";

type TldrItem = {
  anchor: string;
  label: string;
  headline: string;
  summary: string;
};

type Keyword = {
  label: string;
  detail: string;
};

type Expectation = {
  headline: string;
  keywords: Keyword[];
};

type Principle = {
  title: string;
  detail: string;
};

type Quote = {
  text: string;
  author: string;
};

type QuoteGroupKey = "seek" | "be" | "remember";

export type Readme = {
  tldr: TldrItem[];
  expectations: Expectation[];
  principles: Principle[];
  quotes: Record<QuoteGroupKey, Quote[]>;
  sagan: string;
};

const smart = (value: string) => smartQuotes(value);

const smartQuote = (quote: Quote): Quote => ({
  ...quote,
  text: smart(quote.text),
  author: smart(quote.author),
});

const parsed = parse(source) as Readme;

export const readme: Readme = {
  tldr: parsed.tldr.map((item) => ({
    ...item,
    label: smart(item.label),
    headline: smart(item.headline),
    summary: smart(item.summary),
  })),
  expectations: parsed.expectations.map((expectation) => ({
    ...expectation,
    headline: smart(expectation.headline),
    keywords: expectation.keywords.map((keyword) => ({
      ...keyword,
      label: smart(keyword.label),
      detail: smart(keyword.detail),
    })),
  })),
  principles: parsed.principles.map((principle) => ({
    ...principle,
    title: smart(principle.title),
    detail: smart(principle.detail),
  })),
  quotes: {
    seek: parsed.quotes.seek.map(smartQuote),
    be: parsed.quotes.be.map(smartQuote),
    remember: parsed.quotes.remember.map(smartQuote),
  },
  sagan: parsed.sagan,
};

export const readmeMeta = {
  title: "README.md",
  kicker: "Personal operating manual",
  version: "2025.01",
  deck: "What I expect. How I show up. What inspires me. For myself first—then for anyone I work with.",
};

export const quoteGroups: { key: QuoteGroupKey; title: string }[] = [
  { key: "seek", title: "What to seek" },
  { key: "be", title: "How to be" },
  { key: "remember", title: "To remember about the world" },
];

const escapeHtml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

// The YAML marks emphasis with *asterisks*; render them as <em>.
export const inlineEmphasis = (text: string) =>
  escapeHtml(smartQuotes(text)).replace(/\*([^*]+)\*/g, "<em>$1</em>");

export const saganParagraphs = readme.sagan
  .split(/\n\s*\n/)
  .map((paragraph) => smartQuotes(paragraph.trim()))
  .filter(Boolean);
