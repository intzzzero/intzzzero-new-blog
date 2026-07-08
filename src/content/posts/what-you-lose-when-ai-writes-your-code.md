---
title: "What You Lose When AI Writes Your Code"
date: 2026-07-08
lang: en
category: think
summary: "AI writes the first draft and it feels like pure speed. But performance isn't learning — the struggle you skip is the exact thing that made you an engineer."
tags: ["ai-coding", "learning-to-code", "junior-developers", "engineering-craft"]
faq:
  - q: "Does this mean I shouldn't use AI coding tools?"
    a: "No. The problem isn't the tool, it's the posture. In the 2026 Anthropic study, developers who used AI to ask conceptual questions scored above 65% on comprehension while those who delegated the code generation scored below 40% — same tool, opposite outcomes. Use it to interrogate the problem, not to skip past it, and keep the generation of the parts you actually want to understand for yourself."
  - q: "Is this only a problem for junior developers?"
    a: "No. Juniors have the most to lose because they're building their foundation, but I feel it as an experienced engineer too. Any time you're learning something genuinely new — a new language, a new domain, an unfamiliar codebase — you're a junior again, and offloading the struggle costs you the same way. The habit matters more than the seniority."
---
The first time an AI assistant wrote a function I didn't fully understand, I shipped it anyway. The tests were green. It worked. I felt fast and a little bit fraudulent, and I told myself the second feeling was just nostalgia. It wasn't. A week later I couldn't have written that function again from scratch, and it took me longer than I'd like to admit to see what that meant: my output had gone up and my understanding had gone down, at the same time, from the same cause.

That's the trade almost nobody names. When people argue about AI and coding, they argue about whether the code is good enough. I think that's the wrong worry. The code is mostly fine. What I'd worry about is what happens to the person who stopped writing it.

## The trade I didn't notice I was making

For a while it felt like pure productivity. Tickets closed faster. The blank-page dread of an unfamiliar API was gone, because I could ask and get something that ran. If you had shown me my own commit history, I would have said I was having one of my best quarters.

But a gap opened up between what I could ship and what I could explain. I'd merge something on Monday and, asked about it on Friday, find myself reading my own pull request like a stranger. The knowledge hadn't stuck, because it had never really been mine. I had been present for the code the way you're present for a movie you half-watch on a plane.

Then I read the numbers, and the private feeling turned into something I couldn't wave off. In early 2026, Anthropic ran a study on developers learning unfamiliar libraries with AI help. The ones who leaned on the assistant to generate code scored 17% lower on comprehension than those who didn't. And the split inside the study was sharper than that headline: developers who used AI to ask conceptual questions scored above 65%, while those who delegated the code generation scored below 40%. Same tool, opposite outcomes. The entire difference was in what the human kept for themselves.

And I'm one of the lucky ones. I got a decade of reps before the shortcut existed — years of writing bad code by hand and slowly learning why it was bad. The junior starting today is handed the shortcut on the first morning, before the foundation is poured. The worry isn't that they'll write worse code than me; often the machine's code is cleaner. It's that the ladder I climbed — the boring, manual, generative work that quietly turned me into an engineer — is being pulled up behind me, and nobody decided that on purpose. It just became the path of least resistance.

## Performance was never the same as learning

There's a distinction from cognitive psychology I wish I'd learned a decade before I did. Robert and Elizabeth Bjork spent years showing that performance and learning are not the same thing, and worse, that they can move in opposite directions. Conditions that make practice feel smooth right now — rereading, repetition, having the answer handed to you — produce good performance in the moment and poor retention later. Conditions that feel harder — spacing things out, testing yourself, generating the answer instead of recognizing it — slow you down now and make the learning last. They gave these frictions a name: desirable difficulties.

Once you have that phrase, AI coding is easy to see for what it is. It is a machine for removing desirable difficulties. That isn't a flaw in the product; it is the product. The whole pitch is that the hard, slow, effortful part goes away.

