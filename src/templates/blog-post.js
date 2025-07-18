import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import ReadingProgress from "../components/reading-progress";
import { findBacklinks } from "../utils/wiki-link-resolver";

const BlogPostTemplate = ({
  data: { markdownRemark: post, allMarkdownRemark },
  location,
}) => {
  const allPosts = allMarkdownRemark.nodes;
  const backlinks = findBacklinks(post, allPosts);

  return (
    <Layout location={location} title="intzzzero">
      <Seo title={post.frontmatter.title} />
      <ReadingProgress content={post.html} />

      <div className="terminal-output">
        <div className="terminal-file-header">
          <div className="terminal-file-info">
            <span className="terminal-file-prompt">$</span>
            <span className="terminal-file-command">
              cat "{post.frontmatter.title}.md"
            </span>
          </div>
          <div className="terminal-file-meta">
            <span className="terminal-file-size">{post.html.length} bytes</span>
            <span className="terminal-file-category">
              [{post.frontmatter.category || "misc"}]
            </span>
            <span className="terminal-file-date">
              {new Date(post.frontmatter.date)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\./g, ".")
                .replace(/\s/g, "")}
            </span>
            {post.frontmatter.update !== post.frontmatter.date && (
              <span className="terminal-file-update">
                (updated:{" "}
                {new Date(post.frontmatter.update)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\./g, ".")
                  .replace(/\s/g, "")}
                )
              </span>
            )}
          </div>
        </div>

        <div className="terminal-file-separator">
          ═══════════════════════════════════════════════════════════
        </div>

        <article
          className="terminal-article"
          itemScope
          itemType="http://schema.org/Article"
        >
          <section
            className="terminal-article-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </article>
      </div>

      {/* 백링크 섹션 */}
      {backlinks.length > 0 && (
        <div className="terminal-output">
          <div className="terminal-command-header">
            $ grep -r "{post.frontmatter.title}" *.md
          </div>
          <div className="terminal-backlinks">
            <div className="terminal-backlinks-header">
              Found {backlinks.length} reference(s):
            </div>
            <div className="terminal-backlinks-list">
              {backlinks.map((backlink, index) => (
                <div key={index} className="terminal-backlink-item">
                  <span className="terminal-backlink-file">
                    ./{backlink.title}.md:
                  </span>
                  <Link to={backlink.slug} className="terminal-backlink-link">
                    {backlink.title}
                  </Link>
                  <span className="terminal-backlink-meta">
                    [{backlink.category || "misc"}]
                    <span className="terminal-backlink-date">
                      {new Date(backlink.date)
                        .toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\./g, ".")
                        .replace(/\s/g, "")}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 터미널 네비게이션 */}
      <div className="terminal-output">
        <div className="terminal-command-header">$ ls ../</div>
        <nav className="terminal-nav-section">
          <div className="terminal-nav-buttons">
            <Link to="/random" className="terminal-nav-button">
              📁 random/
            </Link>
            <Link to="/" className="terminal-nav-button">
              📁 recent/
            </Link>
            <Link to="/tags" className="terminal-nav-button">
              📁 tags/
            </Link>
          </div>
        </nav>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      rawMarkdownBody
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
    allMarkdownRemark {
      nodes {
        id
        rawMarkdownBody
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
        }
      }
    }
  }
`;
