// Made-up services for the demo. Names, numbers and hours are invented.
// Phone numbers are from Ofcom's range kept for TV and drama (0808 157 0xxx), so none are real.
// "where" is shown on each card. "miles" is the made-up distance from Gary (none = phone, text or online).
// Times are 24-hour. "closes" after midnight is written as 24:00 or more (e.g. 26:00 = 2am).
window.DATA = window.DATA || {};

// The pretend "now" for the demo: Saturday 11:10pm.
window.DATA.demoNow = { day: "Saturday", time: "23:10" };

window.DATA.services = [
  {
    name: "Night Line (example)",
    where: "By phone, anywhere in Scotland",
    what: "Talk to someone who understands drugs and alcohol. No judgement.",
    how: "Free call 0808 157 0001",
    opens: "18:00", closes: "26:00", days: ["Friday", "Saturday", "Sunday"]
  },
  {
    name: "Families Line (example)",
    where: "By phone, anywhere in Scotland",
    what: "For you or someone worried about you.",
    how: "Free call 0808 157 0002",
    opens: "17:00", closes: "23:00", days: ["Saturday", "Sunday"]
  },
  {
    name: "Text Support (example)",
    where: "By text, anywhere in the UK",
    what: "Text a trained volunteer, any time. Free, and won't show on your bill.",
    how: "Text 00000",
    opens: "00:00", closes: "24:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Drop-in Café (example)",
    where: "Greenock town centre", miles: 0.4,
    what: "A warm place to sit and talk, with tea.",
    how: "12 Example Street, Greenock",
    opens: "10:00", closes: "16:00", days: ["Saturday"]
  },
  {
    name: "Recovery meeting online (example)",
    where: "By phone or online",
    what: "A peer meeting you can join from your phone.",
    how: "Join by phone: 0808 157 0003",
    opens: "22:00", closes: "23:30", days: ["Saturday"]
  },
  {
    name: "Late Pharmacy (example)",
    where: "Port Glasgow, 10 minutes by bus from Greenock", miles: 3.2,
    what: "Ask about naloxone, a medicine that reverses an opioid overdose. Free, and they'll show you how to use it.",
    how: "3 Example Road, Port Glasgow",
    opens: "08:00", closes: "23:30", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Safe Space at Night (example)",
    where: "Greenock, near the train station", miles: 0.6,
    what: "Somewhere warm and safe to be tonight. Staff who won't judge you.",
    how: "45 Example Lane, Greenock",
    opens: "21:00", closes: "31:00", days: ["Friday", "Saturday"]
  },
  {
    name: "Peer Chat (example)",
    where: "Online",
    what: "Chat online with someone who's been there. Works on a slow connection.",
    how: "Tap to chat (demo only)",
    opens: "19:00", closes: "27:00", days: ["Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Drug and Alcohol Service (example)",
    where: "Greenock", miles: 0.5,
    what: "Your key worker and the team. Closed now, but you can leave a message for Monday.",
    how: "Call 0808 157 0004",
    opens: "09:00", closes: "17:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  }
];
