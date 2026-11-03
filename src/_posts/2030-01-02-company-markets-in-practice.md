---
feed: false
published: false

title: Company Markets in Practice
permalink: /blog/company-markets-in-practice/

categories: ["Leadership"]
description: A worked example of turning operator pain into reusable company machinery.
pull_quote: >
  The point is not to make every operator an engineer. The point is to make every operator's pain
  capable of becoming a path the next person can pull.
---

<!-- DRAFT: Follow-up to /blog/company-markets/. This pass deliberately chooses GTM ops as the main
carrier example because it has real artifacts, cadence, users, and repo evidence. The goal is "how
we actually did it," not the forever theory. The remaining comments are targeted data gaps for
Jesse, not generic "make this better" markers. -->

The company-market idea gets real when the second occurrence of a problem costs less than the first.

A forecast ritual needs three people, two calls, a private spreadsheet, a Salesforce export, a few
Slack corrections, and the one operator who remembers why last week's number was wrong. A customer
handoff depends on the person who knows where the real account context lives. A support diagnosis
works because someone quietly remembers the runbook that was never quite written down.

In most companies, that pain becomes conversation.

Someone writes the Slack message. Someone remembers the workaround. Someone opens the ticket.
Someone links the doc that is almost right. The company responds, but the path does not compound.

Nothing about that is lazy. It is worse than lazy. It is competent work trapped in a system that
cannot remember.

The operator version of [Company Markets](/blog/company-markets/) starts there: not with a platform,
but with one recurring piece of work that should stop starting from scratch.

The question is not whether an AI-native operating model sounds elegant. The question is what
happens on Friday morning when the forecast needs to be real and the context is scattered:
Salesforce, Fellow notes, override files, deal history, partner overlap data, account research.
Everyone is about to pay the same stitching tax again.

The old answer is: find the operator who remembers.

The new answer should be: pull the path.

## A Forecast Example

Here is the old workflow.

Forecast changes. Someone pulls Salesforce. Someone checks Fellow notes. Someone remembers the
account that looked healthy until a partner overlap changed the risk. Someone knows which override
file matters, which late Slack correction should be trusted, and which deal moved because the buyer
changed, not because the rep sandbagged. Sales leadership gets an answer, but the company has mostly
paid for reconstruction.

Next week, it does it again.

That is the business problem. Not "AI for sales." Not "better dashboards." A weekly operating ritual
depended on humans rehydrating the same context from systems that did not compose.

Engineering would not tolerate that shape for long. If the same production bug came back every
Friday, the team would not celebrate the person who remembered the workaround. They would reproduce
it, encode the test, patch the system, open the PR, survive review, merge the fix, and leave history
behind for the next person.

The operator move is to copy that operating model:

1. Reproduce the pain.
2. Pull the source systems.
3. Capture the assumptions.
4. Name the human overrides.
5. Show the prior movement.
6. Make the output inspectable.
7. Leave behind a path the next person can run.

For forecasting, the first useful artifact is not a perfect product. It is `/forecast`: a workflow
that gathers Salesforce context, Fellow notes, override files, deal history, partner overlap data,
and account research into something sales leadership can challenge without rebuilding the whole
picture from memory.

The details matter because the details are the work.

If a forecast number moved, the artifact should show what moved. If an override changed the answer,
the override should be named. If the source data is stale, the gap should be visible. If account
research changed the call, the research should travel with the call. If the next operator needs to
run the ritual again, they should pull the path, not DM the person who happened to survive last
Friday.

<!-- DATA GAP[Jesse]: Choose how public/specific to make this GTM example. The repo has concrete
anchors: /forecast, /top-deals, partner-overlaps, account dossiers, May forecast/top-deals artifacts,
and the Grimoire "Accelerate GTM via AI" project. The final essay wants one named artifact, date, or
specific before/after that is safe to publish. -->

Once that pattern exists, it spreads sideways. Top-deals reviews can use the same habit. So can
win-rate reports, account dossiers, campaign runbooks, partner-overlap checks, and housekeeping
gates. The goal is not that every seller understands the repo. The goal is that repeated operating
work leaves behind machinery the next person can run.

This is the difference between a saved explanation and an operating surface.

An AE can ask for the latest forecast, a dossier, a win-rate report, a partner-overlap risk, or the
accounts that need enrichment. Sales leadership can inspect how the pipeline moved. Marketing ops
can see the queue. Partner ops can refresh overlaps without relearning the whole system.

