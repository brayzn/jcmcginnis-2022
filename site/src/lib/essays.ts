import type { CollectionEntry } from "astro:content";

export type Essay = CollectionEntry<"essays">;
export type EssayVersion = CollectionEntry<"essayVersions">;

export const essayPath = (id: string) => `/blog/${id}/`;
export const historyPath = (id: string) => `/blog/${id}/history/`;
export const versionPath = (id: string, versionId: string) =>
  `/blog/${id}/history/${versionId}/`;

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatMonthYear = (date: Date) => monthYear.format(date);

export const versionLabel = (id: string) => {
  const match = /^rev-(\d+)$/.exec(id);
  return match ? `Rev. ${match[1]}` : id;
};

export const readingTime = (markdown: string) => {
  const words = markdown
    .replace(/:::[^\n]*/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
};

export type VersionLink = {
  id: string;
  label: string;
  date: Date;
  summary: string;
  current: boolean;
  href: string;
  title?: string;
  description?: string;
  thenNow?: {
    then: string;
    now: string;
    note: string;
  };
};

export const versionLinks = (essay: Essay): VersionLink[] =>
  essay.data.versions.map((version) => ({
    ...version,
    label: versionLabel(version.id),
    href: version.current
      ? essayPath(essay.id)
      : versionPath(essay.id, version.id),
  }));

export type SeeAlsoLink = {
  title: string;
  href: string;
  note: string;
};

const resolveLinks = (
  essay: Essay,
  essays: Essay[],
  field: "seeAlso" | "readAlongside",
): SeeAlsoLink[] =>
  (essay.data[field] ?? []).map((item) => {
    const target = essays.find((entry) => entry.id === item.essay);
    if (!target) {
      throw new Error(
        `${essay.id}: ${field} references an essay that does not exist: "${item.essay}".`,
      );
    }
    return {
      title: target.data.title,
      href: essayPath(target.id),
      note: item.note,
    };
  });

export const seeAlsoLinks = (essay: Essay, essays: Essay[]): SeeAlsoLink[] =>
  resolveLinks(essay, essays, "seeAlso");

export const readAlongsideLinks = (
  essay: Essay,
  essays: Essay[],
): SeeAlsoLink[] => resolveLinks(essay, essays, "readAlongside");

export type RecentRevision = {
  title: string;
  label: string;
  summary: string;
  href: string;
  date: Date;
};

export const recentRevisions = (essays: Essay[]): RecentRevision[] =>
  essays
    .flatMap((essay) =>
      essay.data.versions.slice(1).map((version) => ({
        title: essay.data.title,
        label: `${versionLabel(version.id)} · ${formatMonthYear(version.date)}`,
        summary: version.summary,
        href: historyPath(essay.id),
        date: version.date,
      })),
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());
