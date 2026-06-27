---
title: "How to Add Google AdSense to an Astro Static Site"
date: 2026-06-27
updatedAt: 2026-06-27
lang: en
category: dev
summary: "Add Google AdSense to an Astro static site: pass approval, ship ads.txt, gate the script behind a config flag, build a reusable ad slot, and fix the CSP that blocks ads."
tags: ["adsense", "astro", "static-sites", "blog-monetization"]
intent: commercial-informational
primaryKeyword: "add adsense to astro"
faq:
  - q: "Can a static site run AdSense without a server?"
    a: "Yes. AdSense is client-side JavaScript. The ad script and each ad unit run in the browser, so it works on any static host—Netlify, Vercel, Cloudflare Pages, GitHub Pages. Astro ships zero JavaScript by default, so the AdSense snippet is usually the only third-party script on the page. You do need one server-side capability: serving an /ads.txt file at the domain root, which every static host supports through a public/ directory."
  - q: "How many posts do I need before applying for AdSense?"
    a: "There is no official hard number, but Google reviews for 'sufficient, original content,' and in practice new sites get approved more reliably with roughly 20 to 30 substantial posts (800+ words each) plus Privacy Policy, About, and Contact pages. A handful of thin posts is the most common rejection reason. Quality and the essential pages matter more than hitting an exact count."
  - q: "Why are my ads blank after I was approved?"
    a: "Three usual causes on a static site. First, your Content Security Policy is blocking the ad scripts or the ad iframe—AdSense needs both script-src for pagead2.googlesyndication.com and frame-src for googleads.g.doubleclick.net and tpc.googlesyndication.com. Second, ads.txt is missing or wrong at the domain root. Third, brand-new accounts often show blanks for hours to a few days while Google warms up serving. Check the CSP first; it is the silent killer."
  - q: "Auto ads or manual ad units for a developer blog?"
    a: "Manual, or a manual-dominant hybrid. Auto ads are one snippet and let Google place ads anywhere, but on a code-heavy blog they tend to inject ads between code blocks and shift the layout, which hurts readability and Core Web Vitals. Manual ad units let you reserve space and keep ads out of the reading flow. Start manual, and only enable auto ads later if you want Google to fill secondary positions."
  - q: "Does AdSense hurt my Core Web Vitals?"
    a: "It can, mostly through layout shift (CLS) and main-thread work from the ad script. Reserve a fixed height for each ad container so the ad does not push content down when it loads, load the AdSense script with async, and keep the number of units modest. On an Astro site where the rest of the page ships almost no JavaScript, a couple of reserved, lazy ad slots are manageable."
---

## Quick Answer

To add Google AdSense to an Astro static site: (1) get **approved** first—you need real content and Privacy Policy, About, and Contact pages live before Google will say yes; (2) put an **`ads.txt`** file in `public/` so it serves at your domain root; (3) load the AdSense script in your layout `<head>`, ideally **behind a config flag** so you can turn ads on and off in one place; (4) build **one reusable ad-slot component** and place units manually so they stay out of your code blocks; and (5) fix your **Content Security Policy**—this is the step that silently breaks ads, because AdSense needs both `script-src` and `frame-src` entries. The rest of this guide is the actual code for each step, based on how this blog is wired.

## Who This Guide Is For

- Developers running a blog or docs site on **Astro** (or any static host) who want AdSense without a CMS plugin doing it for them
- Solo developers and indie hackers who already have an audience and want the lowest-effort monetization that does not require a backend
- Anyone who got approved but is staring at **blank ad slots** and cannot figure out why

If you are deciding which static site generator to use in the first place, I compared the options in [Astro vs Gatsby for Developer Blogs](/astro-vs-gatsby-for-developer-blogs/). This guide assumes you have already picked Astro and shipped some posts.

## Before You Touch Code: Get Approved

AdSense is the rare integration where the hard part happens before you write a line of code. Google has to approve the site, and a static Astro blog has no special advantage in that review—the content does the work.

What the 2026 review actually checks for:

- **Sufficient original content.** No fixed count is published, but new sites clear review far more reliably with roughly 20–30 substantial posts. Thin or auto-generated filler is the most common rejection.
- **Essential pages, linked in the nav or footer:** a **Privacy Policy** that explicitly mentions cookies and third-party ad vendors, plus **About** and **Contact**.
- **HTTPS** with a valid certificate (every modern static host gives you this for free).
- A submitted **XML sitemap** and a sane **`robots.txt`**.
- **`ads.txt`** at the domain root—now treated as a standard requirement, not an afterthought.

