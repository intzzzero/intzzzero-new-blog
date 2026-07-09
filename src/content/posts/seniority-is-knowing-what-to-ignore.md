---
title: "Seniority Is Knowing What to Ignore"
date: 2026-07-09
lang: en
category: work
summary: "I spent years treating seniority as accumulation — more systems, more answers. The senior engineers I admired were better at ignoring, not knowing."
tags: ["career", "seniority", "engineering-judgment", "attention"]
faq:
  - q: "Isn't knowing what to ignore just an excuse for complacency?"
    a: "No. Trained ignoring is active: you can say exactly what you're skipping and why, and you notice when it changes category. Complacency can't do either."
  - q: "Can a junior engineer skip straight to filtering?"
    a: "I don't think so. The filter is built from years of paying attention to everything. You can only safely ignore what you once took seriously."
---

Early in my career I kept a running ledger of everything I didn't know. Distributed systems. Compilers. Whatever framework had shipped that quarter. The list only grew, and I read its length as the exact distance between me and the word "senior." I assumed the engineers above me had shorter lists. I assumed seniority was accumulation — more languages, more systems, more answers — and that if I stacked enough knowledge, the title would eventually describe me.

Then I started watching what the senior engineers around me did all day.

They were not answering more questions than everyone else. They were declining to engage with most of them. They let alerts sit that I would have jumped on. They shrugged at technologies I was frantically reading about. They stayed quiet in debates where I knew they had an opinion. And they were almost always right about what deserved their attention and what didn't.

It took me years to accept what I was looking at. What makes an engineer senior isn't knowing more. It's knowing what to ignore.

## Answering Everything Felt Like Diligence

My junior model of competence was simple: respond to everything. Every alert was worth investigating. Every code smell was worth a comment. Every new framework was worth an evening. Every technical debate was worth joining, because staying silent might read as not having anything to say.

I told myself this was conscientiousness. Looking back, it was indistinguishable from anxiety. I wasn't triaging the work; I was auditioning for it. Every meeting was a chance to demonstrate I belonged in the room, every review a chance to catch something clever, every discussion a chance to be visibly smart. The work was almost beside the point.

The cost of that posture is invisible while you're paying it. Attention spent uniformly is attention wasted — if everything is important, you have declined to have judgment at all. I would end weeks exhausted and be unable to name the one thing that had mattered. There was always motion. The motion was the problem.

The posture had a social cost too, one I only saw much later. A question answered instantly is a question nobody else gets to grow by answering. I thought I was being helpful; often I was mostly being first.

And here's what I missed: nobody experienced my constant responsiveness as competence. They experienced it as noise with good intentions. The engineer who comments on everything gets skimmed. The one who speaks twice a month gets quoted.

## The Art of Knowing What to Overlook

William James put the whole thing in one sentence in 1890: "The art of being wise is the art of knowing what to overlook." He wasn't writing about engineers. He was describing how a mind under infinite input survives at all — by selecting, relentlessly, and letting the rest go dark.

The empirical version of that sentence came from chess. When Adriaan de Groot studied grandmasters for *Thought and Choice in Chess*, he expected to find that masters calculated more — deeper searches, more candidate moves, bigger trees. He found nothing of the sort. Masters and mid-level players considered roughly the same number of moves to roughly the same depth. The difference was in the first few seconds: masters perceived the board differently. Bad moves never entered their search at all. Their advantage wasn't a bigger computation. It was a better prune.

That result rearranged how I think about experience. The years don't hand you answers. They hand you a filter — a trained, mostly wordless sense of which parts of a situation are load-bearing and which parts are furniture. A senior engineer glancing at an incident channel and saying "that alert always fires during the batch job, look at the connection pool instead" is doing exactly what de Groot's masters did: not searching harder, searching less, in a better place.

Which means ignoring isn't the absence of attention. It's attention's most expensive product. The master ignores the bad move *because* of the ten thousand positions behind them, not instead of them.

I find that reframing oddly comforting. My junior-year instinct — pay attention to everything — wasn't wrong. It was tuition.

## What I Actually Stopped Doing

The shift, when it finally came, was less about learning and more about subtraction.

