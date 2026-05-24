---
name: Glo
description: Neighborhood advertising for small businesses — $29 a day, block-level targeting, premium inventory unlocked by the Ex.co JV.
colors:
  bg: "#FFFFFF"
  bg-soft: "#FAFAFA"
  bg-band: "#F4F4F5"
  ink: "#0A0A0A"
  ink-2: "#1F1F22"
  ink-3: "#525252"
  ink-4: "#737373"
  ink-5: "#A3A3A3"
  ink-6: "#D4D4D4"
  line: "#EAEAEA"
  line-2: "#F0F0F0"
  line-3: "#DCDCDC"
  amber: "#D97706"
  amber-deep: "#B45309"
  amber-soft: "#F5BD7C"
  ok: "#059669"
  warn: "#D97706"
  off: "#78716C"
  d-bg: "#0B0B0E"
  d-bg-2: "#131318"
  d-bg-3: "#1B1B20"
  d-line: "#25252A"
  d-line-2: "#1E1E22"
  d-ink: "#FAFAFA"
  d-ink-2: "#C7C7CC"
  d-ink-3: "#8A8A91"
  d-ink-4: "#5A5A60"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontStyle: "italic"
    fontSize: "clamp(3.5rem, 9vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Geist, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "Geist Mono, ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.04em"
    textTransform: "uppercase"
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
spacing:
  pad-x: "clamp(20px, 4.5vw, 48px)"
  section-gap: "clamp(72px, 9vw, 120px)"
  max-width: "1200px"
  max-narrow: "880px"
motion:
  fast: "0.16s ease"
  med: "0.28s ease"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.bg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  city-card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  dark-surface:
    backgroundColor: "{colors.d-bg}"
    textColor: "{colors.d-ink}"
    rounded: "{rounded.xl}"
    padding: "48px"
---

## Overview

Glo's visual system is **The Neighborhood Aperture**. Concentric circles narrowing to a warm amber center carry the brand: they appear as the logo, the cursor glow, the intro animation, and as a detail inside every city card. The system reads as **confident, spatial, and generous** — declarative typography, paper-white surfaces, and a single amber accent that always means "this is the place".

The aesthetic lane is "editorial-warm-precise". It is not quiet luxury (too beige, too non-committal), it is not Terminal Industries brutalism (too cold for a neighborhood pitch), and it is not Yelp small-business clutter (the explicit anti-reference). The system pairs **Geist** sans for default voice with **Georgia italic** for display emphasis — a deliberate two-voice contract where italic only appears on emotional pivot words (*place*, *own*, *light up*, city names) and a single hero phrase per section.

Motion is choreographic, never decorative. The hero builds character-by-character; "imagine" morphs through three phrases that lock in sequence; a 12×12 block grid lights up in a cluster to teach what block-level targeting actually looks like; the price section drops `$29` letter by letter; a quote section sweeps word-by-word opacity tied to scroll position. Every animation respects `prefers-reduced-motion` as a first-class path.

This system should NOT feel like: Inter + purple gradient SaaS, Facebook Business Manager bureaucracy, Yelp Ads anxiety, or 2025-vintage Instrument-Serif italic-hero monoculture. The italic display is intentional and earns its place because choreography supports it; it must not drift into reflex.

## Colors

The palette is binary — paper white and ink black — with a single amber accent in three steps. Dark surfaces appear in product-mock sections only; they are not the dominant ground.

**Surfaces** are nearly-white: `bg #FFFFFF` (primary), `bg-soft #FAFAFA` (cards, soft bands), `bg-band #F4F4F5` (section separators). The gradation is intentional and very tight — three steps inside a 6-point luminance range so the page reads as one continuous paper, not three.

**Ink** runs from `ink #0A0A0A` (display headings, primary text) through `ink-3 #525252` (body), down to `ink-5 #A3A3A3` (captions, meta). `ink-5` against white is the contrast risk — keep it only on titles set at 24px+ or on `bg-soft` surfaces, never on body copy against pure white.

**Amber is the only chroma.** `amber #D97706` is the action color and the aperture center. `amber-deep #B45309` is the hover/pressed state. `amber-soft #F5BD7C` is the glow color on the cursor and the inner aperture circle. The amber must never be the only signal for a state — pair it with weight, underline, or layout. The cultural symbol is "warm light spilling out of a window" — that is the entire chroma vocabulary.

**Dark surfaces** (`d-bg #0B0B0E`, `d-bg-2 #131318`, `d-bg-3 #1B1B20`) appear inside product-mock cards and the moat section. On dark, `d-ink #FAFAFA` is primary, `d-ink-2 #C7C7CC` is secondary, `d-ink-3 #8A8A91` is tertiary. `d-ink-3` against `d-bg` clears 4.5:1; the issue flagged by the detector is `d-ink-3` (`#8A8A91`) appearing against white, which it must not.

## Typography

Three voices, one page.

**Display: Georgia italic.** The italic display is the emotional voice. It appears in the hero ("Promote your business. *Everywhere.* Now."), section openers, and one or two pivot words per section. Set tight (`letter-spacing: -0.02em`, `line-height: 0.95`) at `clamp(3.5rem, 9vw, 8rem)` for hero and proportionally smaller for section heads. Italic does the work of warmth and intimacy — it must not appear in body copy.

