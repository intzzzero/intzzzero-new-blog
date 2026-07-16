---
name: ai-news-gen
description: Generate a blog post summarizing the latest AI news.
---

# AI News Generation Skill

"오늘의 AI뉴스 생성해줘" 트리거. 최신 AI 소식을 검색·선별·작성해 블로그 포스트를 만든다.

## Workflow

1. **Search Phase**:
   - 최근 3일치 "AI news", "LLM new models", "AI tech news" 등을 웹 검색.
   - OpenAI, Google, Anthropic, 오픈소스 모델 등 주요 릴리스·연구·업계 이슈에 집중.

2. **Selection Phase**:
   - 가장 중요한 3-5개를 선별하고 신뢰할 수 있는 출처로 팩트체크.

3. **Drafting Phase**:
   - 새 마크다운 파일을 **`src/content/posts/`** 에 생성한다(Astro content collection).
   - **파일명**: `ai-news-YYYY-MM-DD.md` → URL은 `/ai-news-YYYY-MM-DD/`.
   - **언어**: 한국어. 반말·위트, 경어/이모지 없음, 두괄식.
   - **마크다운 규칙**:
     - 괄호+강조: `**텍스트(괄호)**` 금지 → `**텍스트\(괄호\)**` 또는 `<strong>텍스트(괄호)</strong>`.
     - 본문 달러 기호는 `\$`로 이스케이프(remark-math가 `$...$`를 수식으로 해석해 가격 표기가 깨진다).

4. **Frontmatter & Structure** (엄격 준수):

   ```markdown
   ---
   title: "YYYY년 M월 D일 오늘의 AI 뉴스"
   date: YYYY-MM-DD
   updatedAt: YYYY-MM-DD
   category: ai
   summary: "오늘 AI 뉴스의 핵심 흐름을 140~160자로. 검색·AI 인용에 쓰이는 메타 설명."
   ---

   [두괄식 요약: 200자 이내로 오늘의 핵심 테마를 먼저 던진다.]

   ---

   ### [뉴스 1 제목]

   [상세 분석]

   ### [뉴스 2 제목]

   [상세 분석]

   ...

   ---

   ### 예상되는 미래

   [통찰과 전망. 뉴스 사이의 점을 잇는다. 엔지니어 관점에서 대담하되 근거 있게.]

   ### 참고 자료

   - [출처 1](URL)
   - [출처 2](URL)
   ```

5. **Constraints**:
   - **길이**: 본문 최소 3000자(메타데이터 제외).
   - **category**: 반드시 `ai`(slug). `src/data/categories.ts`의 16개 slug 중 하나여야 한다.
   - **summary**: 140~160자 메타 설명.
   - **검증**: `npm run build` 가 통과해야 한다(astro check 포함). 빌드되면 `/ai-news-YYYY-MM-DD/`로 발행된다.
   - 더 자세한 작성 원칙은 `docs/seo-geo-content-guide.md`와 `workflow/publishing-checklist.md`를 따른다.

## Example Trigger
User: "오늘의 AI뉴스 생성해줘"
Agent action: 위 워크플로우대로 `src/content/posts/ai-news-YYYY-MM-DD.md`를 생성한다.
