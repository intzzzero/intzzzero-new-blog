---
title: "Your Estimate Was Never the Problem"
date: 2026-07-13
lang: en
category: work
summary: "I spent years chasing accurate estimates. The real failure was giving one number when I owed a range — and AI writing the code makes that honesty matter more."
tags: ["software-estimation", "engineering-craft", "planning-fallacy", "ai-assisted-coding"]
faq:
  - q: "Isn't this just an excuse to never commit to a deadline?"
    a: "No. Sometimes the job is to commit to a single date. The honesty isn't in refusing to give a number — it's in saying what scope you'll cut to hit it. A date plus a named sacrifice is a promise you can keep; a range with no commitment can be its own kind of dodging."
  - q: "Doesn't AI make estimation easier by writing the code faster?"
    a: "It speeds up the one part that was already the most predictable — the typing — and leaves the high-variance part untouched: understanding the domain, integrating, and verifying plausible-looking code that's subtly wrong. So the average delivery time drops while the estimate gets less reliable, not more."
---

For most of my career I tried to become a better estimator, and I was aiming at the wrong target the entire time. I thought the job was accuracy — that with enough scars I'd learn to say "three days" and have it take three days. It never converged. The estimates stayed wrong, sometimes by a little and sometimes by an embarrassing multiple, and I kept filing that under a personal weakness I could train away. It took me far too long to see that the number was never the problem. The problem was that I kept handing someone a single number when what I owed them was an honest account of how little I knew.

There's a law for this, and it's a joke that stops being funny the first time you live inside it. Douglas Hofstadter, in *Gödel, Escher, Bach*, stated it as: "It always takes longer than you expect, even when you take into account Hofstadter's Law." The recursion is the whole point. Even the correction needs correcting. You cannot out-experience the thing, because what you're fighting isn't your ignorance of this particular task. It's the shape of prediction itself.

## The number everyone wanted

Every estimate I've ever given was, in truth, an answer to a different question than the one I was asked. Someone says "how long will this take," but they usually mean "when can I promise this to somebody else," and what I hear underneath is "prove you're competent by sounding sure." So I'd reach for the number that made all three of us comfortable — mine, plausible-sounding, and confident — and I'd say it as if it were a measurement instead of a wish.

It was never a measurement. It was a forecast wearing the costume of a fact.

The demand for a single date is a quiet demand to erase uncertainty, and for years I colluded with it. Here's the part I got backwards: the failure was never that my number came in sixty percent low. Software is uncertain; of course the number was low. The failure was that I broadcast a confidence I did not have, so nobody downstream could plan for the very likely world in which I was wrong. A wrong number, framed honestly as "somewhere between three and eight days, probably five," is useful information. The same underlying reality delivered as a flat "five days" is a small act of fraud. Same ignorance, opposite integrity.

## The inside view is a liar

The reason experience alone never fixed this has a name. In 1979, Daniel Kahneman and Amos Tversky described what they called the planning fallacy — our systematic tendency to underestimate how long things will take, *even when we have direct experience of similar things taking longer*. That last clause is the cruel part. Knowing better doesn't inoculate you.

Their explanation was a distinction I now can't unsee: the inside view versus the outside view. When I estimate a feature, I default to the inside view. I mentally walk the path — write this function, wire up that form, handle the obvious cases, done. I'm building a forecast out of the plan's own internal logic, and the plan, by construction, is the version of events where nothing ambushes me. It's the happy path with a stopwatch.

The outside view asks a dumber, better question: how long did the last five things that felt roughly like this actually take, start to finish? That number is always larger, and I always distrust it, because it doesn't know about my specific clever approach to this specific problem. It doesn't need to. It already contains every clever approach that came before mine, and a full accounting of how each one met the world. The outside view isn't smarter than me. It's just less flattering, and less often wrong.

## The cone you can't skip

There's a second reason a point estimate is a lie, and it's not psychological — it's structural. Barry Boehm mapped it in 1981: at the very start of a project, an estimate can be off by as much as a factor of four in either direction. The same task might take a quarter of your guess or four times it, a spread of sixteen to one, and the range only tightens as you do the work and burn off the unknowns. Steve McConnell later gave the shape its memorable name — the Cone of Uncertainty — the funnel that starts absurdly wide and narrows only as you build.

What the cone taught me is that early uncertainty isn't a skill deficit I should be ashamed of. It's information physics. At the start you legitimately do not know, and a crisp point estimate planted at the wide mouth of the cone is lying about how much is even knowable yet. Ranges are the honest unit early on. You earn a narrower range by doing the work, not by squinting harder at the ticket. The mistake I made for years was treating the width of the cone as a moral failing to be hidden, when it was a fact I should have been reporting.

## Now the machine writes the code

Everything above I understood, more or less, before the tool I now open every morning existed. Here is what that tool changed, and it's not what I expected.

For most of my career, the largest and most estimable chunk of a task was the implementation — the typing. Writing the CRUD, wiring the form, translating a pattern I'd used ten times into this codebase. Tedious, but *predictable*; it was the one part where experience paid down variance. The unpredictable parts were always everything else: understanding a domain I didn't yet understand, integrating with the service nobody documented, the bug that only surfaces under real data, the argument about what "done" even means.

Then the machine took over the typing.

