// Behaviour: which screen shows, and what happens when you tap.
//
// Hooks for other journeys (each in its own file, loaded after this one):
//   StillHere.journeys.signup    -> signup.js    (the person's optional sign-up)
//   StillHere.journeys.supporter -> supporter.js (family or volunteer sign-up)
//   StillHere.journeys.checkin   -> checkin.js   (the scheduled check-in)
// A journey is a function that builds its screens with StillHere.show(...).
// The helpers it can use are listed at the bottom of this file. For example, signup.js:
//
//   StillHere.journeys.signup = function () {
//     const { show, el, button, choices } = StillHere;
//     show([el("h1", {}, "What should we call you?"), choices([button("Skip", "btn-link", StillHere.home)])]);
//   };
//
// When sign-up is done: StillHere.setProfile({ name, message, trustedPeople }); StillHere.home();
(function () {
  const C = window.CONTENT;
  const D = window.DATA;
  const screen = document.getElementById("screen");

  // Who the person is, once they've signed up. null = we don't know them.
  // signup.js sets this: { name, trustedPeople: [{ name, relationship, agreed }], message }
  let profile = null;

  // What's happened so far tonight (only in this page, nothing saved).
  let state = newState();
  function newState() { return { told: [], next: "", contactIndex: 0 }; }

  // Fill {placeholders} in a piece of text.
  function fill(text, values) {
    return text.replace(/\{(\w+)\}/g, (m, key) => (values && key in values ? values[key] : m));
  }

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "onclick") node.addEventListener("click", v);
      else node.setAttribute(k, v);
    });
    if (text) node.textContent = text;
    return node;
  }

  function button(text, style, onclick) {
    return el("button", { type: "button", class: style, onclick }, text);
  }

  // Show a screen and move focus to its heading, for keyboard and screen reader users.
  function show(nodes, withSummary) {
    screen.innerHTML = "";
    nodes.forEach((n) => screen.appendChild(n));
    if (withSummary) screen.appendChild(summary());
    const h1 = screen.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus(); }
  }

  function choices(buttons) {
    const div = el("div", { class: "choices" });
    buttons.forEach((b) => div.appendChild(b));
    return div;
  }

  // Run another person's journey, or a "coming soon" screen if it isn't built yet.
  function journey(name) {
    return () => {
      const fn = StillHere.journeys[name];
      if (typeof fn === "function") fn();
      else comingSoon();
    };
  }

  function comingSoon() {
    show([
      el("h1", {}, C.comingSoon.heading),
      el("p", {}, C.comingSoon.body),
      choices([button(C.comingSoon.back, "btn-secondary", home)])
    ]);
  }

  // Trusted people Gary can message: only those who've agreed.
  function trustedPeople() {
    return profile ? profile.trustedPeople.filter((p) => p.agreed !== false) : [];
  }
  function contact() { return trustedPeople()[state.contactIndex]; }
  function volunteer() { return D.volunteers[0]; }

  // Who's been told and what happens next.
  function summary() {
    const s = el("section", { class: "summary", "aria-labelledby": "summary-h" });
    s.appendChild(el("h2", { id: "summary-h" }, C.summary.heading));
    s.appendChild(el("h3", {}, C.summary.told));
    if (state.told.length === 0) {
      s.appendChild(el("p", {}, C.summary.nobody));
    } else {
      const ul = el("ul");
      state.told.forEach((t) => ul.appendChild(el("li", {}, t)));
      s.appendChild(ul);
    }
    if (state.next) {
      s.appendChild(el("h3", {}, C.summary.next));
      s.appendChild(el("p", {}, state.next));
    }
    return s;
  }

  // Home: the welcome screen for a stranger, or "How are you?" once signed up.
  function home() {
    state = newState();
    if (profile) howAreYou();
    else welcome();
  }

  // The first screen anyone sees. No name.
  function welcome() {
    show([
      el("h1", {}, C.welcome.heading),
      el("p", { class: "hint" }, C.welcome.body),
      choices([
        button(C.welcome.helpNow, "btn-primary", helpNow),
        button(C.welcome.setUp, "btn-secondary", journey("signup")),
        button(C.welcome.support, "btn-secondary", journey("supporter")),
        button(C.welcome.demoSignedIn, "btn-demo", () => {
          setProfile({
            name: D.person.name,
            message: D.person.savedMessage,
            trustedPeople: D.trustedPeople.map((p) => Object.assign({ agreed: true }, p))
          });
          home();
        })
      ])
    ]);
  }

  // The trap door: help right now, no sign-up.
  function helpNow() {
    const v = volunteer();
    if (!v) {
      state.next = C.helpNow.noVolunteer;
      return services();
    }
    const vals = { volunteer: v.name, until: formatTime(v.onUntil), about: v.about };
    show([
      el("h1", {}, C.helpNow.heading),
      el("p", {}, fill(C.helpNow.volunteer, vals)),
      el("p", {}, fill(C.helpNow.question, vals)),
      choices([
        button(C.helpNow.yes, "btn-primary", callBack),
        button(C.helpNow.no, "btn-secondary", services)
      ])
    ]);
  }

  // Ask only for a name and a number, and only for this one call.
  function callBack() {
    const v = volunteer();
    const vals = { volunteer: v.name };
    const form = el("form", { novalidate: "" });

    const nameField = field("cb-name", fill(C.callBack.nameLabel, vals), C.callBack.nameHint, "text", "nickname");
    const phoneField = field("cb-phone", C.callBack.phoneLabel, C.callBack.phoneHint, "tel", "off");
    const error = el("p", { class: "error", id: "cb-phone-error", hidden: "" }, fill(C.callBack.phoneError, vals));
    phoneField.insertBefore(error, phoneField.querySelector("input"));
    form.appendChild(nameField);
    form.appendChild(phoneField);
    form.appendChild(choices([
      el("button", { type: "submit", class: "btn-primary" }, fill(C.callBack.send, vals)),
      button(C.callBack.back, "btn-link", helpNow)
    ]));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = form.querySelector("#cb-phone");
      if (!phone.value.trim()) {
        error.hidden = false;
        phone.setAttribute("aria-invalid", "true");
        phone.setAttribute("aria-describedby", "cb-phone-hint cb-phone-error");
        phone.focus();
        return;
      }
      const name = form.querySelector("#cb-name").value.trim() || "you";
      state.told.push(`${v.name} (volunteer supporter): asked to call ${name}`);
      state.next = `${v.name} will call you soon. If you'd rather, you can still use a service above.`;
      services({ banner: true });
    });

    show([el("h1", {}, fill(C.callBack.heading, vals)), el("p", {}, C.callBack.body), form]);
  }

  function field(id, label, hint, type, autocomplete) {
    const wrap = el("div", { class: "field" });
    wrap.appendChild(el("label", { for: id }, label));
    if (hint) wrap.appendChild(el("p", { class: "hint", id: id + "-hint" }, hint));
    const attrs = { id, name: id, type, autocomplete };
    if (hint) attrs["aria-describedby"] = id + "-hint";
    wrap.appendChild(el("input", attrs));
    return wrap;
  }

  // "Want to add people you trust?" Only for people who haven't signed up.
  function banner() {
    const b = el("aside", { class: "banner", "aria-label": "Set up" });
    b.appendChild(el("p", {}, C.banner.text));
    b.appendChild(button(C.banner.action, "btn-secondary", journey("signup")));
    return b;
  }

  // Signed up (or replying to a check-in): how are you right now?
  function howAreYou() {
    show([
      el("h1", {}, fill(C.start.heading, { name: profile.name })),
      el("p", { class: "hint" }, C.start.hint),
      choices([
        button(C.start.ok, "btn-secondary", ok),
        button(C.start.notGreat, "btn-secondary", notGreat),
        button(C.start.needSomeone, "btn-primary", ask)
      ])
    ]);
  }

  function ok() {
    show([
      el("h1", {}, C.ok.heading),
      el("p", {}, C.ok.body),
      choices([button(C.ok.back, "btn-secondary", home)])
    ]);
  }

  function notGreat() {
    show([
      el("h1", {}, C.notGreat.heading),
      el("p", {}, C.notGreat.body),
      choices([
        button(C.notGreat.message, "btn-primary", ask),
        button(C.notGreat.services, "btn-secondary", services),
        button(C.notGreat.back, "btn-link", home)
      ])
    ]);
  }

  // Ask before sending anything. No trusted people yet? Go to a volunteer.
  function ask() {
    const p = contact();
    if (!p) return noReply();
    show([
      el("h1", {}, fill(C.ask.heading, { who: p.name })),
      el("p", {}, C.ask.body),
      el("p", { class: "message" }, profile.message || D.person.savedMessage),
      choices([
        button(C.ask.yes, "btn-primary", send),
        button(C.ask.other, "btn-secondary", () => {
          state.contactIndex = (state.contactIndex + 1) % trustedPeople().length;
          ask();
        }),
        button(C.ask.no, "btn-link", home)
      ])
    ]);
  }

  function send() {
    const p = contact();
    state.told.push(`${p.name}${p.relationship ? " (" + p.relationship.toLowerCase() + ")" : ""}: your message`);
    state.next = fill(C.waiting.body, { who: p.name });
    waiting();
  }

  function waiting() {
    const who = contact().name;
    show([
      el("h1", {}, fill(C.waiting.heading, { who })),
      el("p", {}, fill(C.waiting.body, { who })),
      choices([
        button(fill(C.waiting.replied, { who }), "btn-demo", replied),
        button(C.waiting.skip, "btn-demo", noReply)
      ])
    ], true);
  }

  function replied() {
    const who = contact().name;
    state.next = fill(C.replied.heading, { who });
    show([
      el("h1", {}, fill(C.replied.heading, { who })),
      el("p", {}, C.replied.body),
      choices([button(C.summary.startAgain, "btn-link", home)])
    ], true);
  }

  // If nobody replies: offer a volunteer supporter, then services.
  function noReply() {
    const v = volunteer();
    if (!v) return services();
    const p = contact();
    const vals = { who: p ? p.name : "Nobody", volunteer: v.name, until: formatTime(v.onUntil), about: v.about };
    state.next = fill(C.volunteer.question, vals);
    show([
      el("h1", {}, p ? fill(C.volunteer.heading, vals) : C.helpNow.heading),
      el("p", {}, fill(C.volunteer.body, vals)),
      el("p", {}, fill(C.volunteer.question, vals)),
      choices([
        button(fill(C.volunteer.yes, vals), "btn-primary", () => {
          state.told.push(`${v.name} (volunteer supporter): asked to call you`);
          state.next = `${v.name} will call you soon. If you'd rather, you can still use a service above.`;
          services();
        }),
        button(C.volunteer.services, "btn-secondary", services)
      ])
    ], true);
  }

  // Services open at the demo's pretend time.
  function services(opts) {
    const now = toMinutes(D.demoNow.time);
    const open = D.services.filter((s) =>
      s.days.includes(D.demoNow.day) && now >= toMinutes(s.opens) && now < toMinutes(s.closes)
    );
    const nodes = [
      el("h1", {}, C.services.heading),
      el("p", { class: "hint" }, fill(C.services.nowLabel, { day: D.demoNow.day, time: formatTime(D.demoNow.time) }))
    ];
    if (open.length === 0) nodes.push(el("p", {}, C.services.none));
    open.forEach((s) => {
      const card = el("div", { class: "card" });
      card.appendChild(el("h3", {}, s.name));
      card.appendChild(el("p", {}, s.what));
      card.appendChild(el("p", { class: "how" }, s.how));
      card.appendChild(el("p", { class: "until" }, s.opens === "00:00" && s.closes === "24:00" ? C.services.allDay : fill(C.services.closesAt, { time: formatTime(s.closes) })));
      nodes.push(card);
    });
    if (!profile && opts && opts.banner) nodes.push(banner());
    nodes.push(choices([button(C.summary.startAgain, "btn-link", home)]));
    show(nodes, true);
  }

  function toMinutes(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }

  // "26:00" -> "2am", "23:10" -> "11:10pm"
  function formatTime(t) {
    let [h, m] = t.split(":").map(Number);
    h = h % 24;
    const suffix = h < 12 ? "am" : "pm";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + suffix;
  }

  function setProfile(p) { profile = p; }

  // Helpers for the other journey files.
  const StillHere = window.StillHere = {
    journeys: {},           // signup.js, supporter.js and checkin.js add themselves here
    show, el, button, choices, field, fill, formatTime,
    home,                   // back to the start (welcome, or "How are you?" if signed up)
    howAreYou,              // "Hi {name}. How are you right now?" (for checkin.js)
    helpNow,                // the trap door
    services,               // services open now
    setProfile,             // signup.js calls this when the person finishes
    getProfile: () => profile,
    state: () => state      // { told: [...], next: "" } for the summary
  };

  // Header and footer words, and the quick exit.
  document.getElementById("app-name").textContent = C.appName;
  document.getElementById("emergency").textContent = C.emergency;
  document.getElementById("demo-note").textContent = C.demoNote;
  const exit = document.getElementById("quick-exit");
  exit.textContent = C.quickExit;
  exit.addEventListener("click", () => window.location.replace("https://www.bbc.co.uk/weather"));

  // Start once every file has loaded, so other journeys can register first.
  window.addEventListener("DOMContentLoaded", home);
})();
