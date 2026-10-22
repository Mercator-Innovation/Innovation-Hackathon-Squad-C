// Shows "Still here" in bold, in the same colour as the name in the top corner, wherever it
// appears in a sentence, so people can tell it's the app. Kept in its own file so nobody
// else's files change: it watches the screen and wraps the word as screens appear.
// Left alone: buttons (bold only, keeping the button's colour), links, form fields,
// and pretend texts and notifications (.message, .phone, .notif), which show real messages.
(function () {
  const NAME = (window.CONTENT && window.CONTENT.appName) || "Still here";
  const WORD = new RegExp("\\b" + NAME + "\\b");
  const SKIP = "a, textarea, input, select, option, .brand-name, .message, .phone, .notif";

  function wrap(node) {
    const text = node.nodeValue;
    const match = WORD.exec(text);
    if (!match) return;
    const parent = node.parentNode;
    const after = node.splitText(match.index);
    after.splitText(NAME.length);
    const strong = document.createElement("strong");
    strong.className = parent.closest("button") ? "brand-name in-button" : "brand-name";
    strong.textContent = NAME;
    parent.replaceChild(strong, after);
  }

  function decorate() {
    const screen = document.getElementById("screen");
    const walker = document.createTreeWalker(screen, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (WORD.test(n.nodeValue) && !n.parentElement.closest(SKIP) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
    });
    const found = [];
    while (walker.nextNode()) found.push(walker.currentNode);
    found.forEach(wrap);
  }

  const css = document.createElement("style");
  css.textContent = `
    .brand-name { font-weight: 700; color: var(--link, var(--primary)); }
    .brand-name.in-button { color: inherit; }
  `;
  document.head.appendChild(css);

  new MutationObserver(decorate).observe(document.getElementById("screen"), { childList: true, subtree: true });
  decorate();
})();
