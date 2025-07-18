import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

const BlinkingCursor = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        opacity: visible ? 1 : 0,
        color: "var(--terminal-fg)",
        fontWeight: "bold",
      }}
    >
      █
    </span>
  );
};

const TerminalHeader = ({ siteTitle = "intzzzero", location }) => {
  const [currentPath, setCurrentPath] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const path = location?.pathname || "/";
    const pathMap = {
      "/": "home",
      "/about/": "about",
      "/random/": "random",
      "/tags/": "tags",
    };
    setCurrentPath(pathMap[path] || "blog");

    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ko-KR", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <header className="terminal-header">
      <div className="terminal-prompt-line">
        <span className="terminal-user">user@{siteTitle}</span>
        <span className="terminal-separator">:</span>
        <span className="terminal-path">~/{currentPath}</span>
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">ls -la</span>
        <BlinkingCursor />
        <span className="terminal-time">[{currentTime}]</span>
      </div>

      <nav className="terminal-nav">
        <div className="terminal-nav-line">
          <span className="terminal-output-prefix">drwxr-xr-x</span>
          <span className="terminal-nav-items">
            <Link to="/" className="terminal-nav-link">
              <span className="terminal-nav-icon">📁</span> home/
            </Link>
            <Link to="/about/" className="terminal-nav-link">
              <span className="terminal-nav-icon">👤</span> me/
            </Link>
            <Link to="/random/" className="terminal-nav-link">
              <span className="terminal-nav-icon">🎲</span> random/
            </Link>
            <Link to="/tags/" className="terminal-nav-link">
              <span className="terminal-nav-icon">🏷️</span> tags/
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default TerminalHeader;
