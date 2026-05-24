# Product

## Register

brand

## Users

**Primary: small-business owners in three wedge cities** (Brooklyn first, then Tel Aviv, Austin). Boutique, café, gym, salon, repair shop, dental office, neighborhood service. They have between two and twelve employees, they know who walks past their door, and they cannot navigate Google Ads or Meta Business Manager without losing a weekend. They are not "growth marketers" — they are owners who happen to need foot traffic next Tuesday.

**Secondary: investors, partners, and press** landing here from the deck, from outbound, or from a "neighborhood ads" search. The page has to make Glo's wedge defensible in 90 seconds without a sales call.

The context of use is high-intent and short: a Brooklyn café owner reading this on a phone between rushes, or a partner skimming on the way to a meeting. Nobody scrolls this page twice.

## Product Purpose

Glo opens every premium ad surface — in-venue displays, connected TV, mobile apps, premium publishers — to small businesses at **$29 a day, flat**, with **block-level targeting**. No CPC, no auctions, no quality-score panic.

The architectural moat is the **Ex.co JV**: it unlocks premium publisher inventory that Yelp Ads and Nextdoor cannot reach. That is what makes "$29 buys you the New York Times rooftop, not just a banner on yelp.com" a defensible promise.

Success for this surface specifically: a Brooklyn business owner books "Request access" inside one session. Secondarily, a partner or investor walks away able to repeat the four-line pitch (place + price + premium + proof).

## Brand Personality

Three words: **Confident. Spatial. Generous.**

- **Confident.** Declarative copy. No hedging, no "we believe", no "we're a platform that helps". "Light up your block." "$29 a day. Flat." "Brooklyn live Q3 2026."
- **Spatial.** The brand treats neighborhoods as proper nouns and uses geometry — the aperture, the 12×12 block grid, the city cards — as the language for "place". Type and layout breathe; whitespace is the product.
- **Generous.** Warm-precise, never bro-y, never bureaucratic. A small-business owner should feel powerful, not patronized. The italic display is intimate, not luxurious.

Emotional goal: the reader feels that Glo *respects them as an owner* — not as a "small business segment" to be optimized against.

## Anti-references

Concretely, this page should NOT look or read like:

- **Yelp Ads / Nextdoor business landing.** Visual clutter, anxious "limited time" copy, generic small-business stock photography, three-column "Why advertise with us" grid. Glo is the opposite end of this lane.
- **Facebook Business Manager / Google Ads onboarding.** Bureaucratic, intimidating, optimization-pit dashboards. Glo's whole point is escaping this surface.
- **Snap / TikTok small-business landing.** Kid-coded, hyper-saturated, performative. Wrong audience.
- **Default Y Combinator launch.** Inter + purple gradient + three-column "Features" + stock founder photo. Indistinguishable from the next ten launches.
- **"Quiet luxury" beige minimal.** This is a *neighborhood* brand, not a Brooklyn townhouse. Restrained, not muted; warm-amber accent, not greige.
- **Italic-serif-display-hero monoculture.** The current italic display is intentional and earns its place via choreography; the warning is to not let it drift into the generic 2025-2026 "Instrument Serif / Fraunces hero" reflex.

## Design Principles

1. **Place over product.** Neighborhoods are proper nouns. Brooklyn, Tel Aviv, Austin get full city cards; "your block" is a concrete claim, not a metaphor. The 12×12 block grid lights up to show what targeting actually looks like.
2. **One number does the talking.** $29 is architecture, not a pricing-page footnote. The price is the hero on a dedicated section, set at display scale, and never qualified with "starting at" or "from".
3. **Choreograph, don't decorate.** Motion exists when it shifts meaning — letter cascade reveals the wordmark, block-grid lights up to teach targeting, word-by-word opacity sweep reveals a quote. No motion-for-motion's-sake; `prefers-reduced-motion` is a first-class path, not a fallback.
4. **Italic for tension, mono for spec.** Geist sans is the default. Italic display (Georgia, set tight) carries emotional emphasis on a small number of words — *place*, *own*, *light up*. Geist Mono carries technical fact — price, units, dates. Three voices, one page.
5. **Aperture as identity.** The concentric-circles aperture is the iconography spine. It appears as logo, cursor glow, intro animation, city-card detail. Every aperture instance is the same construction with different scale and stroke.

## Accessibility & Inclusion

- **Target:** WCAG 2.2 AA across all text. Current detector findings worth lifting:
  - `tiny-text 11.5px` in several places — raise to 13–14px minimum for body text.
  - `low-contrast 3.4:1` (`#8a8a91` on `#ffffff`) — `--d-ink-3` is fine on dark surfaces but appears against white in places it should not.
  - `skipped-heading h2 → h6` — restructure the section headings so screen-reader navigation is coherent.
- **Motion:** `prefers-reduced-motion` is already respected per the README. Keep the discipline — the entire scroll choreography must degrade gracefully.
- **Pointer:** custom cursor glow is desktop-only with mobile fallback already in place. Do not regress this.
- **Reading width:** detector flags `~99 chars/line`. Add `max-width: 65ch–72ch` to body text containers in long-form sections.
- **Color independence:** the amber accent must never be the *only* signal for a state. Underlines, weight, or layout carry meaning alongside hue.
