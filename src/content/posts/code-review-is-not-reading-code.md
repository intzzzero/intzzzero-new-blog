---
title: "Code Review Isn't Reading Code"
date: 2026-07-08
lang: en
category: work
summary: "Code review isn't finding what's wrong with the code; it's reconstructing the problem someone was solving. Here's why that shift changed how I review."
tags: ["code-review", "pull-requests", "feedback", "collaboration"]
faq:
  - q: "Does reading for intent mean you approve worse code?"
    a: "No. You still block on correctness, security, and data loss. Reading for intent changes the order of operations, not the standard: you understand the problem first, then judge the solution against it. Most of the time that makes the review sharper, because you catch solutions that are locally clean but solving the wrong problem."
  - q: "How do you review a change when you disagree with the whole approach?"
    a: "Say it once, early, as a question about the problem rather than a verdict on the code: 'What made you go with a queue here instead of a cron job?' If the answer reveals a constraint you missed, you learned something. If it doesn't, you've earned the right to push back, and you do it in one clear comment instead of a running commentary down the diff."
---
I used to open a pull request the way a proofreader opens a manuscript: scanning for the mistake, pen already uncapped. I was good at it. I could spot the off-by-one, the missing null check, the abstraction that would leak in six months. And I left reviews that were technically correct and quietly useless, because I had answered a question nobody asked. The code was never the thing I was there to read. The person was.

That sentence would have annoyed me a few years ago. Review the person? I review code. I check whether it works, whether it's clean, whether it will hurt us later. Reading intent sounded like the soft, feelings-first version of a job that is supposed to be rigorous. It took me an embarrassingly long time to notice that the rigor was never in the finding. It was in the understanding, and I had been skipping straight to the verdict.

## The wrong question

For a long time I measured my reviews by what I caught. Comments left, bugs prevented, bad patterns headed off at the pass. It felt like diligence, and some of it was. But the question I was actually asking, on every diff, was some version of "what is wrong with this?" And if you go looking for what's wrong, you will always find something, because there is no such thing as code with nothing wrong with it. There is only code that is good enough for the problem it solves.

The trouble is that "what is wrong with this" is answerable without ever knowing what "this" was supposed to do. You can flag a nested loop as inefficient without knowing the collection never exceeds ten items. You can call an abstraction premature without knowing three more callers are landing next week. You can be right about the code and wrong about the change, and the author feels that mismatch immediately. They didn't ask for a grade. They asked, implicitly, "does this solve the thing I was trying to solve?" When the answer comes back as a list of style notes, they learn something, but not what you intended. They learn to route around you.

I have watched teams do this quietly. A reviewer becomes known as the one who nitpicks, and people start timing their pull requests for when that reviewer is on vacation, or splitting changes so the interesting decisions slip through under a pile of boring ones. Nobody says any of this out loud. The review still happens. It just stops doing anything, because the author has already decided the review is an obstacle to clear rather than a mind to consult.

## What "egoless" actually asks of you

The idea that fixed this for me is older than I am. In 1971, Gerald Weinberg described what he called egoless programming: the practice of separating your identity from your code so that a critique of the code is not a wound to the self. Most people remember it as advice for the author. Don't take feedback personally. Let others read your work. But there is a second half that gets quoted less, and it is aimed at the reviewer. If the author is supposed to hold their code loosely, the reviewer has to earn that by holding their own judgment loosely too. Egoless review is not the absence of standards. It's the willingness to be surprised by why the code looks the way it does before deciding it's wrong.

That reframing lines up with something philosophers call the principle of charity: when you're interpreting someone, assume they are rational and start by constructing the strongest version of what they meant. Not because everyone is right, but because you can't meaningfully disagree with a position you haven't first understood. Applied to a diff, it's almost mechanical. Before I write a single comment, I try to reconstruct the problem the author was solving and the constraints they were solving it under. If I can't state that back in a sentence, I'm not ready to review. I'm just reacting to syntax.

The shift sounds small and it changes everything. When I read for intent first, my comments stop being verdicts and start being questions, because I genuinely don't know the answer yet. "What made you reach for a lock here?" is a different act than "this doesn't need a lock." The first invites the author to explain a constraint I might have missed. The second assumes there isn't one. Half the time the question dissolves my own objection. The other half, the author discovers the hole themselves while typing the reply, which is the only kind of feedback that ever really lands: the kind someone gives themselves.

## What I do differently now

I read the diff twice. The first pass is only for intent. What is this trying to do, and does the shape of the change match the shape of the problem? No line comments allowed on that pass. The second pass is for defects, and by then I'm judging the solution against a problem I actually understand, which is when I'm at my most useful, because I can tell the difference between code that is wrong and code that is merely not what I would have written.

I separate the blocking from the bikeshedding, explicitly, so the author never has to guess which of my comments they're allowed to ignore. A correctness bug and a naming preference are not the same weight, and flattening them into one undifferentiated stream of comments is how you train people to treat all of your feedback as noise. When something is just taste, I say it's just taste. When something will lose data, I say it will lose data. The words "this is blocking" cost nothing and save an entire round of misread priorities.

And when I can, I bring the fix, not just the flag. Pointing at a problem and walking away is the cheapest move in review, and it puts the whole cost of the exchange on the author. Suggesting the change, or at least the direction, says I'm in this with you rather than grading you from a distance. It is slower for me and much faster for the change, which is the trade I want to be making, because the goal was never to be seen catching things. The goal was to ship something good with the trust intact on the other side.

## When the code really is the point

I want to be careful here, because there's a failure mode on this side too, and I've fallen into it. Reading for intent can curdle into a kind of gentleness that never says anything clearly, where every real objection gets softened into a question until the author has no idea you were actually worried. That's not charity. That's cowardice wearing charity's clothes.

Some changes need a verdict. A SQL query with a user string concatenated into it does not need me to wonder aloud about the author's intent; it needs me to say this is an injection vulnerability and it cannot merge. A migration that drops a column without a backfill, a public API signature that will break every caller, a race condition in the payment path: on these, the kind thing and the direct thing are the same thing. Understanding the intent takes ten seconds and the answer is still no. Reading the person first doesn't mean lowering the bar. It means you've earned enough trust that when you do plant your feet, people know you mean it.

## The posture, not the knowledge

The best reviewers I've worked with were not the ones who knew the most. They were the ones who made me feel like my problem was worth understanding before it was worth judging, and somehow their hardest feedback was the easiest to accept. For years I thought that was a personality trait I didn't have. It isn't. It's a sequence you can choose: understand, then evaluate, then decide how much of what you found is actually worth saying.

I still catch the off-by-one. I still block the data loss. What changed is what I think I'm doing while I read. I'm not hunting for what's wrong with your code. I'm trying to understand the problem you were solving well enough to help you solve it, and if I've done that right, the bugs I catch are almost a side effect. I don't have this fully figured out; I still leave the occasional comment I regret before I've hit submit. But I'd rather be the reviewer people bring their hard problems to than the one they schedule around. That's the whole difference, and it was never about the code.

## Sources

- Gerald M. Weinberg, *The Psychology of Computer Programming* (1971) — the origin of "egoless programming."
