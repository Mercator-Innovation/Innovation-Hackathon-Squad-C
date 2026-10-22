// The pretend phone: call Still here and press numbers, or text it and get replies.
// Uses the same made-up volunteers, services and meetings as the web app (data/).
// Nothing is really called or sent.
(function () {
  const D = window.DATA;
  const $ = (id) => document.getElementById(id);

  // ---------- Shared: who's on, what's open (same rules as the web app)
  function toMinutes(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
  function formatTime(t) {
    let [h, m] = t.split(":").map(Number);
    h = h % 24;
    if (h === 0 && !m) return "midnight";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + (h < 12 ? "am" : "pm");
  }
  const now = toMinutes(D.demoNow.time);
  function isOn(from, until) {
    const f = toMinutes(from);
    let u = toMinutes(until);
    if (u <= f) u += 1440;
    return (now >= f && now < u) || (now + 1440 >= f && now + 1440 < u);
  }
  const volunteer = D.volunteers.find((v) => isOn(v.onFrom || "18:00", v.onUntil));
  const openNow = D.services
    .filter((s) => s.days.includes(D.demoNow.day) && now >= toMinutes(s.opens) && now < toMinutes(s.closes))
    .sort((a, b) => (a.miles || 0) - (b.miles || 0))
    .slice(0, 3);
  const until = (s) => (s.opens === "00:00" && s.closes === "24:00" ? "open 24 hours" : "open until " + formatTime(s.closes));
  const meetings = (D.meetings || []).slice(0, 3);
  $("clock").textContent = D.demoNow.time;

  // ---------- Tabs
  function tab(which) {
    $("tab-call").setAttribute("aria-pressed", which === "call");
    $("tab-text").setAttribute("aria-pressed", which === "text");
    $("panel-call").hidden = which !== "call";
    $("panel-text").hidden = which !== "text";
  }
  $("tab-call").addEventListener("click", () => tab("call"));
  $("tab-text").addEventListener("click", () => tab("text"));

  // ---------- Call: a phone menu (press 1, 2, 3)
  const vName = volunteer ? volunteer.name : null;
  const MENUS = {
    main: () => "Hello, this is Still here. You don't need to give your name. " +
      (vName ? "Press 1 to talk to a volunteer supporter. " : "") +
      "Press 2 to hear what's open now. Press 3 for recovery meetings tonight. Press 9 to hear this again. " +
      "If someone's life may be at risk, hang up and call 999.",
    1: () => vName
      ? `${vName} is a volunteer supporter, on until ${formatTime(volunteer.onUntil)}. Press 1 to be put through now. Press 2 for ${vName} to call you back on this number. Press 0 for the main menu.`
      : "There's no volunteer supporter on right now. Press 2 to hear what's open now, or 0 for the main menu.",
    "1-1": () => `Putting you through to ${vName}. Please hold. You're not on your own.`,
    "1-2": () => `${vName} will call you back on this number in the next few minutes. Your number is only used for this call. You can hang up now.`,
    2: () => "Open now, nearest first. " +
      openNow.map((s, i) => `${i + 1}: ${s.name.replace(" (example)", "")}. ${s.where || ""}. ${until(s).replace(/^o/, "O")}.`).join(" ") +
      " Press 1 to get these by text. Press 0 for the main menu.",
    "2-1": () => "We've sent you a text with these details. It's free. Press 0 for the main menu, or hang up.",
    3: () => "Recovery meetings tonight. " +
      meetings.map((m) => `${m.name}. ${m.when}`).join(" ") +
      " Press 1 to get the details by text. Press 0 for the main menu.",
    "3-1": () => "We've sent you a text with the meeting details. Press 0 for the main menu, or hang up."
  };
  let menu = null; // null = not in a call
  let speakOn = true; // speak out loud by default, like a real call

  // A calm British voice if the computer has one.
  function voice() {
    const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    return vs.find((v) => /en-GB/i.test(v.lang) && /female|serena|kate|martha|libby|sonia/i.test(v.name)) ||
      vs.find((v) => /en-GB/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || null;
  }

  function say(key) {
    menu = key;
    const text = MENUS[key]();
    $("caption-label").textContent = "Still here says:";
    $("caption").textContent = text;
    if (speakOn && window.speechSynthesis) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = voice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      u.rate = 0.95;
      speechSynthesis.speak(u);
    }
  }

  function press(key) {
    if (menu === null) return;
    if (key === "0") return say("main");
    if (key === "9") return say(menu);
    if (menu === "main" && ["1", "2", "3"].includes(key)) return say(key);
    if (menu === "1" && vName && (key === "1" || key === "2")) return say("1-" + key);
    if ((menu === "2" || menu === "3") && key === "1") return say(menu + "-1");
    $("caption").textContent = "Sorry, that's not an option. " + MENUS[menu]();
  }

  const KEYS = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
    ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]];
  KEYS.forEach(([k, letters]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", k);
    b.innerHTML = k + "<small>" + (letters || "&nbsp;") + "</small>";
    b.addEventListener("click", () => press(k));
    $("keypad").appendChild(b);
  });
  document.addEventListener("keydown", (e) => {
    if ($("panel-call").hidden || e.target.tagName === "INPUT") return;
    if (/^[0-9*#]$/.test(e.key)) press(e.key);
  });

  $("call").addEventListener("click", () => {
    $("call").hidden = true;
    $("hang").hidden = false;
    $("caption-label").textContent = "Connecting…";
    $("caption").textContent = "Free call. No data needed.";
    setTimeout(() => say("main"), 700);
    $("hang").focus();
  });
  $("hang").addEventListener("click", () => {
    menu = null;
    if (window.speechSynthesis) speechSynthesis.cancel();
    $("hang").hidden = true;
    $("call").hidden = false;
    $("caption-label").textContent = "Call ended";
    $("caption").textContent = "Press Call to ring again. It's free.";
    $("call").focus();
  });
  $("speak").addEventListener("click", () => {
    speakOn = !speakOn;
    $("speak").setAttribute("aria-pressed", speakOn);
    $("speak").textContent = "Sound: " + (speakOn ? "on" : "off");
    if (!speakOn && window.speechSynthesis) speechSynthesis.cancel();
    else if (menu) say(menu);
  });

  // ---------- Text: reply with a word, get a text back
  const HELP = "Still here. Free, no data needed. Reply:\n" +
    (vName ? "CALL for a volunteer to ring you\n" : "") +
    "OPEN for what's open now\nMEET for recovery meetings tonight\nSTOP to stop texts\n\nIf someone's life may be at risk, call 999.";
  let callBooked = false;

  function reply(word) {
    switch (word) {
      case "CALL":
        if (!vName) return "There's no volunteer supporter on right now. Reply OPEN for what's open now.";
        callBooked = true;
        return `${vName} (volunteer supporter, on until ${formatTime(volunteer.onUntil)}) will call you on this number in the next few minutes.\n\nReply CANCEL if you've changed your mind.`;
      case "CANCEL":
        if (!callBooked) return "There's nothing to cancel. Reply HELP for options.";
        callBooked = false;
        return `OK, ${vName} won't call. Text CALL any time.`;
      case "OPEN":
        return "Open now, nearest first:\n\n" +
          openNow.map((s) => `${s.name.replace(" (example)", "")}\n${s.how}\n${s.where || ""}, ${until(s)}`).join("\n\n");
      case "MEET":
        return "Recovery meetings tonight:\n\n" + meetings.map((m) => `${m.name}\n${m.when}\n${m.how}`).join("\n\n");
      case "STOP":
        return "You won't get any more texts from us. Text HELP any time to start again.";
      case "HELP": case "HI": case "HELLO":
        return HELP;
      default:
        return "Sorry, I didn't get that. " + HELP;
    }
  }

  function bubble(text, who) {
    const m = document.createElement("p");
    m.className = "msg " + who;
    m.textContent = text;
    $("thread").appendChild(m);
    $("thread").scrollTop = $("thread").scrollHeight;
  }

  function send(text) {
    text = text.trim();
    if (!text) return;
    bubble(text, "out");
    const word = text.toUpperCase().replace(/[^A-Z]/g, "");
    setTimeout(() => bubble(reply(word), "in"), 600);
  }

  ["HELP", "CALL", "OPEN", "MEET", "CANCEL", "STOP"].forEach((w) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = w;
    b.addEventListener("click", () => send(w));
    $("chips").appendChild(b);
  });
  $("sms").addEventListener("submit", (e) => {
    e.preventDefault();
    send($("sms-input").value);
    $("sms-input").value = "";
  });
  bubble("Text HELP to 00000 (example) to start. Free, and works with no data.", "in");
})();
