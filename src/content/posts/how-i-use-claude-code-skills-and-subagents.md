---
title: "Claude Code Skills and Subagents: How I Use Both"
date: 2026-07-06
updatedAt: 2026-07-06
lang: en
category: ai
summary: "Skills are reusable instructions that load into your context; subagents run in their own. Here's when a solo dev reaches for each, with real examples."
tags: ["claude-code", "claude-skills", "subagents", "ai-coding", "developer-tools"]
intent: informational
primaryKeyword: "claude code skills and subagents"
faq:
  - q: "What is the difference between a Claude Code skill and a subagent?"
    a: "A skill is a reusable set of instructions that loads into your current conversation on demand — a procedure the main agent follows in the same context window. A subagent is a separate agent with its own context window: it goes off, does a chunk of work, and returns only a summary. Reach for a skill when you keep repeating the same steps and want them encoded once. Reach for a subagent when the work would flood your context with noise or when you want several tasks running in parallel."
  - q: "Do subagents share my main conversation's context?"
    a: "No, and that is the point. Each subagent runs in a fresh, isolated context window. It does not see your conversation history or the files you already read, and only its final summary comes back to the main conversation. That isolation is what keeps a thousand lines of test output or search results from crowding out the actual task you are working on."
  - q: "When should I write a skill instead of a subagent?"
    a: "Write a skill when the value is a repeatable procedure you want applied consistently — a publishing checklist, a review rubric, a code-generation workflow. Use a subagent when the value is offloading heavy or parallel work so it never touches your main context. They are not competitors: a skill encodes what to do, a subagent decides where the work runs."
  - q: "Can a subagent use a skill, or do they compose?"
    a: "Yes, they compose. A subagent can preload skill content at startup so it follows the same procedure in its isolated context, and a skill can be configured to run inside a forked subagent instead of the main conversation. In practice a skill is the instruction and a subagent is the execution environment, so combining them is normal rather than exotic."
---

## Quick Answer

A **skill** is a reusable set of instructions that loads into your current conversation on demand. A **subagent** is a separate agent with its own context window that does a chunk of work and returns only a summary. Use a skill when you keep repeating the same procedure and want it encoded once — a checklist, a review rubric, a content workflow. Use a subagent when the work would flood your context with noise, or when you want several independent tasks running at once. Skills answer "what should the agent do here?" Subagents answer "where should this work run?" They compose: a subagent can follow a skill, and a skill can run inside a subagent.

## Who This Guide Is For

- Solo developers and indie hackers already using Claude Code who keep re-typing the same instructions
- Anyone whose Claude Code sessions get slow or lose the thread because one task dumped a wall of output into the conversation
- People who have heard "skills" and "subagents" mentioned interchangeably and want the actual distinction

If you have never opened a `.claude/` directory, that is fine — everything here is plain Markdown files, and I will show the real ones from this blog's repo.

## Skills and Subagents Are Not the Same Thing

The single most useful thing to get straight is that these two features solve different problems, and the difference is about **context**.

A skill lives in your main conversation. When it triggers, its instructions load into the context you are already working in, and the main agent follows them. Nothing is isolated; the skill just makes the agent behave a certain way for the task at hand.

A subagent is a whole separate agent. It starts with a fresh context window, does not see your conversation history or the files you already read, runs its task, and hands back only a final summary. The verbose middle — the test logs, the search results, the ten files it skimmed — stays in its context and never touches yours.

| Aspect | Skill | Subagent |
|---|---|---|
| Where it runs | Your current conversation | Its own isolated context window |
| What it is | Reusable instructions / a procedure | A separate agent that returns a summary |
| Best for | Repeatable workflows, checklists, style rules | Heavy or parallel work you want off your context |
| Sees your history | Yes | No — fresh context |
| Comes back with | Behavior applied in place | A conclusion, not the raw work |
| Defined in | `.claude/skills/<name>/SKILL.md` | `.claude/agents/<name>.md` (or built-in) |