I stopped leaving every review comment I could defend. Technically-correct observations are unlimited; the author's attention is not. Now I try to find the one or two things that change the outcome and let the rest go — which, I've written before, is really a question of [what a code review is even for](/code-review-is-not-reading-code/). (Yes, I used to be the reviewer with thirty comments. I'm sorry.)

I stopped chasing framework releases. Not because new tools don't matter, but because most of them resolve themselves without me. If something is still being talked about in a year, I'll learn it then, faster, with better documentation and fewer sharp edges. The half-life of that particular fear turned out to be short.

I stopped fixing code that was merely different from how I would have written it. Style disagreements are the cheapest way to feel productive: the diff is easy, the improvement is unfalsifiable, and the message it sends — your way was wrong — costs more than the cleanup was ever worth. If it's correct, tested, and the team can read it, my preference is one more input, not a veto.

I stopped joining every technical argument I could win. Some debates are load-bearing — they decide architecture, data models, things that are expensive to reverse. Most are aesthetic. I used to treat both kinds as battles for credibility. Now I try to say what I think once, clearly, and then let the reversible decisions be made by whoever has to live with them.

I started saying "I don't know" faster. Pretending to know is another way of responding to everything — noise wearing the costume of signal. The senior engineers I trusted most were the quickest to say it, and I noticed nobody's opinion of them dropped. Mine went up.

The strange arithmetic of all this subtraction: the fewer things I responded to, the more weight each response carried. Proving less turned out to be the most convincing thing I ever did.

## The Filter Has to Be Earned

I want to be careful here, because "know what to ignore" reads dangerously close to a permission slip for laziness, and it isn't one.

There's a version of ignoring that is just negligence with a philosophy. The difference between the two is testable. Trained ignoring can explain itself: I'm not looking at this alert because it correlates with the nightly job and self-resolves; I'm skipping this refactor because the module is scheduled for replacement. Negligent ignoring can't finish those sentences. And trained ignoring stays alert to category changes — the moment the "harmless" alert fires at an unusual hour, it gets promoted back to signal. Complacency doesn't notice promotions.

This is also why I don't think a junior engineer can skip straight to the filter. De Groot's masters could prune bad moves in seconds because of decades of positions studied the slow way. You can only safely ignore what you once took seriously. The accumulation years I was so impatient with weren't a detour from judgment; they were its raw material. That's part of why I worry about [outsourcing too much of the early attending to AI tools](/what-you-lose-when-ai-writes-your-code/) — if something else does the noticing for you, the filter never forms, and you end up with seniority's calendar age and none of its reflexes.

The filter also decays. A judgment trained on yesterday's systems will confidently ignore tomorrow's real problem, which is why the most experienced people I know periodically re-attend to things they dismissed long ago — not because they doubt the filter, but because they remember what it's made of.

And some things never become ignorable, no matter how senior you get. Anything touching data loss. Anything touching security. A person on the team quietly telling you something is wrong. The filter exists to protect attention for exactly these — the moments when everything depends on you actually looking.

## The Other Ledger

I still keep the list of things I don't know. It still grows, and I've stopped reading its length as an indictment — nobody's list shrinks in this field, and the people who claim theirs has simply stopped updating it.

But there's a second ledger I care about more now: the list of things I can safely put down. Alerts that don't need me. Arguments that don't need winning. Knowledge that can wait a year to be learned. Chances to look smart that can pass by unclaimed. Every item on that list is attention returned to the few things that need it.

I'm not done. I still catch myself drafting the unnecessary comment, opening the tab for the framework I don't need, rehearsing the point that doesn't matter. The auditioning instinct doesn't retire; it just gets easier to notice.

Knowing more got me into this profession. I'd like knowing what to overlook to be the thing that makes me good at it.

## Sources

- William James, *The Principles of Psychology* (1890), vol. 2, ch. 22 — ["The art of being wise is the art of knowing what to overlook."](https://www.britannica.com/quotes/William-James)
- Adriaan de Groot, *Thought and Choice in Chess* (1946/1965) — [masters don't search more moves; they perceive and prune better](https://en.wikipedia.org/wiki/Adriaan_de_Groot)
