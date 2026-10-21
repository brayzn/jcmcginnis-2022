---
essay: directed-chaos
id: rev-01
label: Rev. 01
date: 2025-12-30
---

Most leaders try to make work calm. They tune meetings, add checklists, and hunt surprises with the
zeal of a hospital infection team. There’s a reason: calm looks like competence. The problem is that
calm organizations don’t get stronger. They get brittle. The first time the wind changes, they snap.

Resilience isn’t the absence of chaos; it’s the ability to metabolize it. You don’t build that by
shielding people from turbulence. You build it by exposing them to it—deliberately, repeatedly, and
safely—until the waves stop feeling like a threat and start feeling like a current. That is what I
mean by managed chaos.

I didn’t land on this by reading a clever framework. I landed on it after lots of lived experience,
and most recently, deleting a meeting.

When I arrived at GrowthLoop, there was a single, central Scrum that acted like a spinal cord for
the whole org. It was tidy, performative, and numbing. Everyone left “aligned” and nobody moved. I
didn’t refactor it. I removed it. The deletion produced the most valuable artifact in the company:
empty space. Within hours I had messages asking for a replacement ceremony, a new playbook, a
definitive timebox. I said no. Not because structure is bad, but because for too long it had been a
cast. Casts prevent further injury; left on too long, they prevent growth.

The first week was loud in the right way. Teams argued about planning. Squad leads looked around and
realized they were the adults in the room. Two leads tried to re-create the central meeting ad hoc;
they discovered that the purpose of the old ritual had been to export responsibility upward. Without
a center, there was nowhere to export it. They had to design their own way of working. Some did it
well on the first pass; others stumbled and then learned. But they were thinking. **That was the
point**.

It turns out “calm” had been disguising learned helplessness. Remove the disguise and you don’t get
serenity. You get noise. That noise is the sound of atrophied muscles starting to fire.

Agency, though, needs something to push against. **Freedom without rails is chaos. Rails without
freedom is bureaucracy. The magic is in the tension between the two.**

So we installed rails that dignify freedom. Projects became the atomic unit of work, each with a
load-bearing champion—a name, not a committee. Every six weeks those champions sit with the exec
team and walk through deep details in plain language. No slide-theater. No “green/yellow/red.” Just:
what are we doing, why, where are the risks, what changed? **The cadence is a metronome for
reality.** It gives people a place to bring uncertainty on purpose, and it gives leadership an
opportunity to reinforce that uncertainty isn’t a sin. It’s a signal.

That same pattern—remove the cushion, add a rail—guided one of the most controversial changes we
made: we dropped QA as a separate function. Not because quality doesn’t matter, but because quality
had become something you got from another team, like a notarized stamp. Engineers would write code,
toss it over, and wait for absolution. Responsibility diffused in proportion to the number of steps.

We removed the step. The first cycle was predictably messy. We shipped bugs that would have been
caught. We reverted. We apologized. It felt wrong for about a week and necessary by the second.
Engineers started writing better tests because there was no one else to write them. Reviews got
sharper because the cost of a lazy review arrived at your door, not someone else’s. **Ownership
isn’t a belief you argue someone into. It’s a weight you let them feel.**

The same week we felt that weight, I learned another lesson I keep relearning: people don’t move
from obedience to judgment on willpower alone. Many smart people prefer rails, especially if they’ve
been trained for years that independent judgment is how you get in trouble. So I gave rails—but the
right kind.

We normalized the phrase desired state. If someone proposed a patch, I’d ask them to stop and
describe the system we wish we already had. Not in a dreamy, hand-wavyway. In a concrete, “if you
could wave a wand this afternoon, what precisely would be true?” way. Once you describe the desired
state, today’s step becomes obvious. Patches changed from “how do we hide this hole?” to “what is
one brick we can lay the right way?” It sounds semantic until you do it in a meeting and feel the
room tilt from firefighting to architecture. The desired state forces you to think through the shape
of the problem; then it absolves you of fixing all of it right now. You just have to move one notch
toward the thing you actually want.

Language is infrastructure. If you choose it carefully, it carries judgment inside of it. We added
two more words that did a lot of work.

The first was Code Red. When everything is urgent, nothing is. The platform started thrashing as we
moved upmarket. The team felt it, customers felt it, and we were still trying to juggle feature work
like nothing had changed. Declaring a Code Red did not create panic. It created calm. Suddenly it
was not a personal failure to pause your roadmap; it was a company decision. That matters. People
don’t burn out from hard work; they burn out from ambiguous work. Code Red removed the ambiguity. We
could say “we are optimizing for boring reliability for the next X months,” and nobody had to feel
guilty about choosing stability over novelty. I regret not calling it earlier. The minute we did,
the heaviest rocks started to move.

