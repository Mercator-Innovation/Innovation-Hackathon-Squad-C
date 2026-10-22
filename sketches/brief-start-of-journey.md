# Build brief: the start of the journey

Agreed by Elena Barker (product owner) after the squad looked at the first version.

## Why

The first version starts in the middle: "Hi Gary" assumes he's already signed up, but there's no way to sign up. Being greeted by name out of nowhere would spook someone. "I'm OK" only makes sense as a reply to a check-in.

## What to build

1. **A new start screen, no name.** Three ways in:
   - **I need help right now** (the trap door, for a first visit that may be a crisis)
   - **Set up Still here for me** (now "Add people I trust")
   - **I want to support someone**
2. **The trap door: no sign-up.**
   - Offers a volunteer supporter who's on now. It asks before connecting, and asks only for a name (a made-up one is fine) and a phone number if they want a call back.
   - Then **services open now**, as the fallback.
3. **Optional sign-up for the person.** Name (made up is fine), trusted people, and the message to send them. **Every step can be skipped.** Later, a banner: "Want to add people you trust?"
4. **Trusted people must agree.** Gary invites Lorraine, and she says yes or no. Gary can't add someone without their say-so. Simulate it in the demo.
5. **A sign-up journey for supporters:** family supporting their own person, or volunteers for anyone. Consent first. Show vetting as a step, but don't build it.
6. **"Hi {name}" and "I'm OK" only after sign-up**, or as the reply to a check-in.

## Who's on what

These touch the same files (`index.html`, `app.js`, `content.js`, `data/people.js`). Agree with Spencer (merge captain) who goes first. A good split:

- the start screen and the trap door
- sign-up for the person, and trusted people agreeing
- sign-up for supporters
