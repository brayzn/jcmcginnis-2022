import { parse } from "yaml";
import { z } from "astro/zod";
import careerSource from "../data/career.yml?raw";

const years = z.string().regex(/^\d{4}–(?:\d{4}|present)$/);
const marker = z.string().trim().min(1);

const chapterSchema = z.object({
  name: z.string().min(1),
  years,
  markers: z.array(marker).min(1),
});

const eraSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1).optional(),
  years: years.optional(),
  markers: z.array(marker).optional(),
  chapters: z.array(chapterSchema).optional(),
});

const careerSchema = z.object({
  eras: z.array(eraSchema).min(1),
});

export type CareerChapter = {
  name: string;
  years: string;
  paragraphs: string[];
};

export type CareerEra = {
  id: string;
  company: string;
  years: string;
  title: string;
  paragraphs: string[];
  chapters: CareerChapter[];
};

const paragraphs = (blocks: readonly string[]): string[] =>
  blocks.flatMap((block) =>
    block
      .split(/\n[ \t]*\n/)
      .map((paragraph) => paragraph.replace(/[ \t]*\n[ \t]*/g, " ").trim())
      .filter(Boolean),
  );

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const data = careerSchema.parse(parse(careerSource));

export const careerPath: CareerEra[] = data.eras
  .filter((era) => era.years)
  .map((era) => ({
    id: slug(era.company),
    company: era.company,
    years: era.years!,
    title: era.name ?? era.company,
    paragraphs: paragraphs(era.markers ?? []),
    chapters: (era.chapters ?? []).map((chapter) => ({
      name: chapter.name,
      years: chapter.years,
      paragraphs: paragraphs(chapter.markers),
    })),
  }));

for (const era of careerPath) {
  if (era.paragraphs.length === 0 && era.chapters.length === 0) {
    throw new Error(`About has no narrative for ${era.company}.`);
  }
}

if (new Set(careerPath.map((era) => era.id)).size !== careerPath.length) {
  throw new Error("Career eras need unique company names for About anchors.");
}
