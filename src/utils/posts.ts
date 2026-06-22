import { getCollection, type CollectionEntry } from 'astro:content';
import { siteHref } from './paths';
import { tagToSlug } from './slug';
import { sortedCategories, type Category } from '../data/categories';
import { site } from '../site.config';

export type Post = CollectionEntry<'posts'>;

export function postSlug(post: Post): string {
  return post.id.replace(/\.mdx?$/, '');
}

/** True when the post was updated on a later day than it was first published. */
export function isUpdated(post: Post): boolean {
  const updated = post.data.updatedAt;
  return !!updated && updated.valueOf() > post.data.date.valueOf();
}

/**
 * The date a post should sort and display by: its update date when that is newer
 * than the publish date, otherwise the publish date.
 */
export function effectiveDate(post: Post): Date {
  return isUpdated(post) ? post.data.updatedAt! : post.data.date;
}

/** Published blog articles only (excludes draft/hidden), most-recently-updated first. */
export async function getBlogPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.hidden);
  return posts.sort((a, b) => effectiveDate(b).valueOf() - effectiveDate(a).valueOf());
}

/** @deprecated Use getBlogPosts */
export const getPublishedPosts = getBlogPosts;

export function formatDate(date: Date, locale: string): string {
  const loc = locale === 'zh-CN' ? 'zh-CN' : locale === 'ko' ? 'ko-KR' : 'en-US';
  return date.toLocaleDateString(loc, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Short date for archive list (MM-DD). */
export function formatArchiveDate(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}-${d}`;
}

export function postUrl(post: Post): string {
  return siteHref(`/${postSlug(post)}/`);
}

export function tagUrl(tag: string): string {
  return siteHref(`/tags/${tagToSlug(tag)}/`);
}

export function categoryUrl(slug: string): string {
  return siteHref(`/categories/${slug}/`);
}

/** Published posts in a given category, newest first. */
export function getPostsByCategory(posts: Post[], slug: string): Post[] {
  return posts.filter((p) => p.data.category === slug);
}

/**
 * Is a category "open"? True once it has at least `site.minPostsForCategory`
 * published posts. Drives whether its hub page is generated and whether it
 * shows in the categories index / llms.txt. See site.config.ts.
 */
export function isCategoryOpen(posts: Post[], slug: string): boolean {
  return getPostsByCategory(posts, slug).length >= site.minPostsForCategory;
}

/** Open categories (>= threshold posts), ordered by priority. */
export function getOpenCategories(posts: Post[]): Category[] {
  return sortedCategories().filter((c) => isCategoryOpen(posts, c.slug));
}

export function getAllTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function groupPostsByYear(posts: Post[]): Map<number, Post[]> {
  const map = new Map<number, Post[]>();
  for (const post of posts) {
    // Group by the effective (update-aware) year so revised posts surface under
    // the year they were last updated, matching the site-wide sort order.
    const year = effectiveDate(post).getFullYear();
    const list = map.get(year) ?? [];
    list.push(post);
    map.set(year, list);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

export function getAdjacentPosts(
  posts: Post[],
  current: Post,
): { prev: Post | null; next: Post | null } {
  const idx = posts.findIndex((p) => p.id === current.id);
  return {
    prev: idx > 0 ? posts[idx - 1]! : null,
    next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1]! : null,
  };
}
