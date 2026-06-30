---
title: "Vercel vs Netlify vs Cloudflare Pages for Solo Developers"
date: 2026-06-30
updatedAt: 2026-06-30
lang: en
category: dev
summary: "Cloudflare wins on cost with free unlimited bandwidth, Vercel on Next.js and DX, Netlify on flat predictable pricing. Here is how a solo developer should pick."
tags: ["vercel", "netlify", "cloudflare-pages", "static-sites", "solo-saas"]
contentType: vs
intent: commercial-informational
primaryKeyword: "vercel vs netlify vs cloudflare pages"
priceCheckedAt: 2026-06-30
faq:
  - q: "Which is cheapest for a high-traffic static or content site?"
    a: "Cloudflare, and it is not close. Static-asset bandwidth on Cloudflare is free and unlimited on both the free and paid plans, while Vercel meters bandwidth at about $0.15/GB over its included allowance and Netlify charges roughly $0.13/GB through its credit system. If your site is mostly static pages and your bill scales with traffic, Cloudflare is the one platform where a viral day does not become a bandwidth invoice. The trade-off is a rougher developer experience: more wrangler, more configuration, and the in-progress move from Pages to Workers."
  - q: "Can I run an AdSense blog on Vercel's free Hobby plan?"
    a: "Technically no. Vercel's fair-use policy restricts the Hobby plan to non-commercial, personal use, and it explicitly counts ads — including Google AdSense — and any payment processing as commercial use. Donations are exempt. Enforcement is inconsistent, but the moment you put ads on a Hobby-hosted site you are out of policy and should move to Pro ($20/month) or to a host that allows commercial use on its free tier, such as Cloudflare or Netlify."
  - q: "Is Cloudflare Pages being discontinued?"
    a: "No, but it is in a maintenance posture. Cloudflare is converging Pages into Workers, and as of early 2026 Workers with static assets has feature parity with Pages for static hosting, SSR, and custom domains. Existing Pages projects keep working and there is no forced-migration deadline, but all new feature investment is going to Workers, and Cloudflare recommends starting new projects on Workers static assets rather than Pages. For a new site in 2026, start on Workers."
  - q: "Which platform has the best Next.js support?"
    a: "Vercel, by a wide margin — it builds Next.js, so deployment is zero-config and every feature is supported on day one. Netlify has a solid official Next.js adapter. Cloudflare's older next-on-pages is deprecated; the current path is the OpenNext adapter (@opennextjs/cloudflare) deploying to Workers, which works but is more hands-on. If Next.js is the center of your stack and DX matters more than bandwidth cost, Vercel is the default."
  - q: "How do I avoid a surprise hosting bill?"
    a: "Each platform fails differently. Vercel meters usage, so set a spend cap — every team gets a default $200/month on-demand budget, and you can turn on auto-pause at 100% for a real hard cap. Netlify's free plan is already a hard cap: hit 300 credits and your sites pause rather than bill you. Cloudflare does not charge for bandwidth at all, so the static-hosting bill-shock risk is the lowest of the three; watch the daily request limit on the free Workers tier instead."
---

## Quick Verdict

For a solo developer in 2026, pick by what your project actually costs you. Choose **Cloudflare** (Workers with static assets) if your site is content-heavy or traffic-heavy — bandwidth is free and unlimited, which no one else offers. Choose **Vercel** if you build with Next.js or want the smoothest push-to-deploy experience, but know that the free Hobby plan bans commercial use (ads included), so a monetized site belongs on Pro. Choose **Netlify** if you want a flat, predictable bill and small-team seats. There is no single winner; there is a winner per use case, and this guide maps them.

## Comparison Table

| Criteria | Vercel | Netlify | Cloudflare (Workers/Pages) |
|---|---|---|---|
| Free tier | 100 GB transfer, 1 dev seat | 300 credits/mo (~15 GB), hard cap | Static assets free + unlimited; 100k Worker req/day |
| Commercial use on free | Not allowed (ads count) | Allowed | Allowed |
| Entry paid tier | Pro \$20/seat/mo (+\$20 usage credit) | Personal \$9/mo; Pro \$20/mo flat | Workers Paid \$5/mo |
| Pricing model | Flat seat + heavy usage metering | Credit-based usage + flat sub | \$5 floor + usage; no egress charge |
| Bandwidth overage | ~\$0.15/GB (Pro: 1 TB included) | ~\$0.13/GB (20 credits/GB) | Free & unlimited |
| Builds | Per-CPU-minute; standard builds effectively unmetered | 15 credits per production deploy | 500 builds/mo free, 1 concurrent |
| Functions | Fluid Compute, edge + serverless | Functions/SSR, credit-metered | Workers (10 ms CPU free, daily reset) |
| Best for | Next.js apps, best DX | Small teams wanting a flat bill | Traffic-heavy or static content, lowest cost |
| Biggest risk | Bandwidth bill shock; Hobby commercial ban | Burning credits on frequent deploys | DX friction; Pages-to-Workers confusion |

