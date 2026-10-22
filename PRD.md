# Squad C | Lean Product Requirements Document

> **Hackathon:** Mercator Innovation Hackathon, 22 October 2026  
> **Status:** Living working document, not a sign-off artefact  
> **Product owner:** Elena Barker  
> **Principle:** MVP first. Improve what matters. Extend only when ready.

**How to use this:** Agree the essentials in about 10 minutes after choosing the challenge: sections 1, 3, 4 and 5, marked **fill at 15:30**. The other sections are optional; fill them in as you go, and Claude can draft them from what the squad builds. Keep answers brief. Update this document as the team learns. It is a shared reference for people and Claude, not a reason to delay building. The product owner coordinates changes to avoid conflicting edits. Do not enter real personal, client or confidential data.

## 1. Challenge and problem _(fill at 15:30)_

**Selected challenge:** 2. Help when it's needed (out-of-hours support for people affected by substance use)  
**Why this challenge:** We care about it most personally.

> **Agreed by Elena Barker (product owner), 16:06.**

**Primary user(s):** People who use drugs or alcohol and need help, out of hours (persona: Gary, in `sketches/personas.md`).  
**Circle of support:** Friends and family (persona: Lorraine), professionals (persona: Aisha), and **volunteer supporters**: people who sign up to support anyone who needs someone, often family of someone affected.  
**Stakeholder (not a user):** Emergency services. They're affected by escalations but don't use the tool.  
**Problem:** They need someone who can help in the moment, at night, but most support closes at 5pm and they don't want to go straight to 999.  
**Why it matters:** They face it alone, or the situation escalates into a crisis.  
**Evidence we have** (sources in `sketches/personas.md` unless linked):
- **Fact:** about 60% of people who died a drug-related death in Scotland lived alone, and 81% died in their own home (Public Health Scotland).
- **Fact:** more than 80% of drug support services in Scotland are closed at weekends, according to the Salvation Army.
- **Fact:** Digital Lifelines Scotland gave people phones and data. People felt more connected, but feared being tracked, lacked trust in institutions and tech, and the funding ran out (Harm Reduction Journal, 2024).
- **Fact:** "call before you use" lines exist: Never Use Alone was trialled in Glasgow and Ayrshire; Canada's [National Overdose Response Service](https://www.cmaj.ca/content/cmaj/194/46/E1568.full.pdf) reported no deaths in its pilot.
- **Fact:** out-of-hours helplines are patchy. Scottish Families' helpline runs to about 11pm; only general lines (Samaritans, NHS 24) run 24/7 ([gov.scot](https://gov.scot/publications/resources-mental-health-wellbeing-primary-care-services-2/pages/10), hours not re-checked).
- **Assumption:** Saturday night is the hardest time. Ambulance call-outs to overdoses peak on Fridays and Saturdays (not checked in full), but we found no Scottish data on time of night.
- **Assumption:** typing is hard when you're struggling, and talking can be overheard, so tapping ready-made answers is the most private way in.

**Problem statement:**

> A person who uses drugs or alcohol struggles to reach someone who can help in the moment, at night, because most support closes at 5pm and they don't want to escalate to 999, resulting in them facing it alone or the situation reaching crisis.

## 2. Desired outcome

> **Agreed by Elena Barker (product owner), 16:06.**

**User outcome:** Feel safer and less alone at night, with someone who can help knowing when they need it, and the person staying in control.  
**How we might recognise value:** _..._  
**Constraints:**
- **Consent at every step:** nothing is sent to anyone without the person saying yes.
- **Low battery:** check-ins, and a last-known location only with consent.
- **Low data or signal:** plain SMS (no data), a tiny web page, works on old phones.
- **No barriers to start:** no sign-up, password or app store.
- **Tone:** plain English, non-judgemental, easy to read.
- **Trust and control:** never call 999 or share location automatically; the person decides.
- **Low friction, several ways in:** tap a ready-made answer (most private), type, or talk.
- **Doesn't feel like being watched:** no remembering where they were; a quick exit on every screen.

## 3. Proposed solution hypothesis _(fill at 15:30)_

**The idea (agreed):** For a person who uses drugs or alcohol, alone at night, a tiny page or text check-in where they tap, type or talk to say how they are. With their consent at every step, it reaches their own trusted people first, then a volunteer supporter, then services open now, and never calls 999 for them.

> **Agreed by Elena Barker (product owner), 16:06.**

