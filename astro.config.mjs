// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { aonoteMarkdown } from './src/integrations/aonote-markdown.ts';
import { site } from './src/site.config.ts';
import { tagToSlug } from './src/utils/slug.ts';

// Thin tag pages (fewer than minPostsForIndex posts) are noindexed at runtime
// (src/pages/tags/[tag].astro), so exclude them from the sitemap too — this keeps
// the submitted sitemap free of noindexed URLs (avoids the GSC "submitted URL marked
// noindex" warning). Count tags by parsing post frontmatter at build time.
const POSTS_DIR = fileURLToPath(new URL('./src/content/posts', import.meta.url));
/** @type {Record<string, number>} */
const tagCounts = {};
for (const entry of readdirSync(POSTS_DIR, { recursive: true })) {
  const name = String(entry);
  if (!name.endsWith('.md') && !name.endsWith('.mdx')) continue;
  const raw = readFileSync(`${POSTS_DIR}/${name}`, 'utf-8');
  const front = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!front) continue;
  if (/^(draft|hidden):\s*true\s*$/m.test(front[1])) continue;
  const tagsLine = front[1].match(/^tags:\s*\[(.*)\]\s*$/m);
  if (!tagsLine) continue;
  for (const raw2 of tagsLine[1].split(',')) {
    const tag = raw2.trim().replace(/^["']|["']$/g, '');
    if (tag) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  }
}
const thinTagPaths = new Set(
  Object.entries(tagCounts)
    .filter(([, n]) => n < site.minPostsForIndex)
    .map(([tag]) => `/tags/${tagToSlug(tag)}/`),
);

/** @param {string} page */
function sitemapFilter(page) {
  // Raw markdown endpoints and the llms.txt index are not canonical HTML pages.
  if (page.endsWith('.md') || page.endsWith('.md/')) return false;
  const pathname = decodeURIComponent(new URL(page).pathname);
  if (pathname === '/llms.txt' || pathname.startsWith('/404')) return false;
  return !thinTagPaths.has(pathname);
}

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: site.baseUrl,
  base: site.repoSubpath || undefined,
  trailingSlash: 'always',
  integrations: [
    aonoteMarkdown(),
    sitemap({
      filter: sitemapFilter,
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
