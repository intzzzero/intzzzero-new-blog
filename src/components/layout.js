import * as React from "react";
import TerminalHeader from "./terminal-header";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <TerminalHeader siteTitle={title} location={location} />
      <main className="terminal-main">{children}</main>
      <footer className="terminal-footer">
        <div className="terminal-footer-content">
          <span className="terminal-footer-prompt">$</span>
          <span className="terminal-footer-text">
            echo "© {new Date().getFullYear()} intzzzero | Built with Gatsby"
          </span>
        </div>
        <div className="terminal-footer-signature">
          ┌─────────────────────────────────────────────────────┐
          <br />
          │ end of transmission - press any key to continue... │
          <br />
          └─────────────────────────────────────────────────────┘
        </div>
      </footer>
    </div>
  );
};

export default Layout;
