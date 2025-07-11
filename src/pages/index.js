import * as React from "react";
import { Link, graphql } from "gatsby";
import Seo from "../components/seo";
import Navigation from "../components/navigation";
import DocumentStats from "../components/document-stats";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const [showAll, setShowAll] = React.useState(false);
  const displayPosts = showAll ? posts : posts.slice(0, 10);

  return (
    <>
      <Seo title="All posts" />
      <Navigation />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <h3 className="wiki-section-title">최근 변경된 문서</h3>
          <ol className="wiki-post-list">
            {displayPosts.map(post => {
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
                    {post.frontmatter.category && (
                      <span className="wiki-post-category">
                        {post.frontmatter.category}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {!showAll && posts.length > 10 && (
            <div className="wiki-show-all">
              <button
                onClick={() => setShowAll(true)}
                className="wiki-show-all-button"
              >
                전체 문서 리스트 보기 ({posts.length} 항목)
              </button>
            </div>
          )}

          {/* 문서 통계 섹션 */}
          <DocumentStats />
        </div>
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
