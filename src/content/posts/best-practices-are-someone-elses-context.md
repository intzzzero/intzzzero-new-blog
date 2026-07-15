---
title: "Best Practices Are Someone Else's Context"
date: 2026-07-15
lang: en
category: work
summary: "A best practice is a compressed argument, and the compression drops the context that made it true. AI now hands me the answer instantly, argument discarded."
tags: ["best-practices", "engineering-judgment", "ai-assisted-coding", "engineering-craft"]
faq:
  - q: "Isn't this just 'it depends' with extra steps?"
    a: "'It depends' ends the conversation without naming what it depends on. The useful version is specific: this practice was invented by people with a particular constraint, it trades away a particular thing, and it fails under particular conditions. If I can't fill in those three blanks, I haven't understood the practice — I'm just wearing it."
  - q: "Do I have to reconstruct the reasoning behind every convention I adopt?"
    a: "No, and trying would be its own paralysis. I triage by reversibility. A lint rule I can delete in an afternoon doesn't need an argument. A data model, an auth boundary, a service split — anything I'd have to live with for years — gets the questions before it gets installed."
---

I followed best practices for years because they made me feel safe. I could point at a rule and say: this isn't my opinion, this is what good engineers do. It took me a long time to notice what I was actually doing. I was borrowing someone else's conclusion, skipping their argument, and calling the result professionalism.

A best practice is an answer. Somewhere behind it there was a question, and conditions that made the answer true. I had checked neither.

The tell was simple, and I missed it for years: I could recite the rule, but I couldn't tell you what it cost.

## The rules I followed to feel safe

Every practice is a trade. It buys something and it charges for it — in flexibility, in indirection, in the three weeks you spend building the abstraction before it earns anything back. If I can't name what a rule trades away, I don't know it. I'm wearing it.

And wearing it was mostly the point. A rule with a famous name attached is armor. If a design goes badly and I chose it, that's my judgment on trial; if I was following the practice, the failure belongs to somebody else — some consensus, some conference talk from six years ago. I told myself this was discipline. It was unfalsifiability.

What makes the habit hard to catch is that the rules are usually right. That's what a best practice is: many people's expensive experience compressed into something short enough to remember. The compression is the whole value. You get the conclusion without paying for it.

But compression is lossy, and I never asked what got dropped.

What gets dropped is the conditions — the team size that made the process worth its overhead, the five-year horizon that made the abstraction pay for itself in a codebase that turned out to have eighteen months to live. The practice survives the trip. The conditions don't. They were the boring part.

Dave Snowden put the trap in a single line: "best practice is, by definition, past practice." The rule keeps every bit of its confidence after the context moves. It just quietly stops being about your situation.

## What Chesterton actually said about the fence

Everyone in this industry knows the fence. Almost nothing everyone knows about it is right.

The line people quote — *don't ever take a fence down until you know the reason it was put up* — isn't Chesterton's. It's John F. Kennedy's paraphrase, recorded that way in *Bartlett's*, and it has circulated under Chesterton's name ever since. He never wrote the phrase "Chesterton's fence" either. What he did write, in a 1929 essay called "The Drift from Domesticity," is this:

> There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it."

Read it twice, because it's stranger than the meme. It isn't "do your research." The burden is asymmetric and deliberately unfair: you must be able to argue the case *for the thing you want to destroy* before you're allowed to touch it. Not understand it. Argue for it.

And he isn't defending the fence. The retelling has quietly turned Chesterton into a man protecting legacy code from the young, which is close to backwards. The people he holds up as having earned the right to tear things down are Joan of Arc and St. Francis: "It was exactly the sort of person, like Joan of Arc, who did know why women wore skirts, who was most justified in not wearing one." He isn't pricing the fence. He's pricing the demolition, then handing you the receipt and letting you swing. His complaint about the reformers of his day wasn't that they were wrong — it was that they were unintelligent: "People do not know what they are doing; because they do not know what they are undoing."

Here's the part that got me. We only ever aim this at deletion. Every time I've seen the fence invoked in a review, it was to slow down someone who wanted to remove something. I have never once seen it aimed at installation — and installation is where I did nearly all my damage. I put up fences I couldn't have argued for, and nobody stopped me, because putting up a fence looks like diligence.

