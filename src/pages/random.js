import * as React from "react";
import { navigate, graphql } from "gatsby";
import Navigation from "../components/navigation";
import Seo from "../components/seo";

const RandomPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  React.useEffect(() => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      const randomPost = posts[randomIndex];
      navigate(randomPost.fields.slug);
    }
  }, [posts]);

  return (
    <>
      <Seo title="Random Post" />
      <Navigation />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <h2>랜덤 문서로 이동 중...</h2>
            <p>잠시만 기다려주세요.</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default RandomPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`;
