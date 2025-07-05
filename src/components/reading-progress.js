import * as React from "react";

const ReadingProgress = ({ content }) => {
  const [progress, setProgress] = React.useState(0);
  const [headings, setHeadings] = React.useState([]);
  const [activeHeading, setActiveHeading] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  // 스크롤 진행률 계산
  const updateProgress = React.useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    setProgress(scrollPercent * 100);

    // 스크롤 위치에 따라 표시/숨김
    setIsVisible(scrollTop > 300);
  }, []);

  // 페이지 내 헤딩 요소들을 찾아서 목차 생성
  React.useEffect(() => {
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingData = Array.from(headingElements).map((heading, index) => ({
      id: heading.id || `heading-${index}`,
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
      element: heading,
    }));

    // ID가 없는 헤딩에 ID 추가
    headingData.forEach((heading, index) => {
      if (!heading.element.id) {
        heading.element.id = `heading-${index}`;
      }
    });

    setHeadings(headingData);
  }, [content]);

  // 스크롤 이벤트 리스너
  React.useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  // 현재 활성 헤딩 추적
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    headings.forEach(heading => {
      observer.observe(heading.element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // 헤딩으로 스크롤
  const scrollToHeading = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="reading-progress-container">
      {/* 읽기 진행률 바 */}
      <div className="reading-progress-bar">
        <div
          className="reading-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 목차 네비게이션 */}
      {headings.length > 0 && (
        <div className="reading-toc">
          <div className="reading-toc-header">
            <span className="reading-toc-title">목차</span>
            <button
              onClick={scrollToTop}
              className="reading-toc-top"
              title="맨 위로"
            >
              ↑
            </button>
          </div>
          <ul className="reading-toc-list">
            {headings.map(heading => (
              <li
                key={heading.id}
                className={`reading-toc-item level-${heading.level} ${
                  activeHeading === heading.id ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="reading-toc-link"
                  title={heading.text}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 스크롤 진행률 표시 */}
      <div className="reading-progress-info">{Math.round(progress)}%</div>
    </div>
  );
};

export default ReadingProgress;
