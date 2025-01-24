import * as React from "react";
import { Link, graphql } from "gatsby";
import Seo from "../components/seo";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  console.log(posts);

  return (
    <>
      <Seo title="All posts" />
      <main>
        <ol style={{ listStyle: `none`, padding: 0 }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug;
            return (
              <li key={post.fields.slug}>
                <Link to={post.fields.slug}>{title}</Link>{" "}
                <small>{post.frontmatter.date}</small>
                {post.frontmatter.update !== post.frontmatter.date && (
                  <small style={{ color: "red" }}>
                    💡 modified in {post.frontmatter.update}
                  </small>
                )}
              </li>
            );
          })}
        </ol>
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
