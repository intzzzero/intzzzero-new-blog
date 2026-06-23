---
title: "Astro vs Gatsby for Developer Blogs"
date: 2026-06-23
updatedAt: 2026-06-23
lang: en
category: dev
summary: "For a new developer blog in 2026, pick Astro. Gatsby still works but is in maintenance mode. Here is the honest comparison from someone who migrated 139 posts."
tags: ["astro", "gatsby", "static-sites", "ssg"]
contentType: vs
intent: commercial-informational
primaryKeyword: "astro vs gatsby"
tested: true
priceCheckedAt: 2026-06-23
faq:
  - q: "Is Gatsby dead in 2026?"
    a: "No, but it is in maintenance mode. Netlify acquired Gatsby in 2023 and laid off most of the core team. The framework is technically maintained — React 19 and Node.js 24 became officially supported in January 2026, and v5.x still ships — but no new features are planned and much of the plugin ecosystem is unmaintained. 'Maintained' is not the same as 'actively developed.'"
  - q: "How hard is it to migrate a Gatsby blog to Astro?"
    a: "Your Markdown content moves over almost untouched. The real work is rebuilding everything around it: the GraphQL data layer becomes a typed content collection, gatsby-node createPages becomes file-based routing, and any source/transformer plugins you relied on become remark/rehype plugins you may have to write yourself. For my 139-post blog it was a weekend-plus, and almost all of that time went into the Markdown pipeline, not the content."
  - q: "Can I still use React with Astro?"
    a: "Yes, through the official React integration. The difference is that React components become opt-in islands: nothing ships JavaScript to the browser unless you explicitly hydrate it. Gatsby ships a React runtime to every page by default; Astro ships zero by default and lets you add interactivity where you actually need it."
  - q: "Is Astro actually faster than Gatsby?"
    a: "For a content site, yes, on the two axes that matter for a blog. A clean build of this blog (139 posts, 169 pages) finishes in roughly two seconds wall-clock on my machine, and every page ships zero JavaScript by default. Gatsby rebuilds a GraphQL data layer and ships a React runtime, so both build time and page weight are heavier for the same content."
---

## Quick Verdict

For a new developer blog in 2026, pick **Astro**. Gatsby still works and is technically maintained, but it has been in maintenance mode under Netlify since 2023, with an aging plugin ecosystem and no new features planned. There is no longer a scenario where Gatsby is the better choice for a content site you are starting today. Choose Gatsby only if you already run one and the migration time is not worth it. I migrated this blog — 139 posts — from Gatsby to Astro, so the comparison below is from the receipts: build speed, the data layer, the plugin story, and what the move actually cost.

## Comparison Table

| Criteria | Astro | Gatsby |
|---|---|---|
| Project status (2026) | Active, v6.x, frequent releases | Maintenance mode (Netlify), v5.x |
| Data layer | Content collections + Zod schema, direct imports | GraphQL data layer |
| Client JavaScript | Zero by default (islands) | React runtime shipped per page |
| Build (this blog, 169 pages) | ~2s wall-clock, clean | Heavier: GraphQL + webpack |
| Learning curve | Lower — HTML-like `.astro`, plain imports | Higher — GraphQL, `gatsby-node` APIs |
| UI frameworks | Optional: React, Vue, Svelte, Solid as islands | React only |
| Plugin ecosystem | Smaller, current integrations | Large but largely unmaintained |
| Best for | New blogs, docs, marketing, content sites | Existing Gatsby sites you won't migrate |

## Choose Astro If...

- You are starting a new blog, docs site, or content-driven site in 2026.
- You want zero client-side JavaScript by default and fast page loads without tuning.
- You prefer type-safe content with a schema over writing GraphQL queries.
- You want the option to drop in React, Vue, Svelte, or Solid components as islands — or none at all.
- You care that the framework you build on is under active development.

## Choose Gatsby If...

- You already run a Gatsby site that works, and the migration cost is not justified right now.
- Your workflow is deep in the React plus GraphQL data-layer model and a specific source plugin (for a CMS, say) still works for you.
- You depend on a Gatsby plugin that has no Astro equivalent and that you cannot easily reimplement.

