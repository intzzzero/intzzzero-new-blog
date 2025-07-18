/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `INTZZZERO`,
    author: {
      name: `intzzzero`,
      summary: `who writes about various things`,
    },
    description: `intzzzero's new blog`,
    siteUrl: `https://intzzzero.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: `blog`,
        engine: `flexsearch`,
        engineOptions: {
          encode: "icase",
          tokenize: "forward",
          async: false,
        },
        query: `
          {
            allMarkdownRemark {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
                  update
                  category
                }
                excerpt
                rawMarkdownBody
              }
            }
          }
        `,
        ref: `id`,
        index: [`title`, `category`, `excerpt`, `rawMarkdownBody`],
        store: [`id`, `slug`, `title`, `date`, `update`, `category`, `excerpt`],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            update: node.frontmatter.update,
            category: node.frontmatter.category,
            excerpt: node.excerpt,
            body: node.rawMarkdownBody,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `G-EN3K5NX048`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-9941902100091939`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  date: node.frontmatter.date,
                  update: node.frontmatter.update,
                  category: node.frontmatter.category,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(sort: {frontmatter: {update: DESC}}) {
                  nodes {
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      update
                      category
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-wiki-link`,
            options: {
              pageResolver: name => [name.replace(/ /g, "-").toLowerCase()],
              hrefTemplate: permalink => `/${permalink}`,
              wikiLinkClassName: "wiki-link",
              newClassName: "wiki-link-new",
            },
          },
          {
            resolve: `gatsby-remark-mermaid`,
            options: {
              language: "mermaid",
              theme: "default",
              viewport: {
                width: 800,
                height: 600,
              },
              mermaidOptions: {
                theme: "default",
                themeVariables: {
                  // 웹 안전 폰트 사용으로 변경 (Netlify 환경에서 안정적)
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  primaryColor: "#f0f8ff",
                  primaryTextColor: "#333",
                  primaryBorderColor: "#0066cc",
                  lineColor: "#666",
                  textColor: "#333",
                },
                flowchart: {
                  useMaxWidth: true,
                  htmlLabels: true,
                  curve: "basis",
                  // 한국어 텍스트를 위한 패딩 증가
                  padding: 15,
                },
                sequence: {
                  useMaxWidth: true,
                  // 시퀀스 다이어그램 텍스트 여백 증가
                  actorMargin: 50,
                  boxTextMargin: 5,
                  noteMargin: 10,
                  messageMargin: 35,
                },
                gantt: {
                  useMaxWidth: true,
                  // 간트 차트 텍스트 여백 증가
                  leftPadding: 75,
                  gridLineStartPadding: 35,
                },
              },
              // Netlify 빌드 환경을 위한 추가 옵션
              launchOptions: {
                args: [
                  "--no-sandbox",
                  "--disable-setuid-sandbox",
                  "--disable-dev-shm-usage",
                  "--disable-gpu",
                  "--no-first-run",
                  "--no-zygote",
                  "--single-process",
                  "--disable-extensions",
                ],
              },
              // 렌더링 실패 시 fallback
              errorFallback: (node, error, file) => {
                console.warn("Mermaid 다이어그램 렌더링 실패:", error.message);
                return {
                  type: "html",
                  value: `<div class="mermaid-error">
                    <p>⚠️ 다이어그램을 렌더링할 수 없습니다.</p>
                    <details>
                      <summary>원본 코드 보기</summary>
                      <pre><code>${node.value}</code></pre>
                    </details>
                  </div>`,
                };
              },
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
