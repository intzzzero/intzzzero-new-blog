import * as React from "react";
import { navigate, graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const RandomPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;

  React.useEffect(() => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      const randomPost = posts[randomIndex];
      // 터미널 스타일 딜레이 효과
      setTimeout(() => {
        navigate(randomPost.fields.slug);
      }, 1500);
    }
  }, [posts]);

  return (
    <Layout location={location} title="음수와 양수 사이">
      <Seo title="Random Post" />

      <div className="terminal-output">
        <div className="terminal-command-header">
          <div style={{ marginBottom: "0" }}>$ ./random.sh</div>
          <div
            style={{
              color: "var(--terminal-comment)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            executing random document selection...
          </div>
        </div>

        <div
          className="terminal-file-list"
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "var(--terminal-fg)" }}>
            <div
              style={{
                fontSize: "var(--fontSize-3)",
                marginBottom: "var(--spacing-4)",
                fontFamily: "var(--fontFamily-mono)",
                animation: "blink 1s infinite",
              }}
            >
              ┌─ RANDOM DOCUMENT SELECTOR ─┐
            </div>

            <div
              style={{
                color: "var(--terminal-directory)",
                marginBottom: "var(--spacing-2)",
                fontSize: "var(--fontSize-2)",
              }}
            >
              Scanning {posts.length} documents...
            </div>

            <div
              style={{
                color: "var(--terminal-prompt)",
                fontSize: "var(--fontSize-1)",
                fontFamily: "var(--fontFamily-mono)",
              }}
            >
              [████████████████████████████████] 100%
            </div>

            <div
              style={{
                color: "var(--terminal-comment)",
                marginTop: "var(--spacing-4)",
                fontSize: "var(--fontSize-1)",
              }}
            >
              Random selection complete. Redirecting...
            </div>

            <div
              style={{
                fontSize: "var(--fontSize-3)",
                marginTop: "var(--spacing-4)",
                fontFamily: "var(--fontFamily-mono)",
              }}
            >
              └─────────────────────────────────┘
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </Layout>
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
