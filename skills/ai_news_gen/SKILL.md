---
name: ai_news_gen
description: Generate a blog post summarizing the latest AI news.
---

# AI News Generation Skill

This skill is triggered when the user asks to "Generate today's AI news" (오늘의 AI뉴스 생성해줘).
It automates the process of searching, filtering, and writing a high-quality blog post about recent AI developments.

## Workflow

1.  **Search Phase**:
    *   Search for "AI news", "Artificial Intelligence trends", "LLM new models", "AI tech news" from the **last 3 days**.
    *   Use `search_web` to gather significant events. Focus on major releases, impactful research, or industry-shaking news (e.g., OpenAI, Google, Anthropic, open source models).

2.  **Selection Phase**:
    *   Select 3-5 most important news items.
    *   Ensure they are fact-checked and from reliable sources.

3.  **Drafting Phase**:
    *   Create a new markdown file in `content/blog/`.
    *   **Filename**: `ai-news-YYYY-MM-DD.md` (e.g., `ai-news-2025-05-20.md`).
    *   **Language**: **Korean (Hangul)**.
    *   **Tone & Style**:
        *   Casual, witty, no honorifics (Banmal/반말).
        *   Professional but accessible (Software Engineer blogger persona).
        *   **No emojis** in the main text (as per `GEMINI.md`).
        *   Concise sentences.

4.  **Content Structure (Strict Adherence)**:

    ```markdown
    ---
    title: "YYYY년 M월 D일 오늘의 AI 뉴스"
    date: "YYYY-MM-DD"
    update: "YYYY-MM-DD"
    category: "AI"
    ---

    [Summary Paragraph]: Write a sharp, <200 character summary here about today's key themes. (Do-gal-sik)

    ---

    ### [News Item 1 Title]

    [Description of news item 1. detailed analysis.]

    ### [News Item 2 Title]

    [Description of news item 2. detailed analysis.]

    ...

    ### [News Item N Title]

    [Description of news item N. detailed analysis.]

    ---

    ### 예상되는 미래 (Expected Future)

    [Add your own insight/speculation here. Connect the dots between news items. Be bold and opinionated but grounded in engineering reality.]

    ### 참고 자료 (References)

    - [Title of Source 1](URL)
    - [Title of Source 2](URL)
    ```

5.  **Constraints**:
    *   **Length**: The content MUST be **at least 3000 characters** long (excluding metadata).
    *   **Category**: MUST be "AI".
    *   **Validation**: Ensure the file parses correctly as frontmatter markdown.

## Example Trigger
User: "오늘의 AI뉴스 생성해줘"
Agent action: Follow the workflow above to generate a new file.
