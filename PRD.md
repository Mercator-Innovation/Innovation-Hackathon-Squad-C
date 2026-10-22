# Squad C | Lean Product Requirements Document

> **Hackathon:** Mercator Innovation Hackathon, 22 October 2026  
> **Status:** Living working document, not a sign-off artefact  
> **Product owner:** Elena Barker  
> **Principle:** MVP first. Improve what matters. Extend only when ready.

**How to use this:** Agree the essentials in about 10 minutes after choosing the challenge: sections 1, 3, 4 and 5, marked **fill at 15:30**. The other sections are optional; fill them in as you go, and Claude can draft them from what the squad builds. Keep answers brief. Update this document as the team learns. It is a shared reference for people and Claude, not a reason to delay building. The product owner coordinates changes to avoid conflicting edits. Do not enter real personal, client or confidential data.

## 1. Challenge and problem _(fill at 15:30)_

**Selected challenge:** 2. Help when it's needed (out-of-hours support for people affected by substance use)  
**Why this challenge:** We care about it most personally.

> **Draft from the 15:30 talk-through (Carl's notes). Elena to confirm.**

**Primary user(s):** People who use drugs or alcohol and need help, out of hours.  
**Circle of support:** Friends and family, professionals and volunteers.  
**Stakeholder (not a user):** Emergency services. They're affected by escalations but don't use the tool.  
**Problem:** They need someone who can help in the moment, at night, but most support closes at 5pm and they don't want to go straight to 999.  
**Why it matters:** They face it alone, or the situation escalates into a crisis.  
**Evidence we have** (from Anastasia's research, **not yet checked with sources**):
- Digital Lifelines Scotland gave people phones and data. People felt more connected, but feared being tracked, and the funding ran out.
- A "call before you use" line was trialled in Glasgow.
- Low trust in institutions and in tech; many people prefer a human.

**Problem statement:**

> A person who uses drugs or alcohol struggles to reach someone who can help in the moment, at night, because most support closes at 5pm and they don't want to escalate to 999, resulting in them facing it alone or the situation reaching crisis.

## 2. Desired outcome

> **Draft. Elena to confirm.**

**User outcome:** Feel safer and less alone at night, with someone who can help knowing when they need it, and the person staying in control.  
**How we might recognise value:** _..._  
**Constraints:**
- **Low battery:** check-ins, and a last-known location only with consent.
- **Low data or signal:** plain SMS (no data), a tiny web page, works on old phones.
- **No barriers to start:** no sign-up, password or app store.
- **Tone:** plain English, non-judgemental, easy to read.
- **Trust and control:** never call 999 or share location automatically; the person decides.

## 3. Proposed solution hypothesis _(fill at 15:30)_

> **Draft. Elena to confirm.**

> We believe that scheduled check-ins ("text me at 11pm; if I don't reply, tell these people") will help people who use drugs or alcohol feel safer and less alone at night by connecting them with someone in their own circle of support who's available now, escalating gently rather than straight to 999. We will test this by [hackathon demonstration or check].

**Alternative approaches considered:**
- **Automatically alerting emergency services:** rejected. It would stop people using it, and emergency services don't want an onslaught of alerts.
- **A chatbot that triages and connects:** may sit in front of the check-ins, with a human in the loop.
- **A Life360-style circle with a map:** location only with consent, because of fears about being tracked.
- **Free short codes and zero-rated websites** (free to use with no data): may exist, **not yet checked**. Simulate them in the prototype.

## 4. MVP: smallest valuable journey _(fill at 15:30)_

**Core scenario:**

> As a [user], I need to [action] so that [benefit].

**Journey (3–5 steps):**

1. _User starts by..._
2. _User provides or chooses..._
3. _The product responds by..._
4. _User understands or acts on..._

**Definition of done for the hackathon MVP:**

- [ ] A complete journey can be demonstrated from start to finish.
- [ ] The core outcome is understandable without an explanation from the team.
- [ ] The main happy path works with synthetic or open data.
- [ ] Important failure or empty states are handled appropriately.
- [ ] The team has checked basic accessibility and recorded outstanding limitations.

## 5. MVP scope _(fill at 15:30)_

| Capability | Why it is essential | How we will check it | Status |
|---|---|---|---|
| _Capability 1_ | _User value_ | _Demonstration or test_ | Not started |
| _Capability 2_ | _User value_ | _Demonstration or test_ | Not started |

**Explicitly out of MVP:** _List tempting capabilities that are not needed for the core journey._

## 6. Beyond MVP: enhancements and future opportunities

Capture ideas freely, but **do not start them until the MVP works end to end**. Reprioritise against user value, risk and remaining time.

| Idea / capability | User value or assumption addressed | Layer | Priority | Status |
|---|---|---|---|---|
| _Idea_ | _Why it matters_ | Enhancement | High / Medium / Low | Idea |
| _Idea_ | _Why it matters_ | Future opportunity | High / Medium / Low | Idea |

- **Enhancement:** A feasible addition or improvement if time remains today.
- **Future opportunity:** Valuable but likely to need more research, integration or time.
- **Selection rule:** Fix broken core journeys and serious usability or safety issues before adding features.

## 7. Assumptions and risks

| Assumption or risk | Why it matters | Evidence / mitigation today | Confidence or status |
|---|---|---|---|
| Automatically calling 999 or sharing location would stop people using it | They may be somewhere with illegal substances; they'd avoid the tool | The person always decides; escalation is gentle and opt-in | Unvalidated (draft) |
| A human needs to stay in the loop | Something robotic could make a vulnerable moment worse | Any chatbot step hands over to a person in their circle | Unvalidated (draft) |
| We must not give medical advice | Wrong advice could cause harm | Point to people and services, not diagnoses | Unvalidated (draft) |
| Contacts, check-in times and location are sensitive personal data | Substance use is special category data; fear of being tracked | Ask for the bare minimum; consent for each use; synthetic data only | Unvalidated (draft) |
| People have low battery, data or signal | Needs to work when the phone is nearly dead or out of data | SMS check-ins; tiny page; works on old phones | Unvalidated (draft) |

For sensitive scenarios, consider privacy, consent, exclusion, inaccurate outputs and unintended harm. Keep a human decision-maker involved where appropriate.

## 8. Testing and evidence from today

| Test or check | Expected result | Actual result / evidence | Outcome |
|---|---|---|---|
| _Complete the core journey_ | _Expected behaviour_ | _Observation or link_ | Not run |
| _Try a failure or edge case_ | _Expected behaviour_ | _Observation or link_ | Not run |
| _Keyboard / narrow-screen check_ | _Usable and understandable_ | _Observation or link_ | Not run |

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
| _HH:MM_ | _..._ | _..._ | _..._ |

## 11. End-of-day summary

**What we built:** _One or two sentences._  
**Demo location:** _Link or path to working prototype._  
**Biggest learning:** _..._  
**One thing that did not work:** _..._  
**Most valuable next step:** _..._

---

**Working agreement:** The challenge and product decisions belong to the squad. The product owner records agreed decisions. Everyone builds, tests and contributes. Keep this document proportionate to the time available.