Run the rule backwards and it gets sharper than the original: you may not erect a fence until you can say what it blocks, who pays the toll, and what happens to everyone who now has to walk around it.

## The form is perfect and the planes don't land

Chesterton assumed the confused party was the newcomer. Feynman went after the opposite failure, and it's the one that scares me more.

In his 1974 Caltech commencement address he described what he called cargo cult science:

> They're doing everything right. The form is perfect. It looks exactly the way it looked before. But it doesn't work. No airplanes land.

We borrowed that as a joke about copying code you don't understand. It isn't what he was indicting. He wasn't talking about beginners imitating experts — he was talking about experts: researchers, institutions, the lab administrators he named for chasing novel results "for public relations purposes." The form was perfect *because* they were experts. That was the problem. And the ingredient he says is missing isn't knowledge at all. It's "a kind of scientific integrity... a kind of utter honesty — a kind of leaning over backwards," which comes down to one sentence:

> The first principle is that you must not fool yourself — and you are the easiest person to fool.

His diagnosis was never ignorance. It was incentive — which was my armor, exactly. I wasn't following the rule because I didn't know better. I was following it because it couldn't be held against me.

I should admit the obvious thing about myself here. The metaphor I just reached for is a borrowed conclusion. Gelman and Higgs make the case that the cargo cult analogy is historically sloppy — the Melanesian cargo movements were coherent political and religious responses to colonial disruption, not naive mimicry, and the version we all repeat owes more to a 1962 shock documentary than to anthropology. So the metaphor engineers use to mock context-free copying is itself context-free copying. I've used it for years without once checking. The planes don't land on me either.

## The fence that grew there by itself

For most of my career, practices traveled slowly, and the slowness was doing something I never appreciated. A practice arrived with its argument attached, because the argument was the vehicle — a book that spent nine chapters on the reasoning, a talk that was mostly war story with the recommendation as the punchline. You absorbed the conditions whether or not you meant to, because the conditions were most of the words.

That's over, and I don't entirely want it back.

I ask Claude Code how to structure something and the answer arrives before I've finished forming the question. It's a good answer — roughly the median of everything ever written on the subject, in the voice of someone who has done it many times. The argument isn't attached. It didn't get lost in transit; it got averaged out. And the trap isn't that the model is wrong. It's right often enough that going to look for the reasoning feels like wasting a perfectly good afternoon.

Which quietly breaks Chesterton's premise. His rule rests on a claim about the world he thought was too obvious to defend:

> The gate or fence did not grow there. It was not set up by somnambulists who built it in their sleep... Some person had some reason for thinking it would be a good thing for somebody.

That was the whole basis of the exercise. Reconstruction is possible because there's a mind behind the artifact: go find the reason and you'll find the person who had it. But the conventions I get handed now did, in a sense, grow there. There's no author to go ask. There's a distribution. Somebody had a reason — a hundred thousand somebodies did — and their reasons were compressed into a shape that carries none of them. The fence was, more or less, set up by somnambulists.

Snowden's line compounds, too. Best practice was already past practice; a model trained on the accumulated text of that past returns it to me in the present tense, fluently, with no seam where the years used to show.

And Feynman's failure mode has never been cheaper to fall into, because form is exactly what these models are best at. Perfect form is the house specialty. The output looks like what an expert would produce, which means the signal I spent fifteen years learning to read — *this person sounds like they've actually done this* — now costs nothing to emit. You must not fool yourself, and you are the easiest person to fool, and I have never had a tool this good at helping.

I don't know where it ends, and I'm suspicious of anyone who says they do. But the direction seems sayable out loud. As more code gets written this way, the median feeds back into what the next model learns, and the consensus gets smoother and more confident and further from the conditions that made it true. What gets scarce isn't the answer. Answers are free now, and they're decent. What gets scarce is the argument, and the people who can still reconstruct one.

## Asking for the argument instead of the answer

The fix turned out to be the same tool and a second question.

These models hold the argument. They just don't lead with it, because I asked for an answer and they're obliging. So now I ask the rest: what does this trade away, when does it fail, what constraints did the people who invented it have, what would you do instead if my team were three people and this ships in a month. Those answers are often better than the recommendation was. Every so often one ends with the model explaining, perfectly cheerfully, that the practice it just handed me was designed for an organization nothing like mine. It never volunteers that. It answers it every single time I ask.

