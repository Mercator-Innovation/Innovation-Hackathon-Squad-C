// Made-up services for the demo. Names, numbers and hours are invented.
// Times are 24-hour. "closes" after midnight is written as 24:00 or more (e.g. 26:00 = 2am).
window.DATA = window.DATA || {};

// The pretend "now" for the demo: Saturday 11:10pm.
window.DATA.demoNow = { day: "Saturday", time: "23:10" };

window.DATA.services = [
  {
    name: "Night Line (example)",
    what: "Talk to someone who understands drugs and alcohol. No judgement.",
    how: "Free call 0800 000 0001",
    opens: "18:00", closes: "26:00", days: ["Friday", "Saturday", "Sunday"]
  },
  {
    name: "Families Line (example)",
    what: "For you or someone worried about you.",
    how: "Free call 0800 000 0002",
    opens: "17:00", closes: "23:00", days: ["Saturday", "Sunday"]
  },
  {
    name: "Text Support (example)",
    what: "Text a trained volunteer, any time. Free, and won't show on your bill.",
    how: "Text 00000",
    opens: "00:00", closes: "24:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Drop-in Café (example)",
    what: "A warm place to sit and talk, with tea.",
    how: "12 Example Street, Greenock",
    opens: "10:00", closes: "16:00", days: ["Saturday"]
  },
  {
    name: "Recovery meeting online (example)",
    what: "A peer meeting you can join from your phone.",
    how: "Join by phone: 0800 000 0003",
    opens: "22:00", closes: "23:30", days: ["Saturday"]
  }
];
