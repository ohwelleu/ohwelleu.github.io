import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog posts live in `src/content/blog/<lang>/<slug>.md`.
 * The same slug in both language folders marks a translated pair.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
