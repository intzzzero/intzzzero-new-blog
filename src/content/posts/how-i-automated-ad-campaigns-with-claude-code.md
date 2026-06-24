---
title: "How I Automated Ad Campaigns with Claude Code"
date: 2026-06-24
updatedAt: 2026-06-24
lang: en
category: ai
summary: "A two-layer Claude Code setup for marketing automation: skills handle judgment, Python scripts make every API call, and humans approve before any spend."
tags: ["claude-code", "ai-coding", "claude-skills", "marketing-automation", "developer-tools"]
intent: informational
primaryKeyword: "claude code marketing automation"
faq:
  - q: "Can't I just let Claude Code call the ad APIs directly?"
    a: "You can, but you shouldn't for anything that spends money. LLM tool calls are non-deterministic: the same request can produce slightly different arguments, retries are not idempotent, and a hallucinated field can create a live campaign with the wrong budget. Put the API calls in a script the agent invokes, so the same input always produces the same call."
  - q: "Is this safe to run against a real ad budget?"
    a: "Only because of the approval gate. Every campaign is created in a PAUSED state and never activates itself. A human reads the generated copy, targeting, and budget, then flips it on. The automation builds the campaign; it does not decide to spend."
  - q: "Do I need separate skills for Meta and Google Ads?"
    a: "Yes. Each platform has its own API rules and failure modes, so I keep one skill per job per platform. They share the same pattern, though: a thin skill that handles language and judgment, calling a deterministic Python script that handles the API."
---

## Quick Answer

I automated my ad campaigns with Claude Code by splitting the system into two layers. The top layer is **skills** — one small skill per job (research a brand, draft copy, generate a creative, set up a campaign, pull performance, evaluate it). Skills handle language and judgment. The bottom layer is **plain Python scripts** that make every actual API call to Meta and Google Ads. Skills never call the API directly; they shell out to a script with JSON arguments. And every campaign is created **PAUSED**, so nothing spends money until I read it and approve. The agent builds; the human decides. Below is the exact structure.

## Who This Guide Is For

- Solo developers and indie hackers running their own paid ads for a side project or small SaaS
- People who already use Claude Code and wondered if it can drive something riskier than a code edit
- Anyone who tried to get an LLM to "just call the ads API" and got a confidently wrong request

If you have never touched an ad platform API, this still maps cleanly — the two-layer idea is the part that transfers, not the specific endpoints.

## The Core Idea: Judgment Layer vs Execution Layer

The mistake I almost made was letting the agent call the ad API as a tool directly. It works in a demo and scares you in production. Ad APIs spend real money, and LLM tool calls are non-deterministic: the same instruction can come out with a slightly different budget, a retried call can double-create, and a hallucinated field name fails in a way that is hard to trace.

So I drew a hard line:

- **Claude Code skills** do what models are good at — read a brand, write ad copy, decide a concept, judge whether last week's numbers were good.
- **Python scripts** do what must be exact and repeatable — authenticate, build the request body, call the API, return JSON.

The agent's job ends at producing arguments. The script's job is to turn the same arguments into the same API call every single time. That boundary is the whole design.

## The Workflow

### Step 1: One Skill Per Job

Instead of one mega-prompt that "does marketing," I wrote many small skills, each doing exactly one thing. A rough map of mine:

- `brand-research` — gather what the product is and who it is for
- `content-planner` — pick the angle and outline
- `copy-generator` — write headlines and descriptions
- `creative-generator` — turn a product image into an ad image
- `ad-setup` — assemble the campaign, ad set, and ad
- `fetch-campaign` — pull performance numbers
- `evaluate-campaign` — judge the numbers and recommend the next move

When something goes wrong, I can point at the one skill that failed instead of debugging a monolith. This is the same single-responsibility habit I lean on when I [run a Claude Code writing project like software](/claude-code-writing-project-like-software/).

### Step 2: Natural Language Triggers Map to Skills

Each skill declares its triggers in frontmatter, so I drive the whole system in plain language. "Set up a campaign for this brand" routes to the setup skill; "how did last week do?" routes to the fetch-and-evaluate path. I am not memorizing commands — I am describing intent, and the skill descriptions do the routing.

### Step 3: Skills Call Deterministic Scripts

This is the load-bearing step. A skill does not call the ad API itself. It builds a JSON payload and invokes a script:

```bash
python ad_manager.py create-campaign '{
  "brand_id": "brand-a",
  "objective": "OUTCOME_TRAFFIC",
  "daily_budget": 10000,
  "status": "PAUSED"
}'
```

The script owns authentication, the exact request shape, and error handling. If I run the same command twice, I get the same call. The agent picked the arguments; the script guarantees the execution.

### Step 4: Every Campaign Is Created PAUSED

No script in the system activates a campaign. Creation always sets `PAUSED`. The agent assembles the copy, the targeting, the budget, and the creative, then stops. I read all of it, and only I flip the switch with an explicit `activate` call. The automation removes the busywork; it never removes the decision to spend.

### Step 5: Measure, Evaluate, Decide, Loop

After a campaign runs, a fetch script pulls insights and an evaluate skill reads them and recommends: keep, adjust budget, or pause. That recommendation is an input to me, not an autopilot. The loop closes with a human at the wheel.

## Example Project Structure

Genericized, but this is the real shape:

