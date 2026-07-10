# Essay Content Guide — reflective essays on work, collaboration, craft, career

> 이 블로그의 새 기본 장르는 **영어 1인칭 성찰 에세이**다. 실무·협업·엔지니어링 태도·커리어에서 겪은 긴장을 솔직하게 풀어낸다. 도구 비교·가격표·"이런 사람은 쓰지 마세요" 같은 수익형 how-to 골격은 더 이상 쓰지 않는다. **목소리**는 [`essay-voice-guide.md`](./essay-voice-guide.md), **발행 점검**은 [`workflow/essay-publishing-checklist.md`](../workflow/essay-publishing-checklist.md). 지침은 한국어, 결과물은 영어.

## 0. 한 줄 요약

내가 겪은 긴장 하나를 첫 문단에서 인정하고, 짧은 섹션으로 개인 경험 → 프레임(철학·심리·과학 인용 1~2개) → 실무적 전환 → 정직한 예외 → 열망의 마무리로 끌고 간다. 지어낸 일화는 안 쓰고, 검색 가능한 제목 하나를 붙인다.

## 1. Lead with the realization (에세이식 두괄식)

- 참고 에세이는 첫 문단에서 핵심 깨달음을 던진다: *"I would walk away technically right and completely alone."*
- 첫 2~4문장 안에 **이 글의 핵심 주장/긴장**을 세운다. 그다음에 그걸 벌어들인다(earn it).
- **금지**: "In this post we'll explore…", "Have you ever wondered…", 정의부터 늘어놓기.
- SEO 박스("## Quick Answer")를 만들지 않는다. 두괄식은 *산문*으로 한다.

## 2. Title — hybrid (검색 ∩ 궁금증)

제목은 클릭 유도이면서 **검색 발견**이다. 아무도 검색하지 않는 제목은 없는 것과 같다.

- **형태**: 선언형 반전 / 질문형 / 1인칭 고백형.
  - 반전형: "Code Review Isn't Reading Code"
  - 질문형: "Where Does an Engineer's Judgment Come From?"
  - 1인칭형: "Why I Stopped Arguing With People"
- 사람이 실제로 칠 법한 **명사구 하나**를 제목 앞쪽에 둔다("code review", "arguing", "technical debt").
- ≤ 60자 권장. **금지**: 콜론 부제("X: The Y of Z"), em-dash 이중 제목, "In the Age of AI ___" 접두, 낚시.
- 발행 전 자문: "내가 이걸 찾는다면 뭐라고 검색할까?" 그 구절이 title·첫 H2·도입부에 들어가는지 확인.

## 3. Structure (참고 에세이의 골격)

제목은 frontmatter에서 렌더되므로 **본문은 소제목 없이 도입부부터** 시작한다("## 도입" 같은 헤딩 금지).

1. **Opening** (헤딩 없음) — 개인적 인정 또는 긴장을 이름 붙이는 관찰. 핵심 주장 착지.
2. **`## <the tension>`** — 왜 이게 진짜 문제인지, 순진했던 내 생각을 드러내며.
3. **`## <the frame>`** — 철학/심리/과학 렌즈 1~2개로 재해석(§4).
4. **`## <the practical turn>`** — 그래서 실무에서 뭐가 달라지는가.
5. **`## <the honest exception>`** — 이 주장이 통하지 않는 경우. (참고 에세이의 "helping when asked"에 해당.)
6. **Aspirational close** — 절하지 말고 방향을 제시. 열망으로 착지.

- 목표 분량 **~1,500–2,200 단어**. 얇으면 성찰이 안 되고, 6자 넘게 길면 늘어진다.
- 각 섹션은 떼어내도 말이 되게(GEO 인용 가능) 하되 **불릿 슬롭이 아니라 산문**. 표는 이 장르에서 거의 안 쓴다.

## 4. Grounding — reflective only (근거)

- **철학·심리·과학 렌즈 1~2개**를 논증에 **녹여** 쓴다(장식 아님). 참고 에세이는 노자 『도덕경』 하나로 충분했다. 예: Kahneman의 편향, 인지부하 이론, 스토아 철학, Dunning–Kruger, 아리스토텔레스 수사학.
- **≥3 인용 할당량 없음.** 억지 인용 3개보다 울림 있는 1개가 낫다.
- 외부 사실 주장(수치·연구·역사적 사실)에는 출처를 달고 하단 `## Sources`에 링크. 최신 사실은 WebSearch로 확인.
- **날조 금지**: 지어낸 개인 일화·회사·인물 금지(→ [`essay-voice-guide.md`](./essay-voice-guide.md) §5). 실화가 필요하면 작성자에게 물어 진짜만 쓴다.

## 4.5 AI-assisted coding lens (모든 에세이의 필수 렌즈, 2026~)

이제 AI 도구(Claude Code·Codex·Grok·Gemini) 없이 코딩은 사실상 불가능하다. 그래서 **모든 에세이는 AI로 코딩하는 현실을 논증에 녹인다.** 별도 챕터를 덧붙이는 게 아니라 긴장 자체를 이 렌즈로 재해석한다.

