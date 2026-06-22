import type { APIRoute } from 'astro';
import { site } from '../site.config';
import { absoluteUrl } from '../utils/paths';
import { getBlogPosts, postSlug, type Post } from '../utils/posts';

/**
 * Raw Markdown view of each article at /<slug>.md.
 * LLM/answer engines can fetch clean source (regenerated frontmatter + body)
 * with a canonical pointer back to the HTML page. Linked from /llms.txt.
 */
export async function getStaticPaths() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ params: { slug: postSlug(post) }, props: { post } }));
}

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Post };
  const canonical = absoluteUrl(`/${postSlug(post)}/`);

  const fm: string[] = ['---', `title: ${JSON.stringify(post.data.title)}`];
  if (post.data.summary) fm.push(`description: ${JSON.stringify(post.data.summary)}`);
  fm.push(`date: ${isoDate(post.data.date)}`);
  fm.push(`updated: ${isoDate(post.data.updatedAt ?? post.data.date)}`);
  if (post.data.category) fm.push(`category: ${post.data.category}`);
  if (post.data.tags.length) fm.push(`tags: ${JSON.stringify(post.data.tags)}`);
  fm.push(`canonical: ${canonical}`);
  fm.push(`source: ${JSON.stringify(site.title)}`);
  fm.push(`language: ${post.data.lang}`, '---', '');

  const body = (post.body ?? '').trimStart();
  return new Response(fm.join('\n') + body + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'all',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
