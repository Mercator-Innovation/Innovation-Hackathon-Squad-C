# the halluCinators: showcase

**Wed 25 Nov, 14:00 to 15:40, on Teams.** A 10-minute slot: up to 9 minutes presenting, then 1 minute for questions. If we record it instead, it goes to Sheldon Gold by **Tue 24 Nov**.

**Status: first draft (10 Nov), for the squad's prep call.** It's built from the learning logs, `TEAM.md`, the PRD and the git history. Updated 18 Nov: all six have reflected.

- **Presenter:** Carl McCullagh, on his own (Spencer couldn't make it)
- **Live or recorded:** [TO AGREE on the call]
- **Spoken words:** about 1,100 in all, which is roughly 9 minutes at a calm pace

---

## 1. The challenge and what we built (0:00 to 1:30)

- **Challenge 2: help when it's needed.** Most drug and alcohol support closes at 5pm, but people are most alone at night. About 60% of people who died a drug-related death in Scotland lived alone.
- **Meet Gary** (Anastasia's persona): on his own on a Saturday night, struggling, and not wanting to go straight to 999.
- **Still here helps Gary reach his own people first.** He can open a tiny page with no sign-up and tap "I need help right now". Or he gets an 11pm check-in **by text**, and replies 1, 2 or 3 with no data needed. With his say-so, Still here texts Lorraine, then Mick. If nobody picks up, Jo, a volunteer, offers to call. After that, it shows services open now. It never calls 999 for him, and every screen has a quick exit.
- **Low data, low battery, poor signal or an old phone?** He can call or text Still here instead and get the same help, with no app and no smartphone.
- *Demo, about 45 seconds:* **Demo: open as Gary** → **Not great** → **Message someone I trust** → **Yes, send it** → nobody replies → the volunteer offers a call. Then `phone.html` → **Text** → HELP.

## 2. How the afternoon actually went (1:30 to 3:00)

Read from the git history: over 200 commits from six people in four hours.

- **15:07 to 16:06:** name, challenge, circle-of-support sketch, personas and research. Carl drafted the PRD from the talk-through, Elena combined it with the research, and the squad agreed the MVP: journey steps 1 to 4. The product owner signed it off at 16:06.
- **16:13:** Spencer's first version was on the shared screen.
- **16:39:** Elena asked Claude to split the work, and everyone took a journey. From 16:46 to 17:45 the commits come thick and fast:
  - Spencer: the start screen
  - Joseph: sign-up
  - Carl: the check-in
  - Patricia: the supporter journey and the new look
  - Anastasia: test results every half hour
- **17:15, the look together:** using it as Gary showed us that "I need help right now" worked end to end. But three things didn't:
  - The name "Alex" clashed with real people's names ("Alex, my brother").
  - The services list was too long.
  - Inviting someone acted as if they'd already said yes.
- **18:12 to 18:40:** all five quick fixes went in. The name went back to Still here, and Spencer added the pretend phone, which you can call or text. A second look at 18:32 confirmed it.
- **18:34:** Spencer removed all the demo buttons, then put them back a minute later. It sums up the last 10 minutes nicely.

## 3. What didn't work, and why (3:00 to 4:15)

- **Flows that looked finished didn't hold up until we walked through them as Gary.** Carl: *"relying on some of the genrated flows… can be tricky, they do need simultating through the look together"*. The check-in text dropped Gary onto a web page, which needs the data he hasn't got.
- **We renamed the app too quickly.** Joseph: *"we renamed the app 'Alex' and made the name bold wherever it appears → at the look together it clashed with real people's names"*.
- **Lots of small changes, all at once.** Spencer: *"everyone making small changes in parallel → … there are so many small things in lots of places and hard to manage were the progression is"*.
- **Tests went stale fast.** Anastasia: *"the app changed (name, screens, look) faster than I could re-run them"*.
- **Getting started.** The SSH passphrase on every save slowed sharing down. Joseph found setup *"took a bit longer than 20 minutes and I found it a tad confusing"*.

## 4. Where the tooling surprised us, with prompts word for word (4:15 to 5:30)

- **One prompt kept six people out of each other's way.** Elena: *"we need to split the tasks between all of us"*. Claude gave each journey its own file, so only the merge captain touched the shared ones, and we had hardly any clashes.
- **Designing from a picture.** Patricia: *"Could you make it look more like this?"*, with a reference image. Claude picked the colours from it, checked contrast and restyled the app.
- **Showing options before changing anything.** Patricia: *"could add a mini vector graphic above each question, preview it to me first like a mockup"*.
- **Testing at scale.** Anastasia: *"can you analyse the tests for any gaps…"*. Claude then ran 60+ scenarios in the browser and measured contrast and tap sizes, faster than she could by hand.
- **Research to feature in minutes.** Joseph's research insight, *"what I mean by an escape is a way to go straight to anonymous contact"*, became a "Talk to someone now, no name needed" button on every sign-up step.
- **The flip side.** Spencer: it's *"so quick but also doesn't come across human in some of the text or design"*.

## 5. Who did what outside their usual job (5:30 to 7:00)

- **Anastasia, QA engineer:** researched who's at risk and wrote the personas we used all afternoon, then fixed two bugs herself. *"A lot"* outside her usual job.
- **Joseph, user researcher:** built sign-up, Your people and "Who would you like to reach?". *"I decided what it should do and say; Claude wrote the code."*
- **Patricia, interaction designer:** built the whole supporter journey and restyled the app, with every screen passing WCAG AA contrast.
- **Spencer, software developer:** shaped the flow, design and interaction. *"Working with the different professions feeding in to claude has made the flow, design and interaction better than working just dev."*
- **Carl, product manager:** built the text check-in, including the unhappy path. *"It's quite hard to think while everything is going on… but after a while a good flow emerges."*
- **Elena, business analyst and product owner:** chaired the squad, kept the PRD as our single source of truth, and split the work. Her surprise: *"the speed of how the project can be build is extraordinary"*.

## 6. What made working as a squad with AI easy or hard (7:00 to 7:45)

- **Easy:** talking it through first, a PRD everyone agreed, one file per journey, and the shared screen. Carl's week-after view: the shared screen and talking it through first helped most.
- **Hard:**
  - the rush to the end
  - the many small changes in parallel
  - looks getting more attention than how things work. Carl: *"people tend to focus on the look of something vs how it works"*.
- **What helped most** (week after, all 6):
  - talking it through first (5)
  - the shared screen (4)
  - small, frequent shares (4)
  - Claude explaining what it did (3)
- **Did we still need specialists?** Answers range from rarely to often:
  - Carl, rarely: *"it was less about needing help and more of a courtesy to the specialist in the room"*.
  - Joseph, sometimes, for *"niche tax knowledge, but I combine it with claude outputs"*.
  - Patricia, often: *"AI simply can't replace the empathy we need to define the right problem, or the taste, judgement, and accountability it takes to make sure a solution actually works for real people."*
  - Anastasia, sometimes: *"I relied on my teammates as subject matter experts. When I came with ideas and they validated them and added theoretical knowledge and real world experience I didn't have."*
  - Elena, sometimes: *"Claude did a great explanation for all of us, but definetly the human input is much needed"*.
  - Spencer, often, and he's our developer: *"As a developer i dont have an eye for design and would take a long time so having designers and interaction designers to impact was signficant… The finished app was more finished and polished than when working with just developers"*.
- **Spencer's takeaway:** *"The way different professions shape claudes building and output versus just having developers do it"*.
- **Elena's takeaway:** *"I haven't learned, but confirmed, that humans are driving the ideas, which is great"*.
- **Anastasia's takeaway:** *"during the hackathon the framing sort of fell away and I found myself not feeling bound by my role. That showed me how much value there is in contributing beyond your title."*
- **Claude getting things wrong** is what got in Patricia's way.

## 7. Ideas to carry forward, and where they went (7:45 to 8:30)

Two themes:
- **Working across disciplines, early:** Anastasia and Joseph.
- **Structure and scope**, through Markdown files, skills and design schemes: Carl, Patricia and Spencer.

Elena adds a useful counterweight: quality over speed.

**Three weeks on:**
- 1 has tried their idea
- 1 has shared it
- 2 plan to
- 2 were held up by other work

- **Carl:** *"get structured md files sorted"*, for internal work, bids, his team, and client work where the tools are allowed. **Tried it:** *"I have used the ideas in the hackathon to use AI personally, I build a autobooker for contended gym classes"*.
- **Patricia (shared it):** *"defining a sharp scope early and backing it up with .md files and skills"*. Since the hackathon she has used Claude on a service design course to build an interactive prototype for testing, and has been *"sharing the tip around using skills and .md files"*.
- **Joseph (plans to):** *"the importance of multi-specialism to the future of work"*. What's in the way: *"My role as a UR simply doesn't have much permissions for using Claude / LLMs more than I have been already. It's limited by personal data policies"*. He's *"still looking for opportunities"*.
- **Anastasia (plans to):** *"bringing people from different disciplines into a piece of work early, not just at review"*. Her project has been focused on tech debt, so *"I plan to apply it to the next CR that comes in"*.
- **Elena (something got in the way):** *"it's not about speed, it's about quality"*. What got in the way: *"I was busy with other projects and life"*.
- **Spencer (something got in the way):** *"The value of design schemes that exist when working with ai"*, for bids. What got in the way: *"Project work"*.

## 8. What Mercator should take from this (8:30 to 9:00)

A draft for the squad to agree or change:

- **Anyone can build, if the work is split well.** Six professions, six journeys, very few clashes.
- **Test as the person, early.** Our biggest fixes came from 10 minutes using it as Gary, not from Claude.
- **Give it time and space.** We'd like more time and rooms ready before the start. Elena asked for *"more time please"*.
- **Honest mix of views.** All six of us loved it and would definitely do it again. A week later, we don't all expect to use AI every day:
  - Carl and Joseph: every day
  - Patricia, Elena and Spencer: most weeks
  - Anastasia: now and then

  It moves both ways. Joseph and Spencer went up from "now and then" on the day. Anastasia went down from "every day".
- **The developer valued the non-developers most.** Spencer counted none of his work as outside his usual job, yet he said he often needed the other specialists, and that the app was *"more finished and polished than when working with just developers"*.
- **Leave room to show the work.** Spencer: *"More time to present what people had been working on"*.
- **Policy can block it.** Joseph can't use it more in his role because of personal data policies. Clear guidance on where these tools are allowed would help people carry ideas forward.

---

## For the prep call

1. Agree the presenter(s), and live or recorded.
2. ~~Chase `/reflect`~~: all done (18 Nov).
3. Check each person is happy with their quote in section 5.
4. Agree section 8.
5. Pick the demo moments, and do a timed run-through.