- **과거→현재→미래 궤적을 한 번은 짚는다.** 이 주제가 AI 이전엔 어땠고, 도구가 흔해진 지금 어떻게 달라졌으며, 앞으로 어디로 갈지. 미래 예측은 겸손하게(단정 금지), 근거는 내 경험·인용에서 끌어온다.
- **녹여 쓴다, 덧붙이지 않는다.** "그런데 요즘은 AI가…" 식 억지 단락 금지. AI 각도가 그 에세이의 논지를 실제로 바꾸는 지점에만 넣는다. 논지가 안 바뀌면 왜 안 바뀌는지가 오히려 통찰 — 그걸 쓴다.
- **회귀 금지.** 은퇴한 도구 비교·가격표·"이 도구 이렇게 쓰세요" how-to로 돌아가지 않는다. 여전히 1인칭 성찰 산문이다. **AI는 소재가 아니라 렌즈다.**
- **정직한 자세.** 이 도구들을 매일 쓰는 엔지니어로서 말한다 — 무비판적 예찬도, 러다이트식 거부도 아니고, 겪으며 알게 된 득실로. (목소리는 [`essay-voice-guide.md`](./essay-voice-guide.md) §1.)
- **제목은 렌즈를 숨긴다.** "In the Age of AI ___", "How AI Changes ___" 류 접두·클리셰 제목 금지(§2). 렌즈는 제목이 아니라 본문에서 드러난다.

## 5. Constraint design (반-AI슬롭, storyteller에서 이식)

- **초안 전**: 이 주제가 유혹할 클리셰 8~12개를 미리 적고 각각 대체 방향을 짝짓는다. 예: "revolutionary → 기존 방식이 못 하던 그 한 가지를 명시", "various/many → 실제 항목 2~3개를 직접", "efficient → 무엇이 몇 단계 줄었는지".
- **초안 후**: 내가 가장 많이 반복한 군더더기 단어 3~5개를 찾아 추가 금지하고 그 문단을 다시 쓴다.
- 상시 금지: 감탄부호·이모지·근거 없는 단정. Avoid list 전체는 voice guide §5.

## 6. Light SEO / GEO (에세이 우선)

수익형 장치는 뺐지만, 검색·AI 인용 노출은 유지한다.

- 핵심 검색 구절을 **title·첫 섹션·도입부**에 자연스럽게.
- `summary` **140–160자**, 두괄식(핵심 주장을 앞에).
- `faq:`는 **선택** — 진짜 사람이 물을 법한 질문만. 넣으면 FAQPage JSON-LD 자동 생성. 본문에 FAQ를 중복하지 않는다(frontmatter만).
- 키워드 스터핑·상업 필드(`contentType`/`intent`/`priceCheckedAt`) **쓰지 않는다**.
- 내부 링크는 억지 3개 할당이 아니라, 자연스럽게 이어지는 관련 에세이 1~3개.

## 7. Category & tags

- **category**: `work`(실무·협업·커리어 현장), `think`(성찰·철학적), 가끔 `book`(책에서 출발한 글). 세 slug 모두 이제 영어 라벨이다(Work / Thoughts / Reading). 상업 slug 불필요.
- **에세이 클러스터 태그**(옛 제품 클러스터를 대체): `engineering-craft`, `collaboration`, `career`, `working-mindset`.
  - 에세이 1편 = **클러스터 태그 1개 + 구체 태그 2~3개**(예: `code-review`, `disagreement`, `seniority`).
  - 같은 태그 글이 2편 이상이면 `/tags/<slug>/` 허브가 자동 생성된다.

## 8. Frontmatter (에세이 스키마 — 필드 최소화)

```yaml
---
title: "Why I Stopped Arguing With People"
date: 2026-07-08
lang: en                     # 필수. 빠뜨리면 ko로 처리되어 언어 메타가 전부 틀어진다
category: think              # work | think | (book)
summary: "Winning a technical argument often costs you the person. Here is why I stopped optimizing for being right and started optimizing for getting better."
tags: ["disagreement", "collaboration", "working-mindset"]
faq:                         # 선택
  - q: "Does this mean you never push back on bad decisions?"
    a: "No. I still say what I think once, clearly. I just stopped mistaking repetition for persuasion."
# updatedAt: 2026-07-08      # 실제로 보강했을 때만
---
```

- **쓰지 않는 필드**: `contentType`, `intent`, `primaryKeyword`, `priceCheckedAt`, `tested` (수익형 how-to 잔재).
- `slug` 필드 없음 — 파일명이 곧 slug. `src/content/posts/<english-slug>.md`, URL `/<slug>/`.

## 9. Markdown 안전 규칙 (유지)

- 본문 `$`는 전부 `\$`로 이스케이프(remark-math가 `$...$`를 수식으로 먹는다).
- `**text(parens)**` 금지 → `**text\(parens\)**` 또는 `<strong>text(parens)</strong>`.
- 이미지엔 `alt`.

## 10. 사이트가 알아서 하는 것 (손대지 말 것)

`lang: en`만 넣으면 자동으로 영어로 잡힌다: JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`)의 `inLanguage`, `<html lang="en">`, `og:locale="en_US"`, 글별 raw `.md`의 `language`, canonical, Open Graph/Twitter, sitemap, RSS/Atom, llms.txt, robots.txt.
