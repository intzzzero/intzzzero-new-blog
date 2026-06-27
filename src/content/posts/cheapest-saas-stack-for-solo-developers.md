---
title: "The Cheapest SaaS Stack for Solo Developers"
date: 2026-06-28
updatedAt: 2026-06-28
lang: en
category: dev
summary: "A solo SaaS can launch for the price of a domain. The cheapest stack that still scales: free hosting, Supabase, Resend, and Stripe, with real cost numbers."
tags: ["solo-saas", "saas-stack", "supabase", "stripe", "indie-hackers"]
intent: commercial-informational
primaryKeyword: "cheapest saas stack"
priceCheckedAt: 2026-06-28
faq:
  - q: "How much does it really cost to run a small SaaS per month?"
    a: "Before you have paying users, close to nothing: roughly the price of a domain, about $10/year, because hosting, database, auth, and transactional email all have usable free tiers. Once you have real users and want backups plus no cold-start pausing, the first recurring bill is usually Supabase Pro at $25/month, landing most early SaaS in the $25-45/month range before payment fees."
  - q: "Is a free tier actually enough to launch a real product?"
    a: "Yes, to launch and validate. The two limits that bite first are Supabase pausing free projects after 7 days of inactivity (fine for a side project, bad for real signups) and Vercel's Hobby plan being non-commercial only. Host on Cloudflare Pages or Netlify if you want to stay free while charging money, and move Supabase to Pro the moment real users depend on uptime."
  - q: "Stripe or a Merchant of Record like Lemon Squeezy or Paddle?"
    a: "Stripe is cheaper on paper at 2.9% + 30¢ per charge, but you are responsible for collecting and remitting sales tax and VAT yourself. Lemon Squeezy and Paddle charge about 5% + 50¢ and act as Merchant of Record, handling global tax for you. If you sell to a handful of domestic customers, Stripe wins. If you sell digital products worldwide and do not want to deal with VAT, the Merchant of Record premium is usually worth it."
  - q: "Can I host a commercial app on a free tier without breaking the rules?"
    a: "On Cloudflare Pages and Netlify, yes. Vercel's Hobby plan is explicitly limited to non-commercial, personal use, so the moment a project serves paying customers you are required to move to Pro at $20/month per seat. Read the host's terms before you put a paid product on a free plan."
---

## Quick Answer

