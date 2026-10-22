// Icons on the main buttons. Kept in its own file so nobody else's files change:
// it watches the screen and adds an icon to any button whose words match below.
// Icons are from Tabler Icons (MIT licence, tabler.io/icons), drawn in the button's own colour.
(function () {
  const C = window.CONTENT;

  const ICONS = {
    "lifebuoy": ["M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "M15 15l3.35 3.35", "M9 15l-3.35 3.35", "M5.65 5.65l3.35 3.35", "M18.35 5.65l-3.35 3.35"],
    "heart": ["M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"],
    "heart-handshake": ["M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572", "M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25", "M12.5 15.5l2 2", "M15 13l2 2"],
    "users-plus": ["M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901", "M16 3.13a4 4 0 0 1 0 7.75", "M16 19h6", "M19 16v6"],
    "friends": ["M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5", "M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4"],
    "send": ["M10 14l11 -11", "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"],
    "phone-call": ["M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2", "M15 7a2 2 0 0 1 2 2", "M15 3a6 6 0 0 1 6 6"],
    "clock": ["M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "M12 7v5l3 3"]
  };

  // Which button gets which icon. Words with {placeholders} match any name or time.
  const RULES = [
    [C.welcome.helpNow, "lifebuoy"],
    [C.welcome.setUp, "users-plus"],
    [C.welcome.support, "heart"],
    [C.choose.send, "send"],
    [C.choose.volunteer, "phone-call"],
    [C.choose.services, "clock"]
  ].filter(([words]) => words).map(([words, icon]) => {
    const pattern = words.split(/\{\w+\}/).map((part) => part.replace(/[.*+?^$()|[\]\\]/g, "\\$&")).join(".*");
    return [new RegExp("^" + pattern + "$"), icon];
  });

  function svg(name) {
    const ns = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(ns, "svg");
    s.setAttribute("class", "icon");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    ICONS[name].forEach((d) => {
      const p = document.createElementNS(ns, "path");
      p.setAttribute("d", d);
      s.appendChild(p);
    });
    return s;
  }

  function decorate() {
    document.querySelectorAll("#screen button:not(.has-icon)").forEach((b) => {
      const words = (b.querySelector(".label") || b).textContent.trim();
      const rule = RULES.find(([re]) => re.test(words));
      if (!rule) return;
      b.classList.add("has-icon");
      b.insertBefore(svg(rule[1]), b.firstChild);
    });
  }

  const css = document.createElement("style");
  css.textContent = `
    .has-icon { display: flex; align-items: center; gap: 12px; text-align: left; }
    .has-icon.described { display: grid; grid-template-columns: auto 1fr; column-gap: 14px; row-gap: 4px; }
    .has-icon.described .icon { grid-row: 1 / span 2; }
    .has-icon.described .label, .has-icon.described .desc { grid-column: 2; }
    .has-icon .icon { width: 26px; height: 26px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `;
  document.head.appendChild(css);

  const screen = document.getElementById("screen");
  new MutationObserver(decorate).observe(screen, { childList: true, subtree: true });
  decorate();
})();
