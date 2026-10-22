# The supporter sign-up journey

Patricia's grab (from 16:40). Based on `sketches/brief-start-of-journey.md`, `PRD.md`, `sketches/personas.md` and `sketches/test-scenarios.md`. All people and numbers are made up.

**Key:** _(assumption)_ marks anything that's Patricia's or Claude's own idea, not from the squad's files.

## Who it's for

- **Family or friends supporting their own person**, like Lorraine supporting her brother Gary.
- **Volunteers supporting anyone who needs someone**, often family of someone affected, like Jo (from the brief and `PRD.md`).

## User needs

1. As a family member, I need to know what being someone's supporter means before I say yes, so that I know what I'm agreeing to.
2. As a family member, I need to be asked by my person, or to ask them, and for us both to agree, so that we both choose this.
3. As a volunteer, I need to choose when I'm available, so that I can support people without being on call all the time.
4. As a volunteer, I need safety checks and training, so that I'm not out of my depth with someone at night.
5. As any supporter, I need to know what I'll see when someone needs me, and that it's OK if I can't answer, so that I'm not frightened of missing it.
6. As any supporter, I need support for myself, and to be able to stop without guilt, so that I can look after myself too.

## Two ways in for family _(needs agreeing with Joseph)_

The brief says **Gary invites Lorraine, and she says yes or no** (Joseph's journey, `src/signup.js`). This journey covers the other side:

- **A. Lorraine was invited by Gary.** She lands on "Gary has asked you to be his supporter" and says yes or no. _(Joseph's journey sends the invite; this one answers it. Agree with Joseph which file shows the "yes or no" screen.)_
- **B. Lorraine offers first.** She signs up, then Gary is asked to confirm. Both have said yes before anything is shared.

Either way, **nobody is a supporter until both people have agreed.**

## The journey

One question per screen. Tap answers first. Every screen has the quick exit, the 999 line and a **Back** link.

1. **Who do you want to support?**
   - **Someone I know** (family path)
   - **Anyone who needs someone** (volunteer path)
   - Back → the welcome screen
2. **Before you start** (consent first)
   - What being a supporter means, what we'll ask of you, and that you can stop any time.
   - Family: "You might get a text at night asking you to call. It's OK if you can't."
   - Volunteer: "You choose when you're on. Before you can support anyone, you'll do safety checks and training."
   - **I understand** · **Not now**
   - **Not now** → "That's fine. You can come back any time." → welcome screen. Nothing saved.
3. **About you**
   - First name (a made-up one is fine), and a phone number for texts or calls.
   - Why we ask: "So {name} knows who you are" · "So we can text you if someone needs you".
   - **Empty field:** "Enter your first name" / "Enter a phone number". _(assumption)_
   - **Number that doesn't look right:** "Enter a phone number, like 07700 900123". _(assumption; 07700 900xxx numbers are reserved for drama and demos)_
4. **Family path: waiting for Gary**
   - "We've asked Gary. He needs to say yes before you're his supporter."
   - Demo buttons: **Demo: Gary said yes** · **Demo: Gary said no**
   - **Gary said no:** "Gary isn't ready right now. That's his choice, and it's not about you." Then support for families (see below). Nothing about Gary is shown or saved. _(assumption on wording)_
4. **Volunteer path: when could you be on?**
   - Pick nights (Mon to Sun) and a time range (e.g. 9pm to 2am).
   - **No nights picked:** "Pick at least one night" _(assumption)_
5. **Volunteer path: safety checks and training**
   - Shown as a step, marked "Not built in this demo". _(brief, PRD)_
   - Example wording: "Before you're on, we'd check you're safe to support people and give you training." _(assumption)_
6. **What you'll see when someone needs you** _(assumption: a preview, not a real text)_
   - Family: a text-bubble preview: "Gary: I'm not doing great tonight. Can you call me?" with **I'll call now** · **I can't right now**.
   - Volunteer: "Someone needs a call. Are you free?" with **Yes, I'll call** · **Not now**.
   - "If you can't answer, that's OK. We'll offer them a volunteer, then services open now." _(matches test 1.4)_
7. **All set**
   - Summary of what they chose.
   - **Change something** · **Stop being a supporter** · **Delete my details**

## Privacy

- **We ask for:** a first name and a phone number. Volunteers also give the nights and times they're on.
- **We never ask for:** address, location, email, date of birth, or anything about health.
- **Who sees what:** Lorraine sees only the messages Gary chooses to send her. She never sees his check-ins, his "How are you?" answers or where he is. _(assumption, in line with PRD section 7)_
- **Delete my details:** removes everything about the supporter. Gary is told only that "Lorraine is no longer your supporter". _(assumption)_
- **In the demo:** nothing is saved or sent. A volunteer who signs up isn't added to `src/data/` (Elena's files).

## Looking after supporters

- **Family:** a link to support for families, e.g. Scottish Families Affected by Alcohol and Drugs (a helpline and web chat, weekdays until about 11pm, with a call-back service out of hours; hours not re-checked today). PRD section 6 lists "support for the supporter" as an enhancement.
- **Volunteers:** "Pause for a while" as well as "Stop", and a line about where to talk after a hard call. _(assumption)_
- **Stopping without guilt:** "Thanks for being there. You can come back any time." No "Are you sure?" _(assumption on wording)_

## Words and accessibility

- Reading age about 9. "You", short sentences, no jargon.
- Person-first: "a person who uses drugs", never "addict".
- No guilt in "Not now", "I can't right now" or "Stop being a supporter".
- Focus moves to the heading on each new screen (Spencer's `show()` already does this).
- Every field has a label. Error messages sit next to the field, and focus moves to the first error.
- Works with a keyboard alone, with visible focus. Works at 375px with no sideways scrolling.
- Nothing shown by colour alone. Contrast at least 4.5:1.

## Done when

- [ ] "I want to support someone" on the welcome screen opens this journey.
- [ ] Both paths (family and volunteer) work from start to finish.
- [ ] Nothing happens before "I understand"; "Not now" leaves without saving.
- [ ] Family path: both "Gary said yes" and "Gary said no" work, with kind wording.
- [ ] Vetting and training are shown as a step, clearly not built.
- [ ] Back, empty fields and a bad phone number are handled.
- [ ] The "what you'll see" preview shows that not answering is OK.
- [ ] Change, stop and delete are on the last screen.
- [ ] Anastasia's checks below pass.

## Test scenarios for Anastasia

| # | Scenario | Steps | Expected result |
|---|---|---|---|
| 7.1 | Family, happy path | Welcome → I want to support someone → Someone I know → I understand → name and number → Demo: Gary said yes | "All set" summary. Lorraine is Gary's supporter |
| 7.2 | Gary says no | As 7.1, but Demo: Gary said no | Kind message, support for families. Nothing about Gary shown |
| 7.3 | Volunteer, happy path | → Anyone who needs someone → I understand → name and number → pick nights | Vetting step shown as "not built", then "All set" |
| 7.4 | Not now | Tap Not now on the consent screen | Back to welcome. Nothing saved |
| 7.5 | Empty fields | Leave name or number empty, tap Continue | Clear error next to the field; focus moves to it |
| 7.6 | Bad number | Enter "abc" | "Enter a phone number, like 07700 900123" |
| 7.7 | No nights | Volunteer path, pick no nights | "Pick at least one night" |
| 7.8 | Going back | Press Back on every screen | Goes back one step, keeps what was typed |
| 7.9 | Stop and delete | On "All set", tap Stop, then Delete my details | No guilt. Details gone |
| 7.10 | Keyboard and 375px | Tab through every screen at 375px wide | Everything reachable, focus visible, no sideways scroll |
| 7.11 | Words | Read every screen | Reading age about 9, person-first, no guilt |

## Build notes (for whoever builds it)

- **Hook:** `StillHere.journeys.supporter = function () { ... }` in `src/supporter.js`. `index.html` already loads it.
- **Helpers from `app.js`:** `show`, `el`, `button`, `choices`, `field`, `fill`, `home`. Use `StillHere.home()` to go back to the welcome screen.
- **Words:** the squad agreed each journey's words go in their own file, not `content.js`. Because `index.html` only loads `supporter.js`, put them in a `const WORDS = { ... }` at the top of `supporter.js`, rather than changing Spencer's `index.html`. _(assumption; check with Spencer)_
- **Demo buttons** start with "Demo:", like the rest of the prototype.
- Don't change `app.js`, `index.html`, `content.js` or `src/data/`.

## Out of scope today

- Real vetting, training or background checks.
- Sending real texts or calls.
- Matching volunteers with people.
- Saving anything between visits.
