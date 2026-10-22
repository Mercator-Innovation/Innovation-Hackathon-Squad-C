// All the words people see. Change them here without touching the code.
// {name}, {who} and {message} are filled in by app.js.
window.CONTENT = {
  appName: "Still here",
  quickExit: "Quick exit",
  emergency: "If someone's life may be at risk, call 999. We will never call it for you.",
  demoNote: "Demo only. Nothing is really sent.",

  start: {
    heading: "Hi {name}. How are you right now?",
    hint: "Tap one. Only you can see this.",
    ok: "I'm OK",
    notGreat: "Not great",
    needSomeone: "I need someone"
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
