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

const shortMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatShortMonthYear = (date: Date) => shortMonthYear.format(date);

export const versionLabel = (id: string) => {
  const match = /^rev-(\d+)$/.exec(id);
  return match ? `Rev. ${match[1]}` : id;
};

export const versionStamp = (id: string, date: Date) =>
  `${versionLabel(id)} · ${formatShortMonthYear(date)}`;

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

export const seeAlsoLinks = (essay: Essay, essays: Essay[]): SeeAlsoLink[] =>
  (essay.data.seeAlso ?? []).map((item) => {
    const target = essays.find((entry) => entry.id === item.essay);
    if (!target) {
      throw new Error(
        `${essay.id}: seeAlso references an essay that does not exist: "${item.essay}".`,
      );
    }
    return {
      title: target.data.title,
      href: essayPath(target.id),
      note: item.note,
    };
  });

export type RecentRevision = {
  title: string;
  label: string;
  summary: string;
  href: string;
  date: Date;
  count: number;
};

export const recentRevisions = (essays: Essay[]): RecentRevision[] =>
  essays
    .flatMap((essay) => {
      const revisions = essay.data.versions.slice(1);
      const latest = revisions.at(-1);
      if (!latest) return [];
      return [
        {
          title: essay.data.title,
          label: versionStamp(latest.id, latest.date),
          summary: latest.summary,
          href: historyPath(essay.id),
          date: latest.date,
          count: revisions.length,
        },
      ];
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
