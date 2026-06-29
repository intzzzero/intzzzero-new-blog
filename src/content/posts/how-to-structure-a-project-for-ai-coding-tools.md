---
title: "How to Structure a Project for AI Coding Tools"
date: 2026-06-29
updatedAt: 2026-06-29
lang: en
category: ai
summary: "Structure a project so AI coding tools write correct code: a root AGENTS.md, shallow folders by responsibility, task files, and machine-checkable guardrails."
tags: ["ai-coding", "claude-code", "agents-md", "project-structure", "solo-developer"]
intent: informational
primaryKeyword: "structure project for ai coding tools"
faq:
  - q: "Do I need an AGENTS.md if I already have a CLAUDE.md?"
    a: "If you only use Claude Code, CLAUDE.md is enough. The moment you add a second tool, put the shared rules in AGENTS.md and let CLAUDE.md hold only Claude-specific extras, or have it point at AGENTS.md. AGENTS.md is read natively by Cursor, Copilot, Codex, and many others, so it is the better single source of truth."
  - q: "How long should the context file be?"
    a: "Short enough that you would actually read it. A page or less: stack, commands, folder conventions, and a few hard 'do not touch' rules. Long context files get ignored by both humans and models, and they push the real code out of the context window."
  - q: "Does folder structure really change AI output quality?"
    a: "Yes. Agents read files to build context. If a feature is scattered across ten directories, the agent either misses pieces or burns its context budget gathering them. Co-located, shallow, responsibility-named folders let it load one coherent unit and reason about it."
  - q: "Should I commit task files to the repo?"
    a: "I keep a throwaway TASK.md untracked and only commit it when the task is large enough that the reasoning is worth keeping. Either way, the value is the same: a written contract the agent treats as the goal instead of guessing."
---

## Quick Answer

Structure the project so an AI coding tool can load the right context cheaply and tell when it is wrong. Concretely: put one short context file at the root (`AGENTS.md`, the cross-tool standard) as your single source of truth; keep folders shallow and named by responsibility; co-locate each feature so it reads as one unit; write a short task file for anything non-trivial; make correctness machine-checkable with types, tests, and lint; and fence off the files the agent must never touch. The tool does not need a clever prompt. It needs a repository it can understand in one pass.

## Who This Guide Is For

- Solo developers and indie hackers using Claude Code, Cursor, Copilot, or Codex
- People whose AI tool keeps "almost" getting it right and they cannot tell why
- Anyone mixing two or more AI tools on the same repo

This is tool-agnostic. The same structure that helps Claude Code helps Cursor, because they all do the same thing: read files to build context, then write a diff.

## Why Project Structure Decides AI Output Quality

An AI coding tool is only as good as the context it can assemble. It does not know your project; it reconstructs an understanding of it on every task by reading files. Two things break that process: context it cannot find, and context it cannot afford.

When a feature is spread across ten folders, the agent either misses a piece and writes code against an API that does not exist, or it reads everything and spends its context budget on plumbing instead of the actual change. Either way the output degrades. Good structure is just making the right context cheap to find and small enough to hold.

So the goal is not "AI-friendly" magic. It is the same thing that makes a project readable to a new human teammate, pushed one step further because the model has no memory between sessions.

## The Structure, Step by Step

### Step 1: Put One Context File at the Root

Give the project a single file that states the rules. The cross-tool standard is `AGENTS.md`: originated by OpenAI, now stewarded by the Linux Foundation's Agentic AI initiative, and read natively by Cursor, GitHub Copilot, Codex CLI, Windsurf, Zed, and others. Claude Code has its own richer `CLAUDE.md`, but the shared rules belong in one place.

My rule: `AGENTS.md` is the single source of truth. If a tool needs its own file, that file stays thin and defers to `AGENTS.md`. Keep it to a page: the stack, how to run tests and build, folder conventions, and a few hard "do not do this" rules. If it is longer than you would read, the model skims it too.

### Step 2: Keep Folders Shallow and Named by Responsibility

Deep nesting hides things. A folder named `utils` or `misc` tells the agent nothing about what belongs there, so it dumps new code wherever and the structure rots. Name folders by what they are responsible for (`auth`, `billing`, `email`) and keep the tree shallow enough that the agent can list it and understand the map in one read.

### Step 3: Co-locate a Feature So It Reads as One Unit

If changing the login flow means editing a route, a component three folders away, a hook somewhere else, and a test in a parallel tree, the agent has to reassemble that graph before it can touch anything. Co-locate instead: keep a feature's route, UI, logic, and test close together so the agent can load one folder and have the whole feature in context.

### Step 4: Write a Task File for Anything Non-Trivial

For anything bigger than a one-liner, drop a short `TASK.md` with the goal, the acceptance criteria, and what is explicitly out of scope. It costs two minutes and turns a vague request into a contract the agent works against. "Add a rate limiter to the login route. Do not touch the signup flow or the session store" produces a small, reviewable diff. A vague task produces a sprawling one.

### Step 5: Make Correctness Machine-Checkable

The agent's biggest weakness is confident, plausible, wrong code. Your structure should let the machine catch what review misses. Types, a test command, and a linter are guardrails: when the agent breaks a contract, something goes red without you reading every line. A project with `npm run build` wired to type-check and a test suite that actually covers behavior gives the agent a feedback loop. A project with none gives it nothing but your patience.

### Step 6: Fence Off What the Agent Must Not Touch

