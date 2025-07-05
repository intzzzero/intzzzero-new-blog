import * as React from "react";
import { Link, graphql } from "gatsby";
import Seo from "../components/seo";
import Navigation from "../components/navigation";
import ReadingProgress from "../components/reading-progress";
import { findBacklinks } from "../utils/wiki-link-resolver";

const BlogPostTemplate = ({
  data: { markdownRemark: post, allMarkdownRemark },
}) => {
  const allPosts = allMarkdownRemark.nodes;
  const backlinks = findBacklinks(post, allPosts);

  return (
    <>
      <Seo title={post.frontmatter.title} />
      <Navigation />
      <ReadingProgress content={post.html} />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <article
            className="wiki-article"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="wiki-article-header">
              <h1 itemProp="headline" className="wiki-article-title">
                {post.frontmatter.title}
              </h1>
              <div className="wiki-article-meta">
                {post.frontmatter.category && (
                  <Link
                    to={`/tags/${post.frontmatter.category.toLowerCase()}/`}
                    className="wiki-article-category"
                  >
                    {post.frontmatter.category}
                  </Link>
                )}
                <span className="wiki-article-date">
                  {new Date(post.frontmatter.date)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "")}
                </span>
                {post.frontmatter.update !== post.frontmatter.date && (
                  <span className="wiki-article-update">
                    (수정:{" "}
                    {new Date(post.frontmatter.update)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\./g, ".")
                      .replace(/\s/g, "")}
                    )
                  </span>
                )}
              </div>
            </header>

            <section
              className="wiki-article-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />

            {/* 백링크 섹션 */}
            {backlinks.length > 0 && (
              <section className="wiki-backlinks">
                <h3 className="wiki-backlinks-title">
                  이 문서를 참조하는 문서들 ({backlinks.length})
                </h3>
                <ul className="wiki-backlinks-list">
                  {backlinks.map((backlink, index) => (
                    <li key={index} className="wiki-backlink-item">
                      <Link to={backlink.slug} className="wiki-backlink-link">
                        {backlink.title}
                      </Link>
                      <span className="wiki-backlink-meta">
                        {backlink.category && (
                          <span className="wiki-backlink-category">
                            {backlink.category}
                          </span>
                        )}
                        <span className="wiki-backlink-date">
                          {new Date(backlink.date)
                            .toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\./g, ".")
                            .replace(/\s/g, "")}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 네비게이션 */}
            <nav className="wiki-article-nav">
              <div className="wiki-nav-buttons">
                <Link to="/random" className="wiki-nav-button">
                  랜덤 문서
                </Link>
                <Link to="/" className="wiki-nav-button">
                  최근 문서
                </Link>
                <Link to="/tags" className="wiki-nav-button">
                  모든 카테고리
                </Link>
              </div>
            </nav>
          </article>
        </div>
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
      rawMarkdownBody
      fields {
        slug
      }
      frontmatter {
        title
        date
        update
        category
      }
    }
    allMarkdownRemark {
      nodes {
        id
        rawMarkdownBody
        fields {
          slug
        }
        frontmatter {
          title
          date
          category
        }
      }
    }
  }
`;