I write most of my code with Claude Code now, and plenty of people I respect are somewhere similar with Codex or Gemini. The implementation — the single slice of the work that was low-variance — is exactly the slice that collapsed. A feature that used to be two days of typing is now twenty minutes of generating and an afternoon of working out whether those twenty minutes were right. The average came down, hard. But the variance didn't come down with it. It moved, and if anything it grew, because what's left after you subtract the typing is *entirely* the high-uncertainty residue: comprehension, integration, and the peculiar new tax of verifying confident-looking code that is subtly, expensively wrong. None of that got faster. Some of it got slower, because now I'm auditing code I didn't write and don't yet understand.

So here's the part I still find counterintuitive. AI made my delivery faster and my estimates worse at the same time. It amputated the one component of the work I could forecast with a straight face and handed me back a task that is now almost pure uncertainty. The cone didn't narrow. Its wide mouth became most of the job.

You can read the whole trajectory in that shift. In the old world, an estimate was mostly a bet on implementation effort, padded a little for surprises. Today, implementation is close to free, and the estimate is almost entirely a bet on how long comprehension and verification will take — which is to say, a bet on the exact work [you skip building when you let AI write the code, the understanding that doesn't disappear but comes due later](/what-you-lose-when-ai-writes-your-code/). I won't pretend to know where this settles. But the direction feels safe to bet on: the estimator who survives isn't the one who can produce code the fastest, because the machine wins that outright. It's the one who can look at a fogged-in task and say, honestly, how thick the fog is. Estimation stops being about time-to-type and becomes almost entirely about scoping the unknown — which is what it secretly always was. The AI burned off the part that let us pretend otherwise.

## What I do instead

Once I stopped chasing accuracy, the practice changed in specific ways.

I give a range with a confidence attached, never a bare point. "Probably three days, could stretch to eight if the auth integration fights back." The range *is* the information; the single number was always a lie of omission. Nobody has ever been angry at me for the range. They were angry at the flat number that turned out wrong.

I name the assumption that would blow the whole thing up. Almost every bad miss I've had traces to one thing I quietly assumed and shouldn't have. Saying it out loud — "this assumes the legacy export format is what the docs claim" — lets someone correct me *before* the clock starts, instead of after.

I take the outside view on purpose. The last three things shaped like this each took a week; my gut says two days; I quote the week and then explain why my gut disagrees, so the person can weigh both. My gut is the inside view, and it has a track record.

I re-estimate as the cone narrows. An estimate isn't a promise I make once and defend to the death — it's a running signal I update the moment I learn something that moves it. The silence between the first number and the deadline was always the real failure, not the first number.

And I split every task into "type it" and "understand and verify it." The first is now cheap and low-variance; the second is where all the time lives. Estimating them as one number is precisely how the speed of the machine tricks you into a date you can't hit — I've [merged plausible generated code before I understood it](/technical-debt-is-a-people-problem/) and paid for it not in this task's estimate but in the next one's. When AI writes the code, the estimate has to include the time to *believe* it. The demo is fast. The trust is slow.

## Sometimes they just want a date

I have to be honest about the limit here, because "it's all uncertain" is exactly the kind of tidy reframe that curdles into an excuse. Sometimes a single committed date is the whole point. There's a launch, a contract, a downstream team that cannot move until you give them one number to plan against. Hiding behind the cone in that moment isn't wisdom; it's cowardice wearing wisdom's coat. The professional move isn't to refuse the number — it's to commit to one and then say plainly what you will cut to hit it. A date plus a named sacrifice is a promise you can actually keep. A range offered with no commitment is sometimes just me dodging the discomfort of being pinned down.

Padding isn't the same as honesty either. Doubling my number "to be safe" feels prudent and is usually laziness in disguise — I've replaced the real work of scoping the uncertainty with a multiplier that quietly means "I didn't want to think about it." The outside view is work. The buffer is a way to skip it and feel responsible anyway. Knowing which uncertainties are worth pricing carefully and which to wave off with a round number is its own skill, close to [knowing which problems are worth your attention at all](/seniority-is-knowing-what-to-ignore/).

And I should own the obvious objection: I mostly work alone now, and I estimate for exactly one stakeholder — me. It doesn't help at all. I lie to myself with the same confident single number, feel the same inside-view optimism about the same happy path, and blow the same self-imposed deadlines. The audience for the fraud was never a manager. It was the part of me that wanted to feel sure before it had earned the right to.

## The fog is the job

I still get asked "how long will this take," and I still feel the pull to answer with a round, confident number that makes the room relax. What changed is that I no longer believe getting better at this means getting more accurate. The fog is real, it's structural, and the tools I use every day made it faster to walk into, not any thinner.

So I've stopped trying to become a better fortune-teller. I'm trying to become someone who can describe the fog honestly — how deep it goes, where it thins, what would make it lift — and then walk in anyway, out loud about how little I can see from here. That turns out to be a harder job than accurate estimation, not an easier one. It's the job that estimation was always standing in front of, pretending to be.

## Sources

- Douglas Hofstadter, *Gödel, Escher, Bach: An Eternal Golden Braid* (1979) — [Hofstadter's Law](https://en.wikipedia.org/wiki/Hofstadter%27s_law).
- Daniel Kahneman and Amos Tversky, "Intuitive Prediction: Biases and Corrective Procedures" (1979) — the [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy) and the inside view versus outside view distinction.
- Barry Boehm, *Software Engineering Economics* (1981), later named by Steve McConnell — the [Cone of Uncertainty](https://en.wikipedia.org/wiki/Cone_of_uncertainty).