The path has a home before the org chart blesses it.

That is how demand shows up before it becomes a planning debate. One person's work gets pulled by
another person. Then a team. Then the company has evidence worth pricing.

## The Bid

A bid is not a complaint. It is not a strategy doc. It is the first version of useful work with
evidence attached.

For an operator, that is the whole shift: from noticing, explaining, escalating, and waiting to
making the first path, attaching evidence, naming the boundary, and putting the work where others
can pull it.

The point is not to make every operator an engineer. The point is to make every operator's pain
capable of becoming a path the next person can pull.

AI changes what is reasonable to expect. Drafts, queries, runbooks, scripts, and synthesis across
Slack, meetings, tickets, docs, and code are all cheaper than they used to be.

So "I saw the problem" is less valuable than it used to be.

The better move is:

> I saw the problem. Here is the artifact. Here is what it proves. Here is where I got blocked.

That last sentence matters. A company market is not a way to pretend constraints disappeared.
Access, authority, customer risk, security, taste, time, and sequencing still matter. Sometimes the
right outcome is that the local operator hits a hard boundary and hands the work to a system owner.

But now the boundary is visible. The owner can see the attempted path. The reviewer can see the
evidence. The next person can reuse the diagnostic work. The leader can tell whether the bottleneck
is skill, tooling, policy, architecture, or permission.

That is agency becoming auditable.

## What Gaia Adds

The important thing about Gaia is not the monorepo or the tidy folders. It is that the operator does
not have to choose between "I mentioned it in Slack" and "I filed a ticket into someone else's
queue."

There is a place for the work itself: the checklist, query, script, prompt, runbook, skill, or small
PR that makes the next attempt cheaper.

The monorepo matters because related work can sit close together. The forecast path can live near
the top-deals path, the account-dossier path, the enrichment queue, the partner-overlap check, and
the housekeeping gate. People can inspect it, fork it, improve it, or decide it is not worth
standardizing.

That proximity is what lets the market form. A workflow is not a memo asking for permission. It is a
piece of work already trying to earn adoption.

## Where Iris Fits

Iris is the next interface for this, not the whole system. The bet is that the first question should
move into the open.

Slack is often where discovery starts: a customer comes up in a thread, a metric feels off, a
project name gets mentioned, or a system detail blocks a decision. If an agent helps in private, one
person gets an answer. If it helps in public, the company sees the question, the method, the
sources, the gap, and the next better question.

That turns agent work from private assistance into public apprenticeship.

In the forecast example, the question should not be, "Can Iris give me the number?" That is the
dashboard fantasy in a friendlier costume. The better question is:

> What changed in pipeline this week, what evidence supports it, what human overrides are in play,
> and where is the durable path for the next person who needs to answer this?

Iris should be able to point at the relevant Gaia artifact, the likely owner, the source systems,
the prior discussion, the missing evidence, and the boundary where a local answer needs a company
decision.

If Iris only answers questions, it becomes another polite layer over fragmented reality. The useful
version has to expose the sources, the gaps, and the next artifact the company should keep.

<!-- DATA GAP[Jesse]: Iris appears to still be in discover. Before publishing, decide whether this
section should describe current behavior or intended interface. If there is one real public
Slack/Iris interaction, add it here: what was asked, what Iris returned, what source it cited, and
what artifact or decision followed. If not, keep Iris framed as the next interface rather than an
already-proven loop. -->

## Where Grimoire Enters

Gaia gives the path somewhere to live. Grimoire makes the company answer for it.

That is the part most internal-tool stories skip. They celebrate the clever local fix, then pretend
adoption will sort itself out.

It will not.

Free markets inside companies are dangerous. Without institutions, they become markets for heat: the
loud demo, the charismatic owner, the Slack thread that feels like demand because everyone can see
it. Assume the market will be gamed. Build until gaming gets expensive.

The currency is not enthusiasm. It is usage pulled into real work, owner time, budget, reduced pain,
and changed behavior. Praise is not demand. A project with no owner is not a bet. A tool that saves
one team by pushing its cost onto three others has not cleared the market. It has exported pain.

Grimoire is where the useful artifact stops being a nice local hack and starts asking for a
decision.

Did anyone else use it? Who owns it? What did it replace? What got worse? What evidence is missing?
Should this become a funded bet, stay local, become standard, or die?

