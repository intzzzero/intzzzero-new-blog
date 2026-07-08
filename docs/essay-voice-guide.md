# Essay Voice Guide — the single first-person voice

> 이 블로그의 영어 에세이는 **한 사람의 목소리**로 쓴다. 페르소나를 새로 만들지 않는다. 그 한 사람은 블로그를 운영하는 솔로 소프트웨어 엔지니어 — 저비용 고효율을 추구하고, 겪어본 것만 말하며, 실수를 숨기지 않는 사람이다. 지침은 한국어로 읽되 **결과물은 전부 영어**다. 참고 톤은 wangcong.org의 *"Why I Stopped Arguing With People"* 계열의 1인칭 성찰 에세이다.

## 1. Stance (자세)

- **1인칭, 처음부터 끝까지.** "I", "me", "my". 3인칭 관찰자("developers should…", "a good engineer…")로 도망가지 않는다. 주장은 내가 겪어서 알게 된 것으로 말한다.
- **가르치는 사람이 아니라 먼저 실수해 본 동료.** 확신에 찬 구루 톤 금지. "I was wrong about this for years" 쪽이 "here's the right way" 보다 강하다.
- **고백으로 열고, 열망으로 닫는다.** 문제를 내 것으로 인정하며 시작하고, 정답 선언이 아니라 "더 나아지고 싶다"는 방향으로 끝낸다.
- **성찰 > 무용담.** 구체적 사건을 지어내지 말고(아래 §5), 겪어온 것에서 나온 *생각*으로 논증한다. 참고 에세이도 특정 일화 대신 보편적 관찰 + 인용 하나로 간다.

## 2. Rhythm (문장 리듬)

- 짧고 결론부터인 문장. 한 문단은 보통 2~4문장.
- 전환점에서는 **한 줄 문단**을 던진다. ("It almost never worked that way.")
- 괄호로 하는 정직함: "(I got this wrong for years.)", "(and yes, I was the reviewer.)"
- 엔지니어의 비유를 아낀다 — 배관, 요리, 정원처럼 손에 잡히는 것. 현학적 전문용어 과시는 금지.
- 대비/반전 구조를 즐긴다: "I walked away technically right and completely alone."

## 3. Stock patterns (상용 패턴)

문장을 복붙하지 말고 *형태*를 참고한다.

- **여는 고백 / 관찰**
  - "I am a software engineer, and I used to ___."
  - "For a long time I believed ___. I was wrong."
  - "There's a moment every ___ recognizes: ___."
- **전개 (주장 → 이유 → 인정)**
  - "The point isn't ___. It's ___."
  - "Here's what I missed: ___."
  - "That's true — and it's also not the whole story."
- **닫기 (열망, 절 아님)**
  - "I stopped ___ not because I stopped caring about ___, but because I wanted something more: ___."
  - "I don't have this figured out. I'm just pointing at the door I walked through."

## 4. Sample paragraph (목표 문체)

> I used to think a pull request was a place to be right. Someone would push code, I'd find the flaw, and I'd leave a comment that was technically correct and quietly smug. I was helping, I told myself. What I was actually doing was teaching people to route around me. The best reviewers I've worked with do the opposite: they ask what problem you were solving before they tell you what's wrong with your solution. It took me an embarrassingly long time to notice that the difference isn't knowledge. It's posture.

이 문단이 왜 맞는가: 1인칭 고백, 짧은 문장, 반전("technically correct and quietly smug"), 지어낸 특정 사건이 아니라 반복 경험의 일반화, 마지막 한 줄의 착지.

## 5. Avoid list (절대 금지)

- **과장어**: "revolutionary", "game-changer", "the best", "supercharge", "unlock", "in today's fast-paced world…". 감탄부호(!), 이모지.
- **리스티클 패딩**: 의미 없는 불릿 나열, "Top 5 ___", "Here are N ways to ___". 에세이는 산문이다.
- **날조 금지 (하드 룰)**: 특정 회사·사람·프로젝트를 지어내지 않는다. "At my last startup, our CTO said…" 같은 가짜 기억 금지. 구체적 이미지가 필요하면 **가정법**으로: "Imagine touching a hot stove — you don't need a second opinion." 실화가 필요하면 **작성자에게 물어본다**(스킬 Phase 1 참고).
- **AI 슬롭 클리셰**: "It's important to note that…", "In conclusion,", "Let's dive in", "delve", "navigate the landscape", "at the end of the day".
- **3인칭 회피**: 훈계조 "you should" 남발 대신 내 경험으로 말한다.

## 6. Relationship to other docs

- 이 문서는 **어떻게 들리는가(voice)** 를 정한다. **무엇을 넣는가(구조·제목·SEO·근거)** 는 [`essay-content-guide.md`](./essay-content-guide.md).
- 발행 직전 점검은 [`workflow/essay-publishing-checklist.md`](../workflow/essay-publishing-checklist.md).
- 실행 워크플로우는 [`.claude/skills/essay-gen/SKILL.md`](../.claude/skills/essay-gen/SKILL.md).
