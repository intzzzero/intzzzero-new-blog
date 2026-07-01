---
title: "How to Get Your Blog Cited by AI (GEO)"
date: 2026-07-01
updatedAt: 2026-07-01
lang: en
category: dev
summary: "Get your blog cited by AI: server-render your content, add JSON-LD, write answer-first, and don't block the AI search crawlers. llms.txt barely matters."
tags: ["geo", "llms-txt", "static-sites", "seo", "developer-tools"]
intent: informational
primaryKeyword: "get your blog cited by ai"
faq:
  - q: "Does llms.txt help me get cited by ChatGPT or ranked by Google?"
    a: "Not much today. Google stated in June 2026 that llms.txt does nothing for Search, and studies of hundreds of thousands of sites show almost no AI crawlers read it. It is cheap to ship and genuinely useful for developer tools like Cursor and Claude Code that ingest documentation, but it is not where GEO wins come from. The wins come from server-rendered HTML, structured data, and not blocking the search crawlers."
  - q: "Is GEO actually different from SEO?"
    a: "Mostly it is the same work. The technical foundation is identical: crawlable, server-rendered, semantically clean, structured with JSON-LD. GEO adds a few things on top: answer-first phrasing so a model can lift a clean sentence, FAQ and how-to structured data, freshness signals, and making sure you did not accidentally block the AI search crawlers that would cite you."
  - q: "Should I block AI crawlers to protect my content?"
    a: "Separate the two jobs. Training crawlers like GPTBot, Google-Extended, and CCBot can be blocked without hurting your search visibility. But the search and retrieval crawlers, like OAI-SearchBot, PerplexityBot, and Anthropic's retrieval bots, are the ones that cite you in answers. Block those and you disappear from AI results. A blanket block is the most common way people accidentally opt out of citations."
  - q: "Do I need a big or popular site to get cited by AI?"
    a: "No. Specific, first-hand, well-structured pages get cited over generic lookalikes regardless of domain size. Original data, real cost numbers, and genuine experience are the strongest citation magnets, because the model has a reason to prefer you over a dozen pages that all say the same thing."
---

## Quick Answer

Getting your blog cited by AI answer engines is mostly the same work as good technical SEO, plus a few small additions. Concretely: don't block the AI search crawlers in `robots.txt` (this is the number one mistake); serve your content as server-rendered HTML, not JavaScript-hydrated blanks; answer the question in the first sentence of each section so a model can lift a clean, self-contained paragraph; add JSON-LD structured data, especially `BlogPosting` and `FAQPage`; expose a clean text source of each page; and keep pages fresh with real, specific facts. You can also ship an `llms.txt` file, but be honest with yourself about what it does: as of mid-2026, almost no AI engine reads it. It is cheap insurance, not a growth lever.

## Who This Guide Is For

- Solo developers and bloggers who want ChatGPT, Perplexity, and Google's AI answers to link to them
- People running a static site (Astro, Hugo, Eleventy, Next.js static export) who control their own HTML and headers
- Anyone who has read a dozen "just add llms.txt" posts and wants to know what actually moves the needle

I run this blog on an Astro static site, so every example below is something I actually ship. If you are on a hosted platform where you cannot edit `robots.txt` or add structured data, some of this will be out of reach, and I will flag that at the end.

## GEO vs SEO: What Is Actually Different

Generative Engine Optimization (GEO) is the practice of structuring content so AI answer engines cite it. The honest version: it is about 80% classic technical SEO. If your page is crawlable, server-rendered, and semantically clean, you have already done most of the work, because AI engines mostly discover pages the same way search engines do.

The 20% that is GEO-specific:

| Concern | SEO | GEO |
|---|---|---|
| Goal | Rank in a list of blue links | Get quoted inside a generated answer |
| Unit | The page | A liftable paragraph or table |
| Structure | Headings, internal links | Answer-first sentences, FAQ/how-to schema |
| Crawlers | Googlebot, Bingbot | + OAI-SearchBot, PerplexityBot, Claude's bots |
| Freshness | Helps | Helps more; citations decay in weeks |

So GEO is not a new discipline you bolt on. It is a handful of habits layered onto a site that is already technically sound.

## The Setup, Step by Step

### Step 1: Don't Block the Crawlers That Would Cite You

This is the highest-leverage thing on the page, and it is a subtraction, not an addition. AI companies run more than one crawler, and they do different jobs:

- **Training crawlers** collect data to train models: `GPTBot` (OpenAI), `Google-Extended`, `CCBot` (Common Crawl). Blocking these does not affect your search ranking or your ability to be cited.
- **Search and retrieval crawlers** fetch pages to answer a live user question and cite the source: `OAI-SearchBot` and `ChatGPT-User` (OpenAI), `PerplexityBot`, and Anthropic's retrieval bots. These are the ones that put a link to you in the answer.

The common mistake is a blanket `Disallow` aimed at "AI" that also kills the retrieval bots. Blocking `GPTBot` does not block `OAI-SearchBot`; they are separate. If you want citations, allow the retrieval crawlers even if you choose to block the training ones. Check your `robots.txt` and your CDN or WAF rules, because some hosts block AI user-agents by default.