> We believe that a low-friction way to reach out (tap a ready-made answer, type or talk), with optional scheduled check-ins ("text me at 11pm; if I don't reply, tell these people"), will help people who use drugs or alcohol feel safer and less alone at night by connecting them first to someone in their own circle, then to a volunteer supporter, then to services open now, escalating gently rather than straight to 999. We will test this by walking through Gary's Saturday night from start to finish in the prototype, with made-up data.

**Alternative approaches considered:**
- **Automatically alerting emergency services:** rejected. It would stop people using it, and emergency services don't want an onslaught of alerts.
- **A chatbot that triages and connects:** may sit in front of the check-ins, with a human in the loop. Free-form chat is the easiest input to offer but the hardest to keep safe, so ready-made answers come first.
- **A service directory on its own:** the sponsors don't want "another directory". Volunteer supporters and the person's own circle make it "a directory with the bow on".
- **Remembering where they were last time:** rejected. It could spook people ("I know where you were last night").
- **A Life360-style circle with a map:** location only with consent, because of fears about being tracked.
- **Free short codes and zero-rated websites** (free to use with no data): may exist, **not yet checked**. Simulate them in the prototype.

## 4. MVP: smallest valuable journey _(fill at 15:30)_

> **Agreed by the squad (16:04) and the product owner (16:06).** First version: journey steps 1 to 4, with the tap answers. The scheduled check-in and type or talk come next, in grab and build.

**Core scenario:**

> As a person who uses drugs, alone on a Saturday night, I need to let someone I trust know I'm struggling, without typing much or being overheard, so that I don't face it alone.

**Journey (3–5 steps):**

1. Gary opens a tiny page (no sign-up), or replies to the 11pm check-in he set up earlier.
2. It asks "How are you right now?" He taps **I'm OK**, **Not great** or **I need someone**. He can type or talk instead.
3. If he needs someone, it asks before it sends the message he wrote earlier ("Can you call me?") to Lorraine. If nobody replies within a few minutes, it offers a volunteer supporter, then services open now.
4. Gary sees who's been told and what happens next. A quick exit is always there. If life may be at risk, 999 is shown clearly, but never called for him.

**Definition of done for the hackathon MVP:**

- [ ] A complete journey can be demonstrated from start to finish.
- [ ] The core outcome is understandable without an explanation from the team.
- [ ] The main happy path works with synthetic or open data.
- [ ] Important failure or empty states are handled appropriately.
- [ ] The team has checked basic accessibility and recorded outstanding limitations.

## 5. MVP scope _(fill at 15:30)_

| Capability | Why it is essential | How we will check it | Status |
|---|---|---|---|
| "How are you right now?" with three tap answers | The most private, lowest-friction way in | Walk through Gary's night | First version |
| Send a ready-made message to a trusted person | Keeps a human from his own circle in the loop | Demo with made-up contacts | First version |
| If nobody replies: volunteer supporter, then services open now | He isn't left alone if family don't answer; more than a directory | Demo with synthetic data | First version |
| Scheduled check-in (simulated) | Reaches people who won't reach out first | Demo with a pretend 11pm text | Next (grab and build) |
| Type or talk instead of tapping | Choice of input; type first, talk if time allows | Demo | Next (grab and build) |
| Quick exit, and 999 shown but never automatic | Safety and trust | Keyboard and phone-width check | First version |

**Explicitly out of MVP:** sending real texts, a free-form AI chat, maps or location, real sign-up and vetting of volunteer supporters, remembering anything about where someone was.

## 6. Beyond MVP: enhancements and future opportunities

Capture ideas freely, but **do not start them until the MVP works end to end**. Reprioritise against user value, risk and remaining time.

