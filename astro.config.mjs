// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = "https://mouchsiadis-solutions.com";

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "always",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  vite: {
    build: {
      // Pixel art is tiny but reused across cards, rows and case files: keep it
      // as cacheable files instead of data: URIs repeated in every page.
      assetsInlineLimit: (file) => (file.includes("/assets/art/") ? false : undefined),
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page !== `${site}/`,
    }),
  ],
});
