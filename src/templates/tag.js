import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const TagTemplate = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.nodes;
  const { tag } = pageContext;
  const totalCount = posts.length;

  return (
    <Layout location={location} title="음수와 양수 사이">
      <Seo title={`Posts tagged "${tag}"`} />

      <div className="terminal-output">
        <div className="terminal-command-header">
          <div style={{ marginBottom: "0" }}>$ ls -la {tag}/</div>
          <div
            style={{
              color: "var(--terminal-comment)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            found {totalCount} files
          </div>
        </div>

        <div className="terminal-file-list">
          {posts.map((post, index) => {
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
                <div className="post-date">{formattedDate}</div>
                <div className="post-category">[{tag}]</div>
                <header>
                  <h2>
                    <Link to={post.fields.slug}>{title}</Link>
                  </h2>
                </header>
              </div>
            );
          })}
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
            <Link to="/tags" className="terminal-more-button">
              $ cd ../tags/
            </Link>
            <Link to="/" className="terminal-more-button">
              $ cat recent_posts.md
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $tag } } }
      sort: [{ frontmatter: { update: DESC } }, { frontmatter: { date: DESC } }]
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
          update
          category
        }
        excerpt(pruneLength: 100)
      }
    }
  }
`;
