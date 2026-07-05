// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = "https://mouchsiadis-solutions.com";

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page !== `${site}/`,
    }),
  ],
});
