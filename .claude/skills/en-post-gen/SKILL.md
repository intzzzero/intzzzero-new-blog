---
name: en-post-gen
description: Generate an English-first developer blog post (how-to or comparison) for solo developers and indie hackers.
---

# English Post Generation Skill

영어 우선 포스팅을 검색·작성하는 스킬이다. 한국어 글은 그대로 두고, **앞으로의 수익형 콘텐츠는 영어로** 찍어낸다. 지침은 한국어로 읽되 **결과물(글 본문·frontmatter)은 전부 영어**로 쓴다.

## Trigger

- "영어 포스팅 작성해줘", "영어 글 써줘 \<주제\>"
- "write an English post about \<topic\>"

주제가 비교형(X vs Y)이면 비교 템플릿, 그 외엔 how-to 템플릿을 쓴다.

## Voice (기획안 17.3)

- Practical, honest, developer-to-developer, specific. **Not hype-driven.**
- 한국어 글의 반말·위트 톤과는 별개다. 영어 글은 담백한 실용문체로 쓴다.
- 안 써본 도구를 써본 척하지 않는다. trade-off와 실패 사례를 같이 쓴다(기획안 21.2).

## Workflow (기획안 17.1)

1. **Search Intent Brief** — 이 글을 찾는 사람이 검색창에 뭐라고 칠지, 무슨 답을 원하는지 한 줄로 정의. 필요하면 최신 정보·가격·버전을 웹 검색으로 확인(`priceCheckedAt`에 확인일 기록).
2. **Outline** — `templates/how-to.md` 또는 `templates/comparison.md`의 골격을 채운다.
3. **Draft** — 첫 100단어 안에 검색 의도에 **직답**한다(기획안 6.2). 결론 먼저.
4. **Human Experience Injection** — 실제 프로젝트 구조·프롬프트·폴더·비용·실패 사례를 박는다. 일반론 금지.
5. **SEO/GEO Review** — `docs/en-content-guide.md`로 점검.
6. **Internal Links** — 관련 글 3개 이상 연결(토픽 클러스터). 같은 클러스터 태그 글끼리 묶는다.
7. **Publish Check** — `workflow/en-publishing-checklist.md` 훑고 `npm run build` 통과 확인.

## 필수 구성요소 (기획안 6.3)

영어 글에는 아래를 포함한다(how-to 기준). 비교글은 comparison 템플릿 구성을 따른다.

1. Quick Answer (첫 100단어 직답)
2. Who This Guide Is For
3. The Workflow / Step-by-step
4. Example Project Structure (코드·폴더 구조)
5. Real Project Note (실제 경험)
6. Common Mistakes
7. Checklist
8. When Not to Use This Approach
9. FAQ (frontmatter `faq:`에 미러링)
10. Related Articles
11. Last updated (`updatedAt`)

## Frontmatter (중요 — 우리 스키마로 변환해서 쓴다)

기획안 7장 템플릿은 필드명이 다르다(`description`, `slug` 등). **반드시 아래 우리 스키마로 변환**해서 생성한다. 안 그러면 빌드가 깨진다.

```yaml
---
title: "How I Use Claude Code to Build Small Web Apps"
date: 2026-06-22                       # 필수. 기획안 템플릿엔 빠져 있으니 반드시 추가
updatedAt: 2026-06-22
lang: en                               # 영어 글 필수. 빠뜨리면 ko로 처리됨
category: ai                           # "영어 카테고리·클러스터 규칙" 참고
summary: "A 140-160 char meta description that answers the search intent up front."
tags: ["claude-code", "ai-coding", "solo-developer"]   # 클러스터 = 태그
contentType: vs                        # 비교글만(선택). how-to는 생략 가능
intent: informational                  # 선택
primaryKeyword: "claude code workflow" # 선택
faq:
  - q: "Is Claude Code good for beginners?"
    a: "..."
---
```

매핑 요약:
- 기획안의 `description` → 우리 스키마는 **`summary`**
- 기획안의 `slug` 필드 → **없음**. 파일명이 곧 slug다.
- **`date` 필수** 추가. `lang: en` 필수.

## Markdown 규칙

- 본문 `$`는 전부 `\$`로 이스케이프(remark-math가 `$...$`를 수식으로 먹는다). 가격 `\$10`, env `$VAR` 주의.
- 강조 안 괄호: `**text(parens)**` 금지 → `**text\(parens\)**` 또는 `<strong>text(parens)</strong>`.
- 비교·수치는 표로. 이미지엔 `alt`.

## 파일 위치 & slug

- `src/content/posts/<english-slug>.md` 에 **평평하게** 둔다(카테고리 폴더 없음). URL은 `/<english-slug>/`.
- slug는 영어 케밥케이스. 핵심 키워드를 앞에 둔다. 예: `how-i-use-claude-code-to-build-small-web-apps`.

## 영어 카테고리·클러스터 규칙

- 기획안 4개 클러스터는 **태그**로 표현한다: `ai-coding`, `solo-saas`, `static-sites`, `developer-tools`. 태그 글이 2개 이상 모이면 `/tags/<slug>/` 허브가 자동 생성된다.
- `category`는 기존 16개 slug 중 **영어로 읽히는 것**만 쓴다: `ai`, `dev`, `node`, `database`, `react`, `javascript`, `css`, `html`, `python`, `network`, `computer-science`, `nestjs`.
- 한국어 이름 slug(`think`=생각, `book`=독서, `work`=일, `etc`=기타)는 영어 글 breadcrumb/허브에서 한국어로 노출되니 **쓰지 않는다**.

## 자동 생성물 (손대지 말 것)

JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`), `llms.txt`, 글별 raw `.md`, `robots.txt`, Open Graph/Twitter, canonical, sitemap, RSS/Atom은 자동이다. `lang: en`을 넣으면 `inLanguage`/`<html lang>`/`og:locale`/raw `.md`의 `language`가 알아서 영어로 잡힌다.

## Constraints

- 본문 분량은 검색 의도를 충족할 만큼(보통 1,200단어 이상). 얇은 글은 AdSense 정책상 불리(기획안 21.4).
- `category`는 반드시 위 영어 slug 중 하나이거나 생략.
- `summary` 140~160자(영문 기준 문자 수).
- **검증**: `npm run build`가 통과해야 한다(astro check 포함).

## Example Trigger

User: "write an English post about using Claude Code for small web apps"
Agent: 위 워크플로우대로 `src/content/posts/how-i-use-claude-code-to-build-small-web-apps.md`를 `lang: en`으로 생성하고 빌드까지 확인한다.
