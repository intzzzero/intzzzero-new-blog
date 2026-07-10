---
title: "Technical Debt Is a People Problem"
date: 2026-07-10
lang: en
category: work
summary: "I treated technical debt as bad code and my cleanups never held. It's fossilized human trouble — and AI writing our code widens that gap, not closes it."
tags: ["technical-debt", "engineering-craft", "conways-law", "ai-assisted-coding"]
faq:
  - q: "Doesn't calling technical debt a 'people problem' just excuse sloppy code?"
    a: "No. Ward Cunningham, who coined the metaphor, said debt was never about writing code poorly. Sloppy code is a separate failure. Debt is the gap between the code and the understanding a team holds now, and people are what maintain that gap."
  - q: "Does AI writing my code reduce technical debt?"
    a: "It reduces the cheap kind — messy syntax, boilerplate — and can widen the expensive kind. Code generated faster than anyone understands it is debt in Cunningham's exact sense: correct-looking, unowned, and accruing interest from day one."
---

For years I kept a folder in my head labeled "technical debt," and everything in it was code. The god object nobody wanted to touch. The two services that solved the same problem in subtly different ways. The config line with a comment that read `// do not remove, breaks prod`. I thought debt was a pile of bad code, and I thought paying it down was mechanical: schedule the time, refactor the code, ship the cleaner version. I ran that play more times than I can count, and the debt always grew back.

It grew back because I was treating a people problem as a code problem. The bad code was real, but it was a symptom — a cast left behind by something human that had gone wrong upstream: a conversation nobody had, an understanding that had quietly moved on, a boundary drawn by the org chart instead of the domain. You can sand down the symptom all week. If the thing that produced it doesn't change, the same people under the same constraints make the same decisions, and the code grows back into the same shape. And now that a machine writes a growing share of that code, the gap this is really about is widening faster than any of us can refactor.

## The cleanup sprint that didn't stick

A mechanical model of debt suggests mechanical fixes. If the module is ugly, make it pretty. If two things are duplicated, extract the shared piece. If the function is four hundred lines, cut it into ten. I could measure the whole effort in the diff: lines moved, complexity down, tests still green. It felt like paying off a loan on schedule.

Then, a few months later, the balance was back. The abstraction I'd extracted sprouted special cases until it was worse than the duplication it replaced. A fresh tangle grew in the gap between my tidy new modules. For a long time I explained this to myself as a discipline failure — we let it rot again — but "we let it rot" is not an explanation. It's the exact thing that needs explaining.

Here's what finally caught my attention: the debt reformed along the *same lines* every time. Not randomly scattered. The same seam between the same two parts of the system, the same knot around the same feature. Code has no memory. Something else was remembering the shape and rebuilding the mess to spec.

## Cunningham never meant messy code

I'd been saying "technical debt" for years before I read what the man who coined it meant by it. Ward Cunningham introduced the metaphor in a 1992 experience report, and the line everyone quotes is the financial one: "Shipping first-time code is like going into debt... Every minute spent on not-quite-right code counts as interest on that debt."

What almost nobody quotes is the correction he issued seventeen years later. By 2009 the metaphor had gotten away from him, and he recorded a short video pulling it back. "A lot of bloggers," he said, "have explained the debt metaphor and confused it, I think, with the idea that you could write code poorly with the intention of doing a good job later." That was never it. "I'm never in favor of writing code poorly," he said, "but I am in favor of writing code to reflect your current understanding of a problem, even if that understanding is partial."

Read that twice, because it moves the whole concept. The debt was never the messiness of the code. It was the gap between what the team had come to understand and what the program actually encoded. You go into debt the moment your understanding runs ahead of your code, and you pay interest every time someone has to work in the space between the two, reconstructing a mental model the code no longer reflects. Let the gap widen far enough and, in his words, "the program simply does not contain any understanding, and all efforts to work on it take longer and longer... the interest is total, you'll make zero progress."

Understanding is not a property of code. It's a property of people. Cunningham's debt was a human quantity from the very first telling — the code is only where that quantity gets written down, or fails to.

## Your code is a cast of the org chart

If Cunningham tells you what debt *is*, Melvin Conway tells you where the gap comes from. In a 1968 paper with the wonderful title "How Do Committees Invent?", Conway observed that "organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations." Fred Brooks quoted it in *The Mythical Man-Month*, called it Conway's Law, and the name stuck.

Most people meet Conway's Law as a warning about microservices. Its deeper reading is almost fatalistic, and it's the one that rearranged how I see debt: the structure of your software is a fossil of the structure of the conversations that built it. Two modules that don't quite fit are often two people who didn't quite talk. A boundary that makes no sense in the domain usually makes perfect sense once you learn which team owned each side. The awkward seam isn't a coding mistake; it's an org chart rendered in code.

That's why my cleanups kept regrowing along the same lines. I was sanding the surface of a structure whose mold was still in place. The two services duplicated logic because the two people who owned them had every reason to ship independently and none to synchronize. Refactor the duplication and the mold reasserts itself within a quarter, because the communication structure that cast it never moved. I was fighting the fossil and leaving the animal alive.

## Now a machine writes the first draft

Everything above predates the tool I now open every morning. For most of my career, debt accrued at human typing speed. The understanding gap widened only as fast as people could write not-quite-right code, and the org fossilized into the system slowly, through reviews and meetings and pull requests — legible, if you cared to look.

That clock just broke. I write most of my code now with Claude Code, and plenty of people I respect are somewhere similar with Codex or Gemini. These tools produce plausible, mostly-correct code faster than any human forms an understanding of the problem it's solving. And that is precisely Cunningham's debt, manufactured at scale. The model doesn't encode *my* evolving understanding of *my* domain; it encodes a flattened average of a million repositories. So the gap he warned about no longer widens gradually as I work — it can open the instant the code is generated, before anyone on the team has understood it at all. The interest starts accruing on day one.