(All figures verified 2026-06-30. Pricing on all three changed meaningfully in 2024–2026; see the pricing section for the details that moved.)

## Choose Cloudflare If...

- Your site is a blog, docs site, or any content-heavy static site where bandwidth is your main cost driver.
- You expect traffic spikes and do not want a viral day to turn into a bandwidth invoice.
- You want to monetize on the free tier — ads are fine, unlike Vercel Hobby.
- You are comfortable with a more hands-on setup (wrangler, bindings) in exchange for the lowest bill.

## Choose Vercel If...

- Next.js is the center of your stack and you want zero-config deploys and best-in-class support.
- Developer experience and preview-deploy polish matter more than squeezing the bill.
- You are willing to pay \$20/month for Pro the moment your site is commercial (which includes running ads).
- You will set a spend cap so usage-based metering cannot surprise you.

## Choose Netlify If...

- You want a flat, predictable subscription and, as of April 2026, unlimited team seats on Pro.
- You deploy relatively infrequently, so the per-deploy credit cost does not bite.
- You like the middle ground: better DX than raw Cloudflare, lower lock-in worry than Vercel's Next.js gravity.

If none of those clearly apply and your project is a static or content site, the default is Cloudflare on cost, or Vercel if you value DX over a few dollars.

## Feature-by-Feature

### Bandwidth and the Pricing Model (the part that decides it)

This is the single biggest difference, so start here.

**Cloudflare does not charge for bandwidth.** From its own docs: requests to static assets are free and unlimited, and there are no charges for data transfer (egress) or throughput. That holds on both the free and the \$5/month paid plans. For a content site, this changes the economics entirely — your hosting bill stops scaling with how popular you get.

**Vercel and Netlify both meter bandwidth.** Vercel includes 100 GB of "Fast Data Transfer" on the free Hobby plan and 1 TB on Pro, then bills around \$0.15/GB. Netlify's credit system charges 20 credits per GB, which works out to roughly \$0.13/GB. For a small blog these allowances are generous and you will likely never pay. The risk is asymmetric: one popular post or one scraper can push a metered host into overage, while on Cloudflare the same traffic costs nothing.

The pricing *models* also differ in how predictable they are:

- **Vercel** is a flat \$20/seat base plus heavy usage metering across about eight dimensions (transfer, edge requests, active CPU, provisioned memory, invocations, image optimization, and more). Flexible, but hard to predict.
- **Netlify** is credit-based: a flat subscription that comes with a credit allowance, and everything you do — bandwidth, deploys, compute — draws down credits at published rates.
- **Cloudflare** is a \$5 floor plus usage on requests and CPU time, with bandwidth carved out as free. Fewer axes, and the scary one (egress) is simply not billed.

### Builds

**Cloudflare** gives you 500 builds/month with one concurrent build on the free tier, a 20-minute timeout, and a 20,000-file limit per site. For a personal site that is plenty; a very large static site could bump the file cap.

**Netlify** no longer sells "build minutes." A production deploy now costs a flat 15 credits. That sounds small until you do the math: the free plan's 300 credits is about 20 production deploys, so a day of frequent pushes can exhaust your month. This is Netlify's most surprising trap for an active solo developer.

**Vercel** also dropped the old "build minutes included" number — that figure is stale, so do not trust 2023-era articles quoting it. Builds are billed per CPU-minute, but standard single-concurrency builds are effectively unmetered in normal use. Build speed is a strength, especially for Next.js, since it is the same company.

### Functions and Edge Compute

All three run serverless and edge functions, but with different flavors. Vercel's Fluid Compute and Active CPU billing (rolled out through 2025) charge only for CPU-active time and not I/O wait, which it says cuts cost sharply on I/O-bound and AI workloads. Netlify runs functions and SSR metered through the same credit system (10 credits per GB-hour). Cloudflare Workers give you 10 ms of CPU per invocation free with a daily-resetting request budget (100,000/day), then \$5/month unlocks 10M requests and 30 million CPU-ms.