Astro generates the sitemap, `robots.txt`, and canonical tags for you if you use the standard integrations, so on the technical side you are mostly there. The content and the legal pages are what gate approval.

## The Setup

Here is the file layout this adds to a typical Astro project:

```text
my-astro-blog/
├── public/
│   └── ads.txt                 # served at https://yoursite.com/ads.txt
├── src/
│   ├── site.config.ts          # one place to flip ads on/off
│   ├── layouts/
│   │   └── BaseLayout.astro     # loads the AdSense script in <head>
│   └── components/
│       └── AdsenseSlot.astro    # reusable ad unit
└── netlify.toml                 # CSP that allows AdSense (host-specific)
```

### Step 1: Add ads.txt

Anything in Astro's `public/` directory is copied verbatim to the build output, so a file at `public/ads.txt` ends up at `https://yoursite.com/ads.txt`. That is exactly where AdSense looks for it.

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `pub-XXXXXXXXXXXXXXXX` with your own publisher ID. The trailing `f08c47fec0942fa0` is Google's certification ID and is the same for every AdSense publisher. Skip this file and AdSense will eventually flash an "Earnings at risk" warning in your dashboard.

### Step 2: Gate everything behind a config flag

Do not sprinkle your publisher ID across templates. Put it in one config object with an on/off switch, so enabling or disabling ads is a one-line change.

```ts
// src/site.config.ts
export const site = {
  baseUrl: 'https://yoursite.com',
  // ...
  adsense: {
    enabled: false,                 // flip to true after approval + CSP
    client: 'ca-pub-XXXXXXXXXXXXXXXX',
  },
} as const;
```

The `enabled: false` default matters more than it looks. It means you can commit the entire AdSense integration—script, slots, CSP—and ship it dark. Nothing renders until you flip one boolean. That keeps half-finished ad plumbing out of production and gives you an instant kill switch if something looks wrong.

### Step 3: Load the script conditionally in your layout

The AdSense library goes in `<head>`, but only when ads are enabled. In your `BaseLayout.astro`:

```astro
---
import { site } from '../site.config';
---
<head>
  <!-- ...the rest of your head... -->
  {site.adsense.enabled && (
    <script
      is:inline
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsense.client}`}
      crossorigin="anonymous"
    ></script>
  )}
</head>
```

`is:inline` tells Astro to leave the tag exactly as written instead of trying to bundle it, and `async` keeps the third-party script off your critical rendering path.

### Step 4: Build one reusable ad slot

Instead of pasting AdSense's `<ins>` snippet into every template, wrap it in a single component. This one also renders a labelled placeholder during local development, so you can see where ads will land without loading real ads:

```astro
---
// src/components/AdsenseSlot.astro
import { site } from '../site.config';

interface Props {
  slot: string;
  format?: string;
  className?: string;
}

const { slot, format = 'auto', className = '' } = Astro.props;
const { enabled, client } = site.adsense;
const showPlaceholder = !enabled && import.meta.env.DEV;
---

{enabled ? (
  <div class={`ad-slot ${className}`.trim()}>
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    ></ins>
    <script is:inline>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
) : showPlaceholder ? (
  <div class={`ad-slot ad-slot--placeholder ${className}`.trim()} aria-hidden="true">
    Ad slot · {slot}
  </div>
) : null}
```

Now placing an ad anywhere is one line, and you create the `slot` ID in the AdSense dashboard under **Ads → By ad unit**:

```astro
<AdsenseSlot slot="1234567890" />
```

### Step 5: Place units without wrecking the reading experience

For a developer blog, **manual placement beats auto ads**. Auto ads are a single snippet that lets Google drop ads wherever it likes, which on a code-heavy page means ads wedged between code blocks and a layout that jumps as they load. Manual units let you reserve the space and keep ads out of the flow.

A restrained layout that does not bury the content:

- One unit after the **first H2**, once the reader is committed
- One unit **mid-article**, at a natural section break
- One unit **before the FAQ / related links**, never inside a code block

Reserve a fixed height for each `.ad-slot` container in CSS so the ad does not shove text down when it arrives—that is the difference between a calm page and a bad CLS score.

### Step 6: Fix the Content Security Policy (the step that breaks everyone)

This is where most "I got approved but ads are blank" stories end. If you send a Content Security Policy header—and you should—it has to allow both the AdSense **script** and the ad **iframe**. People remember `script-src` and forget `frame-src`, so the script loads, requests an ad, and then the ad silently fails to render inside its blocked iframe.

On Netlify, that policy lives in `netlify.toml`. The AdSense-relevant directives:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com; img-src 'self' data: https:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; object-src 'none'"
```

