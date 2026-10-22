# Still here — Style Reference
> Still here — a friendly light in a dusky purple room. Warm, playful enough to feel human, never clinical, never an alarm.

**Scope:** styling only (colours, typography, spacing and the look of existing elements). It doesn't change the screens, what's on them or their order. Token names and classes match `styles.css`, so applying it means adding rules, not rewriting.

**Approach: flat and borderless.** No cards, boxes, inset containers, grey blocks or outlines. Everything sits straight on the page background. Sections are separated by generous space, and hierarchy comes from type size and weight.

**Theme:** two moods. **Daylight** (soft lavender white) for setting up and for supporters. **Night** (dusky purple) for screens Gary sees after dark _(assumption: when it switches on is for the squad to agree)_.

**Look:** based on a reference support-app design Patricia shared: dusky purple backgrounds, a periwinkle main button, teal and lemon accents, white cards. Also inspired by Calm (quiet night tones), Headspace (warm, friendly) and Finch (kind, encouraging). Don't copy any real app's logos, illustrations or names.

`src/styles.css` is Spencer's file. Agree any change with him first. Every contrast figure below was measured.

## Tokens — Colors

### Daylight

| Name | Value | Token | Role | Contrast |
|------|-------|-------|------|----------|
| Lavender White | `#f5f3fc` | `--bg` | Page background | — |
| Card White | `#ffffff` | `--card` | Cards, inputs | — |
| Deep Plum | `#1f1a3d` | `--text` | Body text, headings | 15.0:1 on lavender |
| Dusk Grey | `#5c5675` | `--muted` | Hints, times | 6.3:1 on lavender |
| Periwinkle | `#5a4fe0` | `--primary` | Main button, links, app name | white on periwinkle 5.8:1; periwinkle on lavender 5.3:1 |
| White | `#ffffff` | `--primary-text` | Text on main button | 5.8:1 |
| Lilac | `#dcd7fa` | `--secondary` | Secondary button fill | plum on lilac 11.9:1 |
| Lilac Edge | `#7d77a3` | `--border` | Borders | 3.8:1 on lavender, 3.5:1 on mist |
| Lemon | `#f3f6b4` | `--bubble` | Spare highlight (the flat style has no bubble) | plum on lemon 14.6:1 |
| Teal | `#45c4c4` | `--accent` | Spare accent, not used in the flat style. Never text on white | plum on teal 7.8:1 |
| Deep Plum | `#1f1a3d` | `--exit` | Quick exit, with white text | 16.5:1 |
| Brick | `#b3261e` | `--error` | Errors only | 5.9:1 on lavender |
| Deep Plum | `#1f1a3d` | `--focus-ring` | Focus outline | 15.0:1 on lavender |

### Night

| Name | Value | Token | Role | Contrast |
|------|-------|-------|------|----------|
| Dusk Purple | `#3b3363` | `--bg` | Page background | — |
| Violet Card | `#4a4278` | `--card` | Cards, inputs | — |
| White | `#ffffff` | `--text` | Body text, headings | 11.4:1 on dusk |
| Lilac Haze | `#d9d4f2` | `--muted` | Hints, times | 8.0:1 on dusk, 6.3:1 on card |
| Periwinkle | `#5a4fe0` | `--primary` | Main button | white on periwinkle 5.8:1 |
| White | `#ffffff` | `--primary-text` | Text on main button | 5.8:1 |
| Lemon | `#f3f6b4` | `--link` | Links and app name on dusk | 10.1:1 on dusk |
| Violet | `#4a4278` | `--secondary` | Secondary button fill | white on violet 9.0:1 |
| Lilac Line | `#9d95d6` | `--border` | Borders | 4.2:1 on dusk |
| Lemon | `#f3f6b4` | `--bubble` | Spare highlight (the flat style has no bubble) | 14.6:1 |
| Teal | `#45c4c4` | `--accent` | Spare accent, not used in the flat style | 5.4:1 on dusk |
| Lemon | `#f3f6b4` | `--exit` | Quick exit, with plum text | 14.6:1 |
| Coral | `#ffb4a6` | `--error` | Errors only | 6.7:1 on dusk |
| Lemon | `#f3f6b4` | `--focus-ring` | Focus outline | 10.1:1 on dusk |

The Night main button (periwinkle on dusk, 2.0:1) is recognised by its white label, not its edge. That's fine for buttons with words in them.

## Tokens — Typography

