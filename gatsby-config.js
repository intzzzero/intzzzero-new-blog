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
              theme: "dark",
              viewport: {
                width: 800,
                height: 600,
              },
              mermaidOptions: {
                theme: "dark",
                themeVariables: {
                  // Terminal 테마에 맞는 색상 설정
                  fontFamily:
                    "SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, Liberation Mono, monospace",
                  fontSize: "14px",
                  primaryColor: "#1a1a1a",
                  primaryTextColor: "#00ff00",
                  primaryBorderColor: "#00ffff",
                  lineColor: "#00ffff",
                  textColor: "#00ff00",
                  background: "#000000",
                  mainBkg: "#1a1a1a",
                  secondBkg: "#333333",
                  tertiaryColor: "#444444",

                  // 추가 터미널 스타일 설정
                  clusterBkg: "#000000",
                  clusterBorder: "#333333",
                  edgeLabelBackground: "#1a1a1a",
                  nodeTextColor: "#00ff00",

                  // 다크 테마 강화 설정
                  darkMode: true,
                  secondaryColor: "#333333",
                  labelTextColor: "#00ff00",
                  fillType0: "#1a1a1a",
                  fillType1: "#333333",
                  fillType2: "#444444",
                  fillType3: "#1a1a1a",
                  fillType4: "#333333",
                  fillType5: "#444444",
                  fillType6: "#1a1a1a",
                  fillType7: "#333333",

                  // flowchart 전용 설정
                  cScale0: "#1a1a1a",
                  cScale1: "#333333",
                  cScale2: "#444444",

                  // 강제로 모든 색상을 터미널 테마로
                  pie1: "#1a1a1a",
                  pie2: "#333333",
                  pie3: "#444444",
                  pie4: "#1a1a1a",
                  pie5: "#333333",
                  pie6: "#444444",
                  pie7: "#1a1a1a",
                  pie8: "#333333",
                  pie9: "#444444",
                  pie10: "#1a1a1a",
                  pie11: "#333333",
                  pie12: "#444444",

                  // 시퀀스 다이어그램 다크 테마
                  actorBkg: "#1a1a1a",
                  actorBorder: "#00ffff",
                  actorTextColor: "#00ff00",
                  actorLineColor: "#00ffff",
                  signalColor: "#00ffff",
                  signalTextColor: "#00ff00",

                  // 간트 차트 다크 테마
                  section0: "#1a1a1a",
                  section1: "#333333",
                  section2: "#444444",
                  section3: "#1a1a1a",
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
