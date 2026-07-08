# 음수와 양수 사이

intzzzero의 개발 블로그. Astro 기반 정적 사이트.

## 개발

```bash
npm install
npm run dev      # 개발 서버 (localhost:4321)
npm run build    # 정적 빌드 + Pagefind 검색 인덱싱 (dist/)
npm run preview  # 빌드 결과 미리보기
npm run check    # astro check (타입 검증)
```

## 구조

- `src/content/posts/<slug>.md` — 블로그 글 (URL은 `/<slug>/`)
- `src/pages/` — 라우트 (홈, 카테고리, 태그, 아카이브, 검색, RSS/Atom, llms.txt, robots.txt)
- `src/data/categories.ts` — 카테고리 정의
- `src/site.config.ts` — 사이트 설정 (도메인, GA, AdSense)
- `docs/essay-voice-guide.md` — 영어 에세이 목소리 가이드 (기본 장르)
- `docs/essay-content-guide.md` — 영어 에세이 작성 원칙
- `docs/essay-backlog.md` — 에세이 아이디어 뱅크
- `workflow/essay-publishing-checklist.md` — 에세이 발행 체크리스트
- `.claude/skills/essay-gen/` — 영어 성찰 에세이 워크플로우 스킬·템플릿
- `docs/seo-geo-content-guide.md` — 한국어 글 SEO/GEO 가이드 (예외용)
- `workflow/publishing-checklist.md` — 한국어 글 발행 체크리스트 (예외용)

## 글쓰기

`src/content/posts/`에 마크다운 파일을 추가한다. frontmatter는 `title`, `date`, `category`(16개 slug 중 하나) 등. JSON-LD, llms.txt, 포스트별 raw `.md`, robots.txt, sitemap, RSS/Atom은 빌드 시 자동 생성된다. 자세한 작성 원칙은 위 가이드를 참고.

새 글의 기본 장르는 **영어 1인칭 성찰 에세이**(실무·협업·엔지니어링 태도·커리어)다. frontmatter에 `lang: en`을 넣고 같은 `src/content/posts/`에 평평하게 둔다(URL `/<slug>/`). 그러면 `inLanguage`·`<html lang>`·`og:locale`·raw `.md`의 `language`가 자동으로 영어로 잡힌다. 워크플로우는 `.claude/skills/essay-gen/`, 원칙은 `docs/essay-content-guide.md`·`docs/essay-voice-guide.md`를 참고.
