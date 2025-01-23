import * as React from "react";
import { Link, graphql } from "gatsby";

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <main>
      <h1>{siteTitle}</h1>
      <h2>404: Not Found</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">메인 페이지로 돌아가기</Link>
    </main>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