### Step 2: Server-Render Your Content

An AI crawler that fetches your page and gets an empty `<div id="root">` has nothing to cite. Retrieval bots are not guaranteed to run your JavaScript. If your content only appears after client-side hydration, you are invisible to a chunk of them.

Static site generators win here for free: the HTML is fully rendered at build time. This is one of the quiet reasons a static blog is a good GEO foundation, and it is part of why I moved this site to Astro (see the [Astro vs Gatsby comparison](/astro-vs-gatsby-for-developer-blogs/)). If you are on a JavaScript-heavy stack, make sure the article body is in the server-rendered HTML, not injected on the client.

### Step 3: Answer the Question in the First Sentence

Write so a model can lift one clean, self-contained paragraph and drop it into an answer. That means the first sentence of a section states the conclusion, and the supporting detail follows. Definition-first and answer-first phrasing is one of the stronger correlates of getting quoted.

Two concrete rules I follow:

- Open each section with the answer, not a windup. "Generative Engine Optimization is..." beats "In today's rapidly evolving landscape..."
- Keep the answer in a normal paragraph. Don't bury it inside a blockquote, callout, or accordion that a scraper might skip.

### Step 4: Add Structured Data (JSON-LD)

Structured data tells the engine what the page *is* in a machine-readable form. `FAQPage` and `HowTo` schema in particular show up repeatedly as predictive features for citation, because they hand the model pre-chunked question-and-answer pairs.

At minimum, emit `BlogPosting` on every article and `FAQPage` when the article has a FAQ. I generate a schema.org `@graph` that cross-links the nodes by `@id`, so `BlogPosting`, `BreadcrumbList`, and `FAQPage` all reference one `Organization` and `WebSite`. The FAQ in this article's frontmatter becomes `FAQPage` JSON-LD automatically at build time.

### Step 5: Expose a Clean Text Source (and, Optionally, llms.txt)

Give the engines a low-noise version of your content. On this site, appending `.md` to any post URL returns the raw Markdown, with regenerated frontmatter and a `canonical` pointer back to the HTML page. No nav, no ads, no layout, just the text.

You can also publish an `llms.txt` file: a plain-text index of your site that points at those raw sources. I ship one. But here is the honest part, and it is the whole reason this post exists: **`llms.txt` currently does almost nothing for AI citations.** More on that in the Real Project Note below. Ship it because it is cheap and because developer tools use it, not because ChatGPT reads it.

### Step 6: Be Specific, and Keep It Fresh

AI engines prefer pages with something the other results lack: a real number, a first-hand result, a dated benchmark. Generic advice loses to a page that says "I moved 139 posts and here is what broke." Original experience is the strongest citation magnet there is, and it happens to be the one thing a competitor cannot copy.

Freshness matters more for GEO than for SEO. Citations decay: a page that answered a query last month can quietly drop out as engines favor fresher sources. Set an `updatedAt`, and when you actually revise a page, move that date and refresh the facts rather than leaving them to rot.

## Example: What This Blog Actually Ships

None of the above is theoretical. Here is the real setup.

The `robots.txt` explicitly welcomes both search and retrieval bots instead of hoping a wildcard covers them:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /
# ...GPTBot, ChatGPT-User, Google-Extended, Applebot-Extended, and more