The second word was exothermic. I needed a way to describe the kind of person who adds energy to a
system. Endothermic people absorb energy; they can be skilled, but they are a tax. Exothermic people
produce energy; they make the people around them faster, braver, clearer. Once we had the word,
hiring improved because interviews had a new lens. Coaching improved because “be more exothermic”
isn’t vague—“bring a draft next time; don’t ask for permission to think” is the operationalization
of it. Culture became less about slogans and more about physics.

If you want people to crave the sea, you have to give them safe repetitions with waves. That’s why I
started 1:1s with every person who reports to me, even when the calendar said it was irrational.
Those sessions are not status. They are practice. Every week ends the same way: one uncomfortable
thing you’ll try before we meet again, and one piece of feedback for me. Between those, I send
nitpicks after demos—tiny, specific, sometimes annoying notes that make the next demo better. “You
lost me at the API handoff; start there next time.” “Your title slide tells me nothing; give me the
decision we’re here to make in seven words.” People start bracing for these in month one. By month
three, they start asking for them. That is the hinge. Feedback stops being a threat and starts being
fuel.

If you squint, all of this is the same move repeated with different nouns. Remove the center so
people have to think. Add rails so thinking is survivable. Use language that compresses judgment and
aligns attention. Create a lot of small exposures to discomfort so resilience becomes a reflex, not
a performance.

Even the tooling choices were part of this. We didn’t “adopt AI” as a side project; we normalized it
as a posture. Cursor for development, n8n for automation, CodeRabbit for review, Fellow.ai to stop
meetings from evaporating. We made usage visible with token leaderboards—not because trophies
matter, but because norms do. Then I built our internal OS, Grimoire, almost entirely with AI. The
point wasn’t to be clever. It was to model behavior. It is hard to argue that AI isn’t ready for
real work when your VP ships a working system with it in public. Half of leadership is permission;
the other half is example.

Grimoire itself is the embodiment of “sum greater than parts.” **Process says who owns what; culture
says why it matters; tools make doing the right thing the easy thing.** Most organizations try to
move one of those and wonder why nothing changes. They reinforce each other or they cancel each
other out. Grimoire encodes how we invest, what projects exist, who is load-bearing, how reviews
happen. It creates a surface for language to bind to. When someone writes “Code Red: Platform
Stability” into a system that actually routes attention and work, the words don’t die on a slide.

If this all sounds exhausting, that’s because change is exhausting. The part you can control is its
dose and its direction. I used to try to push a hundred things. I can see them all at once—the
systems and the people and the relationships between them—and I want to move them all now. That is
not leadership; it’s impatience. The hard part isn’t inventing changes. It is choosing a small,
coordinated set that reinforce each other and then tolerating the boredom of repetition. The boredom
is a sign you’re building muscle. It takes about three cycles of that six-week review to feel like
you’re saying the same thing. That’s when the system starts saying it back to you.

There’s a quiet payoff when managed chaos starts to stick. Meetings get shorter because people
arrive with drafts, not questions. Decisions get simpler because the desired state does the arguing.
Engineers defend customers with test suites they wrote without being asked. Product managers stop
apologizing for slowing a feature when a Code Red is on; they ask what they can do to help. New
hires pick up exothermy by osmosis because they can feel where the heat is coming from. The surface
still looks busy. Underneath, the crew is calm in a way you don’t get by aiming at calm. It’s the
steadiness that comes from rough water, not flat water.

If you want one tactic to steal tomorrow, steal this: in your next decision meeting, forbid patches
for the first ten minutes. Ask the team to write down, in plain words, what the right system would
be if they could blink and have it. Make them draw the box and label the flows. Then pick the one
step you can take this week that moves you toward that box. Two things happen: the debate shrinks,
and morale rises. People can tolerate pain if they believe it is directional.

Or steal this: when you remove a safety net, add a cadence. If you drop QA, add a metronome for
accountability. If you delete the central meeting, add a demo ritual that shows progress in public.
Chaos without cadence is panic. Cadence without chaos is theatre. You want the beat and the wave.

Or this: pick one word that is allowed to end arguments. “Code Red” is ours. It’s less about
hierarchy and more about removing cognitive debt. Most drift is not caused by malice; it’s caused by
ambiguity. Give people a word that pays it off.

**None of this is a plea for reckless change. Untreated chaos breaks people. Managed chaos makes
them.** The difference is design and care. You expose people to the sea, but you sail with them. You
give them rails. You give them language. You stand at the bow in the first storm and you do not
flinch. And then, the next time, they don’t either.

The paradox is that if you do this long enough, calm returns. Not the fragile calm of a tidy
calendar, but the earned calm of a crew that knows its ship. On good days I can feel it: the
organization leaning into the wind instead of looking for land. That’s resilience. Not an outcome, a
posture. Not a lack of waves, a readiness for them.

If you want a resilient company, stop promising calm seas. Teach people to yearn for the sea. Then
give them a boat worth sailing.
