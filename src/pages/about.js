import * as React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <>
      <Seo title="About Me" />
      <main className="global-wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              backgroundColor: "#0000be",
              color: "white",
              padding: "0.5rem 1rem",
              margin: "-2.5rem -1.3rem 2rem -1.3rem",
              cursor: "pointer",
            }}
          >
            INTZZZERO
          </div>
        </Link>

        <article>
          <section style={{ marginBottom: "4rem" }}>
            <h3 style={{ marginBottom: "2rem" }}>About Me</h3>
            <div style={{ fontSize: "0.9rem", lineHeight: "3" }}>
              <p>
                독서보다는 도서수집을 좋아하며 수집한 책 중 골라 읽습니다.
                <br />
                분야를 막론하고 새로운 것에 흥미를 느낍니다. <br />
                디테일한 계획보다는 리소스와 목표만 주어지는 것을 좋아합니다.
              </p>
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: "2rem" }}>Contact</h3>
            <div style={{ fontSize: "0.9rem", lineHeight: "1" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                Github.{" "}
                <a
                  href="https://github.com/intzzzero"
                  target="_blank"
                  rel="noreferrer"
                >
                  intzzzero
                </a>
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Instagram.{" "}
                <a
                  href="https://www.instagram.com/intzzzero/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @intzzzero
                </a>
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Email. intzzzero@gmail.com
              </p>
            </div>
          </section>

          <div style={{ height: "5rem" }} />

          <nav className="blog-post-nav">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "-2.5rem -1.3rem",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="nav-button">목록으로</div>
              </Link>
            </div>
          </nav>
        </article>
      </main>
    </>
  );
};

export default AboutPage;