It's the same move as [asking what problem someone was solving before telling them what's wrong with their solution](/code-review-is-not-reading-code/) — the posture I had to learn in review, aimed at something with infinite patience for interrogation and no capacity to take offense.

The other half is writing the argument down next to the fence, because rules outlive reasons by default. If a convention lives in a codebase and nobody can say what it's for, it's decoration — and it will be enforced anyway.

That has gotten strange in a way I haven't fully metabolized. The conventions file I keep for my agents is a fence I erect for a collaborator that will never ask why. It complies. Perfectly, instantly, at three in the morning, without once saying "wait, why do we do it this way?" That question — the junior engineer's question, the one I used to find mildly annoying — was free maintenance on my reasoning, an audit I didn't know I was receiving. The most obedient collaborator I've ever worked with is also the first one who will never make me justify myself.

So I have to run that audit myself now. I'm not naturally good at it, and nothing in my day will remind me.

## When the rule is smarter than I am

Most of the time the median is right. That's what makes it the median. It encodes more experience than I'll accumulate in a career, and the odds that my situation is the exception are lower than my ego's estimate, reliably.

Some fences have graves behind them. Don't roll your own crypto isn't a conclusion I need to re-derive; it's a rule I obey precisely because the reasoning is beyond me, and the honest move is to notice that and stop. When I'm new to something, rules aren't a crutch, they're the only door in. You can't have judgment about a domain you've never been inside, and pretending otherwise just means inventing your own worse practices from scratch. Rules buy time until you've earned an opinion — [which is most of what the years actually hand you](/seniority-is-knowing-what-to-ignore/).

There's also a failure mode on my side of this argument, and I've lived in it. Refusing the median to feel like an expert is the same outsourcing, inverted — the form of independent thought without the substance, a perfect little runway with no planes. The contrarian who won't use the framework everyone uses hasn't reconstructed anything. He's picked a different consensus to belong to, one with fewer members and a higher opinion of itself.

The point was never to distrust the practice. It was to stop confusing *following* it with *knowing* it.

## What I want to be able to say

I follow more best practices now than I ever have. The tools made them cheap, and most days I take the answer and ship.

What changed is small, and it isn't a technique. Before I install a fence I'll have to live with for years, I try to say out loud what it blocks and who pays the toll. Sometimes I can. When I can't, that's the whole signal — not that the practice is wrong, but that I've just outsourced a decision I'm going to be maintaining for a very long time.

I didn't start asking because I think I know better than the consensus. I started because I noticed I'd built a career out of borrowed conclusions and couldn't tell which ones I could still defend. That's an uncomfortable thing to learn about yourself at any age, and a worse one to learn from a machine that can hand you a thousand more of them a day — all plausible, none arguing.

I want to be the kind of engineer who can argue for the fence. Either direction. That's Chesterton's actual point, the one the meme lost on the way here. Joan of Arc got to burn the thing down. She just had to know what it was for first.

## Sources

- G. K. Chesterton, "The Drift from Domesticity," in *The Thing* (Sheed & Ward, 1929) — [the fence passage and the Joan of Arc example](https://www.gkc.org.uk/gkc/books/The_Thing.txt). The widely quoted "don't ever take a fence down…" line is John F. Kennedy's paraphrase, not Chesterton's words; "Chesterton's fence" is a later coinage.
- Richard P. Feynman, "Cargo Cult Science," *Engineering and Science* 37(7), June 1974 — [Caltech's 1974 commencement address](https://calteches.library.caltech.edu/51/2/CargoCult.htm). Quoted from the *Engineering and Science* text; the version reprinted in *Surely You're Joking, Mr. Feynman!* (1985) is adapted and differs.
- Andrew Gelman and Megan Higgs, "Interrogating the 'cargo cult science' metaphor," *Theory and Society*, 2025 — [on the historical and cultural baggage the analogy carries](https://sites.stat.columbia.edu/gelman/research/published/cargocult.pdf).
- David J. Snowden and Mary E. Boone, "A Leader's Framework for Decision Making," *Harvard Business Review*, November 2007 — ["best practice is, by definition, past practice"](https://hbr.org/2007/11/a-leaders-framework-for-decision-making).