The current values in `styles.css` (the flat style raises h1 and h2 slightly; see Type hierarchy below):

| Role | Size | Weight | Line height |
|------|------|--------|-------------|
| Body | 18px (1.125rem) | 400 | 1.5 |
| h1 | 25.6px (1.6rem) | 700 (browser default) | 1.25 |
| h2 | 19.2px (1.2rem) | 700 (browser default) | inherited |
| Hints in fields | 16px (1rem) | 400 | 1.5 |
| Footer | 15.2px (0.95rem) | 400 | 1.5 |
| Demo note | 13.6px (0.85rem) | 400 | 1.5 |

- **Font:** `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`. The reference uses a rounded geometric font (like Poppins). We don't load web fonts because they cost data, so the system font stays.
- Never all capitals.

## Existing elements: how they look

| Element (class) | Flat style |
|---|---|
| App name (`.app-name`) | Periwinkle (day) or Lemon (night) text |
| Quick exit (`.quick-exit`) | Solid round fill: white on Deep Plum (day), plum on Lemon (night). Kept filled so it's always easy to find |
| Main button (`.btn-primary`) | Solid periwinkle fill, white text, no border |
| On "How are you right now?" | **I need someone** is the main button (darker periwinkle). **I'm OK** and **Not great** are secondary. Asking for help should be the easiest thing to find (already like this in `app.js`) |
| Secondary button (`.btn-secondary`) | Solid lilac fill (`#dcd7fa` day, `#4a4278` night), no border, 600 weight |
| Link button (`.btn-link`) | Underlined text, no box |
| Demo button (`.btn-demo`) | Muted text with a dotted underline, no box |
| Saved message (`.message`) | No bubble: larger text (22px) in quotation marks, straight on the background |
| Service (`.card`) | No box: name as a heading, details below, 32px space between services |
| Banner (`.banner`) | No box: text and a button, with 48px space above and below |
| Summary (`.summary`) | No line above: 56px space instead |
| Inputs | A single 2px underline in the text colour, so you can still see where to type |
| Errors | Brick (day) or Coral (night) text and underline |
| Footer | No rule: 40px space above |

### Spacing

| Between | Space |
|---|---|
| Header and question | 24px + h1 top margin |
| Question and answers | 32px |
| Tap answers | 12px |
| Sections (h2) | 48px above |
| Services | 32px |
| Summary | 56px above |
| Main and footer | 40px |

### Type hierarchy

| Role | Size | Weight |
|---|---|---|
| h1, the one question | 28px (1.75rem) | 700 |
| Saved message | 22px (1.375rem) | 400 italic |
| h2, section | 20px (1.25rem) | 700 |
| h3, service name | 19.2px (1.2rem) | 700 |
| Body | 18px | 400 |

## Do's and Don'ts

### Do
- Keep periwinkle for the one main action on a screen.
- Use lemon for the quick exit and links at night only. Never put white text on teal or lemon.
- Pair every colour signal with words (open now, sent, waiting, errors).
- Keep a visible focus outline on everything you can tab to. It's the one outline we keep (accessibility).
- Keep the input underline: without it, people can't see where to type.
- Check 4.5:1 for text and 3:1 for borders after any colour change.

### Don't
- Don't use red except for errors. The 999 line is information, not an alarm.
- Don't put white text on teal or lemon (it fails contrast).
- Don't draw boxes, cards, outlines, dividers or grey blocks around content. Use space.
- Don't nest anything inside a container.
- Don't add photos, illustrations, shadows or web fonts. They cost data.
- Don't make "No", "Not now" or "Skip" look less valid than "Yes".

## Quick Start

### CSS custom properties (values only, for `styles.css`)