Every project has files that look editable but are not: generated output, lockfiles, migrations, vendored code. State these explicitly in the context file. Without the rule, an agent will happily hand-edit a generated file because it looks like the place to make the change, and the edit vanishes on the next build.

## Example Project Structure

A small web app I would hand to an AI tool looks like this:

```text
my-app/
  AGENTS.md            # single source of truth for every AI tool
  CLAUDE.md            # thin; Claude-specific extras, defers to AGENTS.md
  TASK.md              # current task contract (often untracked)
  package.json
  src/
    features/
      auth/            # route + UI + logic + test, co-located
        login.route.ts
        LoginForm.tsx
        auth.ts
        auth.test.ts
      billing/
        ...
    lib/               # shared, dependency-free helpers
  tests/
    e2e/
  generated/           # DO NOT EDIT — listed as off-limits in AGENTS.md
```

And the `AGENTS.md` that drives it, kept deliberately short:

```markdown
# Project: my-app

## Stack
- TypeScript, Vite, Vitest

## Commands
- Install: npm install
- Test: npm run test
- Build (type-checks): npm run build

## Conventions
- Features live in src/features/<name>/, co-located with their test.
- Shared helpers go in src/lib/ and must stay dependency-free.
- Name folders by responsibility, not by type. No "utils".

## Do not touch
- Anything in generated/ is build output. Never hand-edit it.
- Do not change package-lock.json by hand.
- Do not widen a task's scope without asking.
```

That file is the highest-leverage thing in the repo. It stops me repeating myself every session, and it stops the agent guessing.

## A Real Project Note

This blog is the clearest example I have. It is an Astro static site, and a lot of its output is generated at build time: JSON-LD, `llms.txt`, a raw `.md` mirror of every post, the sitemap, the RSS and Atom feeds. None of it is meant to be written by hand.

The first time I let an agent "fix the metadata," it went straight for one of those generated artifacts and edited it directly. The change looked perfect in the diff and was gone the next time I ran the build, because the generator overwrote it. Nothing errored. I just had a fix that silently did not stick.

The fix was not a better prompt. It was a structural rule. The project's context file now says, in plain words, that those files are generated and the agent must change the source that produces them, never the output. Since then the same agent gets it right on the first pass. The lesson generalizes: when an AI tool keeps making the same class of mistake, the repository is usually missing a boundary, not the model missing intelligence.

## Common Mistakes

- **One giant context file.** A 300-line `AGENTS.md` gets skimmed by the model and pushes real code out of the window. Keep it to a page.
- **Type-named folders.** `utils`, `helpers`, `misc` give the agent nowhere obvious to put things, so structure decays.
- **No machine-checkable correctness.** With no tests or type-check, the agent's confident-but-wrong code has nothing to fail against.
- **Unstated off-limits files.** If you do not name the generated and vendored files, the agent will edit them.
- **Scattered features.** Forcing the agent to reassemble a feature from ten folders wastes its context budget on plumbing.

## Checklist

- [ ] One root `AGENTS.md` as the single source of truth, one page or less
- [ ] Per-tool files (like `CLAUDE.md`) stay thin and defer to it
- [ ] Folders shallow and named by responsibility, no `utils` dumping ground
- [ ] Each feature co-located so it reads as one unit
- [ ] A `TASK.md` contract for anything non-trivial, with out-of-scope stated
- [ ] `build` / `test` / `lint` commands wired and documented
- [ ] Generated, vendored, and lockfile paths marked "do not touch"

## When Not to Use This Approach

Do not over-engineer structure for a throwaway script or a one-file prototype. If the whole project fits in a single file the agent reads anyway, an `AGENTS.md` and a feature-folder convention are pure overhead. This pays off when the project is large enough that the agent cannot hold all of it at once. That is exactly when context discipline starts to matter, and it is the point where most solo projects quietly cross from "the AI gets it" to "the AI keeps almost getting it."

## FAQ

**Q. Do I need an AGENTS.md if I already have a CLAUDE.md?**

A. If you only use Claude Code, `CLAUDE.md` is enough. The moment you add a second tool, put the shared rules in `AGENTS.md` and let `CLAUDE.md` hold only Claude-specific extras, or have it point at `AGENTS.md`. `AGENTS.md` is read natively by Cursor, Copilot, Codex, and many others, so it is the better single source of truth.

**Q. How long should the context file be?**

A. Short enough that you would actually read it. A page or less: stack, commands, folder conventions, and a few hard "do not touch" rules. Long context files get ignored by both humans and models, and they push the real code out of the context window.

**Q. Does folder structure really change AI output quality?**

A. Yes. Agents read files to build context. If a feature is scattered across ten directories, the agent either misses pieces or burns its context budget gathering them. Co-located, shallow, responsibility-named folders let it load one coherent unit and reason about it.

**Q. Should I commit task files to the repo?**

A. I keep a throwaway `TASK.md` untracked and only commit it when the task is large enough that the reasoning is worth keeping. Either way, the value is the same: a written contract the agent treats as the goal instead of guessing.

## Related Articles

- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [AI Code Review Checklist for Solo Developers](/ai-code-review-checklist-for-solo-developers/)
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [AI coding workflow tag](/tags/ai-coding/)

## Sources

- [AGENTS.md — the open format for guiding coding agents](https://agents.md/)
- [CLAUDE.md, AGENTS.md & Copilot Instructions: Configure Every AI Coding Assistant](https://www.deployhq.com/blog/ai-coding-config-files-guide)

This post is part of my AI-assisted solo developer workflow series. Last updated 2026-06-29.
