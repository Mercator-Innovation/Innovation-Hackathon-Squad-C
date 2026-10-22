// A small line drawing above each screen's question, picked to match it.
// Decorative only (screen readers skip it). Kept in its own file so nobody else's files change:
// it watches the screen and adds the drawing as each screen appears.
(function () {
  const svg = (inner) =>
    `<svg class="mini-art" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  const ART = {
    moon: svg('<path d="M40 12a20 20 0 1 0 12 30A16 16 0 0 1 40 12z"/><path d="M14 14v6M11 17h6"/><path d="M50 52v4M48 54h4"/><circle cx="22" cy="46" r="1.5" fill="currentColor"/>'),
    call: svg('<rect x="18" y="8" width="24" height="44" rx="5"/><path d="M27 46h6"/><path d="M46 18c4 3 4 9 0 12"/><path d="M51 13c7 6 7 16 0 22"/>'),
    people: svg('<circle cx="22" cy="20" r="7"/><circle cx="42" cy="24" r="6"/><path d="M8 50c0-9 6-16 14-16s14 7 14 16"/><path d="M34 50c0-7 3-13 8-13s9 6 9 13"/>'),
    heart: svg('<path d="M32 52S10 39 10 24a11 11 0 0 1 22-3 11 11 0 0 1 22 3c0 15-22 28-22 28z"/>'),
    clock: svg('<circle cx="32" cy="34" r="20"/><path d="M32 22v12l8 6"/><path d="M20 8l-6 5M44 8l6 5"/>'),
    chat: svg('<path d="M10 14h36a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H26l-10 9v-9h-6a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z"/><path d="M18 28h.01M28 28h.01M38 28h.01" stroke-width="4"/>'),
    map: svg('<path d="M32 56s16-15 16-28a16 16 0 0 0-32 0c0 13 16 28 16 28z"/><circle cx="32" cy="28" r="6"/>'),
    shield: svg('<path d="M32 8l20 8v14c0 13-9 22-20 26C21 52 12 43 12 30V16z"/><path d="M24 32l6 6 11-12"/>')
  };

  // Which drawing suits which question (first match wins).
  const RULES = [
    [/check in|check-in|11pm/, "clock"],
    [/open now|meeting/, "map"],
    [/before you start|safety|training/, "shield"],
    [/alone|how are you|tonight/, "moon"],
    [/call|reach|sign up/, "call"],
    [/support|people|trust|who /, "people"],
    [/send|message|text/, "chat"]
  ];
  function pick(text) {
    const t = text.toLowerCase();
    const rule = RULES.find(([re]) => re.test(t));
    return rule ? rule[1] : "heart";
  }

  const screen = document.getElementById("screen");
  function addArt() {
    const h1 = screen.querySelector("h1");
    if (!h1 || h1.closest(".callout")) return;
    if (h1.querySelector(".mini-art")) return;
    // Inside the heading, not next to it, so the Back button doesn't see a new screen.
    h1.insertAdjacentHTML("afterbegin", ART[pick(h1.textContent)]);
  }
  new MutationObserver(addArt).observe(screen, { childList: true });  // whole screens only
  addArt();
})();
