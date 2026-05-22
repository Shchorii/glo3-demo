# Glo — Scroll Choreography Demo

A demo of Terminal Industries-style scroll choreography for **Glo**, the neighborhood advertising platform.

Live: https://glo3.idanshchori.com

## Stack

- **HTML / CSS / vanilla JS** — no framework, just the essentials
- **GSAP 3.13** + **ScrollTrigger** — pinning, scroll-tied timelines, char animation
- **Lenis** — silky smooth scroll
- **Instrument Serif** (italic display) + **Geist** (body) — Google Fonts

## What's in here

1. **Hero** — letter cascade on load (`GLO` builds character-by-character with stagger + rotate + slide)
2. **Pinned Problem section** — three lines that reveal as you scroll, with characters streaming in
3. **Pinned Imagine section** — Terminal Industries-style: a prefix locks, then three phrases morph in sequence ("a grid of intent" → "a network of corners" → "a map of moments"), then a bulleted list reveals
4. **Block-map** — 144-cell SVG-style grid where blocks light up in a cluster pattern as you scroll into view
5. **Price** — massive `$29` with letter-drop, sub-line stagger
6. **Cities** — three city cards with animated number counters (Brooklyn, Tel Aviv, Austin)
7. **Moat** — the Ex.co JV positioning, with italic emphasis on `place` vs `own`
8. **Quote** — scroll-tied word-by-word opacity sweep (the words "light up" as you scroll through them)
9. **CTA** — `Light up your block.` with another letter cascade + email capture

## Local dev

```bash
# any static server works — e.g.
python3 -m http.server 5500
# then open http://localhost:5500
```

## Deploy

Auto-deployed via Vercel on push to `main`.

## Notes

- The custom cursor glow is hover-only; mobile gets a clean fallback.
- All animations respect `prefers-reduced-motion`.
- Theme attribute (`data-theme`) on body toggles cursor glow color between dark/light sections.
