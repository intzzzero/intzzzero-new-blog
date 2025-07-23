import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const AboutPage = ({ location }) => {
  return (
    <Layout location={location} title="음수와 양수 사이">
      <Seo title="About Me" />

      <div className="terminal-output">
        <div className="terminal-file-header">
          <div className="terminal-file-info">
            <span className="terminal-file-prompt">$</span>
            <span className="terminal-file-command">cat about.md</span>
          </div>
          <div className="terminal-file-meta">
            <span className="terminal-file-size">2.1KB</span>
            <span className="terminal-file-category">[about]</span>
            <span className="terminal-file-date">
              {new Date()
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\./g, ".")
                .replace(/\s/g, "")}
            </span>
          </div>
        </div>

        <div className="terminal-file-separator">
          ═══════════════════════════════════════════════════════════
        </div>

        <article className="terminal-article">
          <section className="terminal-article-content">
            <h1>ABOUT ME</h1>
            <h3>
              <i>인생은 언제나 0으로 수렴하는 음수와 양수의 연속</i>
            </h3>

            <div style={{ marginBottom: "var(--spacing-8)" }}>
              <p>
                HOP(Human Oriented Programming)를 지향하며 사람의 문제를
                해결하는 코드를 짓습니다.
              </p>
              <p>독서보다는 도서수집을 좋아하며 수집한 책 중 골라 읽습니다.</p>
              <p>분야를 막론하고 새로운 것에 흥미를 느낍니다.</p>
              <p>
                디테일한 계획보다는 리소스와 목표만 주어지는 것을 좋아합니다.
              </p>
              <p>가장 자주 하는 말은 "그럴 수도 있지"입니다.</p>
            </div>

            <h2>CONTACT</h2>
            <div style={{ lineHeight: "1.8" }}>
              <p>
                <code>Github:</code>{" "}
                <a
                  href="https://github.com/intzzzero"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--terminal-directory)" }}
                >
                  intzzzero
                </a>
              </p>
              <p>
                <code>Threads:</code>{" "}
                <a
                  href="https://www.threads.net/@intzzzero"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--terminal-directory)" }}
                >
                  @intzzzero
                </a>
              </p>
              <p>
                <code>Email:</code> intzzzero@gmail.com
              </p>
            </div>
          </section>
        </article>

        <div className="terminal-file-separator">
          ───────────────────────────────────────────────────────────
        </div>

        <div className="terminal-more-section">
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="terminal-more-button">
              $ cd ~/
            </Link>
            <Link to="/random" className="terminal-more-button">
              $ ./random.sh
            </Link>
            <Link to="/tags" className="terminal-more-button">
              $ ls tags/
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
