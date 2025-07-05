import * as React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import Navigation from "../components/navigation";

const AboutPage = () => {
  return (
    <>
      <Seo title="About Me" />
      <Navigation />
      <main className="wiki-main-wrapper">
        <div className="wiki-content">
          <article className="wiki-article">
            <header className="wiki-article-header">
              <h1 className="wiki-article-title">About Me</h1>
            </header>

            <section className="wiki-article-content">
              <div style={{ marginBottom: "3rem" }}>
                <p>
                  독서보다는 도서수집을 좋아하며 수집한 책 중 골라 읽습니다.
                </p>
                <p>분야를 막론하고 새로운 것에 흥미를 느낍니다.</p>
                <p>
                  디테일한 계획보다는 리소스와 목표만 주어지는 것을 좋아합니다.
                </p>
                <p>가장 자주 하는 말은 "그럴 수도 있지"입니다.</p>
              </div>

              <section>
                <h2>Contact</h2>
                <div style={{ lineHeight: "1.8" }}>
                  <p>
                    <strong>Github.</strong>{" "}
                    <a
                      href="https://github.com/intzzzero"
                      target="_blank"
                      rel="noreferrer"
                    >
                      intzzzero
                    </a>
                  </p>
                  <p>
                    <strong>Instagram.</strong>{" "}
                    <a
                      href="https://www.instagram.com/intzzzero/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @intzzzero
                    </a>
                  </p>
                  <p>
                    <strong>Email.</strong> intzzzero@gmail.com
                  </p>
                </div>
              </section>
            </section>

            <nav className="wiki-article-nav">
              <div className="wiki-nav-buttons">
                <Link to="/" className="wiki-nav-button">
                  홈으로
                </Link>
                <Link to="/random" className="wiki-nav-button">
                  랜덤 문서
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

export default AboutPage;
