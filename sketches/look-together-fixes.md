# Look together: quick fixes (suggestions)

From Spencer (merge captain), about 18:10. These are **suggestions for Elena to decide on**, not decisions. The full notes are under "Look together" in [TEAM.md](../TEAM.md).

## The notes, in short

- **Working:** "I need help right now" is clear end to end (volunteer call-back, "Sam will call you now", Back on every screen). The start-screen icons are liked.
- **Confusing:** the name "Alex" clashes with people's names; the services list is too long; "Add people I trust" doesn't say you're sharing information; sign-up repeats itself, asks things in an odd order and has a Skip that makes no sense; after inviting someone it acts as if they'd already said yes; "Your people" doesn't show who you've added.
- **Missing:** a volunteer person card (avatar, not a photo); services sorted by nearest and open; "This takes about 2 minutes"; a check-your-answers page; contact cards with a status for each person.

## Five quick fixes (about 30 minutes left before 18:40)

| # | Fix | File | Who |
|---|---|---|---|
| 1 | **Name clash:** pick a name that can't be a person's (for example "Nightlight", "Lifeline" or "Still here"), and say "Gary has been asked", not "Alex has asked Gary" | `brand.js`, `content.js` | Joseph and Elena's call |
| 2 | **Services too long:** show the three nearest that are open now, with "Show more"; keep the call-back and meetings on the same page | `app.js` | Spencer |
| 3 | **Invited isn't the same as said yes:** show "Waiting for Lorraine to say yes" until the demo reply, and that status on "Your people" next to each name | `signup.js` | Joseph |
| 4 | **Sign-up feels clunky:** name and number first, then "who are they to you?"; remove the confusing Skip; add "This takes about 2 minutes" and "That's it for now" | `signup.js` | Joseph |
| 5 | **Volunteer person card:** an initials avatar (a coloured circle with "S") next to Sam's name and "on until 3am" | `app.js`, `styles.css` | Spencer |

Tell Elena which you're grabbing, and get the latest before you start.
