import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const version = z
  .object({
    id: z.string().regex(/^rev-\d{2,}$/),
    date: z.coerce.date(),
    summary: z.string().min(1),
    current: z.boolean().default(false),
    title: z.string().optional(),
    description: z.string().optional(),
    thenNow: z
      .object({
        then: z.string().min(1),
        now: z.string().min(1),
        note: z.string().min(1),
      })
      .strict()
      .optional(),
  })
  .strict();

const essays = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/essays" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      categories: z.array(z.string()).min(1),
      featured: z.boolean().default(false),
      feed: z.boolean().default(true),
      image: z.string().optional(),
      pull_quote: z.string().optional(),
      stillThinking: z.string().min(1).optional(),
      seeAlso: z
        .array(
          z
            .object({
              essay: z.string().min(1),
              note: z.string().min(1),
            })
            .strict(),
        )
        .optional(),
      versions: z.array(version).min(1),
    })
    .strict()
    .superRefine((data, ctx) => {
      const currents = data.versions.filter((item) => item.current);
      if (currents.length !== 1) {
        ctx.addIssue({
          code: "custom",
          message: "Exactly one version must be current.",
          path: ["versions"],
        });
      }

      const ids = new Set(data.versions.map((item) => item.id));
      if (ids.size !== data.versions.length) {
        ctx.addIssue({
          code: "custom",
          message: "Version ids must be unique.",
          path: ["versions"],
        });
      }

      const dates = data.versions.map((item) => item.date.getTime());
      if (dates.some((date, index) => index > 0 && date <= dates[index - 1])) {
        ctx.addIssue({
          code: "custom",
          message: "Versions must be in ascending date order.",
          path: ["versions"],
        });
      }

      if (!data.versions.at(-1)?.current) {
        ctx.addIssue({
          code: "custom",
          message: "The current version must be last.",
          path: ["versions"],
        });
      }

      data.versions.forEach((item, index) => {
        if (index > 0 && !item.thenNow) {
          ctx.addIssue({
            code: "custom",
            message: `Version ${item.id} needs a Then/Now pair.`,
            path: ["versions", index, "thenNow"],
          });
        }
      });
    }),
});

const essayVersions = defineCollection({
  loader: glob({ pattern: "*/rev-*.md", base: "./src/content/essays" }),
});

const talks = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/talks" }),
  schema: z
    .object({
      title: z.string(),
      event: z.string(),
      year: z.number().int(),
      type: z.string(),
      featured: z.boolean().default(false),
      description: z.string(),
      video_url: z.url().optional(),
      slides_url: z.url().optional(),
      overview_url: z.url().optional(),
    })
    .strict(),
});

export const collections = { essays, essayVersions, talks };
