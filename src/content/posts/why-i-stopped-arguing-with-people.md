---
title: "Why I Stopped Arguing With People"
date: 2026-07-16
lang: en
category: think
summary: "Winning a technical argument often costs you the collaborator. Here is why I stopped optimizing for being right and started listening to both human peers and AI tools."
tags: ["disagreement", "collaboration", "working-mindset"]
faq:
  - q: "Does this mean you always agree with whatever design is proposed?"
    a: "No. I express my perspective once with evidence. If the team decides otherwise, I commit fully to making their decision work rather than wasting energy on proving them wrong."
---

I used to believe that my primary value as a software engineer lay in being correct. In architecture reviews, sprint planning sessions, and pull request threads, I approached technical disagreements as trials of truth. I would arm myself with articles, benchmark statistics, and diagrams, ready to dismantle any alternative proposal. More often than not, I won those arguments. I would watch my peers shrug, sigh, and say, "Fine, let's do it your way." I walked away with a warm glow of intellectual validation.

But a few weeks later, the reality of those victories would settle in. The codebase became cleaner in the exact way I had demanded, yet I was entirely alone in maintaining it. When bugs inevitably arose in that module, the colleague I had defeated would quietly assign the ticket to me. "It's your architecture," their silence whispered. "You fix it." I had won the technical argument, but I had lost the collaborator. I was technically right, and completely isolated.

It took me years to realize that in software engineering, a technical victory achieved through exhaustion is a Pyrrhic one. 

## The Compliant Mirror

This truth became embarrassingly clear to me only recently, not through a conversation with a human colleague, but through my work with AI coding agents. 

In this era where AI assistants like Claude and Gemini handle the bulk of our boilerplate and refactoring, we interface with a partner that has no ego. When I prompt an agent to write a service layer and it suggests a decoupled, event-driven pattern, my old instinct sometimes flares up. "No," I tell the prompt bar, "that's over-engineered for this scope. Just write a monolithic class and query the database directly."

The agent does not argue. It does not defend its suggestion. It instantly replies, "Understood. I will write the monolithic class as requested."

I feel that familiar, brief rush of being the master of the code. But five minutes later, when we need to add a second consumer for the same data, the monolithic design breaks down. I spend the next hour guiding the agent through a tedious refactoring process that could have been avoided had I listened to its initial suggestion.

Unlike a human colleague who might harbor resentment, the AI simply complies. It behaves exactly like the absolute winner of an argument expects their opponent to behave: total submission. And in doing so, it serves as an uncompromising mirror. Because the AI never pushes back, I am forced to confront the raw consequences of my stubbornness. There is no one else to blame for the bad design. The compiler doesn't care that I "won" the debate; the runtime exception throws itself anyway. 

Working with AI has made me realize how much of my past "passion" for technical correctness was actually just my ego masquerading as quality control. When you remove the human friction of an argument, you realize how often being right is actually a liability.

## The Vanity of Eristic Dialectic

In his essay *The Art of Being Right*, Arthur Schopenhauer analyzed thirty-eight stratagems for winning arguments, irrespective of the objective truth. He called this "Eristic Dialectic" <strong>(eristische Dialektik)</strong>. Schopenhauer observed that human nature is so built that when we argue, we do not seek to uncover truth; we seek to validate our vanity. We would rather protect our initial assertion than discover that we were wrong.

In software development, this vanity is particularly dangerous because code is deceptively malleable. Unlike physical architecture, where gravity immediately punishes a bad design, software can be forced to work under the weight of sheer willpower. You can write bad abstractions, bypass security layers, and ignore edge cases, and the code will still compile. You can "win" the debate and force your bad idea into production.

But software is a living system. A design forced upon a team without consensus decays rapidly. If a developer does not believe in the architecture they are writing, they will not maintain its boundaries. They will take shortcuts. They will work around the structure rather than within it. The technical integrity of a system is not determined by the correctness of the initial blueprint, but by the shared ownership of the people who touch it every day.

When I argued to win, I was treating my colleagues as adversaries to be defeated rather than partners in a shared system. I was optimizing for the state of the codebase at the moment of commit, ignoring the long-term human dynamics required to keep it alive.

## From Persuasion to Joint Discovery

I have changed my approach. 

Now, when a colleague proposes a design I disagree with, I no longer build a case to defeat them. Instead, I try to ask questions that expose the boundaries of their assumptions. "What happens if this third-party API goes down?" or "How will we test this side effect?" 

If they have an answer, I listen. If they don't, we look at the problem together. The goal is no longer to convince them that my solution is superior, but to help us both discover where the current proposal might break. If the team still prefers a direction I remain skeptical of, I state my concern once, clearly, and then I let it go. I commit to making their decision successful. 

With AI, I have adopted a similar discipline. When an agent suggests an approach that feels counterintuitive, I stop typing commands and start asking for its reasoning. "Why did you choose this pattern over a simpler one?" I find that more than half the time, the agent has identified a subtle constraint in the codebase that I had overlooked. By treating the tool as a collaborator rather than an executor of my biases, the code improves.

This shift requires a conscious dampening of the ego. It requires accepting that a slightly less elegant design supported by a committed team is infinitely better than a "perfect" design maintained by a resentful engineer who has checked out.

## The Honest Exception

Of course, this does not mean abdication. There are moments when a proposed direction crosses a boundary of safety, security, or fundamental stability. 

If a colleague proposes skipping input validation or storing secrets in plain text, I will not stand by. But even in these critical moments, the method of disagreement must change. I do not engage in a rhetorical debate. I do not raise my voice or write paragraph-long PR comments. I write a failing test case, cite the specific security standard, or point to the vulnerability report. 

If the danger is real, the facts will argue for themselves. If I still find myself needing to debate aggressively to prevent a disaster, it is usually a sign of a deeper organizational or cultural failure—one that no single technical argument will ever fix.

## Wanting to Get Better

I stopped arguing not because I stopped caring about the quality of the software, but because I wanted something more: a codebase that outlives my presence and a team that grows together. 

AI agents have given us the ultimate tool for executing our own wills. They will write whatever we tell them to write, no matter how short-sighted. They will let us win every argument. But the code they generate is still our responsibility. In a world where our tools no longer challenge our stubbornness, we must rely on our human peers to do so. 

The next time a colleague disagrees with your design, thank them. They are the only ones preventing you from winning your way into a disaster.

## Sources
- Arthur Schopenhauer, *The Art of Being Right* (Eristic Dialectic) — [Project Gutenberg](https://www.gutenberg.org/files/26353/26353-h/26353-h.htm)
