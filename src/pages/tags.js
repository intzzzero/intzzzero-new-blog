import * as React from "react";
import { Link, graphql } from "gatsby";
import Navigation from "../components/navigation";
import Seo from "../components/seo";

const TagsPage = ({ data }) => {
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
    <>
      <Seo title="Tags" />
      <Navigation />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <h3 className="wiki-section-title">카테고리별 분류</h3>

          <div className="wiki-tags-grid">
            {categories.map(([category, count]) => (
              <div key={category} className="wiki-tag-item">
                <Link
                  to={`/tags/${category.toLowerCase()}`}
                  className="wiki-tag-link"
                >
                  {category}
                </Link>
                <span className="wiki-tag-count">({count})</span>
              </div>
            ))}
          </div>

          <div className="wiki-section" style={{ marginTop: "3rem" }}>
            <h4>전체 문서 통계</h4>
            <ul className="wiki-stats-list">
              <li>
                총 문서 수: <strong>{posts.length}개</strong>
              </li>
              <li>
                카테고리 수: <strong>{categories.length}개</strong>
              </li>
              <li>
                가장 많은 카테고리:{" "}
                <strong>
                  {categories[0]?.[0]} ({categories[0]?.[1]}개)
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
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
