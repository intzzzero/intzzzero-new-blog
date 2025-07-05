import * as React from "react";
import { Link } from "gatsby";
import SearchModal from "./search-modal";
import KeyboardShortcuts from "./keyboard-shortcuts";

const Navigation = ({ siteTitle = "INTZZZERO" }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <>
      <KeyboardShortcuts onSearchOpen={() => setIsSearchOpen(true)} />

      <header className="wiki-header">
        <div className="wiki-header-content">
          <div className="wiki-title">
            <Link to="/" className="wiki-title-link">
              {siteTitle}
            </Link>
          </div>
          <nav className="wiki-nav">
            <Link to="/about" className="wiki-nav-item">
              me
            </Link>
            <Link to="/random" className="wiki-nav-item">
              random
            </Link>
            <Link to="/" className="wiki-nav-item">
              index
            </Link>
            <Link to="/tags" className="wiki-nav-item">
              tags
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="wiki-nav-item wiki-search-button"
              title="검색 (Ctrl+K)"
            >
              🔍
            </button>
          </nav>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navigation;