```css
:root {
  /* Daylight */
  --bg: #f5f3fc;
  --card: #ffffff;
  --text: #1f1a3d;
  --muted: #5c5675;
  --primary: #5a4fe0;
  --primary-text: #ffffff;
  --link: #5a4fe0;
  --secondary: #dcd7fa;
  --border: #7d77a3;
  --bubble: #f3f6b4;
  --bubble-text: #1f1a3d;
  --accent: #45c4c4;
  --focus: #f3f6b4;
  --focus-ring: #1f1a3d;
  --exit: #1f1a3d;
  --exit-text: #ffffff;
  --error: #b3261e;
}

/* Night: <body class="night"> */
.night {
  --bg: #3b3363;
  --card: #4a4278;
  --text: #ffffff;
  --muted: #d9d4f2;
  --primary: #5a4fe0;
  --primary-text: #ffffff;
  --link: #f3f6b4;
  --secondary: #4a4278;
  --border: #9d95d6;
  --bubble: #f3f6b4;
  --bubble-text: #1f1a3d;
  --accent: #45c4c4;
  --focus: #f3f6b4;
  --focus-ring: #f3f6b4;
  --exit: #f3f6b4;
  --exit-text: #1f1a3d;
  --error: #ffb4a6;
}

/* Colour-only changes to existing rules */
.app-name, .btn-link { color: var(--link); }
.quick-exit { color: var(--exit-text); }
input[type="text"], input[type="tel"] { border-color: var(--text); }
button:focus-visible, input:focus-visible, main:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### Flat and borderless (add after the rules above)

```css
/* Flat and borderless: space and type do the work, not boxes */
:root { --secondary: #dcd7fa; }
.night { --secondary: #4a4278; }

/* No borders, no inset containers */
button, .card, .banner, .message, .summary { border: 0; box-shadow: none; }

/* More room between sections */
main { padding-top: 24px; padding-bottom: 48px; }
h1 { font-size: 1.75rem; line-height: 1.2; margin: 24px 0 12px; }
h2 { font-size: 1.25rem; margin: 48px 0 12px; }
.choices { gap: 12px; margin-top: 32px; }

/* Buttons: flat solid fills, no outlines */
.btn-primary, .btn-secondary { border: 0; }
.btn-secondary { background: var(--secondary); color: var(--text); font-weight: 600; }
.btn-link { padding: 12px 0; }
.btn-demo { border: 0; padding: 12px 0; color: var(--muted); text-decoration: underline dotted; text-underline-offset: 4px; }

/* Saved message: big quoted text, no bubble */
.message { background: none; color: var(--text); padding: 0; border-radius: 0; font-size: 1.375rem; line-height: 1.4; margin: 16px 0 8px; }
.message::before { content: "\201C"; }
.message::after { content: "\201D"; }

/* Services: just text on the background, spaced apart */
.card { background: none; border-radius: 0; padding: 0; margin: 0 0 32px; }
.card h3 { font-size: 1.2rem; margin-bottom: 4px; }

/* Banner and summary: separated by space, not boxes or lines */
.banner { background: none; border-radius: 0; padding: 0; margin: 48px 0; }
.summary { margin-top: 56px; padding-top: 0; }

/* Inputs: a single underline, so you can still see where to type */
input[type="text"], input[type="tel"] { border: 0; border-bottom: 2px solid var(--text); border-radius: 0; background: transparent; padding: 12px 0; }
input[aria-invalid="true"] { border-bottom-color: var(--error); }

/* Footer: space above, no rule */
.bottom { padding-top: 40px; }
```

## Motion & Animation Guidelines

Soft, quick and purposeful. Motion tells Gary "something happened" without ever making him wait. Someone tired, anxious or intoxicated at night should never be startled, dizzied or slowed down.

### Principles

- **Fast:** micro-interactions 150 to 200ms; a new screen 300ms. Nothing longer.
- **Gentle:** no bounce, no overshoot, no spin, no flashing.
- **Cheap:** only `opacity`, `transform` and `background-color`. Never animate height, width, margin or padding (they cause jank on old phones).
- **Optional:** everything switches off when the phone is set to reduce motion.
- **Never on safety:** the quick exit never animates. It must leave instantly.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals: fast start, gentle settle |
| `--ease-soft` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Hover and press |
| `--dur-micro` | 160ms | Hover, press, link fade |
| `--dur-quick` | 200ms | Button colour change |
| `--dur-reveal` | 300ms | A new screen appearing |
| Press | 100ms | The quick squeeze when tapped |

### Triggers

| Trigger | What moves | How |
|---|---|---|
| **Enter** (new screen) | Heading, hint, then answers | Fade in and rise 8px, 300ms, each part 40ms after the last |
| **Hover** (mouse only) | Main and secondary buttons | Colour deepens, lifts 1px, 160 to 200ms |
| **Hover** (mouse only) | Links, demo button | Fade to 75% opacity, 160ms |
| **Active** (tap or click) | Main and secondary buttons | Scale to 98%, 100ms, springs back on release |
| **Focus** | Everything you can tab to | No motion: the outline appears instantly |
| **Quick exit** | — | None, ever |

Hover only applies on devices with a mouse (`@media (hover: hover)`), so phones don't get "stuck" hover states after a tap.

### Hover colours

| Mood | Element | Rest | Hover | Text contrast on hover |
|---|---|---|---|---|
| Daylight | Main button | `#5a4fe0` | `#4a3fd0` | 7.2:1 |
| Daylight | Secondary button | `#dcd7fa` | `#cfc8f7` | 10.4:1 |
| Night | Main button | `#5a4fe0` | `#6a60ea` | 4.7:1 |
| Night | Secondary button | `#4a4278` | `#564d8a` | 7.4:1 |

### Visual example: a new screen entering

```
time →    0ms        40ms       80ms       120ms           300ms   420ms
h1        ░▒▓█████████████████████████████████  settled
hint                ░▒▓████████████████████████████████  settled
answer 1                       ░▒▓████████████████████████████████  settled
answer 2+                                 ░▒▓████████████████████████████  settled

░▒▓ = fading in and rising 8px   █ = fully visible
Whole screen settled in 420ms. Gary can tap straight away; nothing is blocked while it moves.
```

### Visual example: tapping a button

```
rest        hover (mouse)          press            release
[ I'm OK ]  [ I'm OK ] ↑1px        [ I'm OK ] 98%   [ I'm OK ]
 #5a4fe0     #4a3fd0, 160ms         100ms            back, 160ms
```

### CSS

```css
/* Motion: soft, quick, and only on opacity, transform and background-color */
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* reveals: fast start, gentle settle */
  --ease-soft: cubic-bezier(0.2, 0.8, 0.2, 1); /* hover and press */
  --dur-micro: 160ms;  /* hover, press, focus */
  --dur-quick: 200ms;  /* colour changes */
  --dur-reveal: 300ms; /* a new screen appearing */
}

/* Enter: each new screen fades up 8px; its parts follow 40ms apart */
@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
main > * { animation: rise-in var(--dur-reveal) var(--ease-out) both; }
main > *:nth-child(2) { animation-delay: 40ms; }
main > *:nth-child(3) { animation-delay: 80ms; }
main > *:nth-child(n+4) { animation-delay: 120ms; }

/* Buttons: colour eases, a tiny lift on hover, a soft press */
.btn-primary, .btn-secondary {
  transition:
    background-color var(--dur-quick) var(--ease-soft),
    transform var(--dur-micro) var(--ease-soft);
}
@media (hover: hover) {
  .btn-primary:hover { background-color: var(--primary-hover); transform: translateY(-1px); }
  .btn-secondary:hover { background-color: var(--secondary-hover); transform: translateY(-1px); }
  .btn-link:hover, .btn-demo:hover { opacity: 0.75; }
}
.btn-primary:active, .btn-secondary:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}
.btn-link, .btn-demo { transition: opacity var(--dur-micro) var(--ease-soft); }

/* Hover colours (contrast still passes) */
:root { --primary-hover: #4a3fd0; --secondary-hover: #cfc8f7; }
.night { --primary-hover: #6a60ea; --secondary-hover: #564d8a; }

/* Quick exit never animates: it must leave instantly */
.quick-exit { transition: none; animation: none; }

/* People who've asked their phone for less motion get none */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

### Tailwind (for reference only)

The prototype doesn't use Tailwind (it opens straight from the file, with no build step). If the squad ever moves to it, the same rules look like this:

```js
// tailwind.config.js
theme: {
  extend: {
    transitionTimingFunction: {
      'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      'soft': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    },
    transitionDuration: { micro: '160ms', quick: '200ms', reveal: '300ms' },
    keyframes: {
      'rise-in': {
        from: { opacity: '0', transform: 'translateY(8px)' },
        to: { opacity: '1', transform: 'none' },
      },
    },
    animation: { 'rise-in': 'rise-in 300ms cubic-bezier(0.16, 1, 0.3, 1) both' },
  },
}
```

```html
<button class="btn-primary transition-[background-color,transform] duration-quick ease-soft
               hover:-translate-y-px active:scale-[0.98] active:duration-100
               motion-reduce:transition-none">I'm OK</button>

<h1 class="animate-rise-in motion-reduce:animate-none">How are you right now?</h1>
```

## Open questions for the squad

- Does the squad like the purple look, and should Night switch on by the clock, on certain screens, or with the phone's dark mode?
- Spencer: OK to change these colour values in `styles.css`?
