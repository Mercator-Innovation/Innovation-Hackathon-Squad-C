// The scheduled check-in (simulated): Gary picks a time, a pretend text arrives,
// and only if he doesn't reply are his trusted people told. Nothing is really sent.
//
// How it plugs in: in index.html it registers itself as StillHere.journeys.checkin
// (see the bottom of this file). On its own (checkin-preview.html), call
// window.Journeys.checkin.start(hooks) to show it in #screen.
// hooks (all optional) hand back to the main journey:
//   onNotGreat()     – he tapped "Not great"
//   onNeedSomeone()  – he tapped "I need someone"
//   onDone()         – he's finished here (back to the start screen)
(function () {
  // All the words for this journey. {name}, {time}, {who}, {wait} are filled in below.
  const WORDS = {
    setup: {
      heading: "Want us to check in on you tonight?",
      body: "We'll send you a text at a time you choose. You just reply to say how you are.",
      when: "When should we text you?",
      wait: "If you don't reply, how long should we wait?",
      waitOption: "{wait} minutes",
      who: "Who should we tell if you don't reply?",
      whoHint: "Only people who've agreed to be your trusted people are here.",
      whatWeSay: "We'll only tell them you didn't reply. Nothing else.",
      noOne: "Nobody. Just remind me again.",
      next: "Set up check-in",
      cancel: "Not tonight"
    },
    set: {
      heading: "Check-in set for {time}.",
      body: "We'll text you at {time}. If you don't reply within {wait} minutes, we'll text you once more. Then we'll tell {who}.",
      bodyNoOne: "We'll text you at {time}. If you don't reply within {wait} minutes, we'll text you once more. We won't tell anyone.",
      change: "Change it",
      off: "Turn off check-ins",
      demo: "Demo: skip to {time}"
    },
    text: {
      heading: "A text arrives on {name}'s phone",
      app: "Messages",
      from: "Still here",
      message: "Hi {name}, it's {time}. How are you right now? Reply 1 if you're OK, 2 if not great, 3 if you need someone. Or tap {link}",
      hint: "He can reply by text, which needs no data, or tap the link.",
      reply1: "Reply 1: I'm OK",
      reply2: "Reply 2: Not great",
      reply3: "Reply 3: I need someone",
      link: "Tap the link (needs data)",
      // The same question on a web page, if he taps the link (preview only; the main page uses its own).
      webHeading: "Hi {name}. How are you right now?",
      ok: "I'm OK",
      notGreat: "Not great",
      needSomeone: "I need someone",
      demoNoReply: "Demo: pretend they didn't reply"
    },
    okText: {
      message: "Thanks {name}. Glad you're OK. We'll text again tomorrow at {time}. If that changes tonight, reply 3 any time.",
      changed: "Reply 3: I need someone",
      done: "Done"
    },
    // He replied 3 ("I need someone"): the whole thing carries on by text.
    needText: {
      ask: "Want us to text your message to {people}? \"{message}\" Reply YES or NO.",
      yes: "Reply YES",
      no: "Reply NO",
      noSent: "OK, we haven't sent anything. Reply 3 any time. If your life may be at risk, call 999.",
      sentTo: "Sent to {who}. We'll text you when {who} replies.",
      tryNext: "{who} hasn't replied yet, so we've texted {next} too.",
      demoReplies: "Demo: {who} replies",
      demoNobody: "Demo: nobody picks up",
      calling: "{who} has seen your message and is calling you now.",
      nobody: "{people} haven't replied yet. {volunteer}, a volunteer supporter, is on until {until}. Reply 1 for {volunteer} to call you, 2 to keep trying {people}, or 3 to see what's open now.",
      nobodyOne: "{people} hasn't replied yet. {volunteer}, a volunteer supporter, is on until {until}. Reply 1 for {volunteer} to call you, 2 to keep trying {people}, or 3 to see what's open now.",
      noPeople: "{volunteer}, a volunteer supporter, is on until {until}. Reply 1 for {volunteer} to call you, or 3 to see what's open now.",
      pick1: "Reply 1: {volunteer} calls me",
      pick2: "Reply 2: keep trying",
      pick3: "Reply 3: what's open now",
      volunteerCalling: "{volunteer} will call you in the next few minutes. The number will show as Still here.",
      keepTrying: "OK, we'll keep trying {people} and text you when one replies. Reply 1 any time for {volunteer} to call you.",
      openNow: "Open now: {list}. If your life may be at risk, call 999.",
      noneOpen: "Nothing is open right now. Reply 1 for {volunteer} to call you. If your life may be at risk, call 999.",
      done: "Done"
    },
    nudge: {
      heading: "No reply after {wait} minutes",
      message: "Hi {name}, just checking you're OK. Reply 1, 2 or 3 when you can. Or tap {link}",
      demoNoReply: "Demo: still no reply"
    },
    ok: {
      heading: "Good. Glad you're OK.",
      body: "We'll check in again tomorrow at {time}. If that changes tonight, tap below.",
      changed: "Actually, I need someone",
      done: "Done"
    },
    told: {
      heading: "We've let {who} know.",
      body: "We told them you didn't reply to your {time} check-in. We didn't tell them anything else.",
      bodyNoOne: "You didn't reply, so we'll try again tomorrow at {time}. We haven't told anyone.",
      fine: "I'm fine, let them know",
      needSomeone: "I need someone",
      done: "Done"
    },
    fineSent: {
      heading: "We've told {who} you're OK.",
      body: "Thanks for letting us know.",
      done: "Done"
    },
    off: {
      heading: "Check-ins are off.",
      body: "You can turn them on again any time.",
      done: "Done"
    },
    handover: "This hands over to the main journey."
  };

  const TIMES = ["22:00", "23:00", "00:00", "01:00"];
  const WAITS = [15, 30];

  const D = window.DATA || {};
  const screen = document.getElementById("screen");
  let hooks = {};
  // Only in this page, nothing saved.
  let plan = { time: "23:00", wait: 15, tell: [] };
  // Texts so far tonight, for the pretend messages screen.
  let sent = [];
  // A made-up short link (.example is never a real website).
  const LINK = "stillhere.example/c/7Q2";

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

  function choices(buttons) {
    const div = el("div", { class: "choices" });
    buttons.forEach((b) => div.appendChild(b));
    return div;
  }

  // Show a screen and move focus to its heading, for keyboard and screen reader users.
  function show(nodes) {
    screen.innerHTML = "";
    nodes.forEach((n) => screen.appendChild(n));
    const h1 = screen.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus(); }
  }

  // "23:00" -> "11pm", "00:00" -> "midnight"
  function formatTime(t) {
    const [h, m] = t.split(":").map(Number);
    if (h === 0 && !m) return "midnight";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + (h < 12 ? "am" : "pm");
  }

  // Once signed up, use the person's own name and the trusted people who've agreed.
  function profile() { return window.StillHere && window.StillHere.getProfile(); }
  function name() {
    const p = profile();
    return (p && p.name) || (D.person && D.person.name) || "there";
  }
  function trusted() {
    const p = profile();
    const people = p ? p.trustedPeople.filter((t) => t.agreed !== false) : (D.trustedPeople || []);
    return people.map((t, i) => Object.assign({ id: t.id || "person-" + i, relationship: "" }, t));
  }
  function whoText() {
    const names = plan.tell.map((id) => trusted().find((p) => p.id === id).name);
    return names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names[0];
  }
  function vals() { return { name: name(), time: formatTime(plan.time), wait: plan.wait, who: whoText(), link: LINK }; }

  // A group of radio buttons or checkboxes with a proper label for each.
  function group(legend, hint, type, nameAttr, options) {
    const fs = el("fieldset", { class: "group" });
    fs.appendChild(el("legend", {}, legend));
    if (hint) fs.appendChild(el("p", { class: "hint" }, hint));
    options.forEach((o) => {
      const id = nameAttr + "-" + o.value;
      const row = el("div", { class: "option" });
      const input = el("input", { type, id, name: nameAttr, value: o.value });
      if (o.checked) input.checked = true;
      row.appendChild(input);
      row.appendChild(el("label", { for: id }, o.label));
      fs.appendChild(row);
    });
    return fs;
  }

  function handover(fn) {
    if (fn) return fn();
    show([el("h1", {}, WORDS.handover), choices([button(WORDS.ok.done, "btn-link", done)])]);
  }
  function done() { return hooks.onDone ? hooks.onDone() : setup(); }

  // 1. Set up: when, how long to wait, who to tell.
  function setup() {
    const W = WORDS.setup;
    const form = el("form", { class: "checkin-setup" });
    form.appendChild(group(W.when, "", "radio", "checkin-time",
      TIMES.map((t) => ({ value: t, label: formatTime(t), checked: t === plan.time }))));
    form.appendChild(group(W.wait, "", "radio", "checkin-wait",
      WAITS.map((w) => ({ value: String(w), label: fill(W.waitOption, { wait: w }), checked: w === plan.wait }))));
    form.appendChild(group(W.who, W.whoHint, "checkbox", "checkin-tell",
      trusted().map((p) => ({ value: p.id, label: p.relationship ? `${p.name} (${p.relationship.toLowerCase()})` : p.name, checked: plan.tell.includes(p.id) }))));
    form.appendChild(el("p", { class: "hint" }, W.whatWeSay));
    form.appendChild(choices([
      el("button", { type: "submit", class: "btn-primary" }, W.next),
      button(W.cancel, "btn-link", done)
    ]));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      plan.time = form.querySelector("[name=checkin-time]:checked").value;
      plan.wait = Number(form.querySelector("[name=checkin-wait]:checked").value);
      plan.tell = [...form.querySelectorAll("[name=checkin-tell]:checked")].map((i) => i.value);
      confirmSet();
    });
    show([el("h1", {}, W.heading), el("p", {}, W.body), form]);
  }

  // 2. Confirm what's been set.
  function confirmSet() {
    const W = WORDS.set;
    const v = vals();
    show([
      el("h1", {}, fill(W.heading, v)),
      el("p", {}, fill(plan.tell.length ? W.body : W.bodyNoOne, v)),
      choices([
        button(fill(W.demo, v), "btn-demo", checkinText),
        button(W.change, "btn-secondary", setup),
        button(W.off, "btn-link", turnOff)
      ])
    ]);
  }

  // 3. The check-in text arrives. This is where "Hi Gary" and "I'm OK" belong.
  // A pretend phone messages screen: texts from Still here on the left, Gary's replies on the right.
  function phone(messages) {
    const T = WORDS.text;
    const box = el("section", { class: "phone", "aria-label": T.app + ": " + T.from });
    box.appendChild(el("p", { class: "phone-top" }, T.app + " · " + T.from));
    messages.forEach((m) => box.appendChild(el("p", { class: "sms " + (m.mine ? "sms-mine" : "sms-theirs") }, m.text)));
    return box;
  }

  function smsReplies(next) {
    const T = WORDS.text;
    return choices([
      button(T.reply1, "btn-secondary", () => okByText()),
      button(T.reply2, "btn-secondary", () => handover(hooks.onNotGreat)),
      button(T.reply3, "btn-primary", () => needByText()),
      button(T.link, "btn-secondary", () => (hooks.onLink ? hooks.onLink() : webReply())),
      button(next.label, "btn-demo", next.go)
    ]);
  }

  function checkinText() {
    const T = WORDS.text;
    const v = vals();
    sent = [{ text: fill(T.message, v) }];
    show([
      el("h1", {}, fill(T.heading, v)),
      phone(sent),
      el("p", { class: "hint" }, T.hint),
      smsReplies({ label: T.demoNoReply, go: nudge })
    ]);
  }

  // 4. No reply: one gentle nudge before anyone is told.
  function nudge() {
    const W = WORDS.nudge;
    const T = WORDS.text;
    const v = vals();
    sent = sent.concat([{ text: fill(W.message, v) }]);
    show([
      el("h1", {}, fill(W.heading, v)),
      phone(sent),
      el("p", { class: "hint" }, T.hint),
      smsReplies({ label: W.demoNoReply, go: told })
    ]);
  }

  // He replied "1" by text: thank him, by text.
  function okByText() {
    const T = WORDS.text;
    const W = WORDS.okText;
    const v = vals();
    sent = sent.concat([{ text: "1", mine: true }, { text: fill(W.message, v) }]);
    show([
      el("h1", {}, fill(T.heading, v)),
      phone(sent),
      choices([
        button(W.changed, "btn-secondary", () => needByText()),
        button(W.done, "btn-link", done)
      ])
    ]);
  }

  // --- He replied 3: everything carries on by text, so it works with no data. ---

  function names(list) {
    return list.length > 1 ? list.slice(0, -1).join(", ") + " and " + list[list.length - 1] : (list[0] || "");
  }

  // Add texts to the conversation and show the reply buttons.
  function sms(newTexts, buttons) {
    sent = sent.concat(newTexts);
    show([el("h1", {}, fill(WORDS.text.heading, vals())), phone(sent), choices(buttons)]);
  }

  function message() {
    const p = profile();
    return (p && p.message) || (D.person && D.person.savedMessage) || "";
  }
  function volunteerVals() {
    const v = (D.volunteers || [])[0] || { name: "a volunteer", onUntil: "02:00" };
    const people = trusted().map((p) => p.name);
    return Object.assign(vals(), { volunteer: v.name, until: formatTime(v.onUntil), people: names(people), peopleCount: people.length });
  }

  // 1. Ask before sending anything.
  function needByText() {
    const W = WORDS.needText;
    const people = trusted().map((p) => p.name);
    if (people.length === 0) return nobodyPicksUp([{ text: "3", mine: true }]);
    sms([{ text: "3", mine: true }, { text: fill(W.ask, { people: names(people), message: message() }) }], [
      button(W.yes, "btn-primary", () => sendTo(0, [{ text: "YES", mine: true }])),
      button(W.no, "btn-secondary", () => sms([{ text: "NO", mine: true }, { text: W.noSent }], [button(W.done, "btn-link", done)]))
    ]);
  }

  // 2. Text one trusted person at a time, in Gary's order.
  function sendTo(i, before) {
    const W = WORDS.needText;
    const people = trusted();
    const who = people[i].name;
    const texts = before.concat([{ text: i === 0 ? fill(W.sentTo, { who }) : fill(W.tryNext, { who: people[i - 1].name, next: who }) }]);
    sms(texts, [
      button(fill(W.demoReplies, { who }), "btn-demo", () => sms([{ text: fill(W.calling, { who }) }], [button(W.done, "btn-link", done)])),
      button(W.demoNobody, "btn-demo", () => (i + 1 < people.length ? sendTo(i + 1, []) : nobodyPicksUp([])))
    ]);
  }

  // 3. Nobody picked up: offer the volunteer, keep trying, or services open now.
  function nobodyPicksUp(before) {
    const W = WORDS.needText;
    const v = volunteerVals();
    const offer = v.peopleCount === 0
      ? fill(W.noPeople, v)
      : fill(v.peopleCount > 1 ? W.nobody : W.nobodyOne, v);
    const buttons = [button(fill(W.pick1, v), "btn-primary", () => sms([{ text: "1", mine: true }, { text: fill(W.volunteerCalling, v) }], [button(W.done, "btn-link", done)]))];
    if (v.peopleCount > 0) buttons.push(button(W.pick2, "btn-secondary", () => sms([{ text: "2", mine: true }, { text: fill(W.keepTrying, v) }], [button(W.done, "btn-link", done)])));
    buttons.push(button(W.pick3, "btn-secondary", () => sms([{ text: "3", mine: true }, { text: openNowText(v) }], [button(W.done, "btn-link", done)])));
    sms(before.concat([{ text: offer }]), buttons);
  }

  // Services open at the demo's pretend time, as one short text.
  function openNowText(v) {
    const W = WORDS.needText;
    const now = D.demoNow;
    const mins = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    const open = (D.services || []).filter((s) =>
      now && s.days.includes(now.day) && mins(now.time) >= mins(s.opens) && mins(now.time) < mins(s.closes));
    if (open.length === 0) return fill(W.noneOpen, v);
    // Keep it short enough for one text, and skip anything that needs data.
    const byPhone = open.filter((s) => !/^Tap/i.test(s.how)).slice(0, 3);
    return fill(W.openNow, { list: byPhone.map((s) => `${s.name}, ${s.how}`).join("; ") });
  }

  // He tapped the link: the same question on a web page (preview only).
  function webReply() {
    const T = WORDS.text;
    show([
      el("h1", {}, fill(T.webHeading, vals())),
      choices([
        button(T.ok, "btn-secondary", ok),
        button(T.notGreat, "btn-secondary", () => handover(hooks.onNotGreat)),
        button(T.needSomeone, "btn-primary", () => handover(hooks.onNeedSomeone))
      ])
    ]);
  }

  function ok() {
    const W = WORDS.ok;
    show([
      el("h1", {}, W.heading),
      el("p", {}, fill(W.body, vals())),
      choices([
        button(W.changed, "btn-secondary", () => handover(hooks.onNeedSomeone)),
        button(W.done, "btn-link", done)
      ])
    ]);
  }

  // 5. Still no reply: tell his trusted people, and only that he didn't reply.
  function told() {
    const W = WORDS.told;
    const v = vals();
    const anyone = plan.tell.length > 0;
    const buttons = [];
    if (anyone) buttons.push(button(W.fine, "btn-secondary", fineSent));
    buttons.push(button(W.needSomeone, "btn-primary", () => handover(hooks.onNeedSomeone)));
    buttons.push(button(W.done, "btn-link", done));
    show([
      el("h1", {}, anyone ? fill(W.heading, v) : WORDS.nudge.heading),
      el("p", {}, fill(anyone ? W.body : W.bodyNoOne, v)),
      choices(buttons)
    ]);
  }

  function fineSent() {
    const W = WORDS.fineSent;
    show([el("h1", {}, fill(W.heading, vals())), el("p", {}, W.body), choices([button(W.done, "btn-link", done)])]);
  }

  function turnOff() {
    const W = WORDS.off;
    show([el("h1", {}, W.heading), el("p", {}, W.body), choices([button(W.done, "btn-link", done)])]);
  }

  // Styles for the set-up form, kept here so styles.css stays Spencer's.
  const css = el("style");
  css.textContent = `
    .checkin-setup .group { border: 0; padding: 0; margin: 0 0 20px; }
    .checkin-setup legend { font-weight: 700; margin-bottom: 8px; padding: 0; }
    .checkin-setup .option { display: flex; align-items: center; gap: 12px; margin: 0 0 8px; }
    .checkin-setup input { width: 24px; height: 24px; margin: 0; accent-color: var(--primary); }
    .checkin-setup input:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
    .checkin-setup label { flex: 1; padding: 6px 0; cursor: pointer; }
    .phone { background: #fff; border: 2px solid var(--border); border-radius: 24px; padding: 12px 14px 16px; margin: 8px 0 12px; }
    .phone-top { text-align: center; font-size: 0.9rem; color: var(--muted); font-weight: 600; margin: 0 0 12px; }
    .sms { max-width: 85%; padding: 10px 14px; border-radius: 18px; margin: 0 0 8px; font-size: 1rem; overflow-wrap: anywhere; }
    .sms-theirs { background: #e9e9eb; color: var(--text); border-bottom-left-radius: 4px; }
    .sms-mine { background: var(--primary); color: #fff; margin-left: auto; border-bottom-right-radius: 4px; width: fit-content; }`;
  document.head.appendChild(css);

  window.Journeys = window.Journeys || {};
  window.Journeys.checkin = {
    // Start at set-up.
    start(h) { hooks = h || {}; setup(); },
    // Jump straight to the text arriving (for a demo).
    arrive(h) { hooks = h || {}; checkinText(); }
  };

  // In the main page: register with Spencer's hooks (app.js).
  // "Not great" and "I need someone" hand back to the main journey.
  const S = window.StillHere;
  if (S) {
    S.journeys.checkin = () => window.Journeys.checkin.start({
      onNotGreat: S.notGreat || S.howAreYou,
      onNeedSomeone: S.ask || S.helpNow,
      onLink: S.howAreYou,
      onDone: S.home
    });
  }
})();