| Idea / capability | User value or assumption addressed | Layer | Priority | Status |
|---|---|---|---|---|
| Support for the supporter (e.g. Lorraine: what to do if he doesn't answer, naloxone info) | Families wait years for support and stay hidden | Enhancement | Medium | Idea |
| A chatbot in front, handing over to a person | Free-form input, with a human in the loop | Future opportunity | Medium | Idea |
| Real SMS check-ins, free short code or zero-rated site | Works with no data | Future opportunity | High | Idea |
| Sign-up, vetting and matching for volunteer supporters | Makes the wider circle safe | Future opportunity | High | Idea |

- **Enhancement:** A feasible addition or improvement if time remains today.
- **Future opportunity:** Valuable but likely to need more research, integration or time.
- **Selection rule:** Fix broken core journeys and serious usability or safety issues before adding features.

## 7. Assumptions and risks

| Assumption or risk | Why it matters | Evidence / mitigation today | Confidence or status |
|---|---|---|---|
| Automatically calling 999 or sharing location would stop people using it | They may be somewhere with illegal substances; they'd avoid the tool | The person always decides; escalation is gentle and opt-in | Unvalidated (agreed working assumption) |
| A human needs to stay in the loop | Something robotic could make a vulnerable moment worse | Any chatbot step hands over to a person in their circle | Unvalidated (agreed working assumption) |
| We must not give medical advice | Wrong advice could cause harm | Point to people and services, not diagnoses | Unvalidated (agreed working assumption) |
| Volunteer supporters could be unsafe or out of their depth | Vulnerable people at night; safeguarding | Show sign-up, consent and vetting as a step; don't build it today | Unvalidated (agreed working assumption) |
| Contacts, check-in times and location are sensitive personal data | Substance use is special category data; fear of being tracked | Ask for the bare minimum; consent for each use; synthetic data only | Unvalidated (agreed working assumption) |
| People have low battery, data or signal | Needs to work when the phone is nearly dead or out of data | SMS check-ins; tiny page; works on old phones | Unvalidated (agreed working assumption) |

For sensitive scenarios, consider privacy, consent, exclusion, inaccurate outputs and unintended harm. Keep a human decision-maker involved where appropriate.

## 8. Testing and evidence from today

| Test or check | Expected result | Actual result / evidence | Outcome |
|---|---|---|---|
| Help right now (trap door): ask for a call, then services open now | No sign-up; asks before connecting; shows who's been told | Works end to end (scenarios 7.1 to 7.4, 7.7, 7.8, 7.10, 7.12 to 7.14 in [test-scenarios.md](sketches/test-scenarios.md)) | Pass |
| Edge cases: blank number, "abc" as a number, no volunteer on, just after midnight | Clear errors; nothing missed | Blank number: clear error. "abc" is accepted (7.6). "No volunteer on" message is easy to miss (7.9). **After midnight, the 6pm to 2am Night Line disappears** (7.11) | 1 fail, 2 to decide |
| Keyboard and 375px phone width | Usable and understandable | Fits at 375px, focus clearly visible, quick exit leaves no Back-button trail. Quick exit is hard to reach by keyboard once you're on the page (5.1) | Partly |

**What we have demonstrated:** _..._  
**What we have not demonstrated:** _..._

> Internal walkthroughs, synthetic data and automated checks are useful, but do not constitute validation with representative users.

## 9. Validation gaps and next steps

Record important activities that cannot reasonably be completed during the hackathon, particularly those needed before a real pilot or launch.

| Activity / gap | Why it matters | What we managed today | Next step / evidence needed | Priority |
|---|---|---|---|---|
| Representative user research | Check the problem and needs are real | _..._ | Interviews or field research | High |
| Usability testing | See whether users can complete the journey | _..._ | Moderated or unmoderated testing | High |
| Accessibility validation | Check inclusion beyond basic checks | _..._ | Assistive technology and user testing | High |
| Data / model validation | Check outputs are credible | _..._ | Real-world evidence and independent review | High |
| Security and privacy assurance | Assess readiness for real-world use | _..._ | Appropriate assessment and controls | High |
| Impact measurement | Test whether the solution creates value | _..._ | Pilot and outcome measures | Medium |

**Before any real-world pilot, we must:** _Summarise the most critical unresolved conditions._

## 10. Decisions and discoveries

| Time | Original belief or decision | What we discovered | What changed / next action |
|---|---|---|---|
| 16:04 | MVP scope had six capabilities | Too much for a 20-minute first version | Squad agreed: first version is journey steps 1 to 4 with tap answers; scheduled check-in and type or talk come next |
| 16:06 | Separate ideas: scheduled check-ins (Carl's notes) and tap, type or talk with volunteer supporters (the talk-through) | They fit together as one journey; consent is needed at every step | Product owner agreed the combined idea and MVP scope; Spencer builds the first version |

## 11. End-of-day summary

**What we built:** _One or two sentences._  
**Demo location:** _Link or path to working prototype._  
**Biggest learning:** _..._  
**One thing that did not work:** _..._  
**Most valuable next step:** _..._

---

**Working agreement:** The challenge and product decisions belong to the squad. The product owner records agreed decisions. Everyone builds, tests and contributes. Keep this document proportionate to the time available.
