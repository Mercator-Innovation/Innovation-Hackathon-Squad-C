# Our squad

<!-- The organisers fill in Members before the day, and mark the squad lead. The squad lead adds Roles by Wed 21 Oct. On the day, the product owner adds the squad name first (at 15:05, through /start-here), then the challenge and the idea. Only the product owner's Claude writes the decisions here; everyone else says "get the latest". -->

**Repo:** Innovation-Hackathon-Squad-C
**Squad name:** the halluCinators
**Challenge:** 2. Help when it's needed: connecting people affected by substance use with support, out of hours ([sheet](challenges/challenge-2-help-when-its-needed.md))
**Why we chose it:** We care about it most personally.
**The idea:** For a person who uses drugs or alcohol, alone at night, a tiny page or text check-in where they tap, type or talk to say how they are. With their consent at every step, it reaches their own trusted people first, then a volunteer supporter, then services open now, and never calls 999 for them.

## Members

| Name | Profession | Location | Squad lead |
|---|---|---|---|
| Spencer Clarke-Griffiths | Software Developer | In person |  |
| Anastasia Florentis | QA Engineer | In person |  |
| Carl McCullagh | Product Manager | In person | Yes |
| Elena Barker | Business Analyst | In person |  |
| Patricia Sanchez | Interaction Designer | In person |  |
| Joseph Thrush | User Researcher | In person |  |

The **squad lead** runs the squad's setup before the day: agreeing the two roles and getting everyone into the Teams chat. They're the product owner unless the squad agrees otherwise.

## Roles

| Role | Who |
|---|---|
| Product owner | Elena Barker |
| Merge captain | Spencer Clarke-Griffiths |

- **Product owner:** chairs the squad's conversations, records what the squad decides (the challenge, the idea), makes the call on what matters next and keeps an eye on time.
- **Merge captain:** drives the shared screen, gets the first version up, keeps the screen on the latest version, and sorts out the order when two people would change the same files.
- **Everyone, both roles included:** builds. The squad chooses who presents at show and tell.

## Look together (17:15)

<!-- At the look together, the squad uses the prototype as the person it's helping. The product owner's session writes one short line for each, then what the squad will do next, and shares it. -->

**What's working:** "I need help right now" is clear end to end: volunteer call-back, "Sam will call you now", Back on every screen. The start-screen icons are liked.
**What's confusing:** the name "Alex" clashes with people's names (volunteers, contacts, "Alex, my brother"); the services list is too long, with no priority; "Add people I trust" doesn't make clear you're committing information; sign-up repeats itself, asks "who they are to you" before name and number, and has a Skip that makes no sense. "Alex has asked Gary" feels odd ("Gary has been asked" is clearer), which adds to the case for a new name. After inviting someone, it moves on as if they'd already said yes. "Your people" doesn't show who you've added.
**What's missing:** a person card for the volunteer (an avatar, not a photo); services sorted by nearest and open, from a postcode, with a simple map, with "show me what's open" ending on the same page; "This takes about 2 minutes" on Add people I trust, with a real "Talk to someone now, no name needed" button; icons next to button titles. Plus: "That's it for now" instead of "That's everyone"; a check-your-answers page; each added person as a contact card (avatar, Edit, Remove), including changing a number; and a status for each person (waiting for a reply, said yes, said no) on Your people.
**What we'll do next:** _(the product owner's call)_
**Presenting at show and tell:** Carl McCullagh

## Links

- [Lean PRD](PRD.md): the squad's product requirements. Claude: read it before building, and keep changes within the MVP scope unless the product owner says otherwise.
- Discovery Wall (optional): _(added if the squad makes one)_

## Working agreements

<!-- Optional. Anything the squad agrees about how it works, for example "say what you're grabbing in the Teams chat". -->

Our objectives: win ethically, learn something new, enjoy our time.

**Who's on what (from 16:40, the product owner's call).** Brief: [sketches/brief-start-of-journey.md](sketches/brief-start-of-journey.md). Each journey gets its own new file, so only Spencer touches `app.js` and `index.html`. Spencer goes first and shares the hooks; everyone else starts from those. Put each journey's words in its own file, not `content.js`.

| Who | Grabs | Files |
|---|---|---|
| Spencer | New start screen and the trap door; empty hooks for the other journeys, shared first | `index.html`, `app.js` |
| Joseph | The person's optional sign-up, with trusted people agreeing | `src/signup.js` |
| Patricia | The supporter sign-up journey (family or volunteer) | `src/supporter.js` |
| Carl | The scheduled check-in (simulated): where "Hi Gary" and "I'm OK" belong | `src/checkin.js` |
| Anastasia | Test scenarios for the trap door and sign-up, keyboard and phone-width checks, results in PRD section 8 | `sketches/`, `PRD.md` section 8 |
| Elena | PRD journey and scope, more made-up volunteers and services | `PRD.md` sections 4 and 5, `src/data/` |
