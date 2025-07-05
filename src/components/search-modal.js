import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const data = useStaticQuery(graphql`
    query {
      localSearchBlog {
        index
        store
      }
    }
  `);

  // 검색 데이터가 없는 경우 처리
  const searchData = data.localSearchBlog;
  const hasSearchData = searchData && searchData.index && searchData.store;

  // Hook 규칙을 준수하기 위해 항상 useFlexSearch를 호출
  const results = useFlexSearch(
    hasSearchData ? query : "",
    hasSearchData ? searchData.index : "",
    hasSearchData ? searchData.store : {}
  );

  const searchInputRef = React.useRef(null);

  // 모달이 열릴 때 검색 입력창에 포커스
  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  React.useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="search-modal-input"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <button onClick={onClose} className="search-modal-close">
            ✕
          </button>
        </div>

        <div className="search-modal-content">
          {!hasSearchData ? (
            <div className="search-modal-help">
              <p>검색 인덱스를 준비 중입니다...</p>
              <p>페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
            </div>
          ) : query === "" ? (
            <div className="search-modal-help">
              <p>문서 제목, 내용, 카테고리에서 검색할 수 있습니다.</p>
              <div className="search-modal-shortcuts">
                <span>
                  <kbd>ESC</kbd> 닫기
                </span>
                <span>
                  <kbd>↑↓</kbd> 이동
                </span>
                <span>
                  <kbd>Enter</kbd> 선택
                </span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              <div className="search-results-header">
                {results.length}개의 검색 결과
              </div>
              <ul className="search-results-list">
                {results.map(result => {
                  const updateDate = result.update || result.date;
                  const formattedDate = new Date(updateDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .replace(/\s/g, "");

                  return (
                    <li key={result.id} className="search-result-item">
                      <Link
                        to={result.slug}
                        className="search-result-link"
                        onClick={handleResultClick}
                      >
                        <div className="search-result-title">
                          {result.title}
                        </div>
                        <div className="search-result-meta">
                          <span className="search-result-date">
                            {formattedDate}
                          </span>
                          {result.category && (
                            <span className="search-result-category">
                              {result.category}
                            </span>
                          )}
                        </div>
                        {result.excerpt && (
                          <div className="search-result-excerpt">
                            {result.excerpt}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="search-no-results">
              <p>"{query}"에 대한 검색 결과가 없습니다.</p>
              <p>다른 키워드로 시도해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
