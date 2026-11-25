# the halluCinators: showcase script

**Wed 25 Nov, Teams.** 9 minutes, then 1 for questions. **Carl** presents on his own and drives the demo.

About 850 spoken words: roughly 7 minutes of talking, plus time for the demo and pauses. Everything comes from `showcase.md`, the learning logs and the git history. Quotes are word for word.

**Before you start:** say `get the latest and make it run for me`. Open the prototype at phone width on the start screen, ready to share.

---

## 1. Who we built for (Carl, 0:00 to 1:00)

Hi, we're the halluCinators: six people from six professions. I'm Carl, a product manager.

We took Challenge 2, "help when it's needed". Most drug and alcohol support closes at 5pm, but people are most alone at night.

So meet Gary. It's Saturday night, he's on his own, and he's struggling. He doesn't want to go straight to 999. He'd rather talk to someone who knows him, but asking feels too hard.

We built **Still here**. It helps Gary reach his own people first.

## 2. What it does (1:00 to 2:30)

> **Click 1:** start screen → **I need help right now**

Gary doesn't have to sign up. He taps one button.

> **Click 2:** yes to a call → the volunteer's card

If his own people don't pick up, a volunteer offers to call him back. Every screen has a quick exit, and Still here never calls 999 for him.

He can also set up a check-in. At 11pm he gets a **text**: "How are you doing? Reply 1, 2 or 3." He needs no data. If he replies 3, it texts Lorraine, then Mick. If nobody answers, it offers the volunteer, then services that are open right now.

> **Stop sharing the screen here**, or leave it on the volunteer card.

Low battery, no data or an old phone? Gary can just call or text Still here and get the same help. No app and no smartphone needed.

That's what we built in four hours. But today we want to talk about *how* we built it.

## 3. Anyone can build, if the work is split well (Carl, 2:30 to 3:45)

Six of us shared one codebase: over 200 commits in four hours.

What made it work was one prompt from Elena, our product owner: *"we need to split the tasks between all of us."* Claude gave each journey its own file, so we hardly ever clashed.

Then job titles stopped mattering:
- **Anastasia**, our QA engineer, researched who's at risk, wrote the personas, and fixed bugs herself.
- **Joseph**, our user researcher, built sign-up and Your people.
- **Patricia**, our interaction designer, built the whole supporter journey and restyled the app.
- I'm a product manager, and I built the text check-in.

Anastasia put it best: *"the framing sort of fell away and I found myself not feeling bound by my role."*

## 4. The developer's view (3:45 to 4:45)

Our developer, Spencer, couldn't be here today, but he said something that surprised us.

You might think this was his day. He'd say it was the opposite.

He found Claude very quick at building, but on its own the result *"doesn't come across human in some of the text or design."* What made the difference was the other professions shaping what Claude built.

In his words: *"As a developer i dont have an eye for design"*. Having designers and a researcher in the room meant the app was *"more finished and polished than when working with just developers."*

## 5. Humans drive it (Carl, 4:45 to 6:00)

Some things didn't work, and in every case a person caught them, not Claude.
- We renamed the app "Alex". At our look together it clashed with real names, as in "Alex, my brother", so we changed it back.
- The check-in text sent Gary to a web page, which needs the data he hasn't got.
- Inviting Lorraine acted as if she'd already said yes.

Flows that looked finished didn't hold up until we walked through them as Gary. Ten minutes doing that fixed more than any prompt.

Patricia said it best: *"AI simply can't replace the empathy we need to define the right problem, or the taste, judgement, and accountability it takes to make sure a solution actually works for real people."*

And Elena: *"humans are driving the ideas, which is great."*

## 6. What made it work (Carl, 6:00 to 7:00)

When we asked what helped most, five of us said **talking it through first**. Next came the shared screen and small, frequent shares.

Before we built anything, we agreed a one-page plan. When ideas grew, we checked them against it.

That's the idea most of us want to carry forward: **give AI structure.** Agree a sharp scope early, and write it down in files that Claude reads every time. Patricia called it *"defining a sharp scope early and backing it up with .md files and skills."*

## 7. Three weeks on (Carl, 7:00 to 8:15)

We wanted to be honest about what happened next.

- **One of us tried it.** I've used the same approach to build myself an autobooker for busy gym classes.
- **One of us shared it.** Patricia used Claude on a service design course to build a prototype for testing, and she has been sharing the tip about skills and .md files.
- **Two plan to.** Anastasia will bring people from different disciplines in early, starting with her next change request.
- **Two were held up**, by project work and by life.

Views on how much we'll use AI also vary, from every day to now and then. Joseph, our researcher, wants to use it more, but personal data policies limit what his role can use it for.

## 8. What Mercator could take from this (Carl, 8:15 to 9:00)

So, three things from us:

1. **Mix the professions, early.** We built something none of us could have built alone.
2. **People set the direction, and AI builds fast.** Test it as the person you're helping, as soon as you can.
3. **Make it easy to carry on.** Clear guidance on where these tools can be used would help ideas like ours go further.

All six of us loved it, and all six would definitely do it again. Thank you.

---

## To check before the 25th

- **Timing:** do a run-through with a stopwatch. If it runs long, cut from section 6 first.
- **The quotes:** each person checks their own.
- **The demo:** practise the three clicks with Spencer. If the volunteer screen has changed, update the cues.
- **Live or recorded:** still to decide. A recording goes to Sheldon Gold by Tue 24 Nov.
