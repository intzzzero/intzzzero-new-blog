---
title: "AI Code Review Checklist for Solo Developers"
date: 2026-06-26
updatedAt: 2026-06-26
lang: en
category: ai
summary: "A practical checklist for reviewing AI-generated code when you are the only reviewer: scope, correctness, security, migrations, dependencies, reuse, and tests."
tags: ["ai-coding", "code-review", "claude-code", "solo-developer"]
intent: informational
primaryKeyword: "ai code review checklist"
faq:
  - q: "Do I really need a checklist if the tests pass?"
    a: "Yes. Generated code compiles and passes naive tests far more often than it is correct. The most common AI failures—broken access control, wrong ownership checks, silent scope creep—live in the gaps your tests do not cover. A green build is necessary, not sufficient."
  - q: "How long should reviewing an AI diff take?"
    a: "Budget roughly the time it would take to write the change yourself, minus the typing. If a diff is too large to review in one sitting, that is a signal the task was too big, not a reason to trust it more. Keep tasks scoped to one feature or one bug."
  - q: "Can I just ask the AI to review its own code?"
    a: "It helps as a second pass and catches some missing null checks and edge cases, but it is not a substitute for your review. The model is equally confident whether it is right or wrong, so a self-review can confirm a bug as easily as it can find one. Use it after your own pass, not instead of it."
  - q: "Is this checklist specific to Claude Code?"
    a: "No. It applies to any AI coding tool—Claude Code, Cursor, Copilot, or a plain chat model you paste code into. The failure modes are shared because they come from how language models generate code, not from any one product."
---

## Quick Answer

When you review AI-generated code as a solo developer, you are the only reviewer—there is no second pair of eyes to catch what you miss. So the review has to be systematic, not vibes. Run every AI diff through seven checks: **scope** (did it only touch what you asked?), **correctness** (does the logic match the requirement, not just compile?), **security** (auth, input validation, secrets), **data and migrations** (anything destructive?), **dependencies** (new packages justified?), **reuse** (did it re-implement something that already exists?), and **tests** (do they assert the requirement or just the bug?). The rest of this guide expands each check with the patterns I actually look for, plus a printable version at the end.

## Who This Guide Is For

- Solo developers and indie hackers shipping with Claude Code, Cursor, or Copilot, with no teammate to review their PRs
- Developers who can read a diff and want a repeatable process instead of ad-hoc skimming
- Anyone who has been burned by AI code that passed tests and broke in production

If you work on a team with mandatory reviews, this still helps—but the stakes are highest when you are the last line of defense.

## Why AI Code Needs Its Own Review

Human code and AI code fail differently. A junior developer writes code that looks unsure—you can feel where they struggled. An AI writes code that looks confident everywhere, including where it is wrong. That uniform confidence is exactly what makes review harder, not easier.

The data backs up the caution. Veracode's *2025 GenAI Code Security Report* tested over 100 large language models across 80 coding tasks and found that **45% of generated code introduced a vulnerability from the OWASP Top 10**—SQL injection, cross-site scripting, broken access control, and the rest. Java fared worst at over 70%; Python, C#, and JavaScript landed in the 38–45% range.

Quality erodes over time, too. GitClear's 2025 analysis of 211 million lines of changed code found that copy-pasted blocks rose from 8.3% to 12.3% between 2021 and 2024 while refactoring dropped sharply—AI is good at writing new code and poor at recognizing when existing code should be reused. They also saw defect frequency drop 19% in the short term but rise 12% over six months, the signature of problems that ship clean and surface later.

None of this means "don't use AI." It means the review is not optional, and it has to look for the specific things AI gets wrong.

## The Checklist

I group the review into seven passes. On a small diff this takes a few minutes; the order matters because the cheap checks (scope) kill bad diffs before you spend time on the expensive ones (security).

### 1. Scope

- Did the diff touch **only** the files you expected? An unexpected file is the single most common tell that the agent widened scope.
- Were any unrelated "while I was here" refactors slipped in? Revert them—review them as a separate task or not at all.
- Is the diff small enough to revert cleanly if you change your mind?

### 2. Correctness

- Does the logic implement the **requirement**, or just something that compiles? These are not the same thing.
- Off-by-one, inverted conditions, wrong variable in a comparison—AI loves a plausible-looking conditional that checks the wrong thing.
- Error and empty paths: what happens on null, on an empty array, on a failed await? Generated code optimizes for the happy path.

### 3. Security

- **Authorization, not just authentication.** Does the code check that *this* user owns *this* resource? Broken access control is the most common OWASP finding in AI code, and it is invisible in a passing test.
- Is user input validated and parameterized? Look hard at any string-built SQL or shell command.
- Secrets, tokens, and keys—are any hardcoded or logged?

Here is the kind of bug I mean. Asked for a "delete note" endpoint, an agent produced this:

```js
app.delete('/notes/:id', async (req, res) => {
  const note = await db.note.findUnique({ where: { id: req.params.id } })
  if (!note) return res.status(404).end()
  // Looks like an auth check. It is not.
  if (!note.userId) return res.status(403).end()
  await db.note.delete({ where: { id: req.params.id } })
  res.status(204).end()
})
```

It compiles, it passes a naive "delete my own note" test, and it lets any logged-in user delete anyone's note. The check confirms the note *has* an owner; it never confirms the caller *is* the owner. The fix is one line:

```js
if (note.userId !== req.user.id) return res.status(403).end()
```

This is OWASP A01, broken access control, and it is exactly the category the Veracode numbers warn about. No test failed. Only the review catches it.

### 4. Data and Migrations

