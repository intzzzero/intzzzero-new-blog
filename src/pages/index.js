import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import DocumentStats from "../components/document-stats";

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;
  const [showAll, setShowAll] = React.useState(false);
  const displayPosts = showAll ? posts : posts.slice(0, 15);

  return (
    <Layout location={location} title="intzzzero">
      <Seo title="All posts" />

      <div className="terminal-output">
        <div className="terminal-command-header">
          최근 변경된 문서 ({posts.length}개)
        </div>

        <div className="terminal-file-list">
          {displayPosts.map(post => {
            const title = post.frontmatter.title || post.fields.slug;
            const updateDate = post.frontmatter.update || post.frontmatter.date;
            const formattedDate = new Date(updateDate)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, ".")
              .replace(/\s/g, "");

            return (
              <div key={post.fields.slug} className="post-list-item">
                <span className="post-date">{formattedDate}</span>
                <span className="post-category">
                  [{post.frontmatter.category || "misc"}]
                </span>
                <h2>
                  <Link to={post.fields.slug}>{title}</Link>
                </h2>
              </div>
            );
          })}
        </div>

        {!showAll && posts.length > 15 && (
          <div className="terminal-more-section">
            <div className="terminal-separator-line">
              ─────────────────────────────────────────────────────────
            </div>
            <button
              onClick={() => setShowAll(true)}
              className="terminal-more-button"
            >
              $ ls -la --show-all | wc -l
              <br />→ 전체 {posts.length}개 문서 표시
            </button>
          </div>
        )}
      </div>

      {/* 터미널 통계 섹션 */}
      <div className="terminal-output">
        <div className="terminal-command-header">$ cat /proc/blog/stats</div>
        <DocumentStats />
      </div>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: [{ frontmatter: { update: DESC } }, { frontmatter: { date: DESC } }]
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          update
          category
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
