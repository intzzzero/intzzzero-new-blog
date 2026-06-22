import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { absoluteUrl } from '../utils/paths';
import { getBlogPosts, getOpenCategories, postSlug } from '../utils/posts';

/**
 * /llms.txt — a plain-text index for LLMs / answer engines.
 * Lists every article with a pointer to its raw Markdown (.md) source so an AI
 * can ingest the whole corpus from one index. See https://llmstxt.org.
 */
export const GET: APIRoute = async () => {
  const posts = await getBlogPosts();
  const openCategories = getOpenCategories(posts);
  const fmtDate = (d: Date) => d.toISOString().slice(0, 10);

  const lines: string[] = [
    `# ${site.title}`,
    '',
    `> ${site.description}`,
    '',
    '## About',
    `- Site: ${absoluteUrl('/')}`,
    '- Language: English and Korean',
    `- Raw Markdown: append \`.md\` to any post URL for the source (e.g. ${absoluteUrl('/how-i-use-claude-code-to-build-small-web-apps.md')})`,
    `- RSS: ${absoluteUrl('/rss.xml')}`,
    `- Sitemap: ${absoluteUrl('/sitemap-index.xml')}`,
    '',
    '## Categories',
    ...openCategories.map((c) => `- ${c.name}: ${c.description}`),
    '',
    '## Posts',
  ];

  for (const cat of openCategories) {
    const inCat = posts.filter((p) => p.data.category === cat.slug);
    if (inCat.length === 0) continue;
    lines.push('', `### ${cat.name}`);
    for (const p of inCat) {
      const url = absoluteUrl(`/${postSlug(p)}.md`);
      const summary = p.data.summary ? `: ${p.data.summary}` : '';
      lines.push(`- [${p.data.title}](${url})${summary} (${fmtDate(p.data.date)})`);
    }
  }

  const uncategorized = posts.filter((p) => !p.data.category);
  if (uncategorized.length > 0) {
    lines.push('', '### Etc');
    for (const p of uncategorized) {
      const url = absoluteUrl(`/${postSlug(p)}.md`);
      const summary = p.data.summary ? `: ${p.data.summary}` : '';
      lines.push(`- [${p.data.title}](${url})${summary} (${fmtDate(p.data.date)})`);
    }
  }

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'all',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
