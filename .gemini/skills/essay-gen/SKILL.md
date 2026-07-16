---
name: essay-gen
description: Plan and write an English first-person reflective essay on software work, collaboration, craft, or career — the blog's default new-post workflow.
---

# Essay Generation Skill

이 블로그의 **새 포스트 기본 워크플로우**다. 도구 비교·가격표·수익형 how-to는 은퇴했다. 이제 새 글은 **영어 1인칭 성찰 에세이** — 실무·협업·엔지니어링 태도·커리어에서 겪은 긴장을 솔직하게 풀어낸다. 지침은 한국어로 읽되 **결과물(본문·frontmatter)은 전부 영어**다.

참고 톤: wangcong.org의 *"Why I Stopped Arguing With People"* 계열. 원칙 문서:
- 목소리 → [`docs/essay-voice-guide.md`](../../../docs/essay-voice-guide.md)
- 작성 원칙 → [`docs/essay-content-guide.md`](../../../docs/essay-content-guide.md)
- 아이디어 뱅크 → [`docs/essay-backlog.md`](../../../docs/essay-backlog.md)
- 발행 점검 → [`workflow/essay-publishing-checklist.md`](../../../workflow/essay-publishing-checklist.md)

> **필수 렌즈 (2026~): AI 활용 관점.** 이제 AI 코딩 도구(Claude Code·Codex·Grok·Gemini) 없는 개발은 사실상 불가능하다. **모든 에세이는 이 현실을 논증에 녹이고, 과거→현재→미래의 변화 궤적을 짚는다.** 도구 비교·가격표 회귀가 아니라, 성찰의 긴장을 AI 렌즈로 재해석하는 것이다. 상세는 [`essay-content-guide.md`](../../../docs/essay-content-guide.md) §4.5.

## Trigger

> **언어를 명시하지 않은 새 글 요청은 전부 이 스킬로, 영어 에세이로 쓴다.** (루트 `GEMINI.md` "기본 언어: 영어" 배너)

- "포스팅 작성해줘", "새 글 써줘", "에세이 써줘", "글 써줘 \<주제\>"
- "write a post / essay about \<topic\>"
- 주제 없이 "뭐 쓸까", "아이디어 뽑아줘" → Phase 0만 돌려 백로그로 제안.

**예외(이 스킬을 쓰지 않음)**: 기존 한국어 글 수정, 사용자가 한국어를 명시적으로 요청, `오늘의 AI뉴스 생성해줘`(별도 한국어 스킬 `ai-news-gen`).

## Phase 0 — Plan / Ideate (기획)

- **주제가 주어지면**: 한 문장 긴장으로 벼린다 — "나는 X라고 믿었는데 실제론 Y였다" 형태. 이게 에세이의 척추다.
- **주제가 없거나 "아이디어"를 원하면**: [`docs/essay-backlog.md`](../../../docs/essay-backlog.md)를 읽고 3~5개 각도를 제안한다. 새 각도는 백로그 표에 추가(긴장·가제·검색 구절·클러스터·`idea`).
- 하나로 좁혀지면 상태를 `drafting`으로 바꾸고 다음 단계로.

## Phase 1 — Research & Grounding (근거)

- 철학·심리·과학 렌즈 **1~2개**를 고른다(참고 에세이는 노자 하나로 충분). 논증에 녹일 것, 장식 아님.
- 외부 사실 주장(수치·연구·역사적 사실)이 있으면 WebSearch로 확인하고 출처를 챙긴다.
- **날조 금지**: 개인 일화·회사·인물을 지어내지 않는다(voice guide §5). 구체적 실화가 필요하면 **작성자에게 물어본다** — 지어내지 말고.

## Phase 2 — Frame (뼈대)

- **한 문장 핵심 메시지**를 확정한다.
- 섹션 개요를 짠다: 개인적 인정/관찰(도입) → 긴장 → 프레임(인용) → 실무적 전환 → 정직한 예외 → 열망의 마무리. 인용이 어디 착지할지 정한다.
- **AI 렌즈 배치(필수)**: 이 긴장이 AI로 코딩하는 현실에서 어떻게 달라지는가를 한 섹션 이상에 녹이고, 과거→현재→미래 궤적을 어디서 짚을지 정한다(content guide §4.5). 억지 단락이 아니라 논지를 실제로 바꾸는 지점에.
- **hybrid 제목** 후보 3개(검색 구절 ∩ 궁금증, ≤60자, 콜론 부제·"In the Age of AI" 금지).

