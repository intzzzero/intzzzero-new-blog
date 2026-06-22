---
title: "How I Run a Claude Code Writing Project Like Software"
date: 2026-06-22
updatedAt: 2026-06-22
lang: en
category: ai
summary: "I built an AI writing workflow in Claude Code and kept reaching for software engineering: single source of truth, single-responsibility skills, and test-first goals."
tags: ["claude-code", "ai-coding", "context-engineering", "ai-writing"]
intent: informational
primaryKeyword: "claude code writing workflow"
faq:
  - q: "Does this approach work for code projects too?"
    a: "Code is the original. Centralizing config into a single source of truth, splitting work into single-responsibility units, declaring acceptance criteria first, and automating review are all standard engineering. The only twist here is that the deliverable was prose, not code."
  - q: "Isn't building all this structure overkill?"
    a: "For a single post or a quick draft, yes. The structure costs a weekend to build. It only pays off when you need consistency across many outputs, like a 30-episode series, a docs set, or a long content pipeline. Below about ten outputs, just write."
  - q: "Why keep separate instruction files for Claude and Gemini?"
    a: "Portability. Keeping CLAUDE.md and GEMINI.md nearly identical means the rules live in the interface, not the model. You can swap the underlying model without rewriting the project's conventions, the same way you abstract a database behind an adapter."
---

## Quick Answer

If you want an AI agent to produce consistent long-form output — a 30-episode novel, a docs set, a content series — stop tuning prompts and structure the project like software. I built a web novel writing workflow in Claude Code, and every tool I reached for turned out to be a software engineering pattern: settings files as a single source of truth, one skill per job (single responsibility), goals declared before drafting (test-first), and review skills that act as linters. The model never got smarter. The context around it got engineered. Here is the exact structure and what each piece maps to.

## Who This Guide Is For

- Solo developers and indie hackers using Claude Code (or any coding agent) for non-code work: writing, docs, research, content pipelines.
- People who already write code and wonder why their AI writing output drifts after a few attempts.
- Anyone who tried "just write the next chapter" and watched the tone, facts, and characters fall apart.

If your project is short — one post, one draft — this is more overhead than it is worth. Skip to *When Not to Use This Approach*.

## The Failure That Started It

My first attempt was naive. I handed Claude a planning document and said "write episode 1." It came out fine. Episode 2 had a subtly different narrator voice. By episode 5, a character who should have been dead was back with dialogue, and the prose had quietly drifted from thriller into dry police report.

The model was not the problem. I was. I had given it a clean prompt and almost no engineered context. So instead of polishing prompts harder, I rebuilt the project structure — and that is where the engineering patterns showed up, one after another.

## The Workflow

### Step 1: Externalize every rule into settings

I moved the world, the character roster, the multi-part plot, the style guide, and the safety boundaries out of my head and into files. Characters became structured data — name, age, voice, relationships, arc — in a single YAML file. Now no episode guesses the protagonist's age; it reads it.

### Step 2: Split the work into one-job skills

Instead of one mega-prompt that does everything, I wrote small skills that each do exactly one thing: draft an episode, design a beat sheet, check character voice, check continuity, check safety, research psychological grounding. When output goes wrong, I can point at the skill that failed.

### Step 3: Declare acceptance criteria before drafting

Before writing an episode, I write down what "done" means: word count, the scene beats, the hook type, what gets set up, what gets paid off. Then I draft. Then I compare the result against that declaration.

### Step 4: Automate review, then review the reviewer

Lint-style skills sweep the draft for inconsistencies, voice drift, and safety-boundary violations. I still read the result — automated checks narrow the search, they do not replace judgment.

## Example Project Structure

```text
project/
  CLAUDE.md          # project constitution for Claude
  GEMINI.md          # near-identical, different model
  PLAN.md            # original design intent
  settings/          # single source of truth
    world.md
    characters.yaml
    plot-master.md
    style-guide.md
    safety.md
  beat-sheets/       # per-arc design docs (the spec)
    beats-ep001-010.md
  .claude/skills/    # one skill per job
    episode-writer/
    beat-sheet/
    voice-checker/
    consistency-checker/
    safety-checker/
    researcher/
    ...
  episodes/          # output: deliverable text only
    part-01/  part-02/
  notes/             # working memory: metadata, reviews
    ep021/working_notes.md
```

The folder names say "novel." The structure says "software project." Here is the one-to-one mapping I noticed only after it was built:

