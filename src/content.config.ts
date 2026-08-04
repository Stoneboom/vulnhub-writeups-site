import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writeUp = defineCollection({
  // Load Markdown and MDX files in the `src/content/write-ups/` directory.
  loader: glob({ base: './src/content/write-ups', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      os: z.enum(['Linux', 'Windows']),
      series: z.string().optional(),
      difficulty: z.string().optional(),
      // Transform string to Date object
      pubDate: z.preprocess((val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') {
        const m = val.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
        if (m) return new Date(m[3] + '-' + m[2] + '-' + m[1]);
        const iso = new Date(val);
        return isNaN(iso) ? val : iso;
      }
      return val;
    }, z.date()).optional(),
    updatedDate: z.preprocess((val) => {
      if (val instanceof Date) return val;
      if (typeof val === 'string') {
        const m = val.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
        if (m) return new Date(m[3] + '-' + m[2] + '-' + m[1]);
        const iso = new Date(val);
        return isNaN(iso) ? val : iso;
      }
      return val;
    }, z.date()).optional(),
      heroImage: z.string().optional(),
      description: z.string().optional(),
    }),
});

export const collections = { 'write-up': writeUp };
