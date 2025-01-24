import * as React from "react";
import { Link, graphql } from "gatsby";
import Seo from "../components/seo";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const [showAll, setShowAll] = React.useState(false);
  const displayPosts = showAll ? posts : posts.slice(0, 10);

  return (
    <>
      <Seo title="All posts" />
      <main className="global-wrapper">
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "#0000be",
              color: "white",
              padding: "0.5rem 1rem",
              margin: "-2.5rem -1.3rem 2rem -1.3rem",
              cursor: "pointer",
            }}
          >
            INTZZZERO
          </div>
        </Link>
        <ol style={{ listStyle: `none`, padding: 0 }}>
          {displayPosts.map(post => {
            const title = post.frontmatter.title || post.fields.slug;
            return (
              <li key={post.fields.slug} style={{ marginBottom: "2rem" }}>
                <Link
                  to={post.fields.slug}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <article className="post-item">
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        color: "#0000be",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginTop: "0.3rem",
                      }}
                    >
                      {post.frontmatter.category && (
                        <span style={{ marginRight: "1rem" }}>
                          #{post.frontmatter.category}
                        </span>
                      )}
                      {post.frontmatter.date}
                      {post.frontmatter.update !== post.frontmatter.date && (
                        <span style={{ marginLeft: "1rem" }}>
                          (수정: {post.frontmatter.update})
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ol>
        {!showAll && posts.length > 10 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "3rem -1.3rem -2.5rem -1.3rem",
            }}
          >
            <button onClick={() => setShowAll(true)} className="nav-button">
              전체보기 ({posts.length}개의 포스트)
            </button>
          </div>
        )}
      </main>
    </>
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
