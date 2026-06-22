# English Post — Publishing Checklist

> 영어 글을 `draft: false`로 올리기 전에 훑는 목록이다. 원칙은 [`docs/en-content-guide.md`](../docs/en-content-guide.md)에 있고, 여기선 체크만 한다.

## Language & frontmatter (영어 글 필수)

- [ ] `lang: en` 설정됨 (빠뜨리면 `ko`로 처리되어 언어 메타가 전부 틀어진다)
- [ ] `title`, `date` 채움 (`date`는 기획안 템플릿에 없으니 빠뜨리기 쉬움 — 꼭 확인)
- [ ] `summary`가 140~160자 (영어 글의 `description` 자리 — 우리 스키마는 `summary`)
- [ ] slug(파일명)가 **영어 케밥케이스**, 핵심 키워드가 앞쪽
- [ ] `category`가 영어로 읽히는 slug (`ai`, `dev`, `node`, `database`, `react`, `javascript`, `css`, `html`, `python`, `network`, `computer-science`, `nestjs`) 또는 생략 — `think`/`book`/`work`/`etc` 금지
- [ ] 클러스터 태그 포함 (`ai-coding` / `solo-saas` / `static-sites` / `developer-tools`)

## 알맹이와 구조

- [ ] **첫 100단어가 검색 의도에 직답**한다 (Quick Answer / Quick Verdict)
- [ ] "In this post we will..." 식 도입부 없음 — 결론부터
- [ ] 필수 섹션 존재: Quick Answer · Who this is for · Step-by-step · Example/Code · Real project note · Common mistakes · Checklist · When not to use · FAQ · Related
- [ ] 핵심 키워드가 title / `summary` / 첫 H2 / 첫 문단에 자연스럽게
- [ ] **비교나 수치는 표로**
- [ ] 각 섹션이 따로 떼어내도 말이 된다 (자립성)

## 정직성 (저품질 AI 콘텐츠 회피)

- [ ] 실제 코드/폴더/비용/실패 중 최소 둘이 들어감
- [ ] 과장 표현 없음 ("best", "revolutionary", "game-changer" 류 자제)
- [ ] 안 써본 도구를 써본 척하지 않음
- [ ] 제휴 링크가 있으면 명시 고지
- [ ] 가격을 언급했으면 `priceCheckedAt`에 확인일 기록

## 링크와 출처

- [ ] **내부 링크 3개 이상** — 같은 클러스터 글끼리 묶어 토픽 클러스터 강화
- [ ] 근거가 필요한 주장에는 외부 출처 링크

## FAQ (있으면)

- [ ] 본문 FAQ를 frontmatter `faq:` 배열에 그대로 미러링 (→ `FAQPage` 자동 생성)
- [ ] 진짜 사람이 던질 법한 질문인가

## 마크다운 깨짐 방지

- [ ] 본문의 `$`는 전부 `\$`로 이스케이프
- [ ] `**text(parens)**`는 이스케이프 또는 `<strong>` 태그
- [ ] 이미지에 `alt` 텍스트

## 빌드 확인

- [ ] `npm run build` 통과 (`astro check` 포함)
- [ ] 빌드 산출물에 `<html lang="en">`, JSON-LD `"inLanguage":"en"`, `og:locale="en_US"`, raw `.md`의 `language: en` 확인
- [ ] sitemap·RSS·llms.txt에 글이 잡히는지 확인

## 직접 안 해도 되는 것 (자동)

- JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`) — `lang: en` 넣으면 영어로 자동
- `<html lang>` / `og:locale` / raw `.md`의 `language` — `lang`에서 자동
- `llms.txt`, 글별 raw `.md`, `robots.txt`, Open Graph/Twitter, canonical, sitemap, RSS + Atom
