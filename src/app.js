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
  function newState() { return { told: [], next: "", contactIndex: 0, sendTo: null }; }

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
    return profile ? profile.trustedPeople.filter((p) => p.agreed === true) : [];
  }
  function contact() { return trustedPeople()[state.contactIndex]; }
  // Who the message goes to: the people picked on "Who would you like to reach?", or the first in the list.
  function chosen() { return state.sendTo && state.sendTo.length ? state.sendTo : [contact()].filter(Boolean); }
  // "Lorraine", "Lorraine and Mick", "Lorraine, Mick and Dee"
  function names(list) {
    const n = list.map((p) => p.name);
    return n.length < 2 ? (n[0] || "") : n.slice(0, -1).join(", ") + " and " + n[n.length - 1];
  }
  // The volunteer supporter who's on now (at the demo's pretend time).
  function volunteer() {
    const now = toMinutes(D.demoNow.time);
    return D.volunteers.find((v) => isOn(v.onFrom || "18:00", v.onUntil, now)) || null;
  }

  // Is "now" inside a shift? Shifts can run past midnight (20:00 to 02:00).
  function isOn(from, until, now) {
    const f = toMinutes(from);
    let u = toMinutes(until);
    if (u <= f) u += 1440;
    return (now >= f && now < u) || (now + 1440 >= f && now + 1440 < u);
  }

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

  // Back: every journey file draws into #screen, so watch it and remember
  // each screen. Back puts the previous one back, with its buttons still working.
  const backBtn = document.getElementById("back");
  let history = [], current = [], restoring = false, clearHistory = false;
  new MutationObserver(() => {
    const now = [...screen.childNodes];
    if (now.length === current.length && now.every((n, i) => n === current[i])) return;
    if (clearHistory) history = [];
    else if (!restoring && current.length) history.push(current);
    restoring = clearHistory = false;
    current = now;
    backBtn.hidden = history.length === 0;
  }).observe(screen, { childList: true });
  backBtn.addEventListener("click", () => {
    const prev = history.pop();
    if (!prev) return;
    restoring = true;
    screen.replaceChildren(...prev);
    const h1 = screen.querySelector("h1");
    if (h1) h1.focus();
  });

  // Home: the welcome screen for a stranger, or "How are you?" once signed up.
  function home() {
    clearHistory = true;
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
        described(C.welcome.helpNow, C.welcome.helpNowDesc, "btn-primary", helpNow),
        described(C.welcome.setUp, C.welcome.setUpDesc, "btn-secondary", journey("signup")),
        described(C.welcome.support, C.welcome.supportDesc, "btn-secondary", journey("supporter"))
      ])
    ]);
  }

  // A big button with a short line underneath saying what it does.
  function described(label, desc, style, onclick) {
    const b = button("", style + " described", onclick);
    b.appendChild(el("span", { class: "label" }, label));
    b.appendChild(el("span", { class: "desc" }, desc));
    return b;
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
      personCard(v),
      el("p", {}, fill(C.helpNow.question, vals)),
      choices([
        button(C.helpNow.yes, "btn-primary", callBack),
        button(C.helpNow.no, "btn-secondary", services)
      ])
    ]);
  }

  // A volunteer's card: initials in a circle (not a photo), name, shift and a line about them.
  function personCard(v) {
    const card = el("div", { class: "person-card" });
    const initials = v.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    card.appendChild(el("span", { class: "avatar", "aria-hidden": "true" }, initials));
    const text = el("div");
    text.appendChild(el("p", { class: "person-name" }, v.name));
    text.appendChild(el("p", { class: "person-role" }, fill(C.helpNow.role, { until: formatTime(v.onUntil) })));
    text.appendChild(el("p", {}, v.about.replace(/^Volunteer supporter\. /, "")));
    card.appendChild(text);
    return card;
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
    // A made-up name, so nobody has to think of one (Joseph's helper in signup.js).
    nameField.querySelector("input").value = StillHere.madeUpName ? StillHere.madeUpName() : "Blue Fox";
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
      state.next = `${v.name} will call you soon.`;
      services({ banner: true, calling: v });
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
        button(C.start.needSomeone, "btn-primary", chooseSomeone),
        button(C.start.checkin, "btn-link", journey("checkin")),
        // Once signed up, signup.js opens "Your people" to add, remove or change the message.
        button(C.start.yourPeople, "btn-link", journey("signup"))
      ])
    ]);
  }

  function ok() {
    show([
      el("h1", {}, C.ok.heading),
      el("p", {}, C.ok.body),
      choices([
        button(C.start.checkin, "btn-secondary", journey("checkin")),
        button(C.ok.back, "btn-link", home)
      ])
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
    const list = chosen();
    if (!list.length) return noReply();
    show([
      el("h1", {}, fill(C.ask.heading, { who: names(list) })),
      el("p", {}, C.ask.body),
      el("p", { class: "message" }, profile.message || D.person.savedMessage),
      choices([
        button(C.ask.yes, "btn-primary", send),
        button(C.ask.other, "btn-secondary", chooseSomeone),
        button(C.ask.no, "btn-link", home)
      ])
    ]);
  }

  // "Who would you like to reach?": tick one or more of your people, or pick a volunteer, services or nobody.
  function chooseSomeone() {
    const people = trustedPeople();
    const nodes = [el("h1", {}, C.choose.heading)];
    if (people.length) {
      const form = el("form", { novalidate: "" });
      const fs = el("fieldset", { "aria-describedby": "choose-hint" });
      fs.appendChild(el("legend", {}, C.choose.legend));
      fs.appendChild(el("p", { class: "hint", id: "choose-hint" }, C.choose.hint));
      const error = el("p", { class: "error", id: "choose-error", hidden: "" }, C.choose.error);
      fs.appendChild(error);
      people.forEach((p, i) => {
        const row = el("div", { class: "check" });
        const box = el("input", { type: "checkbox", id: "choose-" + i, value: String(i) });
        if (chosen().includes(p)) box.checked = true;
        row.appendChild(box);
        row.appendChild(el("label", { for: "choose-" + i }, p.relationship ? `${p.name} (${p.relationship.toLowerCase()})` : p.name));
        fs.appendChild(row);
      });
      form.appendChild(fs);
      form.appendChild(choices([el("button", { type: "submit", class: "btn-primary" }, C.choose.send)]));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const picked = [...form.querySelectorAll("input:checked")].map((b) => people[Number(b.value)]);
        if (!picked.length) {
          error.hidden = false;
          fs.setAttribute("aria-describedby", "choose-hint choose-error");
          form.querySelector("input").focus();
          return;
        }
        state.sendTo = picked;
        ask();
      });
      nodes.push(form);
    }
    nodes.push(el("h2", {}, C.choose.orHeading));
    const v = volunteer();
    const others = [];
    if (v) {
      others.push(button(fill(C.choose.volunteer, { volunteer: v.name, until: formatTime(v.onUntil) }), "btn-secondary", () => {
        state.told.push(`${v.name} (volunteer supporter): asked to call you`);
        state.next = `${v.name} will call you soon.`;
        services({ calling: v });
      }));
    }
    others.push(button(C.choose.services, "btn-secondary", services));
    others.push(button(C.choose.nobody, "btn-link", home));
    nodes.push(choices(others));
    show(nodes);
  }

  function send() {
    chosen().forEach((p) => {
      state.told.push(`${p.name}${p.relationship ? " (" + p.relationship.toLowerCase() + ")" : ""}: your message`);
    });
    state.next = fill(C.waiting.body, { who: names(chosen()) });
    waiting();
  }

  function waiting() {
    const who = names(chosen());
    show([
      el("h1", {}, fill(C.waiting.heading, { who })),
      el("p", {}, fill(C.waiting.body, { who })),
      choices([
      ])
    ], true);
  }

  function replied() {
    const who = chosen()[0].name;
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
    const list = chosen();
    const vals = { who: list.length ? names(list) : "Nobody", volunteer: v.name, until: formatTime(v.onUntil), about: v.about };
    state.next = fill(C.volunteer.question, vals);
    show([
      el("h1", {}, list.length ? fill(list.length > 1 ? C.volunteer.headingMany : C.volunteer.heading, vals) : C.helpNow.heading),
      el("p", {}, fill(C.volunteer.body, vals)),
      el("p", {}, fill(C.volunteer.question, vals)),
      choices([
        button(fill(C.volunteer.yes, vals), "btn-primary", () => {
          state.told.push(`${v.name} (volunteer supporter): asked to call you`);
          state.next = `${v.name} will call you soon.`;
          services({ calling: v });
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
    const nodes = [];
    // If a volunteer is calling, say so first, where it can't be missed.
    if (opts && opts.calling) {
      const call = el("div", { class: "callout", role: "status" });
      call.appendChild(el("h1", {}, fill(C.services.calling, { volunteer: opts.calling.name })));
      call.appendChild(el("p", {}, C.services.callingBody));
      nodes.push(call);
      nodes.push(personCard(opts.calling));
      nodes.push(el("h2", {}, C.services.heading));
    } else {
      nodes.push(el("h1", {}, C.services.heading));
    }
    nodes.push(el("p", { class: "hint" }, fill(C.services.nowLabel, { day: D.demoNow.day, time: formatTime(D.demoNow.time) })));
    if (open.length === 0) nodes.push(el("p", {}, C.services.none));
    // Nearest first (phone, text and online count as nearest), three to start with.
    open.sort((a, b) => (a.miles || 0) - (b.miles || 0));
    const list = el("div", { class: "service-list" });
    open.forEach((s, i) => {
      const card = el("div", { class: "card service-card" });
      if (i >= 3) card.hidden = true;
      const kind = /^(Free call|Call|Join by phone)/.test(s.how) ? "Phone" : /^Text/.test(s.how) ? "Text" : s.miles ? "Place" : "Online";
      card.appendChild(el("p", { class: "tag" }, kind));
      card.appendChild(el("h3", {}, s.name));
      card.appendChild(el("p", {}, s.what));
      if (s.where) card.appendChild(el("p", { class: "where" }, s.miles ? `${s.where} · ${fill(C.services.miles, { miles: s.miles })}` : s.where));
      card.appendChild(el("p", { class: "how" }, s.how));
      card.appendChild(el("p", { class: "until" }, s.opens === "00:00" && s.closes === "24:00" ? C.services.allDay : fill(C.services.closesAt, { time: formatTime(s.closes) })));
      list.appendChild(card);
    });
    nodes.push(list);
    if (open.length > 3) {
      const more = button(fill(C.services.showMore, { count: open.length - 3 }), "btn-secondary", () => {
        list.querySelectorAll(".card[hidden]").forEach((c) => (c.hidden = false));
        more.remove();
        list.querySelectorAll(".card")[3].setAttribute("tabindex", "-1");
        list.querySelectorAll(".card")[3].focus();
      });
      nodes.push(more);
    }
    if (D.meetings) nodes.push(meetings());
    if (!profile && opts && opts.banner) nodes.push(banner());
    nodes.push(choices([button(C.summary.startAgain, "btn-link", home)]));
    show(nodes);
  }

  // Real recovery meetings (NA, AA, CA), from data/meetings.js.
  function meetings() {
    const s = el("section", { class: "meetings", "aria-labelledby": "meetings-h" });
    s.appendChild(el("h2", { id: "meetings-h" }, C.services.meetingsHeading));
    s.appendChild(el("p", { class: "hint" }, fill(C.services.meetingsNote, { checked: D.meetingsChecked })));
    D.meetings.forEach((m) => {
      const card = el("div", { class: "card" });
      card.appendChild(el("h3", {}, m.name));
      card.appendChild(el("p", {}, m.when));
      card.appendChild(el("p", { class: "how" }, m.how));
      if (m.contact) card.appendChild(el("p", {}, m.contact));
      const link = el("a", { href: m.link, target: "_blank", rel: "noopener" }, m.linkText);
      const p = el("p", { class: "until" });
      p.appendChild(link);
      card.appendChild(p);
      s.appendChild(card);
    });
    return s;
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
    notGreat,               // "What would help right now?"
    ask,                    // "Send this to {trusted person}?" (falls back to a volunteer if there's nobody)
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
  backBtn.textContent = C.back;
  exit.addEventListener("click", () => window.location.replace("https://www.bbc.co.uk/weather"));

  // Start once every file has loaded, so other journeys can register first.
  window.addEventListener("DOMContentLoaded", home);
})();