For a static blog, none of this matters. For an app with a backend, Vercel's model is the most generous to bursty I/O, and Cloudflare's is the cheapest if your functions are short and CPU-light.

### Framework Support

Static Astro deploys trivially on all three. The differences show up with SSR and with Next.js:

- **Astro SSR** works everywhere via the official `@astrojs/cloudflare`, `@astrojs/netlify`, and `@astrojs/vercel` adapters.
- **Next.js** is native on **Vercel** — zero config, every feature. **Netlify** has a solid official adapter. On **Cloudflare**, the older `@cloudflare/next-on-pages` is deprecated; the current path is the OpenNext adapter (`@opennextjs/cloudflare`) deploying to Workers. It works, but it is the most setup of the three.

If your project is plain static content, framework support is a non-issue and you should optimize for cost and DX instead.

### The Cloudflare Pages-to-Workers Situation

Worth understanding before you start a new project. Cloudflare is converging Pages into Workers. As of early 2026, Workers with static assets reached feature parity with Pages for static hosting, SSR, and custom domains, and Cloudflare now recommends new projects start on **Workers static assets**, not Pages. Pages is not sunset — existing projects keep working with no deadline — but all new investment is going to Workers. The practical takeaway: do not build a brand-new site on Pages in 2026; use Workers static assets so you are on the path Cloudflare is actually developing.

## Real-World Workflow: What This Blog Runs On

This blog — the one you are reading — is a static Astro site deployed on **Vercel**. The setup is about as boring as hosting gets: push to the `master` branch on GitHub, Vercel builds (`astro build` plus a Pagefind index step) and deploys, and there is no adapter because the output is plain static HTML. Build is a couple of seconds, previews on pull requests are automatic, and for a long time the bill was zero. That zero-cost, zero-config experience is exactly why Vercel is the easy default.

Then I turned on Google AdSense — and walked straight into the honest trade-off I have to flag in this post. **Vercel's Hobby plan does not allow commercial use, and its fair-use policy explicitly names ads, including AdSense, as commercial.** A personal blog with ads is, by the letter of the policy, supposed to be on Pro at \$20/month. Enforcement is inconsistent and plenty of small sites run ads on Hobby without hearing anything, but the rule is real, and it is the kind of thing that is easy to miss until you have already monetized.

That single policy is what makes this a genuine three-way decision rather than "just use Vercel." For a monetized static site, your honest options are: pay Vercel \$20/month for Pro, or move to **Cloudflare** or **Netlify**, both of which allow commercial use on their free tiers. If the site is content-heavy, Cloudflare's free unlimited bandwidth makes it the strongest of those — you get commercial use *and* you stop paying for traffic. I had earlier carried a `netlify.toml` in this repo from an even older setup; the site now lives on Vercel, but the Cloudflare case for a monetized blog is the one I keep coming back to.

The lesson generalizes: the best host is not the one with the nicest dashboard, it is the one whose pricing model matches your project's actual cost shape. A side-project app with bursty traffic and a Next.js backend wants Vercel. A content site that might get popular wants Cloudflare. A small team that values a flat, predictable invoice wants Netlify Pro.

## Pricing and Cost Considerations

Real numbers, with the free-plan traps called out. (Verified 2026-06-30.)

- **Vercel.** Hobby is free: 100 GB transfer, 1 developer seat, no overage billing (you get paused, not charged) — but no commercial use. Pro is \$20/seat/month including a \$20 usage credit, then metered: 1 TB transfer included, then ~\$0.15/GB. **Trap:** the commercial-use ban on Hobby, and bill shock from per-GB overage on Pro if a project goes viral. Mitigation: every team has a default \$200/month on-demand budget with optional auto-pause at 100%.
- **Netlify.** Free is 300 credits/month as a hard cap — roughly 15 GB of bandwidth *or* about 20 production deploys, not both — and your sites pause when you hit it. Personal is \$9/month for 1,000 credits; Pro is \$20/month flat with unlimited team seats (since April 14, 2026) and 3,000 credits. **Trap:** deploys cost 15 credits each, so frequent pushing can drain the free tier fast. Note that Netlify *raised* bandwidth and compute credit rates in April 2026, so older cost estimates understate it.
- **Cloudflare.** Workers Free gives 100,000 requests/day and 10 ms CPU per invocation, with static-asset bandwidth free and unlimited and no storage charge. Workers Paid is \$5/month: 10M requests (then \$0.30/M) and 30M CPU-ms (then \$0.02/M CPU-ms). **Trap:** the free request limit resets daily, not monthly, so one heavy day can pause script execution — though static assets keep serving for free regardless.