At GrowthLoop, that means the work can become a named project with a champion, contributors, phase,
health, dependencies, activity, evidence, and review. The GTM work is not floating around as "AI for
sales" vibes. It is tied to an Accelerate GTM via AI project with artifacts, contributions,
dependency risk, and an uncomfortable record of what has actually moved.

That is not bureaucratic trivia. That is the institution forcing the work to argue with reality.

<!-- DATA GAP[Jesse]: Add one concrete Grimoire consequence if possible: a GTM workflow that was
funded, narrowed, killed, standardized, moved under Gaia, or left local after review. Without this,
the section is honest but still one beat short of proof. -->

The point is not that Grimoire has perfect truth. No system does. The point is that it changes the
cost of pretending.

If a Gaia artifact is getting reused, someone has to own it. If it saves time but creates hidden
risk, someone has to price that risk. If a project claims momentum but has no evidence, someone has
to say so while the work can still change. If the evidence disappears, the work should not keep
living because the story is embarrassing to unwind.

Even "leave it local" is a decision. The artifact does not get to become a shadow platform just
because people liked the demo. It either earns an owner, stays small, or dies.

The market is not honest until one of those answers changes money, time, ownership, or standards.

## The Center Still Matters

This is not a disguised request for everyone to do extra work.

If leaders ask for local agency while withholding access, time, authority, or consequence, they are
not building a market. They are laundering extra work through ambition.

The company has to pay for the behavior it wants.

That means leaders have to make room for local artifacts. They have to fund the commons. They have
to protect boring maintenance. They have to tolerate early duplication long enough for demand to
reveal itself. They have to kill work when the evidence goes cold. They have to stop rewarding
people for turning every bruise into a beautiful narrative instead of a usable path.

The center still chooses the game. In this model, that does not mean approving every move. It means
deciding which local proof deserves air cover, which duplication is useful, which risk cannot stay
local, and which artifact has earned the right to become standard.

Sometimes the center has to move first. Code Red was that kind of move: leadership named the line,
paused normal ambiguity, and made platform stability the work. A company market does not replace
that. It gives the company a way to keep the learning from evaporating after the emergency ends: the
runbooks, checks, owner calls, and recovery habits become paths others can pull instead of heroic
memory everyone is afraid to disturb.

But it should not be the only place reality becomes consequential.

The center's job is to make the market honest.

## What Makes This Hard

The hard part is not the tools.

The hard part is taste.

Bad company markets will flood the organization with AI-generated junk: half-written scripts,
duplicated runbooks, fake demand, agent slop in markdown, tools that work once for one person and
then rot, people calling everything a platform because they got three Slack emoji reactions.

That will happen.

The answer is not to recentralize. The answer is to make the market stricter.

Artifacts need owners. Shared tools need maintenance. Skills need examples. Runbooks need a date and
a failure mode. Systems need tiers. Projects need phase contracts. Review has to kill things. The
company has to reward people who make work reusable, not people who merely narrate their own
importance.

This is why Gaia and Grimoire need each other.

Gaia without Grimoire becomes a junk drawer.

Grimoire without Gaia becomes theater: project records about work that never becomes reusable.

Iris without either becomes the command-center fantasy again: a polite bot sitting on top of
fragmented reality, answering questions while the underlying company stays hard to change.

The loop matters because each part catches a different lie.

Iris catches the lie that private answers are enough.

Gaia catches the lie that conversation is memory.

Grimoire catches the lie that enthusiasm is consequence.

## How To Start

Do not start by asking for a platform.

Start with one repeated pain.

Pick something that keeps stealing time: a support diagnosis people rediscover, a customer handoff
that always needs the same context, a forecast ritual that requires too much manual stitching, a
data cleanup that lives in one person's laptop, a launch checklist that only works because one
operator remembers the traps.

Then make the smallest durable thing.

Not the perfect system. Not the platform. The thing that makes the next attempt cheaper.

Write the checklist. Capture the query. Save the prompt. Add the script. Make the PR. Put the
runbook next to the system it touches. Ask Iris for prior art. Ask an agent to turn the steps into a
Gaia skill. Then attach the context, name the owner, and name what would make the work worth
killing.

Then watch what happens.

If nobody else uses it, maybe it was just your week.

If someone else pulls it, improve it.

If a team starts relying on it, give it an owner.

If it starts changing how work moves, put it through Grimoire.

That is the operator version of a company market.

Do not just notice the bruise.

Make the first useful path. Put it where the next person can pull it. Let usage tell the company
whether it matters.

Then force the decision: own it, fund it, standardize it, or let it die.
