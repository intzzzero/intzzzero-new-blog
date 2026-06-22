/**
 * JSON-LD structured data builders (SEO + GEO / AI-citation).
 * Nodes cross-reference each other by stable @id, following the schema.org @graph pattern.
 */
import { site } from '../site.config';
import { absoluteUrl } from './paths';
import { postSlug, type Post } from './posts';
import { getCategory } from '../data/categories';

const SITE_URL = site.baseUrl.replace(/\/$/, '');

export const IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
} as const;

type Node = Record<string, unknown>;
type BreadcrumbItem = { name: string; url: string };

function organizationNode(): Node {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: site.title,
    url: `${SITE_URL}/`,
    description: site.description,
  };
}

function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    name: site.title,
    url: `${SITE_URL}/`,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': IDS.organization },
  };
}

function breadcrumbNode(items: BreadcrumbItem[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function faqPageNode(faq: { q: string; a: string }[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function graph(...nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Home page: Organization + WebSite. */
export function homeJsonLd() {
  return graph(organizationNode(), websiteNode());
}

/** Article page: BlogPosting + BreadcrumbList (+ FAQPage when `faq` is set). */
export function articleJsonLd(post: Post, canonicalUrl: string) {
  const created = post.data.date;
  const modified = post.data.updatedAt ?? post.data.date;
  const cat = getCategory(post.data.category);
  const catUrl = cat ? absoluteUrl(`/categories/${cat.slug}/`) : null;

  const blogPosting: Node = {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: post.data.title,
    description: post.data.summary ?? site.description,
    datePublished: created.toISOString(),
    dateModified: modified.toISOString(),
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: { '@id': IDS.organization },
    publisher: { '@id': IDS.organization },
    isPartOf: { '@id': IDS.website },
    inLanguage: post.data.lang,
    ...(post.data.tags.length ? { keywords: post.data.tags.join(', ') } : {}),
    ...(cat ? { articleSection: cat.name } : {}),
  };

  const homeLabel = post.data.lang === 'en' ? 'Home' : '홈';
  const crumbs: BreadcrumbItem[] = [{ name: homeLabel, url: `${SITE_URL}/` }];
  if (cat && catUrl) crumbs.push({ name: cat.name, url: catUrl });
  crumbs.push({ name: post.data.title, url: canonicalUrl });

  const nodes = [organizationNode(), websiteNode(), blogPosting, breadcrumbNode(crumbs)];
  if (post.data.faq?.length) nodes.push(faqPageNode(post.data.faq));
  return graph(...nodes);
}

/** Category hub: CollectionPage + BreadcrumbList listing member posts. */
export function categoryJsonLd(
  category: { name: string; description: string; slug: string },
  canonicalUrl: string,
  posts: Post[],
) {
  const collection: Node = {
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#collection`,
    name: `${category.name} — ${site.title}`,
    description: category.description,
    url: canonicalUrl,
    isPartOf: { '@id': IDS.website },
    inLanguage: site.language,
    hasPart: posts.map((p) => ({
      '@type': 'BlogPosting',
      url: absoluteUrl(`/${postSlug(p)}/`),
      name: p.data.title,
    })),
  };
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Categories', url: absoluteUrl('/categories/') },
    { name: category.name, url: canonicalUrl },
  ];
  return graph(organizationNode(), websiteNode(), collection, breadcrumbNode(crumbs));
}
