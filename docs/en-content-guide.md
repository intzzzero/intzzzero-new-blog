# Writing English Posts for Search and AI Citation (SEO + GEO)

> 영어 수익형 콘텐츠를 쓸 때의 가이드다. 한국어 가이드([`seo-geo-content-guide.md`](./seo-geo-content-guide.md))의 원칙은 그대로 유효하고, 여기선 영어 글에만 해당하는 것들을 더한다. 톤은 마케팅이 아니라 "솔로 개발자가 솔로 개발자에게 정직하게 쓰는 실용글"이다.

## 0. 한 줄 요약

첫 100단어 안에 검색 의도에 직답하고, 실제 경험(코드·폴더·비용·실패)을 박고, 비교는 표로, 과장은 빼고, `lang: en`을 frontmatter에 넣는다. 나머지는 디테일.

## 1. 두 가지 일, 하나의 글 (영어판)

- **SEO** — "claude code vs cursor", "cheapest saas stack" 같은 영어 키워드로 잡히게.
- **GEO** — ChatGPT / Perplexity / Gemini가 인용하게. AI는 짧고 자립적이고 결론부터 나오는 문단과 표를 퍼간다.

영어 글은 이 두 가지가 곧 수익(AdSense·제휴)으로 직결된다. 그래서 두괄식과 자립적 섹션이 한국어 글보다 더 중요하다.

## 2. The first 100 words rule

기획안의 핵심 규칙이다.

```text
The first 100 words must answer the search intent directly.
```

- 글 맨 앞에 **Quick Answer**(how-to) 또는 **Quick Verdict**(comparison)를 둔다.
- "In this post we will explore..." 같은 도입부 금지. 바로 답부터.
- 이유·맥락은 그 뒤에.

## 3. 영어 글 필수 섹션 (기획안 6.3)

how-to 글:

1. Quick Answer
2. Who This Guide Is For
3. The Workflow (step-by-step)
4. Example Project Structure
5. A Real Project Note
6. Common Mistakes
7. Checklist
8. When Not to Use This Approach
9. FAQ (frontmatter `faq:`에 미러링)
10. Related Articles

비교 글은 `templates/comparison.md`의 Quick Verdict → Comparison Table → Choose X/Y If → Feature-by-Feature → Real-World Workflow → Pricing → Final Recommendation → FAQ 순.

## 4. Voice — 정직한 실용문체

- Practical, honest, developer-to-developer, specific.
- **Not hype-driven.** "the best", "revolutionary", "game-changer" 류 금지.
- 안 써본 도구를 써본 척하지 않는다(기획안 21.2). trade-off와 실패 사례를 함께 쓴다.
- 제휴 링크가 있으면 명시적으로 고지한다(기획안 15장).

저품질 AI 콘텐츠로 보이지 않으려면: 실제 코드, 실제 폴더 구조, 실제 비용 숫자, 실제 실패 경험 — 이 네 가지 중 최소 둘은 들어가야 한다.

## 5. Title 체크 (영어)

- 핵심 키워드를 앞쪽에. 예: "Claude Code vs Cursor for Solo Developers".
- 60자 이하 권장.
- 낚시·과장 금지.

## 6. 카테고리·클러스터 (평면 구조)

- 클러스터(AI Coding / Solo SaaS / Static Sites / Developer Tools)는 **태그**로: `ai-coding`, `solo-saas`, `static-sites`, `developer-tools`.
- `category`는 영어로 읽히는 slug만: `ai`, `dev`, `node`, `database`, `react`, `javascript`, `css`, `html`, `python`, `network`, `computer-science`, `nestjs`.
- `think`/`book`/`work`/`etc`는 영어 글에 쓰지 않는다(허브가 한국어로 노출됨).

## 7. frontmatter (영어 글)

기획안 7장 템플릿이 아니라 **우리 스키마**를 따른다. 핵심 차이:

| 기획안 템플릿 | 우리 스키마 |
|---|---|
| `description` | `summary` |
| `slug` | (없음 — 파일명이 slug) |
| (없음) | `date` 필수 추가 |
| `lang: "en"` | `lang: en` 필수 |

```yaml
---
title: "Claude Code vs Cursor for Solo Developers"
date: 2026-06-22
updatedAt: 2026-06-22
lang: en
category: dev
summary: "Claude Code suits agentic, repo-wide tasks; Cursor wins for inline edits. Here is how a solo developer should pick, with a real workflow and cost breakdown."
tags: ["claude-code", "cursor", "ai-coding"]
contentType: vs
faq:
  - q: "Can I use both Claude Code and Cursor together?"
    a: "Yes. Many solo devs use Cursor for inline edits and Claude Code for larger agentic tasks."
---
```

## 8. Markdown 규칙

- 본문 `$`는 `\$`로 이스케이프. 가격(`\$10/mo`), env 변수(`$VAR`) 주의 — remark-math가 수식으로 먹는다.
- `**text(parens)**` → `**text\(parens\)**` 또는 `<strong>text(parens)</strong>`.
- 비교·수치는 표. 이미지엔 `alt`.

## 9. 사이트가 알아서 하는 것 (영어 글에서도 자동)

`lang: en`만 넣으면 아래가 영어로 잡힌다. 직접 손대지 말 것.

- JSON-LD `BlogPosting`의 `inLanguage: en`, breadcrumb "Home" 라벨
- `<html lang="en">`, `og:locale: en_US`
- 글별 raw `.md`의 `language: en`
- (나머지) sitemap, RSS/Atom, canonical, llms.txt, robots.txt 자동

## 10. 발행 직전

[`workflow/en-publishing-checklist.md`](../workflow/en-publishing-checklist.md)를 훑고 `npm run build` 통과를 확인한다.
