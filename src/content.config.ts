import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "./lib/i18n";

const blogCollection = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    language: z.enum(LOCALES),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
