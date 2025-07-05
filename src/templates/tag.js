import * as React from "react";
import { Link, graphql } from "gatsby";
import Navigation from "../components/navigation";
import Seo from "../components/seo";

const TagTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.nodes;
  const { tag } = pageContext;
  const totalCount = posts.length;

  return (
    <>
      <Seo title={`Posts tagged "${tag}"`} />
      <Navigation />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <h3 className="wiki-section-title">
            {tag} 카테고리 ({totalCount}개 문서)
          </h3>

          <div className="wiki-tag-breadcrumb">
            <Link to="/tags" className="wiki-breadcrumb-link">
              ← 모든 카테고리
            </Link>
          </div>

          <ol className="wiki-post-list">
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug;
              const updateDate =
                post.frontmatter.update || post.frontmatter.date;
              const formattedDate = new Date(updateDate)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\./g, ".")
                .replace(/\s/g, "");

              return (
                <li key={post.fields.slug} className="wiki-post-item">
                  <div className="wiki-post-date">{formattedDate}</div>
                  <div className="wiki-post-content">
                    <Link to={post.fields.slug} className="wiki-post-link">
                      {title}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="wiki-tag-navigation">
            <Link to="/tags" className="wiki-nav-button">
              모든 카테고리 보기
            </Link>
            <Link to="/" className="wiki-nav-button">
              최근 문서 보기
            </Link>
          </div>
        </div>
      </main>
    </>
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
