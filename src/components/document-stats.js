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
    <div className="document-stats">
      <h3 className="stats-title">📊 문서 통계</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalPosts}</div>
          <div className="stat-label">전체 문서</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{Object.keys(categoryStats).length}</div>
          <div className="stat-label">카테고리</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{recentlyUpdated}</div>
          <div className="stat-label">최근 30일 업데이트</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{totalWords.toLocaleString()}</div>
          <div className="stat-label">총 단어 수</div>
        </div>
      </div>

      <div className="stats-section">
        <h4 className="stats-section-title">📈 평균 통계</h4>
        <div className="stats-avg">
          <div className="avg-item">
            <span className="avg-label">문서당 평균 단어 수:</span>
            <span className="avg-value">{avgWordsPerPost}개</span>
          </div>
          <div className="avg-item">
            <span className="avg-label">문서당 평균 읽기 시간:</span>
            <span className="avg-value">{avgReadTime}분</span>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h4 className="stats-section-title">🏷️ 인기 카테고리</h4>
        <div className="popular-categories">
          {categories.map(([category, count], index) => (
            <div key={category} className="category-item">
              <span className="category-rank">#{index + 1}</span>
              <Link
                to={`/tags/${category.toLowerCase()}/`}
                className="category-link"
              >
                {category}
              </Link>
              <span className="category-count">{count}개</span>
            </div>
          ))}
        </div>

        {Object.keys(categoryStats).length > 5 && (
          <div className="view-all-categories">
            <Link to="/tags" className="view-all-link">
              모든 카테고리 보기 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentStats;
