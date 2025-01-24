import * as React from "react";
import { Link, graphql } from "gatsby";
import Seo from "../components/seo";

const BlogPostTemplate = ({
  data: { markdownRemark: post, allMarkdownRemark },
}) => {
  const [randomSlug, setRandomSlug] = React.useState("");

  React.useEffect(() => {
    const slugs = allMarkdownRemark.nodes
      .map(node => node.fields.slug)
      .filter(slug => slug !== post.fields.slug);
    const randomIndex = Math.floor(Math.random() * slugs.length);
    setRandomSlug(slugs[randomIndex]);
  }, [post.fields.slug, allMarkdownRemark.nodes]);

  return (
    <>
      <Seo title={post.frontmatter.title} />
      <main className="global-wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
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
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1
              itemProp="headline"
              style={{
                marginTop: "0",
                marginBottom: "0.5rem",
                color: "#0000be",
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#666",
                marginBottom: "2rem",
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
            </p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr style={{ margin: "5rem 0 7.5rem 0" }} />
          <nav className="blog-post-nav">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "-2.5rem -1.3rem",
              }}
            >
              <Link
                to={randomSlug}
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="nav-button">랜덤 포스트</div>
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="nav-button">목록으로</div>
              </Link>
            </div>
          </nav>
        </article>
      </main>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update(formatString: "MMMM DD, YYYY")
        category
      }
    }
    allMarkdownRemark(filter: { id: { ne: $id } }) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`;