Sitemap: https://intzzzero.dev/sitemap-index.xml
# LLM-friendly content index (non-standard hint)
# LLM-Content: https://intzzzero.dev/llms.txt
```

Every post has a raw Markdown twin at `/<slug>.md`, generated with a canonical pointer so the clean source never competes with the HTML page for ranking:

```text
---
title: "How to Get Your Blog Cited by AI (GEO)"
description: "..."
date: 2026-07-01
canonical: https://intzzzero.dev/how-to-get-your-blog-cited-by-ai/
source: "intzzzero.dev"
language: en
---
(article body, no layout)
```

And `/llms.txt` is a single index that lists every post by category, each pointing at its `.md` source, with the RSS feed and sitemap linked at the top. The JSON-LD, the raw `.md` views, `llms.txt`, the sitemap, and the RSS and Atom feeds are all generated at build time, so writing a post is still just writing a Markdown file. If you want the hosting side of a setup like this, I wrote up the [cheapest way to run it](/vercel-vs-netlify-vs-cloudflare-pages/).

## A Real Project Note: The Truth About llms.txt

I ship `llms.txt`, and I still think you should. But I am not going to pretend it is doing the heavy lifting, because the 2026 data is brutal.

- Google stated plainly, and wrote it into its official documentation in June 2026, that you do not need special machine-readable files to appear in Search and that `llms.txt` neither helps nor harms your visibility. John Mueller compared it to the long-discredited keywords meta tag.
- An Ahrefs study of about 137,000 sites found that roughly 97% of `llms.txt` files never get read at all.
- Across a monitoring window of over 500 million AI bot visits, only a few hundred requests targeted `llms.txt` directly. It is a rounding error.
- No major provider (OpenAI, Anthropic, Google, Meta) has committed to using it as a signal in their production answer surfaces.

So where did my citations and AI referrals actually come from? Server-rendered pages the retrieval bots could read, structured data, answer-first writing, and specifically *not* blocking the search crawlers. The boring 80%.

Then why ship `llms.txt` at all? Two honest reasons. First, developer tools genuinely use it: Cursor, Claude Code, GitHub Copilot, Cline, and Aider all look for `/llms.txt` and `/llms-full.txt` when pointed at a documentation site, so it helps if anyone ingests your writing into a coding assistant. Second, it costs me nothing: it is auto-generated from posts I already have. Cheap insurance against a future where an engine does start reading it. Just don't confuse shipping it with doing GEO.

## Common Mistakes

- **Blanket-blocking "AI" in `robots.txt`.** You opt out of the retrieval crawlers that cite you while thinking you only blocked training.
- **Shipping `llms.txt` and calling it done.** It is the least impactful item on this list, not the first.
- **Content that only exists after hydration.** If the body is not in the server HTML, half the crawlers see nothing.
- **Burying the answer.** A section that opens with three sentences of preamble gives the model nothing clean to lift.
- **Writing generic filler.** "There are many factors to consider" is not citable. A real number is.
- **Letting facts and dates rot.** Stale pages lose citations even if they once ranked.

## Checklist

- [ ] Retrieval crawlers (`OAI-SearchBot`, `PerplexityBot`, Anthropic's bots) are allowed in `robots.txt`
- [ ] CDN/WAF is not silently blocking AI user-agents
- [ ] Article body is in the server-rendered HTML
- [ ] Each section opens with the answer, in a plain paragraph
- [ ] `BlogPosting` JSON-LD on every article; `FAQPage` where there is a FAQ
- [ ] A clean text source exists (raw Markdown or similar)
- [ ] `llms.txt` shipped, with realistic expectations
- [ ] Pages carry a real `updatedAt` and get refreshed, not abandoned
- [ ] At least one first-hand number, result, or example per page

## When This Won't Help

GEO cannot rescue thin content. If a page says nothing specific, no amount of schema will make an engine prefer it. It also will not overcome being uncrawlable: content behind a login, a paywall, or client-only rendering stays invisible. And if you are on a locked-down hosting platform where you cannot edit `robots.txt` or inject JSON-LD, you are limited to the writing habits (answer-first, specific, fresh) and little else. Finally, none of this is a guaranteed pipeline: AI engines change how they select and cite sources constantly, so treat every tactic here as "improves your odds," not "buys you a citation."

## FAQ

**Q. Does llms.txt help me get cited by ChatGPT or ranked by Google?**

A. Not much today. Google stated in June 2026 that `llms.txt` does nothing for Search, and studies of hundreds of thousands of sites show almost no AI crawlers read it. It is cheap to ship and genuinely useful for developer tools like Cursor and Claude Code that ingest documentation, but it is not where GEO wins come from. Those come from server-rendered HTML, structured data, and not blocking the search crawlers.

**Q. Is GEO actually different from SEO?**

A. Mostly it is the same work. The technical foundation is identical: crawlable, server-rendered, semantically clean, structured with JSON-LD. GEO adds answer-first phrasing so a model can lift a clean sentence, FAQ and how-to structured data, freshness signals, and making sure you did not accidentally block the AI search crawlers.

**Q. Should I block AI crawlers to protect my content?**

A. Separate the two jobs. Training crawlers like `GPTBot`, `Google-Extended`, and `CCBot` can be blocked without hurting search. But the search and retrieval crawlers, like `OAI-SearchBot`, `PerplexityBot`, and Anthropic's retrieval bots, are the ones that cite you. Block those and you disappear from AI answers.

**Q. Do I need a big or popular site to get cited by AI?**

A. No. Specific, first-hand, well-structured pages get cited over generic lookalikes regardless of domain size. Original data, real cost numbers, and genuine experience are the strongest citation magnets, because the model has a reason to prefer you over a dozen pages that all say the same thing.

## Related Articles

- [Astro vs Gatsby for Developer Blogs](/astro-vs-gatsby-for-developer-blogs/)
- [How to Structure a Project for AI Coding Tools](/how-to-structure-a-project-for-ai-coding-tools/)
- [Vercel vs Netlify vs Cloudflare Pages for Solo Developers](/vercel-vs-netlify-vs-cloudflare-pages/)
- [How to Add Google AdSense to an Astro Static Site](/how-to-add-adsense-to-an-astro-static-site/)

## Sources

- [Ahrefs — We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read](https://ahrefs.com/blog/llmstxt-study/)
- [Search Engine Land — Does llms.txt matter? We tracked 10 sites to find out](https://searchengineland.com/does-llms-txt-matter-467740)
- [Digital Applied — Google Says llms.txt Does Nothing for SEO Rankings](https://www.digitalapplied.com/blog/google-llms-txt-no-seo-value-lighthouse-audit-2026)
- [Search Engine Land — Mastering generative engine optimization in 2026](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)
- [No Hacks — The AI User-Agent Landscape in 2026](https://nohacks.co/blog/ai-user-agents-landscape-2026)
- [llmstxt.org — the llms.txt specification](https://llmstxt.org)

*Last updated: July 1, 2026.*