| Writing workflow piece | Engineering concept |
| --- | --- |
| `settings/` documents | Single source of truth, schema |
| "settings wins on conflict" rule | Dependency precedence / resolution order |
| Skills, one job each | Single Responsibility Principle |
| Episode-writer calling other skills | Function composition |
| Goal declaration → goal vs actual | Test-first / acceptance criteria |
| Output files hold text only; metadata in `notes/` | Separation of concerns; source vs build |
| Voice / consistency / safety checkers | Linters, static analysis, CI gates |
| Researcher's "do not search X" rule | Input validation / guardrail |
| Research accumulated to a file | Caching / memoization |
| `CLAUDE.md` ≈ `GEMINI.md` | Interface abstraction, vendor portability |

A few of these are worth unpacking.

**Single source of truth.** The protagonist's age lives in exactly one place. Every episode references it. A rule in `CLAUDE.md` even says: if `PLAN.md` and `settings/` disagree, `settings/` wins. That is just a dependency precedence rule — deciding who wins when two sources conflict, so the model does not pick arbitrarily.

**Test-first, literally.** One real working-note declared a target of 4,500–5,000 characters for an episode. The actual draft came out at 6,398. Because I had declared the criterion up front, "it overshot" was an objective fact I could catch and decide on. Without a stated target, I would never have noticed the bloat. This is the same loop I wanted when I [finally tried TDD](/i-want-tdd/): pin down what "correct" means before you build, then check against it.

**Source vs build separation.** Episode files contain only the prose a reader sees. The goal declaration, the review tables, the research citations all live in `notes/`. If metadata leaked into the manuscript, I could not copy-paste and publish. It is the same reason you do not commit your build folder.

**Caching.** The research skill searches for psychological grounding once, writes it to a file, and checks that file before searching again. Its own instructions say it exists to "avoid re-searching the same topic." That is memoization: store the result of an expensive call, reuse it on the same input. It saves tokens and keeps the answer consistent across episodes.

## A Real Project Note

The honest part: building this took a weekend, and for the first few episodes it felt slower than just writing. The payoff only showed up around episode ten, when I realized the protagonist's voice had stayed identical for the entire stretch and continuity had not broken once — something the naive "write the next chapter" approach lost by episode five.

It is not magic. The agent still drifts inside a single draft; that is exactly why the linter-style checkers exist. And the checkers run on the same model, so I read their output rather than trusting it blindly. The structure is what protects the result, not the model.

## Common Mistakes

- **Treating the agent as a chatbot.** "Write episode 5" with no project context produces confident, inconsistent output. Give it the settings and the spec.
- **Mixing source and metadata.** Goal declarations and review notes inside the output file mean you cannot ship it cleanly.
- **One giant prompt.** A single mega-prompt that does everything is impossible to debug. Compose small, single-job skills instead.
- **Skipping the goal declaration.** Without a stated target, you cannot tell drift from intent.
- **Trusting a single review pass.** Automated checks narrow the problem; they do not certify correctness. You still read the diff.

## Checklist

- [ ] All rules externalized into a single source of truth
- [ ] Each skill does exactly one job
- [ ] Acceptance criteria declared before generating
- [ ] Output files contain only the deliverable; metadata lives elsewhere
- [ ] Automated review skills for consistency and safety
- [ ] Expensive research cached, not re-run
- [ ] Instructions kept portable across models

## When Not to Use This Approach

Skip the structure for short or one-off work — a single blog post, a quick draft, a throwaway script. The scaffolding costs more than it saves below roughly ten outputs. Skip it too for genuinely exploratory work where you do not yet know what "done" looks like; an agent will happily produce polished output for an unclear goal. And if you cannot yet judge the output quality yourself, the review steps matter more, not less — no structure substitutes for your own read.

## FAQ

**Q. Does this approach work for code projects too?**

A. Code is the original. Centralizing config into a single source of truth, splitting work into single-responsibility units, declaring acceptance criteria first, and automating review are all standard engineering. The only twist here is that the deliverable was prose, not code.

**Q. Isn't building all this structure overkill?**

A. For a single post or a quick draft, yes. The structure costs a weekend to build. It only pays off when you need consistency across many outputs, like a 30-episode series, a docs set, or a long content pipeline. Below about ten outputs, just write.

**Q. Why keep separate instruction files for Claude and Gemini?**

A. Portability. Keeping `CLAUDE.md` and `GEMINI.md` nearly identical means the rules live in the interface, not the model. You can swap the underlying model without rewriting the project's conventions, the same way you abstract a database behind an adapter.

## Related Articles

- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [More posts tagged AI coding](/tags/ai-coding/)
- [Context engineering, beyond prompts (Korean)](/context-engineering-based-ontology/)

_Last updated: 2026-06-22._
