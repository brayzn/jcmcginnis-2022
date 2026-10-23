import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkDirective from "remark-directive";
import remarkSmartypants from "remark-smartypants";
import remarkChanged from "./src/lib/remark-changed.mjs";
import { checkVersions, essayLastModified } from "./scripts/check-versions.mjs";

const lastModified = essayLastModified();

const checkVersionsIntegration = {
  name: "check-versions",
  hooks: {
    "astro:build:start": () => {
      checkVersions();
    },
  },
};

export default defineConfig({
  site: "https://jcmcginnis.com",
  output: "static",
  trailingSlash: "always",
  prerenderConflictBehavior: "error",
  integrations: [
    checkVersionsIntegration,
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.includes("/history/") && !path.endsWith("/404/");
      },
      serialize: (item) => {
        const match = /^\/blog\/([^/]+)\/$/.exec(new URL(item.url).pathname);
        if (match) {
          const lastmod = lastModified.get(match[1]);
          if (lastmod) item.lastmod = lastmod;
        }
        return item;
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkChanged, remarkSmartypants],
    }),
  },
});
