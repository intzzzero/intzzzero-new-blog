import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Category slugs used across the site. Keep in sync with src/data/categories.ts. */
const CATEGORY_SLUGS = [
  'javascript',
  'react',
  'computer-science',
  'think',
  'book',
  'ai',
  'etc',
  'node',
  'database',
  'work',
  'network',
  'dev',
  'css',
  'html',
  'python',
  'nestjs',
] as const;

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    hidden: z.boolean().default(false),
    draft: z.boolean().default(false),

    /** 글 언어. 기본 'ko' → 기존 글은 변경 없이 한국어로 유지. 영어 글만 'en'. */
    lang: z.enum(['ko', 'en']).default('ko'),

    /** Editorial / SEO metadata (see plan §15.1). All optional so simple posts still validate. */
    category: z.enum(CATEGORY_SLUGS).optional(),
    contentType: z
      .enum(['best-tools', 'vs', 'how-to-choose', 'template', 'checklist', 'beginner-guide', 'news'])
      .optional(),
    intent: z
      .enum(['informational', 'commercial-informational', 'transactional', 'navigational'])
      .optional(),
    audience: z.array(z.string()).default([]),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    /** Whether the author personally tested the tools in this article. */
    tested: z.boolean().default(false),
    /** Date pricing/plans were last verified (YYYY-MM-DD). */
    priceCheckedAt: z.coerce.date().optional(),
    /** Date the article body was last reviewed/updated. Falls back to `date`. */
    updatedAt: z.coerce.date().optional(),
    /** Optional structured FAQ → emits FAQPage JSON-LD (for AI/GEO). Mirror the body FAQ. */
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { posts, pages };