**Sans: Geist (100–900).** The default voice for everything that is not display or label. Headlines at 600 weight set tight (`-0.02em`); body at 400 weight set neutral (`0`); small caps and meta at 500. The detector flags Geist as part of the late-2025 monoculture; the principle is that Geist here pairs with Georgia italic rather than appearing alone, which differentiates it from the reflex stack.

**Mono: Geist Mono.** The technical voice. Appears on prices, units, dates, IDs, and short label chips. Set at 12px, 500 weight, `letter-spacing: 0.04em`, `text-transform: uppercase` for labels. Reserved for fact-shaped strings; never for sentences.

Hierarchy is fluid via `clamp()` at every level — there are no fixed breakpoints for type. Body text targets 16px minimum on desktop. **Anti-pattern to fix:** the current build has 11.5px body text in several places; lift to 13px floor.

Line length is bounded with `max-width: 65ch` on prose blocks. The detector currently flags `~99 chars/line` in long-form sections — add the ch constraint.

## Elevation

The system is **flat with tonal layering**. There are no drop shadows on cards, buttons, or surfaces. Depth is communicated through three mechanisms only:

1. **Background tone steps** — `bg → bg-soft → bg-band` creates ~3% luminance steps that read as soft elevation.
2. **Borderless 1px lines** — `--line #EAEAEA` separates card edges and section boundaries when tonal contrast alone is insufficient. Never combined with shadow.
3. **The amber glow** — the only "lift" effect in the system. Appears on the cursor (radial-gradient amber-soft at 60% opacity) and inside the aperture motif. It is light, not shadow.

Anti-pattern: do not add `box-shadow: 0 4px 16px rgba(0,0,0,0.1)` to anything. The system reads paper-flat by design; shadow breaks the metaphor.

## Components

**`button-primary`** — Solid black pill at `rounded.sm`, 14px×22px padding, Geist 500 weight. Hover lifts to `ink-2`. Used for the single primary CTA per section ("Request access", "Light up your block.").

**`button-ghost`** — Transparent background, `ink` text, no border. Hover shifts text to `ink-2`. Used for secondary nav links and tertiary CTAs.

**`city-card`** — White card on `bg-soft` ground, `rounded.lg` radius, 32px padding, contains a city name in display italic, an animated number counter (Geist Mono, 600 weight), and a small aperture motif. Three appear in a row at desktop, stack at mobile. No shadow; only the tonal step against the band separates them.

**`dark-surface`** — The product-mock container. `d-bg #0B0B0E` ground, `rounded.xl` radius, 48px padding. Used only for the moat section and any in-page product previews. Inside it, the type scale shifts: `d-ink` primary, `d-ink-2` secondary. Switching contexts triggers the `data-theme` attribute on body which toggles the cursor glow color.

**`block-grid`** — 12×12 SVG cell grid (144 cells) that lights up in a cluster pattern as it enters the viewport. Each cell is a 1px-stroke square; lit cells fill with `amber-soft` and emit a 4px amber-soft blur. The animation is scroll-tied via GSAP ScrollTrigger and respects `prefers-reduced-motion` by snapping to the final state.

**`aperture-mark`** — Three concentric SVG circles + amber center dot. The construction is identical at every scale: outer ring `currentColor` at 0.32 opacity, middle ring at 0.55, inner ring at 0.75, center dot solid `amber-soft`. Stroke widths scale with the SVG `viewBox`, never with absolute pixels. Used at 22px in nav, 32px in city cards, 256px in the hero intro animation.

## Do's and Don'ts

**Do** lead with the italic display when the section is making an emotional claim. ("*Place* over product." "Light up your block.")

**Do** keep amber as the only chroma. If a state needs more than one color, find another lever — weight, position, italic, or layout.

**Do** treat motion as a meaning-shifter. Every animation must do work: reveal information, teach a metaphor, or anchor scroll position. Never run motion as ambience.

**Do** respect `prefers-reduced-motion`. The whole page must read coherently with motion stripped.

**Do** use Geist Mono for any string that is a unit, date, price, or coordinate. The mono signals "this is fact".

**Don't** add purple, blue, or green accents. The palette is paper, ink, and amber.

**Don't** add shadows to cards, buttons, modals, or surfaces. The system is flat by design.

**Don't** set Georgia italic on body copy. Italic is reserved for display, single pivot words, and city names.

**Don't** let `ink-5 #A3A3A3` appear as body copy on white — it fails AA. It is acceptable for 24px+ titles or against `bg-soft`.

**Don't** stack three Geist-only voices on one page. The two-voice contract (Geist + Georgia italic) is what distinguishes the system from the late-2025 Geist monoculture; collapsing it back to Geist-only collapses the brand.

**Don't** use uppercase for runs longer than ~12 characters. Mono labels are short by design (DAILY PRICE, BROOKLYN, Q3 2026). The detector flags any uppercase passage over 30 characters as `all-caps-body`.

**Don't** ship section headings out of order. The current build has `h2 → h6` which breaks screen-reader navigation; the structure should be `h1 → h2 → h3` with no skips.