If none of those apply, the default is Astro.

## Feature-by-Feature

### Data Layer: GraphQL vs Content Collections

This is the biggest day-to-day difference. Gatsby puts everything behind a GraphQL data layer. Your Markdown, your images, your config all become nodes you query, and you wire up pages in `gatsby-node.js` with `createPages`. It is powerful, and it is a lot of ceremony for a blog.

Astro uses content collections. I define the shape of a post once, in a typed schema, and Astro gives me autocomplete and build-time validation for every frontmatter field. Here is the actual schema this blog runs on:

```ts
// src/content.config.ts
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['ko', 'en']).default('ko'),
    category: z.enum(CATEGORY_SLUGS).optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    // ...
  }),
});
```

If I typo a category or forget a required field, the build fails with a clear error instead of rendering a broken page. There is no query layer to learn — I import the collection and map over it like a plain array.

### Client-Side JavaScript and Performance

Gatsby is a React site generator. Even a static blog post ships the React runtime and hydrates on load, because that is the model.

Astro ships zero JavaScript by default. Pages render to HTML at build time, and interactivity is opt-in through islands. This blog uses no UI framework at all — the components are plain `.astro` files (a post card, a table of contents, an ad slot), and the rendered pages carry no framework runtime. For a blog, where most pages are text and code, that is the right default: readers get HTML, not a hydration bill.

### Build Speed and Dev Experience

Numbers from this blog, measured on my machine: a clean Astro build of 139 posts producing 169 pages completes in about two seconds wall-clock — the page build step itself is roughly one second — before the Pagefind search index step runs. Cold dev-server startup is effectively instant.

Gatsby's build does more for the same content: it stands up the GraphQL layer and runs a webpack pipeline, so both cold builds and `gatsby develop` startup are noticeably heavier. I did not keep an apples-to-apples Gatsby benchmark after the migration, so I will not invent a number — but the daily friction of waiting on the data layer was a real part of why I moved.

### Plugin Ecosystem vs Integrations

Gatsby's plugin ecosystem used to be its single biggest advantage. In 2026 it is a liability. Many popular plugins have been unmaintained for years, and every Node.js upgrade tends to surface a new round of dependency breakage that nobody is racing to fix.

Astro has fewer plugins, but it leans on the standard remark/rehype Markdown ecosystem, which is shared across the whole JavaScript world and actively maintained. When I needed math rendering, wiki-style links, and Mermaid diagrams, I added remark/rehype plugins — some off the shelf, some I wrote — into a normal Markdown pipeline. That is more upfront work than dropping in a Gatsby plugin, but the pieces are standard and they do not rot in the same way.

### Markdown, MDX, and Authoring

Both handle Markdown and MDX well, and this is where your content actually transfers. My post files barely changed: frontmatter plus body, same as before. What changed was everything that processes those files. The lesson: in a migration, the content is portable; the pipeline is not.

### Project Health (the 2026 Reality)

Netlify acquired Gatsby in 2023 and laid off most of the core team. Gatsby then entered maintenance mode: React 19 and Node.js 24 support did land in January 2026, so it is not abandoned, but no new features are planned. Astro, by contrast, shipped a major version (6.x) with an active release cadence — a content layer, an islands architecture that keeps improving, and ongoing build-pipeline work. For a foundation you will build years of writing on, momentum matters.

## Real-World Workflow: Migrating This Blog

Here is what the migration actually looked like, honestly.

**What moved for free.** The 139 Markdown files. Frontmatter and body came across with minor edits. Content is the portable part.

**What I had to rebuild.**

```text
Gatsby                              →  Astro
------------------------------------------------------------
gatsby-node.js (createPages)        →  file-based routing ([...slug].astro)
GraphQL data layer                  →  content collections + Zod schema
gatsby-transformer-remark plugins   →  custom remark/rehype pipeline (src/plugins/)
gatsby-plugin-feed                  →  RSS + Atom endpoints (rss.xml.ts, atom.xml.ts)
gatsby search plugin                →  Pagefind (static, runs after build)
gatsby-plugin-* for SEO/sitemap     →  @astrojs/sitemap + custom JSON-LD/llms.txt
```