A one-person SaaS can launch for the price of a domain. Host the front end on **Cloudflare Pages** (free, and unlike Vercel's Hobby plan it is fine for commercial use), put your database and auth on **Supabase** (free until you have real users, then \$25/month), send transactional email through **Resend** (3,000 emails/month free), take payments with **Stripe** (no monthly fee, 2.9% + 30¢ per charge), and register the domain at **Cloudflare** at cost (~\$10/year). That is roughly **\$0/month before revenue** and **\$25-45/month once you have paying customers** — most of the recurring cost is one Supabase upgrade, not ten subscriptions.

The trap is not picking expensive tools. It is picking tools whose free tier quietly disqualifies you the moment you charge money, or whose bill detonates at the first traffic spike. Below is the stack layer by layer, what each free tier actually gives you, and where it breaks.

## Who This Guide Is For

- Solo founders and indie hackers shipping a first paid product
- Full-stack developers who can wire services together and want the lowest fixed cost
- Anyone tired of "free tier" guides that ignore the commercial-use clauses and the cold-start gotchas

If you are running a funded team that needs SLAs and SSO, this is not your stack. This is for the person who wants to validate an idea without a monthly bill they have to justify.

## The Stack at a Glance

| Layer | Pick | Free tier | First paid step |
|---|---|---|---|
| Hosting / front end | Cloudflare Pages | Unlimited static bandwidth, 500 builds/mo, commercial OK | Usually never, for a static front end |
| Serverless functions | Cloudflare Workers | 100,000 requests/day | Workers Paid \$5/mo |
| Database + auth | Supabase | 500 MB DB, 50K monthly active users, paused after 7 days idle | Pro \$25/mo (no pausing, backups) |
| Transactional email | Resend | 3,000 emails/mo, 100/day | Pro from \$20/mo |
| Payments | Stripe | No monthly fee | 2.9% + 30¢ per charge |
| Domain | Cloudflare Registrar | — | ~\$10.44/yr at cost (.com) |
| Analytics | Cloudflare Web Analytics or GA4 | Free | Free |

All numbers verified in June 2026 (see `priceCheckedAt`). Pricing on these services changes; check the linked pages before you commit.

### Layer 1: Hosting — Cloudflare Pages, not Vercel

For a static or mostly-static front end (Astro, Next static export, SvelteKit, plain Vite), **Cloudflare Pages** is the cheapest host that does not punish you for succeeding. Static asset bandwidth and requests are unlimited on the free plan, you get 500 builds per month, and there is no clause forbidding commercial use.

That last point matters more than people realize. **Vercel's Hobby plan is non-commercial, personal use only.** The moment your project generates revenue or serves paying customers, Vercel's terms require you to move to **Pro at \$20/month per seat**. Vercel is a great product, but "free" and "I am charging money" cannot coexist on Hobby. Netlify's free plan (100 GB bandwidth, 300 build minutes, or 300 monthly credits on accounts created after September 4, 2025) does allow commercial use and is a fine alternative.

So the honest ranking for a commercial solo SaaS front end:

1. **Cloudflare Pages** — free, commercial-OK, hardest to outgrow
2. **Netlify** — free, commercial-OK, simpler DX, easier to hit limits
3. **Vercel** — best DX, but budget \$20/month from day one if you monetize

If you need server-side rendering or API routes, **Cloudflare Workers** gives you 100,000 requests per day free, after which the Workers Paid plan is \$5/month. For most pre-product-market-fit apps, 100K requests/day is more headroom than you will use.

### Layer 2: Database and Auth — Supabase

**Supabase** bundles a Postgres database, authentication, file storage, and edge functions, which collapses three or four line items into one. The free tier gives you 500 MB of database storage, **50,000 monthly active users** for auth, 1 GB of file storage, and 500,000 edge function invocations across 2 active projects.

The catch that surprises people: **free Supabase projects are paused after 7 days of inactivity**, and the free plan has no backups. For a side project you poke at on weekends, the pausing is harmless. For a product with real signups, a cold-started database that needs a manual resume is a bad first impression. That single limitation — not storage, not user count — is usually what pushes a real SaaS to **Pro at \$25/month**, which removes pausing, adds daily backups, raises you to 8 GB of database and 100,000 monthly active users, and includes \$10/month of compute credit.

Firebase's Spark plan is the obvious alternative (free, 50,000 Firestore reads and 20,000 writes per day), but you pay for it in lock-in: a proprietary NoSQL model and the Blaze plan's pay-as-you-go billing, which can produce surprising invoices under load. If you want portable SQL, prefer Supabase.

### Layer 3: Transactional Email — Resend

Every SaaS needs to send email: confirmations, password resets, receipts. **Resend** has a developer-friendly API and a free tier of **3,000 emails/month** (capped at 100/day). For an early product that covers signups and resets comfortably. The Pro plan starts around \$20/month and removes the daily cap.

Do not skip the domain authentication step. Set up SPF, DKIM, and DMARC records before your first send, or your "free" email lands in spam and costs you signups. That setup is free; forgetting it is expensive.

### Layer 4: Payments — Stripe vs a Merchant of Record

**Stripe** has no monthly fee — you pay **2.9% + 30¢ per successful charge** — which makes it the default for a pre-revenue product. But Stripe is not your Merchant of Record: you are legally responsible for collecting and remitting sales tax and VAT in every jurisdiction you sell to. For a few domestic customers that is a non-issue. For a digital product sold worldwide, it becomes real work.

That is the case for a **Merchant of Record** like **Lemon Squeezy** or **Paddle**. They charge more — roughly **5% + 50¢** — but become the legal seller and handle global tax calculation, collection, and remittance for you.

| | Stripe | Lemon Squeezy / Paddle |
|---|---|---|
| Headline fee | 2.9% + 30¢ | ~5% + 50¢ |
| Monthly fee | None | None |
| Sales tax / VAT | You handle it | Handled for you (Merchant of Record) |
| Best for | Domestic, few customers | Global digital products |

Rule of thumb: start on Stripe to validate. Move to a Merchant of Record when international tax admin starts eating your weekends. (Note: Stripe acquired Lemon Squeezy in 2024, but Lemon Squeezy still runs as an independent product with its own Merchant of Record setup.)

### Layer 5: Domain — buy at cost

Register the domain at the **Cloudflare Registrar**, which sells at cost with no markup and no renewal price hike — about **\$10.44/year for a .com**. Namecheap advertises a cheaper first year (~\$6.48) but renews higher (~\$14.58), so over any real timeframe at-cost wins and you avoid the renewal-shock pattern. This is the one bill you genuinely cannot avoid, and it is the entire fixed cost of a pre-revenue SaaS.

## Two Realistic Cost Scenarios

### Scenario A — Pre-revenue (validating the idea)

| Layer | Service | Monthly |
|---|---|---|
| Hosting | Cloudflare Pages | \$0 |
| DB + auth | Supabase Free | \$0 |
| Email | Resend Free | \$0 |
| Payments | Stripe (no charges yet) | \$0 |
| Domain | Cloudflare (~\$10.44/yr) | ~\$0.87 |
| **Total** | | **~\$1/month** |

You are paying for a domain and nothing else. That is the point: there is no financial reason not to ship.

### Scenario B — First paying customers

| Layer | Service | Monthly |
|---|---|---|
| Hosting | Cloudflare Pages | \$0 |
| DB + auth | Supabase Pro | \$25 |
| Email | Resend Free or Pro | \$0-20 |
| Payments | Stripe fees (2.9% + 30¢) | scales with revenue |
| Domain | Cloudflare | ~\$0.87 |
| **Fixed total** | | **~\$26-46/month** |

The jump from Scenario A to B is almost entirely one decision — upgrading Supabase to remove pausing and get backups. Everything else stays free far longer than you would expect.

## A Real Project Note

This blog runs on the cheap end of exactly this stack. It is an **Astro static site deployed on Netlify's free tier**, with the domain registered at cost. Static output, zero server, no database — so the hosting bill is genuinely \$0/month and has been since launch. The only line item is the domain.

A content site is not a full SaaS, so I will be precise about what that proves and what it does not. It proves the base layer: a real, indexed, monetized site can sit on a free static host indefinitely without a hosting bill. What it does not exercise is the database, auth, and payments layers — those are the parts you bolt on when the product needs them, and they are where the free tiers actually start to matter.

The most useful thing I can pass on is which limit you hit first, because it is rarely the one you plan for. It is not storage or user count. It is operational: Supabase pausing an idle free project, or realizing the host you picked for its developer experience does not allow the commercial use you are about to do. Pick the layers that stay out of your way while you are charging money, and the bill takes care of itself.

## Common Mistakes

- **Putting a paid product on Vercel Hobby.** It is non-commercial by the terms. Use Cloudflare Pages or Netlify, or budget for Vercel Pro.
- **Relying on a paused free database.** Supabase free projects sleep after 7 days idle. Do not let a real signup flow depend on a cold start.
- **Skipping email authentication.** No SPF/DKIM/DMARC means your transactional email lands in spam, which silently kills activation.
- **Choosing Stripe and ignoring tax.** Stripe is not your Merchant of Record. If you sell globally, you owe VAT — plan for it or use a Merchant of Record.
- **Stacking ten subscriptions.** Every "free" tool with a \$9/month upgrade adds up. Prefer one service that covers several layers (Supabase) over five single-purpose ones.
- **Optimizing the bill before the product.** A \$25 difference is noise compared to whether anyone pays you. Pick sane defaults and ship.

## Checklist

- [ ] Front end on a host that allows commercial use (Cloudflare Pages or Netlify)
- [ ] Confirmed your host's free-tier terms cover charging money
- [ ] Database with portable SQL (Supabase), free tier sized to your launch
- [ ] Plan for Supabase pausing — upgrade to Pro before real users depend on uptime
- [ ] Transactional email wired up with SPF, DKIM, and DMARC
- [ ] Payment provider chosen with tax responsibility understood (Stripe vs Merchant of Record)
- [ ] Domain registered at cost, renewal price checked
- [ ] Free analytics in place (Cloudflare Web Analytics or GA4)

## When Not to Use This Approach

- **You need a backend that holds long-lived connections or heavy background jobs.** Free serverless tiers and edge runtimes are a poor fit; rent a small VPS instead.
- **You are funded and need SLAs, SSO, or compliance (HIPAA, SOC 2).** Free tiers explicitly exclude these. Buy the paid plan from day one.
- **Your product is compute-heavy** (video processing, large model inference). Per-request free tiers will not save you; price the compute directly.
- **You already have revenue and the cost is rounding error.** Optimizing a \$40 bill is not worth your time once the product works. Spend the hours on customers.

## FAQ

**How much does it really cost to run a small SaaS per month?**
Before paying users, close to nothing — roughly the price of a domain (~\$10/year), because hosting, database, auth, and email all have usable free tiers. Once you want backups and no cold-start pausing, the first recurring bill is usually Supabase Pro at \$25/month, putting most early SaaS in the \$25-45/month range before payment fees.

**Is a free tier actually enough to launch a real product?**
Yes, to launch and validate. The limits that bite first are Supabase pausing free projects after 7 days of inactivity and Vercel's Hobby plan being non-commercial. Host on Cloudflare Pages or Netlify to stay free while charging, and move Supabase to Pro once uptime matters.

**Stripe or a Merchant of Record like Lemon Squeezy or Paddle?**
Stripe is cheaper on paper (2.9% + 30¢) but you handle sales tax and VAT yourself. Lemon Squeezy and Paddle charge ~5% + 50¢ and handle global tax as Merchant of Record. Domestic and small: Stripe. Global digital products: the Merchant of Record premium usually pays for itself in saved admin.

**Can I host a commercial app on a free tier without breaking the rules?**
On Cloudflare Pages and Netlify, yes. Vercel's Hobby plan is non-commercial only, so a paying product must move to Pro (\$20/month per seat). Always read the host's terms before putting a paid product on a free plan.

## Related Articles

- [Astro vs Gatsby for Developer Blogs](/astro-vs-gatsby-for-developer-blogs/) — picking the static front end that sits on the free host above
- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/) — the build workflow for the product that runs on this stack
- [How to Add Google AdSense to an Astro Static Site](/how-to-add-adsense-to-an-astro-static-site/) — monetizing the content side of the same setup
- [AI Code Review Checklist for Solo Developers](/ai-code-review-checklist-for-solo-developers/) — keeping quality up while shipping solo

---

*Sources: [Cloudflare Workers & Pages pricing](https://www.cloudflare.com/plans/developer-platform/), [Vercel pricing](https://vercel.com/pricing), [Netlify pricing](https://www.netlify.com/pricing/), [Supabase pricing](https://supabase.com/pricing), [Resend pricing](https://resend.com/pricing), [Stripe vs Paddle vs Lemon Squeezy fees (2026)](https://www.globalsolo.global/blog/stripe-vs-paddle-vs-lemon-squeezy-2026), [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/). Pricing verified June 28, 2026.*

*Last updated: June 28, 2026.*
