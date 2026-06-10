import { defineCollection, z } from 'astro:content';

// /blog content collection. Drop a Markdown file into src/content/blog/ with
// the frontmatter described below and it lands at /blog/<slug>/ + appears in
// /blog/rss.xml on the next build.
//
// The blog is deliberately not in the top nav until the first post exists —
// empty blog reads as abandoned. Once src/content/blog/ has a published
// (non-draft) entry, add a `/blog` link to src/components/Nav.astro.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