The three hosts that matter:

| Directive | Host | Why |
|---|---|---|
| `script-src` | `pagead2.googlesyndication.com` | loads `adsbygoogle.js` |
| `frame-src` | `googleads.g.doubleclick.net` | the rendered ad iframe |
| `frame-src` | `tpc.googlesyndication.com` | ad creatives / safeframe |

On Vercel use `vercel.json` headers, on Cloudflare Pages use `_headers`—same three hosts, different file. After approval, flip `adsense.enabled` to `true`, redeploy, and the slots fill.

## A Real Project Note

On this blog, the integration above is fully wired: the `AdsenseSlot` component exists, the config flag is in place, `public/ads.txt` is served, and the CSP in `netlify.toml` already lists all three AdSense hosts. The only thing set to `false` is `adsense.enabled`.

That is deliberate, and it is the honest version of this guide: I built the entire pipeline *first* and left it dark, so turning ads on is a one-line commit and turning them off again is just as fast. I am not going to quote you an RPM I have not earned. What I can tell you is that doing the plumbing behind a single flag—rather than pasting snippets into templates under deadline—is the part I would not skip. The day you do flip it on, you want the change to be boring.

If you are building the blog itself with an AI agent, the same "one source of truth, one switch" instinct shows up everywhere; I wrote about that workflow in [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/) and [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/).

## Common Mistakes

- **Applying with thin content.** A few short posts is the top rejection reason. Build the library before you apply.
- **Forgetting `ads.txt`.** It is easy to skip because nothing breaks immediately—then "Earnings at risk" appears and serving gets throttled.
- **CSP blocks the iframe.** Adding `script-src` but not `frame-src` gives you blank slots and no error most people notice.
- **Auto ads on a code-heavy blog.** Ads land between code blocks and shift the layout. Go manual.
- **No reserved height.** Ad containers with no fixed size cause layout shift and tank your CLS.
- **Publisher ID pasted everywhere.** When you want to disable ads—for a redesign, an audit, or a policy scare—you are now hunting through templates instead of flipping one flag.

## Checklist

- [ ] 20–30+ substantial posts published
- [ ] Privacy Policy (mentions cookies + third-party ad vendors), About, Contact live and linked
- [ ] HTTPS, sitemap, and `robots.txt` in place
- [ ] `public/ads.txt` with your real `pub-` ID
- [ ] Publisher ID and an `enabled` flag in one config file
- [ ] AdSense script loaded in `<head>`, conditional on the flag, `async`
- [ ] One reusable `AdsenseSlot` component with a dev placeholder
- [ ] Manual units placed outside code blocks, with reserved height
- [ ] CSP allows `pagead2.googlesyndication.com` (script) **and** `googleads.g.doubleclick.net` + `tpc.googlesyndication.com` (frame)
- [ ] Approved → flip `enabled: true` → redeploy → confirm slots fill

## When Not to Use This Approach

AdSense is not always the right call:

- **Low traffic.** Below a few thousand monthly visits, AdSense pays in cents. Your time is better spent on content or a more direct offer.
- **Conversion-focused pages.** On a product, app, or lead-gen page, ads compete with the action you actually want and usually lose you more than they earn.
- **Pre-launch sites.** If you do not have the content and legal pages yet, you will be rejected; come back later.
- **Better-fit monetization.** For a developer audience, affiliate links to tools you genuinely use, a paid template, or your own product often out-earn display ads per visitor. AdSense is the floor, not the ceiling.

If your review process for AI-written code or content needs tightening before you scale up posting, I keep a separate [AI Code Review Checklist for Solo Developers](/ai-code-review-checklist-for-solo-developers/).

## Related Articles

- [Astro vs Gatsby for Developer Blogs](/astro-vs-gatsby-for-developer-blogs/) — picking the static site generator under all of this
- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/) — the build workflow for the blog itself
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/) — single-source-of-truth thinking applied to content
- [AI Code Review Checklist for Solo Developers](/ai-code-review-checklist-for-solo-developers/) — keeping quality up as you publish more

---

*Sources: [AdSense Program policies](https://support.google.com/adsense/answer/48182), [Eligibility requirements for AdSense](https://support.google.com/adsense/answer/9724). Approval requirements verified June 2026; AdSense policies change, so confirm current rules in the official docs before you apply.*

*Last updated: June 27, 2026.*
