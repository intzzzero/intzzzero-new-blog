import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const TagsPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;

  // 카테고리별 포스트 수 계산
  const categoryCount = {};
  posts.forEach(post => {
    if (post.frontmatter.category) {
      categoryCount[post.frontmatter.category] =
        (categoryCount[post.frontmatter.category] || 0) + 1;
    }
  });

  const categories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);

  return (
    <Layout location={location} title="intzzzero">
      <Seo title="Tags" />

      <div className="terminal-output">
        <div className="terminal-command-header">
          <div style={{ marginBottom: "0" }}>$ ls -la categories/</div>
          <div
            style={{
              color: "var(--terminal-comment)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            total {categories.length} directories, {posts.length} files
          </div>
        </div>

        <div className="terminal-file-list">
          <div
            style={{
              marginBottom: "var(--spacing-4)",
              padding: "var(--spacing-3)",
              background: "var(--terminal-bg-alt)",
              border: "1px solid var(--terminal-border)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                color: "var(--terminal-white)",
                fontSize: "var(--fontSize-2)",
                marginBottom: "var(--spacing-2)",
                fontWeight: "bold",
              }}
            >
              drwxr-xr-x categories/
            </div>

            {categories.map(([category, count]) => (
              <div
                key={category}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-4)",
                  padding: "var(--spacing-1) 0",
                  borderBottom: "1px solid var(--terminal-border)",
                }}
              >
                <div
                  style={{
                    color: "var(--terminal-comment)",
                    fontSize: "var(--fontSize-0)",
                    minWidth: "80px",
                    fontFamily: "var(--fontFamily-mono)",
                  }}
                >
                  drwxr-xr-x
                </div>
                <div
                  style={{
                    color: "var(--terminal-warning)",
                    fontSize: "var(--fontSize-0)",
                    minWidth: "40px",
                    textAlign: "right",
                  }}
                >
                  {count}
                </div>
                <div style={{ flex: 1 }}>
                  <Link
                    to={`/tags/${category.toLowerCase()}`}
                    style={{
                      color: "var(--terminal-directory)",
                      textDecoration: "none",
                      fontSize: "var(--fontSize-1)",
                      fontFamily: "var(--fontFamily-mono)",
                      fontWeight: "bold",
                    }}
                  >
                    {category}/
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="terminal-file-separator">
            ───────────────────────────────────────────────────────────
          </div>

          <div
            style={{
              background: "var(--terminal-bg-alt)",
              border: "1px solid var(--terminal-border)",
              borderRadius: "4px",
              padding: "var(--spacing-4)",
            }}
          >
            <div
              style={{
                color: "var(--terminal-white)",
                fontSize: "var(--fontSize-2)",
                marginBottom: "var(--spacing-3)",
                fontWeight: "bold",
              }}
            >
              $ cat system_stats.txt
            </div>

            <div
              style={{
                color: "var(--terminal-fg)",
                lineHeight: "var(--lineHeight-relaxed)",
                fontFamily: "var(--fontFamily-mono)",
              }}
            >
              <div style={{ marginBottom: "var(--spacing-2)" }}>
                <span style={{ color: "var(--terminal-prompt)" }}>
                  TOTAL_FILES:
                </span>{" "}
                <span style={{ color: "var(--terminal-directory)" }}>
                  {posts.length}
                </span>
              </div>
              <div style={{ marginBottom: "var(--spacing-2)" }}>
                <span style={{ color: "var(--terminal-prompt)" }}>
                  CATEGORIES:
                </span>{" "}
                <span style={{ color: "var(--terminal-directory)" }}>
                  {categories.length}
                </span>
              </div>
              <div style={{ marginBottom: "var(--spacing-2)" }}>
                <span style={{ color: "var(--terminal-prompt)" }}>
                  LARGEST_CAT:
                </span>{" "}
                <span style={{ color: "var(--terminal-directory)" }}>
                  {categories[0]?.[0]} ({categories[0]?.[1]} files)
                </span>
              </div>
              <div>
                <span style={{ color: "var(--terminal-prompt)" }}>
                  LAST_SCAN:
                </span>{" "}
                <span style={{ color: "var(--terminal-comment)" }}>
                  {new Date()
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="terminal-more-section">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="terminal-more-button">
              $ cd ~/
            </Link>
            <Link to="/random" className="terminal-more-button">
              $ ./random.sh
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
        }
      }
    }
  }
`;
