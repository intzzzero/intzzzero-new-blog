import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const DocumentStats = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        totalCount
        nodes {
          frontmatter {
            category
            date
            update
          }
          timeToRead
          wordCount {
            words
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.nodes;
  const totalPosts = data.allMarkdownRemark.totalCount;

  // 카테고리별 통계
  const categoryStats = {};
  let totalWords = 0;
  let totalReadTime = 0;

  posts.forEach(post => {
    if (post.frontmatter.category) {
      categoryStats[post.frontmatter.category] =
        (categoryStats[post.frontmatter.category] || 0) + 1;
    }
    totalWords += post.wordCount?.words || 0;
    totalReadTime += post.timeToRead || 0;
  });

  const categories = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // 상위 5개 카테고리

  // 최근 활동 계산 (최근 30일 내 업데이트된 문서)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentlyUpdated = posts.filter(post => {
    const updateDate = new Date(
      post.frontmatter.update || post.frontmatter.date
    );
    return updateDate > thirtyDaysAgo;
  }).length;

  // 평균 통계
  const avgWordsPerPost = Math.round(totalWords / totalPosts);
  const avgReadTime = Math.round(totalReadTime / totalPosts);

  return (
    <div className="terminal-stats">
      <div className="terminal-file-separator">
        ═══════════════════════════════════════════════════════════
      </div>

      <div className="terminal-stats-grid">
        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>TOTAL_DOCS:</span>
          <span
            style={{ color: "var(--terminal-directory)", fontWeight: "bold" }}
          >
            {totalPosts}
          </span>
        </div>

        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>CATEGORIES:</span>
          <span
            style={{ color: "var(--terminal-directory)", fontWeight: "bold" }}
          >
            {Object.keys(categoryStats).length}
          </span>
        </div>

        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>RECENT_30D:</span>
          <span
            style={{ color: "var(--terminal-directory)", fontWeight: "bold" }}
          >
            {recentlyUpdated}
          </span>
        </div>

        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>TOTAL_WORDS:</span>
          <span
            style={{ color: "var(--terminal-directory)", fontWeight: "bold" }}
          >
            {totalWords.toLocaleString()}
          </span>
        </div>

        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>AVG_WORDS:</span>
          <span
            style={{ color: "var(--terminal-warning)", fontWeight: "bold" }}
          >
            {avgWordsPerPost}/doc
          </span>
        </div>

        <div className="terminal-stat-line">
          <span style={{ color: "var(--terminal-prompt)" }}>
            AVG_READ_TIME:
          </span>
          <span
            style={{ color: "var(--terminal-warning)", fontWeight: "bold" }}
          >
            {avgReadTime}min/doc
          </span>
        </div>
      </div>

      <div className="terminal-file-separator">
        ───────────────────────────────────────────────────────────
      </div>

      <div style={{ marginBottom: "var(--spacing-4)" }}>
        <div
          style={{
            color: "var(--terminal-white)",
            fontSize: "var(--fontSize-1)",
            marginBottom: "var(--spacing-3)",
            fontWeight: "bold",
          }}
        >
          $ ls -la categories/ | head -5
        </div>

        <div className="terminal-categories-list">
          {categories.map(([category, count], index) => (
            <div key={category} className="terminal-category-item">
              <span
                style={{
                  color: "var(--terminal-comment)",
                  fontSize: "var(--fontSize-0)",
                  minWidth: "20px",
                }}
              >
                {String(index + 1).padStart(2, "0")}.
              </span>

              <span
                style={{
                  color: "var(--terminal-warning)",
                  fontSize: "var(--fontSize-0)",
                  minWidth: "40px",
                  textAlign: "right",
                }}
              >
                {count}
              </span>

              <div style={{ flex: 1, marginLeft: "var(--spacing-2)" }}>
                <Link
                  to={`/tags/${category.toLowerCase()}/`}
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

        {Object.keys(categoryStats).length > 5 && (
          <div
            style={{
              marginTop: "var(--spacing-3)",
              textAlign: "center",
            }}
          >
            <Link
              to="/tags"
              className="terminal-more-button"
              style={{
                display: "inline-block",
                padding: "var(--spacing-2) var(--spacing-4)",
              }}
            >
              $ ls -la categories/ --show-all
            </Link>
          </div>
        )}
      </div>

      <div className="terminal-file-separator">
        ───────────────────────────────────────────────────────────
      </div>

      <div
        style={{
          textAlign: "center",
          color: "var(--terminal-comment)",
          fontSize: "var(--fontSize-0)",
          fontFamily: "var(--fontFamily-mono)",
          marginTop: "var(--spacing-3)",
        }}
      >
        Last updated:{" "}
        {new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\./g, ".")
          .replace(/\s/g, "")}{" "}
        | Generated by blog-stats v1.0.0
      </div>
    </div>
  );
};

export default DocumentStats;
