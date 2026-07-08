# Essay — Publishing Checklist

> 영어 성찰 에세이를 `draft: false`로 올리기 전에 훑는 목록이다. 원칙은 [`docs/essay-content-guide.md`](../docs/essay-content-guide.md), 목소리는 [`docs/essay-voice-guide.md`](../docs/essay-voice-guide.md). 여기선 체크만 한다.

## Language & frontmatter

- [ ] `lang: en` 설정됨 (빠뜨리면 `ko`로 처리되어 언어 메타가 전부 틀어진다)
- [ ] `title`, `date` 채움
- [ ] `summary`가 140~160자, 두괄식(핵심 주장이 앞에)
- [ ] slug(파일명)가 **영어 케밥케이스**, 핵심 검색 구절이 앞쪽
- [ ] `category`가 `work` / `think` / (`book`) 중 하나
- [ ] 클러스터 태그 1개(`engineering-craft` / `collaboration` / `career` / `working-mindset`) + 구체 태그 2~3개
- [ ] 상업 필드(`contentType`/`intent`/`primaryKeyword`/`priceCheckedAt`/`tested`) **없음**

## Voice & structure (참고 에세이처럼)

- [ ] 1인칭, 처음부터 끝까지 ("I")
- [ ] **첫 2~4문장에 핵심 주장/긴장 착지** (에세이식 두괄식) — "In this post we'll…" 없음
- [ ] 본문이 **소제목 없이 도입부부터** 시작 (`## 도입` 헤딩 없음)
- [ ] 구조 흐름: 개인적 인정/관찰 → 긴장 → 프레임(인용) → 실무적 전환 → 정직한 예외 → 열망의 마무리
- [ ] 분량 ~1,500–2,200 단어
- [ ] 산문. 리스티클/불릿 슬롭 아님. 표는 거의 없음
- [ ] 마무리가 절이 아니라 열망/방향

## Grounding & honesty

- [ ] 철학·심리·과학 렌즈 1~2개가 논증에 **녹아** 있음 (장식 아님)
- [ ] **지어낸 일화·회사·인물 없음** — 실화만, 없으면 가정법/일반화
- [ ] 과장어 없음 ("best", "revolutionary", "game-changer", "supercharge" 류)
- [ ] 감탄부호·이모지 없음
- [ ] AI 슬롭 클리셰 없음 ("delve", "navigate the landscape", "It's important to note", "Let's dive in")
- [ ] 초안 후 자기 점검 패스 수행: 가장 많이 반복한 군더더기 단어 3~5개 제거/재작성

## Links & sources

- [ ] 자연스러운 내부 링크 1~3개 (억지 할당 아님)
- [ ] 외부 사실 주장에는 출처 링크, 하단 `## Sources`에 정리 (인용 없으면 생략)

## FAQ (선택)

- [ ] 넣었다면 진짜 사람이 던질 법한 질문인가
- [ ] frontmatter `faq:`에만 있고 본문에 중복하지 않음 (→ `FAQPage` 자동 생성)

## Markdown 깨짐 방지

- [ ] 본문의 `$`는 전부 `\$`로 이스케이프
- [ ] `**text(parens)**`는 이스케이프 또는 `<strong>` 태그
- [ ] 이미지에 `alt` 텍스트

## 빌드 확인

- [ ] `npm run build` 통과 (`astro check` 포함)
- [ ] 빌드 산출물에 `<html lang="en">`, JSON-LD `"inLanguage":"en"`, `og:locale="en_US"`, raw `.md`의 `language: en` 확인
- [ ] sitemap·RSS·llms.txt에 글이 잡히는지 확인
- [ ] (선택) 발행 후 `docs/essay-backlog.md`에서 해당 아이디어 상태를 `published`로 갱신

## 직접 안 해도 되는 것 (자동)

- JSON-LD(`BlogPosting`/`BreadcrumbList`/`FAQPage`) — `lang: en` 넣으면 영어로 자동
- `<html lang>` / `og:locale` / raw `.md`의 `language` — `lang`에서 자동
- `llms.txt`, 글별 raw `.md`, `robots.txt`, Open Graph/Twitter, canonical, sitemap, RSS + Atom
