---
title: "How I Use Claude Code to Build Small Web Apps"
date: 2026-06-22
updatedAt: 2026-06-22
lang: en
category: ai
summary: "A practical Claude Code workflow for solo developers: scope the task, write a task file, ask for a plan before code, review the diff, and let the agent review its own work."
tags: ["claude-code", "ai-coding", "solo-developer"]
intent: informational
primaryKeyword: "claude code workflow"
faq:
  - q: "Is Claude Code good for beginners?"
    a: "It is usable, but you still need to read every diff. If you cannot tell whether a change is correct, the speed gain turns into a debugging tax later. Start on small, well-scoped tasks."
  - q: "Should I let Claude Code edit many files at once?"
    a: "For a first pass, no. Keep each task to one feature or one bug. Small diffs are easier to review and easier to revert when the agent goes the wrong way."
  - q: "Does Claude Code replace writing tests?"
    a: "No. It can write tests, but you decide what 'correct' means. Treat generated tests as a draft you verify, not as proof the code works."
---

## Quick Answer

The workflow that works for me is: treat Claude Code as a project agent, not a chatbot. I scope one small task, write a short task file, ask it to inspect the repo, ask for a plan before any code, review the diff line by line, run tests, and then ask it to critique its own work. The speed comes from tight scope and disciplined review, not from letting it run free. Below is the exact loop I use to ship small web apps as a solo developer.

## Who This Guide Is For

- Solo developers and indie hackers shipping small apps alone
- People who already use Cursor or Copilot and want a more agentic loop
- Developers who can read a diff and tell whether it is correct

If you cannot yet judge whether a change is right, this still works, but the review steps matter more for you, not less.

## My Basic Rule: Treat Claude Code as a Project Agent, Not a Chatbot

A chatbot answers a question and forgets. An agent operates on your repository, runs commands, and leaves a diff behind. The mental shift that changed my results was simple: I stopped asking "how do I do X" and started saying "here is the repo, here is the task, propose a plan, then implement it."

That framing forces me to give it the two things it actually needs: context about the project and a clearly bounded task.

## My Project Setup

Small web apps I build share roughly this shape:

```text
my-app/
  src/
    routes/
    components/
    lib/
  tests/
  CLAUDE.md        # project conventions the agent should follow
  package.json
  README.md
```

The one file that pays for itself is `CLAUDE.md`. I keep it short: the stack, the folder conventions, the commands to run tests and build, and a few "do not do this" rules. The agent reads it before touching code, so I stop repeating myself every session.

## The Workflow

### Step 1: Define the Scope

I write the task in one or two sentences and, more importantly, I write what is out of scope. "Add a rate limiter to the login route. Do not touch the signup flow or the session store." A bounded task produces a small diff, and a small diff is reviewable.

### Step 2: Create a Task File

For anything bigger than a one-liner, I drop a short `TASK.md` with the goal, the acceptance criteria, and any constraints. It costs two minutes and removes most of the back-and-forth. The agent treats it as the contract.

### Step 3: Let Claude Code Inspect the Project

Before asking for changes, I let it read the relevant files. Agentic tools are good at this: they grep, open files, and build a map. I would rather spend tokens here than have it guess at an API that does not exist.

### Step 4: Ask for a Plan Before Code

This is the highest-leverage step. I ask for a plan first: which files, what changes, in what order. Reading a plan takes thirty seconds and catches the wrong approach before any code is written. Roughly half the time I correct the plan, and that correction saves a full bad diff.

### Step 5: Review the Diff

I read every line. Not skim, read. The failure mode of AI coding is plausible code that is subtly wrong, and the only defense is review. If the diff is too big to review carefully, that is a signal the task was too big, not a reason to trust it more.

### Step 6: Run Tests and Manual Checks

I run the test suite and click through the actual feature in the browser. Generated code compiles far more often than it is correct. A green build is necessary, not sufficient.

### Step 7: Ask Claude Code to Review Its Own Work

After it passes my review, I ask it to critique its own change: edge cases, error handling, security. It often catches a missing null check or an unhandled rejection. A second pass from the same model is cheap and surprisingly useful.

## A Real Project Note

On a small link-shortener I built, I asked for a feature and let the plan step slide because the task "felt obvious." It happily added a database migration that dropped a column it thought was unused. Tests passed, because there was no test covering that column. I caught it in the diff only because the migration file looked larger than it should have.

The lesson was not "the AI is dangerous." The lesson was that I skipped Step 4 and Step 5, and the process is what protects you, not the model. Cost-wise, a session like this runs me a few dollars in tokens, far less than the hour the bug would have cost in production.

## What Claude Code Is Good At

- Mechanical, well-specified changes across several files
- Writing the first draft of tests and boilerplate
- Explaining unfamiliar code before you change it
- Refactors where the target shape is clear

## What Claude Code Still Gets Wrong

- It invents APIs that look right but do not exist
- It over-engineers when the task is vague
- It writes tests that assert the bug, not the requirement
- It silently widens scope if you do not fence it in
- It sounds equally confident whether it is right or wrong

None of these are dealbreakers. They are reasons to keep the plan-and-review loop.

## My AI Coding Checklist

- [ ] Task scoped to one feature or one bug
- [ ] Out-of-scope areas stated explicitly
- [ ] Plan reviewed before any code
- [ ] Every line of the diff read
- [ ] Tests run and feature checked manually
- [ ] Agent asked to review its own change
- [ ] Diff small enough to revert cleanly

## When Not to Use This Approach

If the task is genuinely exploratory, where you do not yet know what "done" looks like, an agentic loop will produce confident output for an unclear goal. Figure out the shape yourself first, then bring in the agent to execute. Also skip it for trivial edits where typing the change is faster than describing it.

## FAQ

**Q. Is Claude Code good for beginners?**

A. It is usable, but you still need to read every diff. If you cannot tell whether a change is correct, the speed gain turns into a debugging tax later. Start on small, well-scoped tasks.

**Q. Should I let Claude Code edit many files at once?**

A. For a first pass, no. Keep each task to one feature or one bug. Small diffs are easier to review and easier to revert when the agent goes the wrong way.

**Q. Does Claude Code replace writing tests?**

A. No. It can write tests, but you decide what "correct" means. Treat generated tests as a draft you verify, not as proof the code works.

## Related Articles

- [코딩에 AI를 쓸 때의 메모](/coding-with-ai-tip/)
- [AI 카테고리의 다른 글들](/categories/ai/)
- [AI coding workflow 태그](/tags/ai-coding/)

This post is part of my AI-assisted solo developer workflow series. More practical guides on building and shipping small apps with AI tools are on the way.