- Does the diff include a **migration**? Read it twice. Dropping or renaming a column is irreversible against production data.
- Any raw `DELETE` or `UPDATE` without a `WHERE` clause? Any `cascade` you did not ask for?
- Backfills and data transforms: are they idempotent if they run twice?

This is the check I would never skip, because it is the one with no undo.

### 5. Dependencies

- Did it add a new package? Is it necessary, maintained, and reasonably sized—or did it pull in a dependency to do something the standard library already does?
- Does the version exist and resolve? Models occasionally invent plausible package names or versions.
- Any change to lockfiles you did not expect?

### 6. Reuse and Duplication

- Did it re-implement a helper, formatter, or fetch wrapper that already exists in your codebase? This is the GitClear failure mode—new code where a reuse belonged.
- Does it copy a block three times instead of extracting it once?
- Does it follow the conventions in your `CLAUDE.md` / project rules, or invent its own?

### 7. Tests

- Do the tests assert the **requirement**, or do they assert whatever the code happens to do? An AI will cheerfully write a test that locks in the bug.
- Is there a test for the path that actually broke last time—the empty case, the unauthorized case?
- Did coverage of the changed lines actually go up, or did it add tests for code that was already fine?

## The Review Workflow

The checklist is what to look for; here is when to look. As a solo developer I fold it into a tight loop:

1. **Ask for a plan before code.** Reading a plan takes thirty seconds and catches the wrong approach before any diff exists. Half the time I correct the plan, and that correction saves a full bad diff. (I cover this loop in [how I use Claude Code to build small web apps](/how-i-use-claude-code-to-build-small-web-apps/).)
2. **Read the whole diff, top to bottom.** Scope check first, then correctness, then security. Do not skim—the failure mode of AI code is plausibility, and skimming is how plausibility wins.
3. **Run tests and click through the feature** in the browser. A green build is necessary, not sufficient.
4. **Ask the agent to critique its own change** for edge cases and security. It is a cheap second pass that sometimes catches a missing null check. It is not a replacement for step 2.

## A Real Project Note

On a small link-shortener I built, I let the plan step slide because the task "felt obvious," then skimmed the diff. The agent had added a migration that dropped a column it decided was unused. Tests passed—because nothing covered that column. I only caught it because the migration file looked larger than it should have, which dropped me straight into the **Data and Migrations** check.

The lesson was not "AI is dangerous." It was that the **process** is what protects you, not the model. I had skipped scope and skimmed correctness, and the one check that would have caught it—read every migration twice—I reached only by accident. I wrote more about running these projects with discipline in [running a Claude Code project like software](/claude-code-writing-project-like-software/).

## Common Mistakes When Reviewing AI Code

- **Trusting a green build.** Compiling and passing naive tests is the floor, not the ceiling.
- **Reviewing a diff that is too big.** If you cannot hold it in your head, you cannot review it. Shrink the task.
- **Letting the AI's confidence set your confidence.** It reads as certain whether or not it is right.
- **Skipping the migration read because "it's just a schema tweak."** That is the one with no undo.
- **Outsourcing the whole review to the model.** Self-review confirms bugs as readily as it finds them.

## Printable Checklist

Copy this into your repo as `REVIEW.md` and run it on every AI diff:

- [ ] **Scope** — only the expected files changed; no stowaway refactors
- [ ] **Correctness** — logic matches the requirement; null/empty/error paths handled
- [ ] **Security** — ownership checks present; input validated; no hardcoded secrets
- [ ] **Migrations** — read twice; nothing destructive or irreversible without intent
- [ ] **Dependencies** — new packages justified, real, and maintained
- [ ] **Reuse** — no re-implementation of existing helpers; conventions followed
- [ ] **Tests** — assert the requirement, not the bug; cover the path that broke before
- [ ] **Revertable** — diff small enough to roll back cleanly

## When Not to Use This Approach

If you are throwing away the code—a one-off script, a prototype you will delete tomorrow, a spike to learn an API—the full checklist is overkill. Match the rigor to the lifespan: ephemeral code gets a glance, anything that touches user data or ships to production gets all seven passes. And for trivial edits where typing the change is faster than describing and reviewing it, skip the agent entirely.

## FAQ

**Q. Do I really need a checklist if the tests pass?**

A. Yes. Generated code compiles and passes naive tests far more often than it is correct. The most common AI failures—broken access control, wrong ownership checks, silent scope creep—live in the gaps your tests do not cover. A green build is necessary, not sufficient.

**Q. How long should reviewing an AI diff take?**

A. Budget roughly the time it would take to write the change yourself, minus the typing. If a diff is too large to review in one sitting, that is a signal the task was too big, not a reason to trust it more. Keep tasks scoped to one feature or one bug.

**Q. Can I just ask the AI to review its own code?**

A. It helps as a second pass and catches some missing null checks and edge cases, but it is not a substitute for your review. The model is equally confident whether it is right or wrong, so a self-review can confirm a bug as easily as it can find one. Use it after your own pass, not instead of it.

**Q. Is this checklist specific to Claude Code?**

A. No. It applies to any AI coding tool—Claude Code, Cursor, Copilot, or a plain chat model you paste code into. The failure modes are shared because they come from how language models generate code, not from any one product.

## Related Articles

- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [코딩에 AI를 쓸 때의 메모](/coding-with-ai-tip/)
- [AI coding workflow 태그](/tags/ai-coding/)

## Sources

- Veracode, *2025 GenAI Code Security Report* — [summary via Help Net Security](https://www.helpnetsecurity.com/2025/08/07/create-ai-code-security-risks/)
- GitClear, *AI Code Quality Research 2025* — [report summary](https://www.gitclear.com/press_mentions)

This post is part of my AI-assisted solo developer workflow series. More practical guides on building and reviewing code with AI tools are on the way.

_Last updated: 2026-06-26._
