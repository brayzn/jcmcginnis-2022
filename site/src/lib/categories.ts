import type { Essay } from "./essays";

export type Category = {
  name: string;
  slug: string;
  essays: Essay[];
};

export const categorySlug = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const categories = (essays: Essay[]): Category[] => {
  const bySlug = new Map<string, Category>();

  for (const essay of essays) {
    for (const name of essay.data.categories) {
      const slug = categorySlug(name);
      if (!slug) continue;

      const category = bySlug.get(slug) ?? { name, slug, essays: [] };
      category.essays.push(essay);
      bySlug.set(slug, category);
    }
  }

  return [...bySlug.values()]
    .filter((category) => category.essays.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const categoryPath = (slug: string) => `/category/${slug}/`;
