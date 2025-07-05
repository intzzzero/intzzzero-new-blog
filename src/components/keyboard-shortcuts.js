import * as React from "react";
import { navigate } from "gatsby";

const KeyboardShortcuts = ({ onSearchOpen }) => {
  React.useEffect(() => {
    const handleKeyDown = e => {
      // 입력 필드에 포커스된 경우 단축키 무시
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      // Ctrl/Cmd + K: 검색 모달 열기
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onSearchOpen();
        return;
      }

      // 단일 키 단축키들 (G로 시작하는 복합 단축키)
      if (e.target === document.body) {
        // G + H: 홈으로 이동
        if (e.key === "g") {
          e.preventDefault();
          const nextKeyHandler = nextE => {
            if (nextE.key === "h") {
              nextE.preventDefault();
              navigate("/");
            } else if (nextE.key === "r") {
              nextE.preventDefault();
              navigate("/random");
            } else if (nextE.key === "t") {
              nextE.preventDefault();
              navigate("/tags");
            } else if (nextE.key === "a") {
              nextE.preventDefault();
              navigate("/about");
            }
            document.removeEventListener("keydown", nextKeyHandler);
          };

          // 다음 키를 기다림 (1초 후 타임아웃)
          document.addEventListener("keydown", nextKeyHandler);
          setTimeout(() => {
            document.removeEventListener("keydown", nextKeyHandler);
          }, 1000);
          return;
        }

        // ESC: 모달들 닫기 (다른 컴포넌트에서 처리됨)
        if (e.key === "Escape") {
          // 모달이 열려있으면 닫기 (다른 컴포넌트에서 처리됨)
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onSearchOpen]);

  return null; // 이 컴포넌트는 렌더링하지 않음
};

export default KeyboardShortcuts;
