/**
 * Category taxonomy for intzzzero blog.
 * `slug` must match the CATEGORY_SLUGS enum in src/content.config.ts.
 * Slugs are normalized (lowercase, kebab-case) from the original Gatsby
 * `category` values (e.g. "ComputerScience" -> "computer-science").
 */
export interface Category {
  slug: string;
  name: string;
  /** Short description shown on hub pages and listings (used for SEO/GEO). */
  description: string;
  /** Lower number = higher priority in nav/listings. */
  priority: number;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'javascript',
    name: 'JavaScript',
    description:
      'Notes and hard-won lessons from working with the JavaScript language, its runtime, and its ecosystem.',
    priority: 1,
  },
  {
    slug: 'react',
    name: 'React',
    description: 'Things learned and organized while building front-end UIs with React.',
    priority: 2,
  },
  {
    slug: 'computer-science',
    name: 'Computer Science',
    description: 'Revisiting CS fundamentals like data structures, algorithms, and operating systems.',
    priority: 3,
  },
  {
    slug: 'think',
    name: 'Thoughts',
    description: 'Thoughts that came up as a developer, and as a person.',
    priority: 4,
  },
  {
    slug: 'book',
    name: 'Reading',
    description: "Impressions of books I've read and the lines I underlined.",
    priority: 5,
  },
  {
    slug: 'ai',
    name: 'AI',
    description: 'Following artificial intelligence, LLMs, and the daily flood of AI news.',
    priority: 6,
  },
  {
    slug: 'etc',
    name: 'Etc',
    description: "Odds and ends that don't fit any other category.",
    priority: 7,
  },
  {
    slug: 'node',
    name: 'Node.js',
    description: 'Notes on the Node.js runtime and backend development.',
    priority: 8,
  },
  {
    slug: 'database',
    name: 'Database',
    description: 'Notes on database design, queries, and the trade-offs in between.',
    priority: 9,
  },
  {
    slug: 'work',
    name: 'Work',
    description: 'Things I ran into and learned on the job.',
    priority: 10,
  },
  {
    slug: 'network',
    name: 'Network',
    description: 'Notes on how networks and communication actually work.',
    priority: 11,
  },
  {
    slug: 'dev',
    name: 'Dev',
    description: 'Tools, environments, and miscellany across software development.',
    priority: 12,
  },
  {
    slug: 'css',
    name: 'CSS',
    description: 'Notes on CSS, styling, and layout.',
    priority: 13,
  },
  {
    slug: 'html',
    name: 'HTML',
    description: 'Notes on HTML, markup, and web standards.',
    priority: 14,
  },
  {
    slug: 'python',
    name: 'Python',
    description: 'Notes on the Python language and its uses.',
    priority: 15,
  },
  {
    slug: 'nestjs',
    name: 'NestJS',
    description: 'Notes from building backends with the NestJS framework.',
    priority: 16,
  },
];

const BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string | undefined): Category | undefined {
  return slug ? BY_SLUG.get(slug) : undefined;
}

export function categoryName(slug: string | undefined): string {
  return getCategory(slug)?.name ?? '';
}

/** Categories ordered by priority. */
export function sortedCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.priority - b.priority);
}
