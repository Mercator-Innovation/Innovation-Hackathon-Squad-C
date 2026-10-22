// The person's optional sign-up: name, trusted people (who must agree), and their message.
// Every step can be skipped, and every step has a way straight to anonymous help.
// Words are here, not in content.js, so this journey doesn't clash with anyone else's.
(function () {
  const W = {
    escape: "Talk to someone now, no name needed",
    skip: "Skip",
    next: "Next",

    intro: {
      heading: "Set up Still here",
      body: "Best done when you're feeling OK. It takes about 2 minutes, and you can skip any step.",
      promise: "We never tell anyone anything without asking you first.",
      start: "Start",
      helped: "Someone's helping me set this up",
      notNow: "Not now"
    },

    helped: {
      heading: "Good to have help.",
      body: "You'll still be the one who says yes at each step. Nobody can set this up for you without you agreeing.",
      carryOn: "Carry on"
    },

    name: {
      heading: "What should we call you?",
      label: "Your name",
      hint: "Any name is fine. It doesn't have to be your real one.",
      madeUp: "Give me a made-up name"
    },

    people: {
      heading: "Who would you like to reach when you need someone?",
      body: "Pick people you trust. We'll ask them first, and they can say no.",
      nameLabel: "Their name",
      relationshipLabel: "Who they are to you",
      relationshipHint: "For example, sister or friend.",
      phoneLabel: "Their phone number",
      phoneHint: "Demo only: please don't type a real number.",
      nameError: "Enter their name, or skip this step",
      add: "Add this person",
      added: "You've added:",
      addAnother: "Add someone else",
      done: "That's everyone",
      max: "That's 3 people, which is plenty to start with."
    },

    message: {
      heading: "Write a message for later",
      body: "We'll only send it if you ask us to. You can change it any time.",
      label: "Your message",
      ready: "Hi, it's {name}. I'm not doing great. Can you call me?",
      use: "Use this message"
    },

    asking: {
      heading: "We've asked {who}.",
      body: "{who} will get a text asking if they're happy to be someone you can reach. We won't add them unless they say yes.",
      theySee: "What {who} sees:",
      text: "{name} would like you to be someone they can reach at night, using Still here. You can say no, and you can stop at any time. Reply YES or NO.",
      yes: "Demo: {who} says yes",
      no: "Demo: {who} says no",
      saidYes: "{who} said yes.",
      saidYesBody: "{who} is one of your people now.",
      saidNo: "{who} can't right now. That's OK.",
      saidNoBody: "You can ask someone else later, or a volunteer supporter can be there instead.",
      carryOn: "Carry on"
    },

    done: {
      heading: "You're set up, {name}.",
      headingNoName: "You're set up.",
      body: "When you open Still here, we'll ask how you are. You decide who's told, every time.",
      yourPeople: "Your people:",
      nobody: "Nobody yet. A volunteer supporter can be there for you instead.",
      go: "Go to Still here"
    }
  };

  // Word pairs for a made-up name: clearly not real, easy to remember.
  const FIRST = ["Blue", "Quiet", "Brave", "Kind", "Bright", "Calm", "Silver", "Gentle"];
  const SECOND = ["Fox", "River", "Heron", "Oak", "Star", "Harbour", "Otter", "Hill"];

  StillHere.journeys.signup = function () {
    const { show, el, button, choices, field, fill, home, helpNow, setProfile } = StillHere;

    // What the person has given us so far (only in this page, nothing saved).
    const draft = { name: "", trustedPeople: [], message: "", helped: false };

    function escape() { return button(W.escape, "btn-link", helpNow); }

    function madeUpName() {
      const pick = (list) => list[Math.floor(Math.random() * list.length)];
      return pick(FIRST) + " " + pick(SECOND);
    }

    function intro() {
      show([
        el("h1", {}, W.intro.heading),
        el("p", {}, W.intro.body),
        el("p", {}, W.intro.promise),
        choices([
          button(W.intro.start, "btn-primary", name),
          button(W.intro.helped, "btn-secondary", helped),
          escape(),
          button(W.intro.notNow, "btn-link", home)
        ])
      ]);
    }

    function helped() {
      draft.helped = true;
      show([
        el("h1", {}, W.helped.heading),
        el("p", {}, W.helped.body),
        choices([button(W.helped.carryOn, "btn-primary", name), escape()])
      ]);
    }

    function name() {
      const form = el("form", { novalidate: "" });
      form.appendChild(field("su-name", W.name.label, W.name.hint, "text", "nickname"));
      const input = form.querySelector("#su-name");
      input.value = draft.name;
      form.appendChild(choices([
        button(W.name.madeUp, "btn-secondary", () => { input.value = madeUpName(); input.focus(); }),
        el("button", { type: "submit", class: "btn-primary" }, W.next),
        button(W.skip, "btn-link", () => { draft.name = ""; people(); }),
        escape()
      ]));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        draft.name = input.value.trim();
        people();
      });
      show([el("h1", {}, W.name.heading), form]);
    }

    function people() {
      const nodes = [el("h1", {}, W.people.heading), el("p", {}, W.people.body)];

      if (draft.trustedPeople.length) {
        nodes.push(el("p", {}, W.people.added));
        const ul = el("ul");
        draft.trustedPeople.forEach((p) => ul.appendChild(el("li", {}, p.relationship ? `${p.name} (${p.relationship})` : p.name)));
        nodes.push(ul);
      }

      if (draft.trustedPeople.length >= 3) {
        nodes.push(el("p", {}, W.people.max));
        nodes.push(choices([button(W.people.done, "btn-primary", message), escape()]));
        return show(nodes);
      }

      const form = el("form", { novalidate: "" });
      const nameField = field("su-p-name", W.people.nameLabel, "", "text", "off");
      const error = el("p", { class: "error", id: "su-p-name-error", hidden: "" }, W.people.nameError);
      nameField.insertBefore(error, nameField.querySelector("input"));
      form.appendChild(nameField);
      form.appendChild(field("su-p-rel", W.people.relationshipLabel, W.people.relationshipHint, "text", "off"));
      form.appendChild(field("su-p-phone", W.people.phoneLabel, W.people.phoneHint, "tel", "off"));

      const buttons = [el("button", { type: "submit", class: "btn-primary" }, draft.trustedPeople.length ? W.people.addAnother : W.people.add)];
      if (draft.trustedPeople.length) buttons.push(button(W.people.done, "btn-secondary", message));
      else buttons.push(button(W.skip, "btn-link", message));
      buttons.push(escape());
      form.appendChild(choices(buttons));

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = form.querySelector("#su-p-name");
        if (!nameInput.value.trim()) {
          error.hidden = false;
          nameInput.setAttribute("aria-invalid", "true");
          nameInput.setAttribute("aria-describedby", "su-p-name-error");
          nameInput.focus();
          return;
        }
        draft.trustedPeople.push({
          name: nameInput.value.trim(),
          relationship: form.querySelector("#su-p-rel").value.trim(),
          agreed: null
        });
        people();
      });

      nodes.push(form);
      show(nodes);
    }

    function message() {
      const form = el("form", { novalidate: "" });
      const wrap = el("div", { class: "field" });
      wrap.appendChild(el("label", { for: "su-message" }, W.message.label));
      const box = el("textarea", { id: "su-message", rows: "4", style: "width:100%;font:inherit;padding:12px;border:2px solid var(--text);border-radius:8px;background:var(--card);color:var(--text);" });
      box.value = draft.message || fill(W.message.ready, { name: draft.name || "me" });
      wrap.appendChild(box);
      form.appendChild(wrap);
      form.appendChild(choices([
        el("button", { type: "submit", class: "btn-primary" }, W.message.use),
        button(W.skip, "btn-link", () => { draft.message = ""; asking(); }),
        escape()
      ]));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        draft.message = box.value.trim();
        asking();
      });
      show([el("h1", {}, W.message.heading), el("p", {}, W.message.body), form]);
    }

    // Each trusted person says yes or no. Nobody is added without agreeing.
    function asking() {
      const p = draft.trustedPeople.find((x) => x.agreed === null);
      if (!p) return done();
      const vals = { who: p.name, name: draft.name || "Someone you know" };
      show([
        el("h1", {}, fill(W.asking.heading, vals)),
        el("p", {}, fill(W.asking.body, vals)),
        el("p", {}, fill(W.asking.theySee, vals)),
        el("p", { class: "message" }, fill(W.asking.text, vals)),
        choices([
          button(fill(W.asking.yes, vals), "btn-demo", () => answer(p, true)),
          button(fill(W.asking.no, vals), "btn-demo", () => answer(p, false))
        ])
      ]);
    }

    function answer(p, yes) {
      p.agreed = yes;
      const vals = { who: p.name };
      show([
        el("h1", {}, fill(yes ? W.asking.saidYes : W.asking.saidNo, vals)),
        el("p", {}, fill(yes ? W.asking.saidYesBody : W.asking.saidNoBody, vals)),
        choices([button(W.asking.carryOn, "btn-primary", asking), escape()])
      ]);
    }

    function done() {
      const agreed = draft.trustedPeople.filter((p) => p.agreed);
      const profile = {
        name: draft.name || "there",
        message: draft.message || fill(W.message.ready, { name: draft.name || "me" }),
        trustedPeople: agreed.map((p) => ({ name: p.name, relationship: p.relationship, agreed: true }))
      };
      const nodes = [
        el("h1", {}, draft.name ? fill(W.done.heading, { name: draft.name }) : W.done.headingNoName),
        el("p", {}, W.done.body),
        el("h2", {}, W.done.yourPeople)
      ];
      if (agreed.length) {
        const ul = el("ul");
        agreed.forEach((p) => ul.appendChild(el("li", {}, p.relationship ? `${p.name} (${p.relationship})` : p.name)));
        nodes.push(ul);
      } else {
        nodes.push(el("p", {}, W.done.nobody));
      }
      nodes.push(choices([button(W.done.go, "btn-primary", () => { setProfile(profile); home(); })]));
      show(nodes);
    }

    intro();
  };
})();
