import type { Essay } from "./essays";
import {
  essayPath,
  formatMonthYear,
  historyPath,
  versionStamp,
} from "./essays";
import { selectedEssays } from "../data/site";

export type ArchiveEntry = {
  id: string;
  title: string;
  note: string;
  href: string;
  date: Date;
  dateLabel: string;
  year: string;
  themes: string[];
  historyHref: string | null;
  revisionStamp: string | null;
};

const byDateDescending = (a: ArchiveEntry, b: ArchiveEntry) =>
  b.date.getTime() - a.date.getTime();

export const toArchiveEntry = (essay: Essay): ArchiveEntry => {
  const versions = essay.data.versions;
  const first = versions[0];
  const latest = versions.at(-1)!;
  const revised = versions.length > 1;

  return {
    id: essay.id,
    title: essay.data.title,
    note: essay.data.description,
    href: essayPath(essay.id),
    date: first.date,
    dateLabel: formatMonthYear(first.date),
    year: String(first.date.getUTCFullYear()),
    themes: essay.data.categories,
    historyHref: revised ? historyPath(essay.id) : null,
    revisionStamp: revised ? versionStamp(latest.id, latest.date) : null,
  };
};

export const archiveEntries = (essays: Essay[]): ArchiveEntry[] =>
  essays.map(toArchiveEntry).sort(byDateDescending);

export const selectedEntries = (entries: ArchiveEntry[]): ArchiveEntry[] =>
  selectedEssays.map((slug) => {
    const entry = entries.find((item) => item.id === slug);
    if (!entry) {
      throw new Error(
        `The selected archive references an essay that does not exist: "${slug}".`,
      );
    }
    return entry;
  });

export const archiveThemes = (entries: ArchiveEntry[]): string[] =>
  [...new Set(entries.flatMap((entry) => entry.themes))].sort((a, b) =>
    a.localeCompare(b),
  );

export const entriesByTheme = (
  entries: ArchiveEntry[],
  theme: string,
): ArchiveEntry[] => entries.filter((entry) => entry.themes.includes(theme));

export const archiveYears = (entries: ArchiveEntry[]): string[] =>
  [...new Set(entries.map((entry) => entry.year))].sort(
    (a, b) => Number(b) - Number(a),
  );

export const entriesByYear = (
  entries: ArchiveEntry[],
  year: string,
): ArchiveEntry[] => entries.filter((entry) => entry.year === year);