```text
marketing-agent/
  CLAUDE.md              # how the agent should behave; the workflow map
  .env                   # API tokens (never committed)
  .claude/skills/        # one skill per job
    brand-research/SKILL.md
    content-planner/SKILL.md
    copy-generator/SKILL.md
    creative-generator/SKILL.md
    ad-setup/SKILL.md
    fetch-campaign/SKILL.md
    evaluate-campaign/SKILL.md
  src/                   # deterministic execution layer
    ad_manager.py        # campaign CRUD + insights via the ads API
    creative_generator.py# image generation
    copy_generator.py    # AI copy via CLI
    reporting.py
  assets/
    brands/
      brand-a/
        profile.json     # name, features, target persona
        guidelines.md    # tone and brand rules the copy skill reads
        ad_images/        # generated creatives
```

Two things matter here. `CLAUDE.md` is the constitution — it tells the agent the workflow and the hard rules ("campaigns are created PAUSED, never activated automatically"). And `assets/brands/<id>/` keeps each brand's facts in one place, so the copy skill reads the brand's tone from a file instead of me re-explaining it every session.

## Why a Script Layer Instead of Letting the Agent Call the API

It is tempting to register the ad API as a set of agent tools and skip the scripts. I tried the lighter version and backed out. The script layer buys three things an LLM tool call does not give you:

| Concern | LLM tool call | Script the agent invokes |
| --- | --- | --- |
| Same input, same call | Not guaranteed | Guaranteed |
| Retries | Can double-create | Idempotent if you write it that way |
| API quirks encoded once | Re-derived each run | Fixed in code, tested once |
| Auditability | Buried in a transcript | A command you can rerun and diff |

The ad platforms are full of quirks that you want to encode exactly once, in code, not re-derive probabilistically on every run. Which brings me to the part that actually bit me.

## A Real Project Note

The honest part: the failures were never the model being "dumb." They were the ad APIs being strict, and the fix was always to pin the rule down in the script so the agent could not get it wrong again.

- **Filtering by the wrong field.** Listing active campaigns by a `status` field silently returned nothing. The platform filters on `effective_status`, not `status`. An agent guessing field names would never converge on that; a script encodes it once.
- **A field name that looks right and isn't.** Linking an Instagram account wanted `instagram_user_id`. The plausible-looking `instagram_actor_id` is the kind of thing an LLM invents with full confidence. Hardcoding the correct field in the script ended the guessing.
- **Hardcoded targeting IDs.** Interest IDs are not stable enough to hardcode. The script looks them up at runtime instead of trusting a value baked into a prompt.
- **The environment variable that wouldn't update.** I edited `.env`, reran, and got the old token. `load_dotenv()` does not override an already-set variable by default. The fix was `load_dotenv(override=True)` — a one-liner that cost an hour to find.

None of these are AI problems. They are integration problems, and the two-layer design is what contained them: every quirk got fixed in the script layer, once, instead of being re-litigated by the model on every call. The structure is what protects you, not the model — the same lesson I keep relearning [building small web apps with Claude Code](/how-i-use-claude-code-to-build-small-web-apps/).

## Common Mistakes

- **Letting the agent call the spending API directly.** Demos great, terrifying with a budget attached. Put a deterministic script in between.
- **No approval gate.** If your automation can activate a campaign on its own, one hallucinated budget is a live overspend. Create PAUSED, always.
- **One giant marketing skill.** A single skill that researches, writes, generates, and ships is impossible to debug. Split by job.
- **Brand facts living in prompts.** Put tone and product facts in a per-brand file the skill reads, or every session drifts.
- **Trusting the evaluation blindly.** The evaluate skill recommends; it does not decide. You still read the numbers.

## Checklist

- [ ] Skills handle language and judgment only
- [ ] Every API call goes through a deterministic script
- [ ] Scripts take JSON arguments and return JSON
- [ ] Campaigns are created PAUSED, activated only by a human
- [ ] One skill per job, not one skill for everything
- [ ] Each brand's facts and tone live in a file, not a prompt
- [ ] API quirks encoded in code once, with a comment explaining why
- [ ] Secrets in `.env`, never committed

## When Not to Use This Approach

If you run a single campaign once a quarter, this is over-engineering — open the ads manager and click. The structure only pays off when you run the same workflow repeatedly across several brands or products and the setup-and-measure busywork is the bottleneck. And if you cannot yet judge whether ad copy is good or whether last week's numbers were actually fine, automate the mechanics but keep a tight hand on the approval gate — the system removes typing, not the need to know what good looks like.

## FAQ

**Q. Can't I just let Claude Code call the ad APIs directly?**

A. You can, but you shouldn't for anything that spends money. LLM tool calls are non-deterministic: the same request can produce slightly different arguments, retries are not idempotent, and a hallucinated field can create a live campaign with the wrong budget. Put the API calls in a script the agent invokes, so the same input always produces the same call.

**Q. Is this safe to run against a real ad budget?**

A. Only because of the approval gate. Every campaign is created in a PAUSED state and never activates itself. A human reads the generated copy, targeting, and budget, then flips it on. The automation builds the campaign; it does not decide to spend.

**Q. Do I need separate skills for Meta and Google Ads?**

A. Yes. Each platform has its own API rules and failure modes, so I keep one skill per job per platform. They share the same pattern, though: a thin skill that handles language and judgment, calling a deterministic Python script that handles the API.

## Related Articles

- [How I Use Claude Code to Build Small Web Apps](/how-i-use-claude-code-to-build-small-web-apps/)
- [How I Run a Claude Code Writing Project Like Software](/claude-code-writing-project-like-software/)
- [More posts tagged AI coding](/tags/ai-coding/)
- [내가 AI로 블로그 글을 대량생산하는 워크플로우 (Korean)](/how-to-make-content-using-ai/)

_Last updated: 2026-06-24._
