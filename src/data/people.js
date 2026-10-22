// Made-up people for the demo. Not real people, not real numbers.
window.DATA = window.DATA || {};

window.DATA.person = {
  name: "Gary",
  // The message Gary wrote earlier, when he set things up.
  savedMessage: "Hi, it's Gary. I'm not doing great tonight. Can you call me?"
};

// Gary's own trusted people, in the order he chose.
window.DATA.trustedPeople = [
  { id: "lorraine", name: "Lorraine", relationship: "Sister" },
  { id: "mick", name: "Mick", relationship: "Friend" }
];

// Volunteer supporters on tonight (made up).
// The app offers the first one who is on now (between onFrom and onUntil, at the demo time).
window.DATA.volunteers = [
  { id: "v1", onFrom: "23:30", name: "Jo", about: "Volunteer supporter. Her brother uses drugs, so she gets it.", onUntil: "02:00" },
  { id: "v2", onFrom: "20:00", name: "Sam", about: "Volunteer supporter. Sam is in recovery and remembers how long the nights felt.", onUntil: "03:00" },
  { id: "v3", onFrom: "19:00", name: "Priya", about: "Volunteer supporter. Her dad drank, so she knows what it's like for families too.", onUntil: "01:00" },
  { id: "v4", onFrom: "00:00", name: "Alan", about: "Volunteer supporter. A retired nurse who's good at just listening.", onUntil: "04:00" }
];
