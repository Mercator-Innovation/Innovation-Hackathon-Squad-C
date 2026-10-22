// Dark mode button in the header. Switches the Night colours in styles.css on and off.
// Starts dark if the phone is set to dark mode, and remembers the choice on this phone only.
(function () {
  const W = { dark: "Dark mode", light: "Light mode", key: "alex-theme" };
  const body = document.body;

  function saved() {
    try { return localStorage.getItem(W.key); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(W.key, v); } catch (e) { /* private browsing: just don't remember */ }
  }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const start = saved() || (prefersDark ? "night" : "day");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "theme-toggle";

  function apply(mode) {
    const night = mode === "night";
    body.classList.toggle("night", night);
    btn.setAttribute("aria-pressed", night ? "true" : "false");
    btn.textContent = night ? W.light : W.dark;
    // Phone browser bars match the page
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
    meta.content = getComputedStyle(body).getPropertyValue("--bg").trim();
  }

  btn.addEventListener("click", () => {
    const next = body.classList.contains("night") ? "day" : "night";
    save(next);
    apply(next);
  });

  // Put it next to the quick exit, which stays furthest right.
  const exit = document.getElementById("quick-exit");
  const group = document.createElement("span");
  group.className = "top-actions";
  exit.parentNode.insertBefore(group, exit);
  group.appendChild(btn);
  group.appendChild(exit);

  apply(start);

  const css = document.createElement("style");
  css.textContent = `
    .top-actions { display: flex; align-items: center; gap: 8px; }
    .theme-toggle { background: none; border: 0; color: var(--link); text-decoration: underline;
                    text-underline-offset: 3px; font-size: 1rem; padding: 8px 4px; min-height: 44px; }
    .night .logo { color: var(--link); }
    body { transition: background-color var(--dur-quick, 200ms) var(--ease-soft, ease-out); }
  `;
  document.head.appendChild(css);
})();