Conway gets stranger, too. If a model authored a module, whose communication structure is it a cast of? Not my org's — the model has no standup, no ownership line. The old comforting property of legacy code, that its shape *meant* something about the people who wrote it, quietly stops holding. And here's the trap: AI-generated code often looks *better* than what the humans around it wrote. Cleaner, more consistent, better named. Pretty code that nobody on the team actually understands is peak Cunningham debt — maximum interest, zero visible mess. The tell you always relied on, ugliness, is gone.

I won't pretend to know where this lands. But the direction seems clear enough to bet on. The cheap kind of debt — messy syntax, boilerplate, obvious duplication — keeps getting cheaper to erase, because a model wipes it in seconds. The expensive kind — the distance between what a team understands and what its system does — gets more expensive, because we can now stockpile correct-looking code miles ahead of our comprehension of it. The scarce resource of the next decade won't be people who can produce code. It'll be people who understand the code that's already been produced, most of which they didn't type. Technical debt is about to become *more* of a people problem, not less, even as the code itself gets cleaner. The mess was never the point. The understanding was.

## What changes when you treat it as a people problem

Once I stopped seeing debt as code, my first move on any nasty part of the system stopped being "how do I clean this" and became something closer to archaeology: whose understanding is fossilized here, and has it moved?

That sounds soft; in practice it's the most concrete thing I do. Before I touch a tangled module I try to reconstruct the decision that produced it — not to assign blame, but because the tangle is usually a sane response to a constraint I can no longer see. It's the same instinct good review runs on: [ask what problem someone was solving before you tell them what's wrong with the solution](/code-review-is-not-reading-code/). Half the time I find the "debt" was correct for a world that no longer exists, and the real fix isn't in the code — it's writing down that the world changed.

When the debt does need paying, I've learned to fix the cause before the symptom, and the cause is usually a conversation or an ownership line. If two components keep drifting apart, no extraction survives until someone actually owns the seam. If a module is a mess because three people each half-understood the domain, the durable fix is reaching a shared understanding first and letting the code follow. The refactor is the *last* step, not the first.

The AI shift has only sharpened this. When I review generated code, the question I care about is no longer whether it's correct — the model is unnervingly good at correct. It's whether anyone here understands why it's shaped this way, and could change it under pressure. If the answer is no, I don't merge, however green the tests are. I try not to generate more than I can hold in my head, because [the understanding I skip building doesn't disappear — it just comes due later, with interest](/what-you-lose-when-ai-writes-your-code/). And I write the reasoning down at the moment of generation, while it's still in someone's head, because that's the cheapest it will ever be to capture.

I also stopped trying to pay all of it down. Most of what I'd labeled debt was code that merely differed from how I'd have written it, and [some debt isn't load-bearing enough to deserve anyone's attention](/seniority-is-knowing-what-to-ignore/). The debt worth fixing is the debt sitting on a widening understanding gap — the code you keep tripping over, the seam you keep re-learning. The god object in a module no one has touched in three years is paid off by neglect.

## Sometimes it really is just the code

I want to be honest about the limits here, because "it's a people problem" is exactly the kind of tidy reframe that curdles into an excuse. Some debt is just debt. Sometimes a module is ugly because someone was tired, not because the org chart demanded it. Sometimes a dependency is three versions behind and the fix is an afternoon of mechanical work no conversation will change. Reaching for a sociological story when a fifteen-minute cleanup would do is its own kind of avoidance. The test is simple: can you fix it, permanently, without anyone changing their mind or their behavior? Then it's mechanical. Go fix it and stop theorizing.

And I should own the obvious objection: I mostly work alone now. Where's the "people problem" in a codebase with one committer? It's still there — only stretched across time instead of across a team. Conway's law doesn't care that past-me and present-me share a name; we're two people with different understandings of the problem who never synced, and the seams I fight in my own old code are exactly where an earlier me froze an understanding I've since outgrown. The debt is a conversation I failed to have with my future self. These days there's a third party in that conversation — the model — and it understands the least of any of us, so I've had to get louder about writing the reasons down.

## The list is still there

I still keep the folder of ugly code in my head. The god object, the duplicated services, the config line I'm afraid of. That part didn't change.

What changed is the first question I ask when I open it. It used to be "how do I clean this up." Now it's "whose understanding is fossilized here, and has it moved" — and often the honest answer is that the code is fine and a conversation is overdue. I've watched cleanups fail for enough years to trust that the diff is the easy part. The hard part was always the thing a diff can't touch: getting a set of people — sometimes only me across time, increasingly me alongside a machine that understands nothing — to actually share what we now know, and letting the code become an honest cast of it.

I don't have this solved. I still schedule the refactor before I've asked why the mess exists, still reach for the satisfying diff over the awkward conversation. But I've stopped believing the code was ever the real problem. The code was just telling the truth about us — and I'd like to keep it honest, especially now that so much of it is written by something that can't tell the truth about anything.

## Sources

- Ward Cunningham, "The WyCash Portfolio Management System" (OOPSLA '92) — [the original debt metaphor](http://c2.com/doc/oopsla92.html).
- Ward Cunningham, "Debt Metaphor" (2009) — [his clarification that debt was never about writing code poorly](https://www.youtube.com/watch?v=pqeJFYwnkjE) ([transcript](https://cmdev.com/papers/debt-metaphor/)).
- Melvin E. Conway, "How Do Committees Invent?" (Datamation, April 1968) — [Conway's Law](https://www.melconway.com/Home/Conways_Law.html).