And one of the specific difficulties on the Bjorks' list is generation. Which is the other piece of research I can't stop thinking about. In 1978, Slamecka and Graf ran a series of experiments showing that people remember material they generate themselves far better than the same material they merely read. Producing the answer — effortfully, even imperfectly — encodes it in a way that reading past it never does. It turns out that writing the code was never just the means to the working software. The act of generating it was how the knowledge got into me in the first place.

So when the machine generates and I read, I've quietly swapped the strongest form of learning for the weakest. I've traded it for a speed I feel immediately and a cost I won't feel until the next time I need to know this without help — in an interview, in an outage, in the moment the tool is down or wrong and it's just me and the problem.

## Using the tool to make it harder, on purpose

The comforting thing about that Anthropic split — 65% versus 40% on the same tool — is that it means the assistant isn't the villain. The posture is. The people who came out ahead weren't the ones who refused to use AI. They were the ones who used it to interrogate the problem instead of to skip it.

So I've been trying to put the difficulty back in on purpose. Before I accept a suggestion, I make myself predict what it will do, which turns passive reading into a small test I either pass or fail. When I ask the assistant to explain something, I close the window and try to explain it back to myself out loud before I trust that I got it. I type the load-bearing part by hand and let the tool scaffold the boilerplate around it. I lean on it hardest for the "why" — the conceptual questions the high scorers were asking — and least for the "what." And when I do read what it produced, I try to read it the way I'd read a teammate's pull request, asking what problem it thinks it's solving before I decide whether it solved it — because [reading for intent is its own discipline](/code-review-is-not-reading-code/), and the machine's code deserves it no less than a person's. For the handful of things I want to own outright, I delete its answer and rebuild it once, slowly, from my own head.

None of this is about being a purist or making a show of doing things the hard way. It's narrower than that. It's keeping the one specific difficulty that does the teaching, and cheerfully handing off all the rest.

## When speed actually is the point

I want to be careful, because there's a failure mode on this side too, and it's just as easy to fall into. Not every keystroke is a learning opportunity, and pretending otherwise is its own kind of vanity. Most of what I write in a week is not something I need to carry in my head. Boilerplate, a config I'll touch once, a script I'll throw away, a language I have no intention of getting good at, a deadline that does not care about my personal growth — let the machine rip. Insisting on struggling through those is not discipline; it's waste.

The Bjorks' word was desirable difficulties, not all difficulties. Some friction teaches you nothing except that friction exists. The skill that matters now is telling the two apart: this is a task, get it done; this is something I want to become good at, keep the struggle. Ten years ago the environment made that call for me, because there was no fast path — everything was slow, so I learned from everything, including things that didn't deserve the hours. The tool took that default away. Now the choosing is mine, every time, and I have to make it on purpose.

## The question I ask before I accept

I don't want to be the engineer who shipped the most and understood the least. I use the assistant every day and I'm not giving it up; it would be a strange hill to die on, and a slow one. But I've started asking myself one small question before I let it write something for me: is this a thing I want to have done, or a thing I want to know how to do?

When it's the first, I take the speed and don't look back. When it's the second, I close the suggestion and generate it myself, slowly, the way it always worked — not because the struggle is noble, but because it's the part that turns into skill. The machine can hand me the performance. It can't hand me the learning. That was never a thing you could receive, only a thing you could do, and I'd like to still be doing it a year from now.

## Sources

- Anthropic study on AI coding assistance and skill formation, via [InfoQ](https://www.infoq.com/news/2026/02/ai-coding-skill-formation/) (2026).
- Slamecka, N. J., & Graf, P. (1978). "The generation effect: Delineation of a phenomenon." *Journal of Experimental Psychology: Human Learning and Memory*, 4(6), 592–604.
- Bjork, E. L., & Bjork, R. A. (2011). "Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning." [Bjork Learning and Forgetting Lab, UCLA](https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf).
