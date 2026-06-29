/** Site configuration — edit this file to customize your blog. */
export const site = {
  /** Production URL (no trailing slash). */
  baseUrl: 'https://intzzzero.dev',
  /** GitHub Pages subpath, e.g. "/repo-name". Leave empty for root deploy. */
  repoSubpath: '',
  title: 'Between Negative and Positive',
  description:
    "intzzzero's developer blog — practical notes on AI-assisted coding, lightweight SaaS stacks, JavaScript, React, and building and shipping software as a solo developer.",
  author: 'intzzzero',
  /** UI language: "zh-CN" | "en" | "ko" */
  language: 'en' as 'zh-CN' | 'en' | 'ko',
  maxPostsOnIndex: 12,
  /** Tag pages with fewer than this many posts are noindexed and dropped from the sitemap. */
  minPostsForIndex: 2,
  /**
   * A category "opens" only once it has at least this many published posts.
   * Keep at 1 so every published post's own category hub stays visible.
   */
  minPostsForCategory: 1,
  copyright: {
    // Personal blog: disable the per-post CC license notice.
    enable: false,
    type: 'CC_BY_NC_SA_4_0' as const,
    customText: '',
    showLicenseIcon: true,
    showStandardFormat: true,
    additionalNote: '',
  },
  /**
   * Google AdSense. The CSP in netlify.toml allows the ad scripts and
   * /public/ads.txt is in place, so the loader (see BaseLayout.astro) is on.
   */
  adsense: {
    enabled: true,
    client: 'ca-pub-9941902100091939',
  },
  /**
   * Google Analytics 4. Loads only in production builds (not `npm run dev`).
   */
  analytics: {
    enabled: true,
    measurementId: 'G-EN3K5NX048',
  },
} as const;

export type SiteConfig = typeof site;
