// Sign-up for supporters: family or friends supporting their own person, or volunteers for anyone.
// Consent comes first. Nobody is anyone's supporter until both people have said yes.
// Vetting and training are shown as a step, not built. Nothing is saved or sent.
// Words are here, not in content.js, so this journey doesn't clash with anyone else's.
// Plan: sketches/supporter-journey.md
(function () {
  const W = {
    next: "Continue",

    who: {
      heading: "Who do you want to support?",
      body: "Supporters are there for someone at night, when most services are closed.",
      family: "Someone I know",
      volunteer: "Anyone who needs someone"
    },

    how: {
      heading: "How did you hear about this?",
      invited: "{person} asked me to be their supporter",
      offer: "I'd like to offer to support someone"
    },

    consent: {
      heading: "Before you start",
      familyBody: "If {person} is having a hard night, they might send you a text asking you to call.",
      volunteerBody: "You choose the nights you're on. If someone needs a person to talk to, we'll text you to ask if you can call.",
      okToMiss: "It's OK if you can't answer. We'll offer them someone else.",
      stop: "You can stop at any time.",
      vetting: "Before you can support anyone, you'll do safety checks and training.",
      agree: "I understand",
      notNow: "Not now"
    },

    notNow: {
      heading: "That's fine.",
      body: "You can come back any time. Nothing has been saved.",
      home: "Back to start"
    },

    about: {
      heading: "About you",
      nameLabel: "Your first name",
      nameHint: "So they know who you are",
      nameError: "Enter your first name",
      phoneLabel: "Your phone number",
      phoneHint: "So we can text you if someone needs you. For the demo, use a made-up number like 07700 900123",
      phoneError: "Enter a phone number, like 07700 900123"
    },

    invite: {
      heading: "{person} has asked you to be their supporter",
      body: "This is the text you got:",
      text: "{person} would like you to be someone they can reach at night, using Alex, a free night-time support service. You can say no, and you can stop at any time.",
      question: "Would you like to be {person}'s supporter?",
      yes: "Yes, I'll be their supporter",
      no: "No, not right now"
    },

    offer: {
      heading: "Who would you like to support?",
      label: "Their first name",
      hint: "We'll ask them first. They need to say yes.",
      error: "Enter their first name"
    },

    waiting: {
      heading: "We've asked {person}",
      body: "{person} needs to say yes before you're their supporter. We'll text you when they reply.",
      yes: "Demo: {person} said yes",
      no: "Demo: {person} said no"
    },

    saidNo: {
      heading: "{person} isn't ready right now",
      body: "That's their choice, and it's not about you. Nothing about {person} has been saved.",
      youDeclined: "That's OK. We've let {person} know, kindly. Nothing has been saved."
    },

    families: {
      heading: "Support for you",
      body: "Supporting someone who uses drugs or alcohol can be hard. You don't have to do it alone.",
      org: "Scottish Families Affected by Alcohol and Drugs has a helpline and web chat for families and friends."
    },

    nights: {
      heading: "When could you be on?",
      legend: "Nights",
      hint: "Pick any that suit you. You can change this later.",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      error: "Pick at least one night",
      fromLabel: "From",
      untilLabel: "Until",
      from: ["7pm", "8pm", "9pm", "10pm", "11pm"],
      until: ["11pm", "Midnight", "1am", "2am", "3am"]
    },

    vetting: {
      heading: "Safety checks and training",
      body: "Before you're on, we'd check you're safe to support people, and give you training for hard calls.",
      notBuilt: "Not built in this demo.",
      next: "Continue"
    },

    preview: {
      heading: "What you'll see when someone needs you",
      familyBody: "A text like this:",
      familyText: "{person}: I'm not doing great tonight. Can you call me?",
      volunteerBody: "A text like this:",
      volunteerText: "Alex: someone needs a person to talk to. Are you free to call?",
      callNow: "I'll call now",
      cant: "I can't right now",
      okToMiss: "If you can't answer, that's OK. We'll offer them a volunteer, then services open now."
    },

    done: {
      heading: "You're all set",
      familyBody: "You're {person}'s supporter.",
      volunteerBody: "You're a volunteer supporter, on {nights}, {from} to {until}.",
      youGave: "What you gave us",
      change: "Change something",
      stop: "Stop being a supporter",
      delete: "Delete my details"
    },

    stopped: {
      heading: "Thanks for being there.",
      body: "You're no longer a supporter. You can come back any time.",
      deleted: "Your details have been deleted."
    }
  };

  StillHere.journeys.supporter = function () {
    const { show, el, button, choices, field, fill, home } = StillHere;

    // What the supporter has told us so far (only in this page, nothing saved).
    const draft = { type: "", invited: false, name: "", phone: "", person: "", nights: [], from: "9pm", until: "2am" };
    const invitedBy = (window.DATA && DATA.person && DATA.person.name) || "Gary";

    const p = () => ({ person: draft.person || invitedBy });

    // An error message above an input, linked to it for screen readers.
    function showError(form, inputId, errorEl) {
      const input = form.querySelector("#" + inputId);
      errorEl.hidden = false;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", errorEl.id);
      input.focus();
    }
    function errorFor(fieldWrap, id, text) {
      const e = el("p", { class: "error", id: id + "-error", hidden: "" }, text);
      fieldWrap.insertBefore(e, fieldWrap.querySelector("input"));
      return e;
    }

    // 1. Who do you want to support?
    function who() {
      show([
        el("h1", {}, W.who.heading),
        el("p", {}, W.who.body),
        choices([
          button(W.who.family, "btn-secondary", () => { draft.type = "family"; how(); }),
          button(W.who.volunteer, "btn-secondary", () => { draft.type = "volunteer"; draft.person = ""; consent(); })
        ])
      ]);
    }

    // Family: were they invited, or are they offering?
    function how() {
      show([
        el("h1", {}, W.how.heading),
        choices([
          button(fill(W.how.invited, { person: invitedBy }), "btn-secondary", () => { draft.invited = true; draft.person = invitedBy; consent(); }),
          button(W.how.offer, "btn-secondary", () => { draft.invited = false; draft.person = ""; consent(); })
        ])
      ]);
    }

    // 2. Consent first
    function consent() {
      const nodes = [el("h1", {}, W.consent.heading)];
      if (draft.type === "family") {
        nodes.push(el("p", {}, fill(W.consent.familyBody, { person: draft.person || "the person you support" })));
      } else {
        nodes.push(el("p", {}, W.consent.volunteerBody));
        nodes.push(el("p", {}, W.consent.vetting));
      }
      nodes.push(el("p", {}, W.consent.okToMiss));
      nodes.push(el("p", {}, W.consent.stop));
      nodes.push(choices([
        button(W.consent.agree, "btn-primary", about),
        button(W.consent.notNow, "btn-secondary", notNow)
      ]));
      show(nodes);
    }

    function notNow() {
      show([
        el("h1", {}, W.notNow.heading),
        el("p", {}, W.notNow.body),
        choices([button(W.notNow.home, "btn-primary", home)])
      ]);
    }

    // 3. About you: first name and phone number
    function about() {
      const form = el("form", { novalidate: "" });
      const nameWrap = field("sp-name", W.about.nameLabel, W.about.nameHint, "text", "given-name");
      const nameErr = errorFor(nameWrap, "sp-name", W.about.nameError);
      const phoneWrap = field("sp-phone", W.about.phoneLabel, W.about.phoneHint, "tel", "tel");
      const phoneErr = errorFor(phoneWrap, "sp-phone", W.about.phoneError);
      form.appendChild(nameWrap);
      form.appendChild(phoneWrap);
      form.querySelector("#sp-name").value = draft.name;
      form.querySelector("#sp-phone").value = draft.phone;
      form.appendChild(choices([
        el("button", { type: "submit", class: "btn-primary" }, W.next)
      ]));

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.querySelector("#sp-name").value.trim();
        const phone = form.querySelector("#sp-phone").value.trim();
        nameErr.hidden = true; phoneErr.hidden = true;
        form.querySelectorAll("input").forEach((i) => i.removeAttribute("aria-invalid"));
        if (!name) return showError(form, "sp-name", nameErr);
        const digits = phone.replace(/[\s()+-]/g, "");
        if (!/^\d{10,13}$/.test(digits)) return showError(form, "sp-phone", phoneErr);
        draft.name = name;
        draft.phone = phone;
        if (draft.type === "volunteer") nights();
        else if (draft.invited) invite();
        else offer();
      });

      show([el("h1", {}, W.about.heading), form]);
    }

    // 4a. Family, invited: say yes or no to the person's invitation
    function invite() {
      show([
        el("h1", {}, fill(W.invite.heading, p())),
        el("p", {}, W.invite.body),
        el("p", { class: "message" }, fill(W.invite.text, p())),
        el("h2", {}, fill(W.invite.question, p())),
        choices([
          button(W.invite.yes, "btn-primary", previewScreen),
          button(W.invite.no, "btn-secondary", () => saidNo(true))
        ])
      ]);
    }

    // 4b. Family, offering: who, then wait for them to say yes
    function offer() {
      const form = el("form", { novalidate: "" });
      const wrap = field("sp-person", W.offer.label, W.offer.hint, "text", "off");
      const err = errorFor(wrap, "sp-person", W.offer.error);
      form.appendChild(wrap);
      form.querySelector("#sp-person").value = draft.person;
      form.appendChild(choices([
        el("button", { type: "submit", class: "btn-primary" }, W.next)
      ]));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = form.querySelector("#sp-person").value.trim();
        if (!v) return showError(form, "sp-person", err);
        draft.person = v;
        waiting();
      });
      show([el("h1", {}, W.offer.heading), form]);
    }

    function waiting() {
      show([
        el("h1", {}, fill(W.waiting.heading, p())),
        el("p", {}, fill(W.waiting.body, p())),
        choices([
          button(fill(W.waiting.yes, p()), "btn-demo", previewScreen),
          button(fill(W.waiting.no, p()), "btn-demo", () => saidNo(false))
        ])
      ]);
    }

    // Either side said no: kind words, nothing saved, support for families
    function saidNo(youDeclined) {
      show([
        el("h1", {}, youDeclined ? W.notNow.heading : fill(W.saidNo.heading, p())),
        el("p", {}, fill(youDeclined ? W.saidNo.youDeclined : W.saidNo.body, p())),
        el("h2", {}, W.families.heading),
        el("p", {}, W.families.body),
        el("p", {}, W.families.org),
        choices([button(W.notNow.home, "btn-primary", home)])
      ]);
    }

    // 4. Volunteer: which nights and times
    function nights() {
      const form = el("form", { novalidate: "" });
      const fs = el("fieldset", { "aria-describedby": "sp-nights-hint" });
      fs.appendChild(el("legend", {}, W.nights.legend));
      fs.appendChild(el("p", { class: "hint", id: "sp-nights-hint" }, W.nights.hint));
      const err = el("p", { class: "error", id: "sp-nights-error", hidden: "" }, W.nights.error);
      fs.appendChild(err);
      W.nights.days.forEach((d, i) => {
        const row = el("div", { class: "check" });
        const box = el("input", { type: "checkbox", id: "sp-night-" + i, value: d });
        if (draft.nights.includes(d)) box.checked = true;
        row.appendChild(box);
        row.appendChild(el("label", { for: "sp-night-" + i }, d));
        fs.appendChild(row);
      });
      form.appendChild(fs);

      function select(id, label, options, current) {
        const wrap = el("div", { class: "field" });
        wrap.appendChild(el("label", { for: id }, label));
        const s = el("select", { id });
        options.forEach((o) => { const opt = el("option", { value: o }, o); if (o === current) opt.selected = true; s.appendChild(opt); });
        wrap.appendChild(s);
        return wrap;
      }
      form.appendChild(select("sp-from", W.nights.fromLabel, W.nights.from, draft.from));
      form.appendChild(select("sp-until", W.nights.untilLabel, W.nights.until, draft.until));
      form.appendChild(choices([
        el("button", { type: "submit", class: "btn-primary" }, W.next)
      ]));

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const picked = [...form.querySelectorAll("input[type=checkbox]:checked")].map((b) => b.value);
        if (!picked.length) {
          err.hidden = false;
          fs.setAttribute("aria-describedby", "sp-nights-error sp-nights-hint");
          form.querySelector("#sp-night-0").focus();
          return;
        }
        draft.nights = picked;
        draft.from = form.querySelector("#sp-from").value;
        draft.until = form.querySelector("#sp-until").value;
        vetting();
      });

      show([el("h1", {}, W.nights.heading), form]);
    }

    // 5. Volunteer: vetting and training, shown but not built
    function vetting() {
      show([
        el("h1", {}, W.vetting.heading),
        el("p", {}, W.vetting.body),
        el("p", { class: "hint" }, W.vetting.notBuilt),
        choices([button(W.vetting.next, "btn-primary", previewScreen)])
      ]);
    }

    // 6. What you'll see when someone needs you
    function previewScreen() {
      const family = draft.type === "family";
      show([
        el("h1", {}, W.preview.heading),
        el("p", {}, family ? W.preview.familyBody : W.preview.volunteerBody),
        el("p", { class: "message" }, family ? fill(W.preview.familyText, p()) : W.preview.volunteerText),
        el("p", { class: "hint" }, W.preview.callNow + "  ·  " + W.preview.cant),
        el("p", {}, W.preview.okToMiss),
        choices([button(W.next, "btn-primary", done)])
      ]);
    }

    // 7. All set: summary, change, stop, delete
    function done() {
      const family = draft.type === "family";
      const ul = el("ul");
      ul.appendChild(el("li", {}, "Name: " + draft.name));
      ul.appendChild(el("li", {}, "Phone: " + draft.phone));
      if (!family) ul.appendChild(el("li", {}, "Nights: " + draft.nights.join(", ")));
      show([
        el("h1", {}, W.done.heading),
        el("p", {}, family
          ? fill(W.done.familyBody, p())
          : fill(W.done.volunteerBody, { nights: draft.nights.join(", "), from: draft.from, until: draft.until })),
        el("h2", {}, W.done.youGave),
        ul,
        choices([
          button(W.done.change, "btn-secondary", who),
          button(W.done.stop, "btn-secondary", () => stopped(false)),
          button(W.done.delete, "btn-link", () => stopped(true))
        ])
      ]);
    }

    function stopped(deleted) {
      show([
        el("h1", {}, W.stopped.heading),
        el("p", {}, W.stopped.body),
        deleted ? el("p", {}, W.stopped.deleted) : el("p", {}, ""),
        choices([button(W.notNow.home, "btn-primary", home)])
      ]);
    }

    who();
  };

  // Styles for checkboxes and selects, kept here so styles.css stays Spencer's.
  const css = document.createElement("style");
  css.textContent = `
    fieldset { border: 0; padding: 0; margin: 20px 0; }
    legend { font-weight: 700; padding: 0; margin-bottom: 4px; }
    .check { display: flex; align-items: center; gap: 12px; min-height: 44px; }
    .check input { width: 24px; height: 24px; margin: 0; accent-color: var(--primary); }
    .check label { flex: 1; padding: 8px 0; }
    select { width: 100%; font: inherit; padding: 12px; border: 2px solid var(--text); border-radius: 8px; background: var(--card); color: var(--text); }
    select:focus-visible, .check input:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
  `;
  document.head.appendChild(css);
})();
