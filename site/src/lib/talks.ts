import type { CollectionEntry } from "astro:content";
import { displayText } from "./text";

export type Talk = CollectionEntry<"talks">;

export const talkSlug = (talk: Talk) => {
  const suffix = `-${talk.data.year}`;
  return talk.id.endsWith(suffix) ? talk.id.slice(0, -suffix.length) : talk.id;
};

export const talkPath = (talk: Talk) =>
  `/talks/${talk.data.year}/${talkSlug(talk)}/`;

export const talkKind = (talk: Talk) =>
  talk.data.type === "workshop" ? "Workshop" : "Talk";

export const talkTitle = (talk: Talk) => displayText(talk.data.title);

export const talkEvent = (talk: Talk) => displayText(talk.data.event);

export const talkDescription = (talk: Talk) =>
  displayText(talk.data.description);

const byYearDescending = (a: Talk, b: Talk) =>
  b.data.year - a.data.year || a.data.title.localeCompare(b.data.title);

export const sortedTalks = (talks: Talk[]) => [...talks].sort(byYearDescending);

export const talkYears = (talks: Talk[]) => [
  ...new Set(sortedTalks(talks).map((talk) => String(talk.data.year))),
];

export const talksByYear = (talks: Talk[], year: string): Talk[] =>
  sortedTalks(talks).filter((talk) => String(talk.data.year) === year);

export const featuredTalk = (talks: Talk[]) =>
  sortedTalks(talks).find((talk) => talk.data.featured) ??
  sortedTalks(talks)[0];

export const talkResources = (talk: Talk) =>
  [
    talk.data.video_url && { label: "Video", href: talk.data.video_url },
    talk.data.slides_url && { label: "Slides", href: talk.data.slides_url },
    talk.data.overview_url && {
      label: "Overview",
      href: talk.data.overview_url,
    },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