A caveat on stale numbers: many articles still cite "100 GB free bandwidth and 300 build minutes" for Netlify and a fixed "build minutes" figure for Vercel. Both describe pre-2025 plans. The figures above are the current models. I could not confirm a standalone "Cloudflare Pages Pro" dollar price — Cloudflare now routes the developer platform through Workers Paid (\$5) — so I have deliberately not quoted one.

## Final Recommendation

**Default for a static or content site: Cloudflare**, because free unlimited bandwidth means your hosting cost does not scale with success, and commercial use is allowed on the free tier. Start on Workers static assets, not Pages. Accept that the DX is rougher than the alternatives.

**Default for a Next.js app or for the smoothest experience: Vercel**, and budget \$20/month for Pro the moment the site is commercial — which, per their policy, includes running ads. Set the spend cap so metering can never surprise you.

**The middle ground: Netlify Pro**, if you want one flat \$20/month bill with unlimited seats and you do not deploy dozens of times a day.

For this blog specifically — a static, monetized content site — the honest pick is Cloudflare on cost, with Vercel staying attractive only because the migration friction is not yet worth it to me. That is the same calculus you should run: match the pricing model to your project, not to the marketing.

## FAQ

**Q. Which is cheapest for a high-traffic static or content site?**

A. Cloudflare, and it is not close. Static-asset bandwidth on Cloudflare is free and unlimited on both the free and paid plans, while Vercel meters bandwidth at about \$0.15/GB over its included allowance and Netlify charges roughly \$0.13/GB through its credit system. If your site is mostly static pages and your bill scales with traffic, Cloudflare is the one platform where a viral day does not become a bandwidth invoice. The trade-off is a rougher developer experience: more wrangler, more configuration, and the in-progress move from Pages to Workers.

**Q. Can I run an AdSense blog on Vercel's free Hobby plan?**

A. Technically no. Vercel's fair-use policy restricts the Hobby plan to non-commercial, personal use, and it explicitly counts ads — including Google AdSense — and any payment processing as commercial use. Donations are exempt. Enforcement is inconsistent, but the moment you put ads on a Hobby-hosted site you are out of policy and should move to Pro (\$20/month) or to a host that allows commercial use on its free tier, such as Cloudflare or Netlify.

**Q. Is Cloudflare Pages being discontinued?**

A. No, but it is in a maintenance posture. Cloudflare is converging Pages into Workers, and as of early 2026 Workers with static assets has feature parity with Pages for static hosting, SSR, and custom domains. Existing Pages projects keep working and there is no forced-migration deadline, but all new feature investment is going to Workers, and Cloudflare recommends starting new projects on Workers static assets rather than Pages. For a new site in 2026, start on Workers.

**Q. Which platform has the best Next.js support?**

A. Vercel, by a wide margin — it builds Next.js, so deployment is zero-config and every feature is supported on day one. Netlify has a solid official Next.js adapter. Cloudflare's older next-on-pages is deprecated; the current path is the OpenNext adapter (`@opennextjs/cloudflare`) deploying to Workers, which works but is more hands-on. If Next.js is the center of your stack and DX matters more than bandwidth cost, Vercel is the default.

**Q. How do I avoid a surprise hosting bill?**

A. Each platform fails differently. Vercel meters usage, so set a spend cap — every team gets a default \$200/month on-demand budget, and you can turn on auto-pause at 100% for a real hard cap. Netlify's free plan is already a hard cap: hit 300 credits and your sites pause rather than bill you. Cloudflare does not charge for bandwidth at all, so the static-hosting bill-shock risk is the lowest of the three; watch the daily request limit on the free Workers tier instead.

## Related Articles

- [Astro vs Gatsby for Developer Blogs](/astro-vs-gatsby-for-developer-blogs/)
- [How to Add Google AdSense to an Astro Static Site](/how-to-add-adsense-to-an-astro-static-site/)
- [The Cheapest SaaS Stack for Solo Developers](/cheapest-saas-stack-for-solo-developers/)
- [More posts tagged static sites](/tags/static-sites/)
- [Other posts in the dev category](/categories/dev/)

_Last updated: 2026-06-30. Pricing and platform facts verified 2026-06-30; hosting plans change often, so confirm current rates before you commit._