The painful part was the Markdown pipeline. The Gatsby plugins I had relied on for math, anchored headings, and link handling had no drop-in Astro equivalents, so I wrote a set of small remark/rehype plugins to replace them. Math, for example, now renders to MathML at build time instead of pulling in a client-side library — which fits the zero-JS goal nicely, but it was work.

**What got easier afterward.** No GraphQL layer to think about. Frontmatter is typed, so mistakes fail the build instead of shipping. The build is a couple of seconds. Pages ship no JavaScript unless I ask. Adding a feature now means editing an `.astro` file or a Markdown plugin, not learning a framework-specific data API.

**The honest cost.** A weekend-plus, and nearly all of it went into reimplementing the pipeline, not moving content. If your Gatsby blog uses only common, well-supported transforms, your migration will be shorter than mine. If it leans on niche plugins, budget for rewriting them.

## Pricing and Cost Considerations

Both Astro and Gatsby are free, open-source frameworks, so "price" here means the costs that actually show up: build minutes, hosting, and maintenance.

- **Build cost.** Astro's fast builds mean cheap CI minutes; this blog builds in seconds. Gatsby builds grow with content and the GraphQL layer, so on a large site you pay more CI time per deploy.
- **Hosting.** Both deploy as static output to Vercel, Netlify, or Cloudflare Pages, all of which have free tiers that comfortably cover a personal blog. No difference here.
- **Maintenance cost.** This is where Gatsby is quietly expensive in 2026. The risk is not a monthly bill — it is the engineering time you will spend when a Node.js upgrade breaks an unmaintained plugin and you have to fix or replace it yourself.

(Framework status and version facts verified 2026-06-23.)

## Final Recommendation

**Default: Astro, for any new developer blog.** It is faster to build, ships less to the browser, is easier to reason about without a query layer, and is the one of the two that is still actively developed.

**The exception:** an existing, working Gatsby blog where the migration time genuinely is not worth it. Keep it running — but plan an eventual move, because the ecosystem risk only grows. Migrating later, after another year of plugin rot, will not be easier than migrating now.

## FAQ

**Q. Is Gatsby dead in 2026?**

A. No, but it is in maintenance mode. Netlify acquired Gatsby in 2023 and laid off most of the core team. The framework is technically maintained — React 19 and Node.js 24 became officially supported in January 2026, and v5.x still ships — but no new features are planned and much of the plugin ecosystem is unmaintained. "Maintained" is not the same as "actively developed."

**Q. How hard is it to migrate a Gatsby blog to Astro?**

A. Your Markdown content moves over almost untouched. The real work is rebuilding everything around it: the GraphQL data layer becomes a typed content collection, `gatsby-node` createPages becomes file-based routing, and any source/transformer plugins you relied on become remark/rehype plugins you may have to write yourself. For my 139-post blog it was a weekend-plus, and almost all of that time went into the Markdown pipeline, not the content.

**Q. Can I still use React with Astro?**

A. Yes, through the official React integration. The difference is that React components become opt-in islands: nothing ships JavaScript to the browser unless you explicitly hydrate it. Gatsby ships a React runtime to every page by default; Astro ships zero by default and lets you add interactivity where you actually need it.

**Q. Is Astro actually faster than Gatsby?**

A. For a content site, yes, on the two axes that matter for a blog. A clean build of this blog (139 posts, 169 pages) finishes in roughly two seconds wall-clock on my machine, and every page ships zero JavaScript by default. Gatsby rebuilds a GraphQL data layer and ships a React runtime, so both build time and page weight are heavier for the same content.

## Related Articles

- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [More posts tagged static sites](/tags/static-sites/)
- [Other posts in the dev category](/categories/dev/)

_Last updated: 2026-06-23._
