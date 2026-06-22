# 발행 전 체크리스트

> 글을 `draft: false`로 올리기 전에 한 번 훑는 목록이다. 원칙 설명은 [`docs/seo-geo-content-guide.md`](../docs/seo-geo-content-guide.md)에 있으니, 여기선 체크만 한다. 다 만족 못 해도 괜찮다. 그래도 위쪽 항목들은 가급적 챙기자. 글이 사람한테도, 기계한테도 잘 닿는다.

## 알맹이와 구조

- [ ] **두괄식 요약이 첫머리에 있다** (200자 안에 결론부터)
- [ ] 핵심 키워드가 **제목 / `summary` / 첫 H2 / 첫 문단**에 자연스럽게 들어갔다
- [ ] `summary`가 140~160자쯤 된다 (메타 설명/AI 인용에 쓰임)
- [ ] heading 계층(H2/H3)이 자연스러운 목차를 이룬다
- [ ] **비교나 수치는 표로** 정리했다 (AI가 추출하기 좋음)
- [ ] 각 섹션이 따로 떼어내도 말이 된다 (자립성)

## 링크와 출처

- [ ] **내부 링크 3개 이상** — 관련 글끼리 묶어 토픽 클러스터 강화
- [ ] 근거가 필요한 주장에는 **외부 출처 링크**
- [ ] 출처는 글 하단에 모아뒀다

## FAQ (있으면)

- [ ] 본문 FAQ를 frontmatter `faq:` 배열에 그대로 미러링했다 (→ `FAQPage` 자동 생성)
- [ ] 진짜 사람이 던질 법한 질문인가 (억지 질문 아님)

## 마크다운 깨짐 방지

- [ ] 본문의 `$`는 전부 `\$`로 이스케이프 (안 하면 `remark-math`가 수식으로 먹어버린다)
- [ ] `**텍스트(괄호)**`는 괄호를 이스케이프(`\(` `\)`)하거나 `<strong>` 태그로
- [ ] 이미지에 `alt` 텍스트가 있다 (이미지가 있으면)

## frontmatter

- [ ] `title`, `date` 채움
- [ ] `category`가 아래 slug 중 **정확히 하나**:
      `javascript`, `react`, `computer-science`, `think`, `book`, `ai`, `etc`, `node`, `database`, `work`, `network`, `dev`, `css`, `html`, `python`, `nestjs`
- [ ] 파일이 `src/content/posts/<slug>.md`에 **평평하게** 놓였다 (카테고리 폴더 없음, URL은 `/<slug>/`)
- [ ] `updatedAt`은 **실제로 내용을 고쳤을 때만** 갱신했다 (날짜만 바꾸기 금지)

## 빌드 확인

- [ ] `npm run build` 통과 (`astro check` 포함)
- [ ] 글이 **올바른 카테고리 허브**에 노출되는지 확인
- [ ] sitemap에 잡히는지 확인

## 직접 안 해도 되는 것 (자동)

아래는 사이트가 알아서 한다. 손대지 말 것.

- JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`/`CollectionPage`)
- `llms.txt`, 글별 raw `.md`(`/<slug>.md`), AI 크롤러 허용 `robots.txt`
- Open Graph / Twitter 카드, canonical, sitemap, RSS + Atom
