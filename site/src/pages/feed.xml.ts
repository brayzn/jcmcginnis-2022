import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { essayPath } from "../lib/essays";
import { displayText } from "../lib/text";

export async function GET(context: { site: URL }) {
  const essays = (await getCollection("essays"))
    .filter((essay) => essay.data.feed)
    .sort(
      (a, b) =>
        b.data.versions[0].date.getTime() - a.data.versions[0].date.getTime(),
    );

  return rss({
    title: "Jesse McGinnis",
    description:
      "I lead product engineering at GrowthLoop. I write about the structures that help people take responsibility—and the ones that quietly take it away.",
    site: context.site,
    items: essays.map((essay) => ({
      title: displayText(essay.data.title),
      description: displayText(essay.data.description),
      pubDate: essay.data.versions[0].date,
      link: essayPath(essay.id),
    })),
    customData: "<language>en-us</language>",
  });
}