## Phase 3 — Draft (초안)

- [`essay-voice-guide.md`](../../../docs/essay-voice-guide.md)를 적용한다: 1인칭, 짧고 결론부터, 괄호로 정직함, 반전 구조.
- **첫 2~4문장에 핵심 주장/긴장 착지**(에세이식 두괄식). "In this post we'll…" 금지.
- 본문은 **소제목 없이 도입부부터** 시작(제목은 frontmatter에서 렌더).
- **초안 전 제약 설계**: 이 주제가 유혹할 클리셰 8~12개를 미리 적고 대체 방향을 짝짓는다(content guide §5).
- 목표 분량 **~1,500–2,200 단어**. 산문으로, 리스티클 슬롭 금지.

## Phase 4 — Edit & Verify (검수·검증)

- **자기 점검 패스**: 가장 많이 반복한 군더더기 단어 3~5개를 찾아 추가 금지하고 그 문단을 재작성.
- [`workflow/essay-publishing-checklist.md`](../../../workflow/essay-publishing-checklist.md)를 훑는다.
- FAQ를 넣었다면 본문이 아니라 frontmatter `faq:`에만.
- `npm run build`(astro check 포함) 통과 확인.
- 발행하면 백로그의 해당 아이디어 상태를 `published`로.

## Frontmatter (에세이 스키마 — 필드 최소화)

```yaml
---
title: "Why I Stopped Arguing With People"
date: 2026-07-08
lang: en                     # 필수. 빠뜨리면 ko로 처리됨
category: think              # work | think | (book)
summary: "Winning a technical argument often costs you the person. Here is why I stopped optimizing for being right and started optimizing for getting better."
tags: ["disagreement", "collaboration", "working-mindset"]
faq:                         # 선택 — 진짜 질문만
  - q: "Does this mean you never push back on bad decisions?"
    a: "No. I still say what I think once, clearly. I just stopped mistaking repetition for persuasion."
# updatedAt: 2026-07-08      # 실제로 보강했을 때만
---
```

- **쓰지 않는 필드**: `contentType`, `intent`, `primaryKeyword`, `secondaryKeywords`, `priceCheckedAt`, `tested`, `audience` (수익형 how-to 잔재).
- `slug` 필드 없음 — 파일명이 곧 slug.

## 파일 위치 & slug

- `src/content/posts/<english-slug>.md` 에 **평평하게**(카테고리 폴더 없음). URL은 `/<english-slug>/`.
- slug는 영어 케밥케이스, 핵심 검색 구절을 앞에. 예: `why-i-stopped-arguing-with-people`.

## Category & 클러스터 태그

- **category**: `work`(실무·협업·커리어 현장) / `think`(성찰·철학적) / 가끔 `book`. 세 slug 모두 영어 라벨(Work / Thoughts / Reading)이라 영어 글에 써도 된다.
- **클러스터 태그**: `engineering-craft`, `collaboration`, `career`, `working-mindset` 중 1개 + 구체 태그 2~3개. 같은 태그 2편↑이면 `/tags/<slug>/` 허브 자동 생성.

## Markdown 규칙

- 본문 `$`는 전부 `\$`로 이스케이프(remark-math가 `$...$`를 수식으로 먹는다).
- `**text(parens)**` 금지 → `**text\(parens\)**` 또는 `<strong>text(parens)</strong>`.
- 이미지엔 `alt`.

## 자동 생성물 (손대지 말 것)

JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`), `llms.txt`, 글별 raw `.md`, `robots.txt`, Open Graph/Twitter, canonical, sitemap, RSS/Atom은 자동. `lang: en`을 넣으면 `inLanguage`/`<html lang>`/`og:locale`/raw `.md`의 `language`가 영어로 잡힌다.

## Example Trigger

User: "코드 리뷰에 대한 글 하나 써줘"
Agent: Phase 0에서 긴장을 "리뷰는 틀린 곳 찾기가 아니라 의도를 먼저 묻는 것"으로 벼리고, `templates/essay.md` 골격으로 `src/content/posts/code-review-is-not-reading-code.md`를 `lang: en`·`category: collaboration용 work`로 쓰고 빌드까지 확인한다.
