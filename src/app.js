// Behaviour: which screen shows, and what happens when you tap.
(function () {
  const C = window.CONTENT;
  const D = window.DATA;
  const screen = document.getElementById("screen");

  // What's happened so far tonight (only in this page, nothing saved).
  let state = { told: [], next: "", contactIndex: 0 };

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

  function contact() { return D.trustedPeople[state.contactIndex]; }
  function volunteer() { return D.volunteers[0]; }

  // Step 4: who's been told and what happens next.
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

  // Step 1 and 2: how are you right now?
  function start() {
    state = { told: [], next: "", contactIndex: 0 };
    show([
      el("h1", {}, fill(C.start.heading, { name: D.person.name })),
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
      choices([button(C.ok.back, "btn-secondary", start)])
    ]);
  }

  function notGreat() {
    show([
      el("h1", {}, C.notGreat.heading),
      el("p", {}, C.notGreat.body),
      choices([
        button(C.notGreat.message, "btn-primary", ask),
        button(C.notGreat.services, "btn-secondary", services),
        button(C.notGreat.back, "btn-link", start)
      ])
    ]);
  }

  // Step 3: ask before sending anything.
  function ask() {
    const who = contact().name;
    show([
      el("h1", {}, fill(C.ask.heading, { who })),
      el("p", {}, C.ask.body),
      el("p", { class: "message" }, D.person.savedMessage),
      choices([
        button(C.ask.yes, "btn-primary", send),
        button(C.ask.other, "btn-secondary", () => {
          state.contactIndex = (state.contactIndex + 1) % D.trustedPeople.length;
          ask();
        }),
        button(C.ask.no, "btn-link", start)
      ])
    ]);
  }

  function send() {
    const p = contact();
    state.told.push(`${p.name} (${p.relationship.toLowerCase()}): your message`);
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
      choices([button(C.summary.startAgain, "btn-link", start)])
    ], true);
  }

  // If nobody replies: offer a volunteer supporter, then services.
  function noReply() {
    const v = volunteer();
    const vals = { who: contact().name, volunteer: v.name, until: formatTime(v.onUntil), about: v.about };
    state.next = fill(C.volunteer.question, vals);
    show([
      el("h1", {}, fill(C.volunteer.heading, vals)),
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
  function services() {
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
    nodes.push(choices([button(C.summary.startAgain, "btn-link", start)]));
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

  // Header and footer words, and the quick exit.
  document.getElementById("app-name").textContent = C.appName;
  document.getElementById("emergency").textContent = C.emergency;
  document.getElementById("demo-note").textContent = C.demoNote;
  const exit = document.getElementById("quick-exit");
  exit.textContent = C.quickExit;
  exit.addEventListener("click", () => window.location.replace("https://www.bbc.co.uk/weather"));

  start();
})();