Skills follow the open [Agent Skills standard](https://agentskills.io), so the same `SKILL.md` idea works across more than one AI tool. Subagents are how you buy context isolation and parallelism. Once that clicks, deciding which to use gets easy.

## The Workflow

### Step 1: Write a Skill for Anything You Repeat

The trigger for a skill is repetition. The third time I explained "our English posts must answer the search intent in the first 100 words, use our frontmatter schema, and pass `npm run build`," I stopped explaining and wrote it down as a skill. Now I type a short request and the same procedure runs every time, the same way.

A skill is just a folder with a `SKILL.md` inside. The frontmatter is tiny — a `name` and a `description`:

```markdown
---
name: en-post-gen
description: Generate an English-first developer blog post (how-to or comparison).
---

# English Post Generation Skill

1. Define the search intent in one line.
2. Fill the how-to or comparison template in templates/.
3. Answer the search intent in the first 100 words.
4. Run `npm run build` before publishing.
```

The `description` matters more than it looks. Claude Code reads it to decide when the skill is relevant and can trigger it automatically, and you can always run it explicitly as `/en-post-gen`.

### Step 2: Keep Each Skill Single-Responsibility

The same instinct that keeps functions small keeps skills useful. One skill, one job. I have a skill that writes English how-to and comparison posts, and a separate skill that generates a Korean AI-news roundup. They do not share a file, because they do not share a purpose. A skill that tries to do both would trigger at the wrong times and carry rules that only apply half the time.

If you find a skill growing a section that starts with "unless it is the other case," that is two skills wearing one coat.

### Step 3: Bundle References So the Skill Stays Small

A skill can bundle supporting files in its folder — templates, reference docs, scripts — and the agent loads them only when it needs them. This is the part people miss. Your `SKILL.md` stays short and readable, and the heavy detail sits in a file that is pulled in on demand rather than pasted into every session.

My posting skill keeps its two article templates in a `templates/` subfolder. The `SKILL.md` says "fill the template," and the actual template loads only when a post is being written. The skill stays a page; the detail stays out of the way until it is needed.

### Step 4: Reach for a Subagent When Work Would Pollute Your Context

Some tasks are useful but noisy. Searching every file in a repo, running a test suite, reading twenty posts to find overlap — the answer is small, but the work to get there is a flood of output you do not want to keep.

That is exactly the subagent's job. You hand it the task, it works in its own context, and it returns the conclusion. A read-only search subagent can sweep the whole `src/` tree and come back with "here are the three files that matter" without ever putting the other two hundred into your conversation. And because each subagent is isolated, you can run several at once and let them finish in parallel.

### Step 5: Compose Them

Skills and subagents are not a fork in the road. A subagent can be told to follow a skill, so it applies your procedure inside its isolated context. A skill can be configured to run inside a forked subagent instead of your main conversation, when its work is heavy enough that you would rather not watch it happen. The mental model that holds up: **a skill is the instruction, a subagent is where the work runs.** Most days I use skills for the procedures I repeat and subagents for the work I want kept off my context, and I reach for the combination only when a repeatable procedure is also a heavy one.

## Example Project Structure

Both features are plain files under `.claude/`. Here is the shape, using this blog's real skills:

```text
your-repo/
  CLAUDE.md                    # routes requests to the right skill
  .claude/
    skills/
      en-post-gen/
        SKILL.md               # name + description + the procedure
        templates/
          how-to.md            # bundled reference, loaded on demand
          comparison.md
      ai-news-gen/
        SKILL.md
    agents/                    # custom subagents (optional)
      code-reviewer.md
```

A custom subagent is one Markdown file, and its frontmatter is where the isolation is configured — which tools it may touch, and which model it runs on:

```markdown
---
name: code-reviewer
description: Reviews a diff for correctness and security. Use before committing.
tools: Read, Grep, Bash
model: inherit
---

You are a code reviewer. Read the diff, flag correctness and security issues,
and return a short list ranked by severity. Do not edit files.
```

The body becomes that subagent's system prompt. `tools` fences off what it can do — a reviewer that only reads and greps cannot accidentally rewrite your files. You do not have to author custom subagents to benefit, though; Claude Code ships built-in ones, including a read-only search agent that is perfect for the "find me the relevant files without the noise" job.

## A Real Project Note

This very post is the honest example. When I sat down to plan it, the first thing I did was not write — it was send a read-only search subagent to map every English post already on this blog. It read all thirteen, pulled their titles, tags, and clusters, and came back with a one-paragraph summary of what was already covered and where the gaps were. Thirteen files' worth of frontmatter never entered my main context; only the conclusion did. That is the whole value of a subagent in one move.

Then, because I did not want to publish anything wrong about how these features work, I sent a second subagent to verify the current behavior against the official docs and hand back cited notes. Again: it did the reading, I got the summary.

The writing itself ran through a skill — the same `en-post-gen` procedure that enforces the first-100-words rule, our frontmatter schema, and the build check. So this post is skills and subagents at the same time: subagents gathered and verified the context, a skill shaped the output. Notably, I do not keep a single custom subagent in this repo's `.claude/agents/` folder. I author skills, because that is the repeatable part, and I lean on the built-in subagents for isolation. That split is worth stating plainly: skills are where I invest, subagents are what I reach for.

## Common Mistakes

- **Using them interchangeably.** "Should this be a skill or a subagent?" is the wrong question when the honest answer is often "a skill, run inside a subagent." Decide the procedure first, then decide where it runs.
- **One giant do-everything skill.** A skill that branches on "unless it is the other case" is two skills. Split by responsibility.
- **Pasting reference material into `SKILL.md`.** Bundle it as a supporting file so it loads on demand instead of bloating every session.
- **Doing noisy work in the main conversation.** Running a full search or test suite inline dumps output you did not want to keep. Send it to a subagent and take the summary.
- **Giving a subagent every tool.** If a subagent only needs to read, restrict `tools` so it cannot edit. Isolation is a safety feature, not just a performance one.

## Checklist

- [ ] Anything you have explained to Claude Code three times is written as a skill
- [ ] Each skill has one responsibility and a clear `description` for auto-triggering
- [ ] Heavy reference material is bundled as a supporting file, not inlined
- [ ] Noisy or high-volume work is offloaded to a subagent so it stays off your context
- [ ] Independent tasks are run as parallel subagents rather than one long serial pass
- [ ] Custom subagents restrict `tools` to only what the job needs
- [ ] You know which of your workflows is "a skill run inside a subagent" and set it up that way

## When Not to Use This Approach

Do not build this machinery for a one-off. If you will run a task exactly once, a plain prompt beats writing a skill you will never trigger again, and spinning up a subagent for a two-file search is overhead you can skip. Skills earn their keep through repetition; subagents earn theirs when the work is genuinely heavy or parallel. On a throwaway script, both are ceremony. The moment you notice yourself repeating instructions, or watching your context fill with output you do not care about, that is the signal — not before.

## FAQ

**Q. What is the difference between a Claude Code skill and a subagent?**

A. A skill is a reusable set of instructions that loads into your current conversation on demand — a procedure the main agent follows in the same context window. A subagent is a separate agent with its own context window: it goes off, does a chunk of work, and returns only a summary. Reach for a skill when you keep repeating the same steps and want them encoded once. Reach for a subagent when the work would flood your context with noise or when you want several tasks running in parallel.

**Q. Do subagents share my main conversation's context?**

A. No, and that is the point. Each subagent runs in a fresh, isolated context window. It does not see your conversation history or the files you already read, and only its final summary comes back to the main conversation. That isolation is what keeps a thousand lines of test output or search results from crowding out the actual task you are working on.

**Q. When should I write a skill instead of a subagent?**

A. Write a skill when the value is a repeatable procedure you want applied consistently — a publishing checklist, a review rubric, a code-generation workflow. Use a subagent when the value is offloading heavy or parallel work so it never touches your main context. They are not competitors: a skill encodes what to do, a subagent decides where the work runs.

**Q. Can a subagent use a skill, or do they compose?**

A. Yes, they compose. A subagent can preload skill content at startup so it follows the same procedure in its isolated context, and a skill can be configured to run inside a forked subagent instead of the main conversation. In practice a skill is the instruction and a subagent is the execution environment, so combining them is normal rather than exotic.

## Related Articles

- [How to Structure a Project for AI Coding Tools](/how-to-structure-a-project-for-ai-coding-tools/)
- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [AI Code Review Checklist for Solo Developers](/ai-code-review-checklist-for-solo-developers/)
- [AI coding workflow tag](/tags/ai-coding/)

## Sources

- [Claude Code — Agent Skills documentation](https://code.claude.com/docs/en/skills)
- [Claude Code — Subagents documentation](https://code.claude.com/docs/en/sub-agents)
- [Agent Skills — the open standard](https://agentskills.io)

This post is part of my AI-assisted solo developer workflow series. Last updated 2026-07-06.
