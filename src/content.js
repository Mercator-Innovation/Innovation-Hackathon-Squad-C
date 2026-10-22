// All the words people see. Change them here without touching the code.
// {name}, {who} and {message} are filled in by app.js.
window.CONTENT = {
  appName: "Still here",
  quickExit: "Quick exit",
  back: "Back",
  emergency: "If someone's life may be at risk, call 999. We will never call it for you.",
  demoNote: "Demo only. Nothing is really sent.",

  // The first screen anyone sees. No name: we don't know who they are yet.
  welcome: {
    heading: "You don't have to face tonight alone.",
    body: "Choose what you need. It's free, and you don't need to sign up to get help.",
    helpNow: "I need help right now",
    helpNowDesc: "Talk to a volunteer supporter tonight. No sign-up.",
    setUp: "Add people I trust",
    setUpDesc: "Choose who we can message for you when you need someone.",
    support: "I want to support someone",
    supportDesc: "Be there for a friend or family member, or volunteer.",
    demoSignedIn: "Demo: open as Gary (already set up)"
  },

  // The trap door: help straight away, no sign-up.
  helpNow: {
    heading: "You don't need to sign up.",
    volunteer: "{volunteer} is a volunteer supporter, on until {until}. {about}",
    question: "Would you like {volunteer} to call you?",
    yes: "Yes, I'd like a call",
    no: "No, show me what's open now",
    noVolunteer: "There's no volunteer supporter on right now.",
    role: "Volunteer supporter · on until {until}"
  },

  callBack: {
    heading: "How can {volunteer} reach you?",
    body: "We only use this for this one call.",
    nameLabel: "What should {volunteer} call you?",
    nameHint: "We've picked a made-up name so you don't have to think of one. You can change it.",
    phoneLabel: "Phone number",
    phoneHint: "Demo only: please don't type a real number.",
    phoneError: "Enter a phone number so {volunteer} can call you",
    send: "Ask {volunteer} to call me",
    back: "Back"
  },

  banner: {
    text: "Want to add people you trust, so they can be told next time?",
    action: "Add people I trust"
  },

  comingSoon: {
    heading: "Coming soon",
    body: "Someone in the squad is building this part.",
    back: "Back to start"
  },

  start: {
    heading: "Hi {name}. How are you right now?",
    hint: "Tap one. Only you can see this.",
    ok: "I'm OK",
    notGreat: "Not great",
    needSomeone: "I need someone",
    checkin: "Check in on me later tonight",
    yourPeople: "Your people"
  },

  ok: {
    heading: "Good. Glad you're OK.",
    body: "If that changes tonight, come back and tap again.",
    back: "Back to start"
  },

  notGreat: {
    heading: "Thanks for telling us.",
    body: "What would help right now?",
    message: "Message someone I trust",
    services: "See what's open now",
    back: "Back"
  },

  ask: {
    heading: "Send this to {who}?",
    body: "This is the message you wrote earlier:",
    yes: "Yes, send it",
    other: "Choose someone else",
    no: "No, don't send anything"
  },

  // "Choose someone else": pick one or more of your people, or another kind of help.
  choose: {
    heading: "Who would you like to reach?",
    legend: "Your people",
    hint: "Tick one or more. We'll send your message to everyone you tick.",
    error: "Tick at least one person, or choose another option below",
    send: "Send my message",
    orHeading: "Or",
    volunteer: "Ask {volunteer}, a volunteer supporter, to call (on until {until})",
    services: "See what's open now",
    nobody: "Nobody right now"
  },

  waiting: {
    heading: "Sent to {who}.",
    body: "We'll wait a few minutes for {who} to reply.",
    skip: "Demo: pretend nobody replied",
    replied: "Demo: {who} replied"
  },

  replied: {
    heading: "{who} is calling you.",
    body: "You're not on your own. Answer when you're ready."
  },

  volunteer: {
    heading: "{who} hasn't replied yet.",
    headingMany: "{who} haven't replied yet.",
    body: "{volunteer} is a volunteer supporter, on until {until}. {about}",
    question: "Would you like {volunteer} to call you?",
    yes: "Yes, ask {volunteer} to call",
    services: "No, show me what's open now"
  },

  services: {
    heading: "Open now",
    nowLabel: "{day}, {time}",
    none: "Nothing nearby is open right now. You can still call 999 if life may be at risk.",
    closesAt: "Open until {time}",
    showMore: "Show {count} more open now",
    miles: "{miles} miles away",
    calling: "{volunteer} will call you soon.",
    callingBody: "Keep your phone nearby. You don't need to do anything else. If you'd rather, you can also use a service below.",
    meetingsHeading: "Recovery meetings",
    meetingsNote: "Real details, checked on {checked}. Times can change, so check before you go.",
    allDay: "Open 24 hours"
  },

  summary: {
    heading: "What's happening",
    told: "Who's been told",
    nobody: "Nobody yet. Nothing has been sent.",
    next: "What happens next",
    startAgain: "Start again"
  }
};
