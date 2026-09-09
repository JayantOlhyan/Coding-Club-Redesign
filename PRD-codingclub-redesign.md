# PRD — codingclub.tech Redesign Prototype

**Status:** Prototype (not production)
**Client:** Coding Club India / "Coding Mafia" 6-month batch
**Live site being replaced:** https://codingclub.tech/
**Audience:** Indian students, Tier-2/3 colleges, ~85% mobile, mid-range Android, 4G. Parents often co-decide the purchase.
**Primary conversion goal:** lead form submission → WhatsApp/call handoff.

---

## 0. Read this before writing any code

You are rebuilding an existing, revenue-generating sales page. It is not a greenfield project.

**Inspect first, in this order. Do not skip.**

1. Read `content.json` end to end. It is the extracted content of the live site — 390 blocks in document order. This is the single source of truth for all copy.
2. Read `images.txt` — 36 image URLs, 32 of them hosted on imgur.
3. Fetch https://codingclub.tech/ and view the live page so you understand the section rhythm and CTA placement you are replacing.
4. Only then start Phase 1.

**Do not begin coding until you have produced the Phase 0 output described in §8.**

---

## 1. Objective

Build a single-page, static, mobile-first prototype of the redesigned sales page that is:

- **100% content-identical** to the live site (same copy, same claims, same modules, same mentors, same FAQ).
- Structurally and visually rebuilt: real HTML hierarchy, real text instead of image-baked copy, disciplined typography.
- Dramatically lighter and faster than the original.

This prototype is for client approval. It is not being deployed to production in this phase.

---

## 2. What exists today (context you must not repeat)

The live page has these defects. Your rebuild must not reproduce any of them.

| Defect | Detail |
|---|---|
| Duplicated DOM | Separate desktop and mobile trees. 69 `<img>` tags for 36 unique images; ~780 blocks for 390 unique ones |
| 20 `<h1>` tags | No semantic hierarchy |
| Copy baked into images | Pricing, benefits panels, testimonials, before/after are PNGs. Zero indexable text |
| 32 images hotlinked from imgur | Single point of failure, no control, unoptimised |
| Third-party runtime dependency | A tick icon served from `rvs-pricing-card.vercel.app` |
| 9 eager Vimeo embeds | Large load cost for content most visitors never play |
| 247 KB of HTML on the wire | Before images and embeds |
| Inconsistent CTAs | 7 point to `#open-popup`, 2 to `#submit-form` |
| Form fields not required | name / email / phone all optional |
| Fake countdown | "Registration Closing In: 03 Days…" — evergreen timer |

---

## 3. Scope

### In scope
- One page, static, no routing beyond in-page anchors.
- All content rendered from `content.json`.
- Responsive 320px → 1440px.
- Working lead-capture form with client-side validation and a submitted state (stubbed endpoint).
- Curriculum as an accordion.
- Vimeo embeds as click-to-play facades.

### Explicitly out of scope — do not build
- Multi-page site, blog, about page, or router.
- CMS, admin panel, or auth.
- Backend, database, or real payment integration.
- Dark mode toggle.
- Scroll animations, parallax, page-load motion sequences.
- Any new marketing copy, testimonial, statistic, company name, or claim not present in `content.json`.
- i18n or translation.

If you believe something out of scope is necessary, stop and state why rather than building it.

---

## 4. Tech stack

- **Next.js**, App Router, latest stable, configured for **static export** (`output: 'export'`).
- **TypeScript**, strict mode.
- **Tailwind CSS v4+**.
- No component library. No shadcn, no MUI, no animation library.
- Fonts self-hosted as `woff2`, loaded via `next/font/local`.

Rationale: it is one page. Any dependency you add must earn its weight. Do not introduce state management, form libraries, or a headless UI kit.

---

## 5. Content contract

**Rule 1 — Never hardcode copy in JSX.** All text, image URLs, CTA labels, and form field definitions are read from `content.json`. If a string appears in a component file, that is a bug.

**Rule 2 — Preserve typos verbatim.** `content.json` contains "Hackkerrank", "Platfoms", "assignements", "referals", "Unforgetable", "Get Stared", "Coding Maifa". Render them exactly as-is. Content parity must be provable. Instead, append every typo you notice to `CORRECTIONS.md` as a separate deliverable for the client to approve.

**Rule 3 — Do not rewrite, condense, reorder within a section, or "improve" any sentence.** The copy is the client's revenue asset. You are changing structure and presentation only.

**Rule 4 — Image-locked text.** Some original copy exists only inside PNGs (pricing panel, benefits panels, placement screenshots, before/after). It is not in `content.json`. Where a section depends on it, render the image as-is and add an HTML comment marking it `<!-- TODO: image-locked copy, awaiting client text -->`. Do not invent replacement text.

**Rule 5 — Images.** Download all 36 images from `images.txt` into `/public/images/`, convert to WebP with a JPEG/PNG fallback, set explicit `width`/`height`, and reference them locally. Nothing may load from `i.imgur.com` or `rvs-pricing-card.vercel.app` at runtime. Remove the third-party tick icon and replace it with an inline SVG.

`content.json` block schema:

```
{ "type": "heading",   "level": 1-6, "text": "..." }
{ "type": "paragraph", "text": "..." }
{ "type": "bullet",    "text": "..." }
{ "type": "cta",       "text": "...", "href": "#open-popup" }
{ "type": "image",     "src": "...", "alt": "", "lazy": true }
{ "type": "embed",     "src": "https://player.vimeo.com/..." }
{ "type": "field",     "input_type": "email", "name": "email", "placeholder": "...", "required": false }
```

Write a typed loader (`lib/content.ts`) that parses `content.json` into typed section objects. Section boundaries are derived from heading levels and document order — define the mapping explicitly in a `SECTION_MAP` constant so it is reviewable, not inferred at runtime.

---

## 6. Design specification

The visual direction is fixed. Follow it exactly; do not substitute your own aesthetic judgement.

### Typography

Both from Fontshare (Indian Type Foundry), free for commercial use. Self-host.

- **Headings:** Clash Grotesk — weights 500, 600 only
- **Body:** Satoshi — weights 400, 700 only
- No third typeface. No monospace face for labels.

Type scale, mobile-first (px, `rem` in code):

| Role | Mobile | Desktop |
|---|---|---|
| h1 | 32 | 48 |
| h2 | 24 | 32 |
| h3 | 20 | 24 |
| body | 16 | 17 |
| small | 14 | 14 |

Body line-height 1.6, headings 1.15. Body line length capped below 80 characters (`max-w-[68ch]`).

### Color

```
--ink:       #16181D   /* headings */
--body:      #444750   /* body text */
--surface:   #FFFFFF
--surface-2: #F7F6F3   /* alternating section bands */
--accent:    #F59E0B   /* CTAs and highlights — the ONLY accent */
--success:   #0E7C5A   /* outcome and placement badges */
--border:    #E4E2DD
```

Light background. Do not build a dark theme — it renders poorly on low-end Android screens in daylight, which is the majority viewing condition here.

### Layout

- Single centered column, max width 1120px. Content column 680px for prose.
- Vertical rhythm on an 8px base. Section padding: 64px mobile, 96px desktop.
- Alternate `--surface` and `--surface-2` bands to separate sections. This is the primary structural device — do not add decorative dividers on top of it.
- Left-aligned text throughout. No centered paragraphs.

### Explicitly forbidden treatments

These read as generated-template output and will be rejected:

- Tracked-out ALL-CAPS eyebrow labels above headings
- Numbered markers (01 / 02 / 03) on anything that is not a genuine sequence — the 9 curriculum modules *are* a sequence and may be numbered; benefits and mentors are not
- Fade-and-slide-up entrance animation on every section
- Every content block wrapped in an identical rounded card with the same shadow
- Gradient washes used as decoration
- `→` appended to button and link text
- Accenting a single word inside a headline in a different color

Motion is permitted only as a response to a user action: accordion expand/collapse, video facade replacement, form submit state.

---

## 7. Section specification

Build in this order. Content for each comes from `content.json`.

| # | Section | Requirements |
|---|---|---|
| 1 | Hero | Headline, subhead, **real cohort start date** (not a countdown — see §9), one primary CTA. One `<h1>` on the page, here only |
| 2 | Trust bar | Student count, mentor credentials, company logos. Horizontal, compact, above the fold on desktop |
| 3 | Who this is for | The six "Looking for…" items as a 2-col grid (1-col mobile). Not a bulleted wall |
| 4 | Curriculum | 9 modules, accordion, **all collapsed by default**. Module 1 header visible. 203 bullets total — never render them all open |
| 5 | Mentors | 6 mentors, one photo + bio each. Deduplicate the repeated instructor headshots present in the original |
| 6 | Outcomes | Placement screenshots. Render as images with the image-locked TODO comment. Prepare the markup for text-based alumni cards so the swap is trivial later |
| 7 | Reviews | 9 Vimeo videos as click-to-play facades |
| 8 | Pricing | Currently image-locked. Render image + TODO comment. Build the HTML pricing-card structure alongside it, commented out |
| 9 | FAQ | 8 Q&A pairs. Native `<details>`/`<summary>`, all collapsed |
| 10 | Final CTA + footer | Form, WhatsApp link, LinkedIn, Instagram, Terms, Privacy |

**CTAs:** every CTA on the page targets a single destination. Consolidate `#open-popup` and `#submit-form` into one anchor to the lead form. Keep the same CTA label text from `content.json`.

**Form:** name (required), email (required, validated), phone (required — change from optional, and flag this to the client in `CORRECTIONS.md` as a deliberate deviation). Inline error messages, disabled submit while invalid, visible success state. POST to a stubbed `/api/lead` that logs and returns 200.

---

## 8. Workflow — phased, with checkpoints

Do not build the whole page in one pass. Stop at each checkpoint and report.

**Phase 0 — Inspection.** Output a written summary: the section map you derived from `content.json`, the count of blocks assigned to each section, and any block you could not confidently assign. **Stop. Report before coding.**

**Phase 1 — Foundation.** Project scaffold, fonts, Tailwind tokens, `lib/content.ts` loader, image download and WebP conversion script. No sections yet. **Stop. Report.**

**Phase 2 — Vertical slice.** Build sections 1 and 2 only (hero + trust bar), fully responsive, from real content. **Stop. Report with screenshots at 375px and 1440px.**

**Phase 3 — Remaining sections.** Build 3–10 in order. Commit per section.

**Phase 4 — Verification.** Run §10 in full. Fix what fails. Report results as a table.

---

## 9. The countdown timer — handle explicitly

The live page shows an evergreen countdown ("Registration Closing In: 03 Days…") plus "Limited Seats" and "we are limited on our virtual bandwidth."

India's CCPA Guidelines for Prevention and Regulation of Dark Patterns, 2023 list *False Urgency* as the first of 13 specified dark patterns, and a timer that resets on refresh is the standard example. This is a client decision, not yours.

**What to build:** a `<CohortDate />` component driven by a single config value:

```ts
export const COHORT = {
  startDate: "2026-10-06",     // real batch start
  showCountdown: false,        // client toggles
}
```

Default `showCountdown: false`, rendering a plain "Next batch starts 6 October 2026." When `true`, it counts down to `startDate` and disappears after it passes. Never generate a timer from `Date.now() + n days`.

Note this decision in `CORRECTIONS.md` for the client.

---

## 10. Acceptance criteria

Every item must pass. Report as a checklist with actual measured values.

**Content parity**
- [ ] Every non-duplicate block in `content.json` appears on the page. Write a script that asserts this and include it as `scripts/verify-parity.ts`
- [ ] Zero copy strings hardcoded in `.tsx` files (grep-verifiable)
- [ ] All original typos preserved; all listed in `CORRECTIONS.md`
- [ ] All 8 FAQ pairs, 9 modules, 6 mentors present

**Structure**
- [ ] Exactly one `<h1>`
- [ ] Heading levels nest without skipping
- [ ] No duplicated desktop/mobile DOM trees — one responsive tree
- [ ] All 36 images served locally; zero requests to imgur or `rvs-pricing-card.vercel.app`

**Performance** (Lighthouse mobile, throttled)
- [ ] Performance score ≥ 90
- [ ] HTML transfer < 60 KB (original: 247 KB)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Zero Vimeo player scripts loaded until a facade is clicked
- [ ] Total page weight on first load < 800 KB

**Accessibility**
- [ ] Lighthouse Accessibility ≥ 95
- [ ] All images have meaningful `alt` (empty `alt=""` only for decorative)
- [ ] Keyboard: full traversal, visible focus ring on every interactive element
- [ ] Accordion and FAQ operable by keyboard, correct ARIA state
- [ ] Body/background contrast ≥ 4.5:1; accent CTA text ≥ 4.5:1
- [ ] `prefers-reduced-motion` respected

**Responsive**
- [ ] No horizontal scroll at 320px
- [ ] Tap targets ≥ 44×44px
- [ ] Verified at 320, 375, 768, 1024, 1440

**Functional**
- [ ] Every CTA scrolls to the lead form
- [ ] Form validates, blocks invalid submit, shows success state
- [ ] All 9 accordion modules and 8 FAQ items open and close

---

## 11. Edge cases

- `content.json` block that fits no section → render in a visible `UNASSIGNED` debug block in dev, log a warning. Never silently drop content.
- Missing or 404 image during download → placeholder with the original URL as `alt`, and list it in the Phase 1 report.
- Duplicate mentor headshots in source data → render once per mentor; note the dedupe.
- Vimeo facade thumbnail unavailable → neutral placeholder with a play affordance, still click-to-load.
- Long unbroken strings on 320px → `overflow-wrap: anywhere` on prose containers.
- JS disabled → all text content still readable; accordions default open via `<details>` native behaviour.

---

## 12. Deliverables

```
/app/page.tsx
/components/           # one per section, presentational only
/lib/content.ts        # typed loader + SECTION_MAP
/lib/cohort.ts
/content/content.json
/public/images/        # 36 local WebP + fallbacks
/scripts/fetch-images.ts
/scripts/verify-parity.ts
CORRECTIONS.md         # typos, deviations, image-locked copy gaps, timer decision
README.md              # run, build, static export, how to edit content
```

---

## 13. Rules of engagement

- Inspect before you change. Never assume a file's contents.
- If the spec and `content.json` conflict, `content.json` wins for content and the spec wins for structure. Flag the conflict; do not resolve it silently.
- If a requirement is ambiguous and the choice materially affects the outcome, stop and ask. Do not guess.
- Report what you could not complete. A partial build with an honest gap list is more useful than a complete-looking build with invented content.
- Do not add features, sections, claims, testimonials, statistics, or company names that are not in `content.json`.

---

## Appendix A — Reference sites

**How to use this appendix.** These are references for *structure, content strategy, and quality bar*. They are not visual references. Where a reference conflicts with §6, **§6 wins**. Do not copy any reference's palette, typeface, illustration style, or layout wholesale. Take the pattern, apply our tokens.

If you cannot browse, use the described patterns below — they are sufficient. Do not fabricate details about these sites.

### A.1 — Primary: Scaler Academy (`scaler.com/academy`)

Same market, same buyer, heavily optimised. This is the structural spine of our rebuild.

| Take | Applies to |
|---|---|
| **Real cohort date, not a countdown.** The page states the next cohort month plainly. Market leader precedent for §9 | §9, Section 1 |
| **Trust bar directly under the hero** — placement report, alumni outcomes, company logos before any sales copy | Section 2 |
| **"Who is this for" segmented by starting point**, not a generic bullet wall. Each segment gets its own "what you'll gain" list | Section 3 |
| **Lead magnets as real artifacts** — "Download Brochure", "Placement Report" alongside the primary CTA | Sections 1, 10 |
| **Collapsed syllabus accordion.** Depth available on demand, never dumped open | Section 4 |
| **Named alumni with company and role** rather than screenshot walls | Section 6 |

**Do not copy:** its page weight. It ships ~972 KB of HTML. Our budget is under 60 KB (§10).

### A.2 — Quality bar: Joy of React (`joyofreact.com`) and CSS for JS (`css-for-js.dev`)

Long-form course sales pages executed at a much higher craft level than the site we are replacing. Reference these for *discipline*, not appearance.

| Take | Applies to |
|---|---|
| **Every word is real, selectable, indexable text.** Zero copy baked into images. This is the single most important transferable property | Rules §5.4, Sections 6 & 8 |
| **Strict type scale and generous vertical rhythm.** A long page reads as authoritative when spacing is disciplined | §6 |
| **Body line length held well under 80 characters** even on wide screens | §6 |
| **Module/curriculum accordion** with a clear count and duration per module | Section 4 |
| **Instructor presented as a person** — one good photo, a real bio, a specific credential. Not a repeated stock headshot | Section 5 |
| **FAQ that answers real objections** (refunds, time commitment, prerequisites) rather than marketing restatements | Section 9 |
| **Pricing tiers and the guarantee as structured HTML**, with the guarantee adjacent to the price | Section 8 |
| **262–346 KB total page weight** for pages of comparable length | §10 |

**Do not copy:** the typefaces (Wotfard is a paid commercial licence — we use Clash Grotesk and Satoshi per §6), the handwritten accent font, the saturated multi-colour palettes, the illustrated mascots, or the interactive toy components. That aesthetic signals "playful individual" to a Western developer audience. Our buyer needs institutional credibility.

### A.3 — Audience-fit references

| Site | Best part | Applies to |
|---|---|---|
| `apnacollege.in` (use `www.`) | Closest audience match — founder-led, YouTube-driven, Tier-2/3 students. Batch cards, mobile-first type sizing, affordability framed without looking cheap | Sections 1, 8 |
| `takeuforward.org/plus` | Founder brand carried by voice and one photo instead of stacked headings. Clean, uncluttered pricing block | Sections 1, 5, 8 |
| `masaischool.com` | Strong outcome claims phrased without the word "guaranteed". Directly relevant to the client's advertising-standards exposure — mirror this phrasing discipline when the client supplies replacement copy | Section 6, `CORRECTIONS.md` |
| `crio.do` | Curriculum made scannable — module cards with skills and project outcomes instead of raw bullet lists. We have 203 bullets to tame | Section 4 |
| `100xdevs.com` | Proof that a stripped-down cohort page converts in this market. Use as a restraint check: if a section is doing more than this, justify it | All |

### A.4 — Pattern-to-section lookup

Build each section against its named reference pattern:

```
Section 1  Hero            -> Scaler hero + real cohort date; Apna College mobile type
Section 2  Trust bar       -> Scaler trust strip
Section 3  Who it's for    -> Scaler segmented "who is this for"
Section 4  Curriculum      -> Joy of React accordion + Crio module cards
Section 5  Mentors         -> Joy of React instructor block; takeuforward founder framing
Section 6  Outcomes        -> Scaler named-alumni cards (markup prepared, image fallback for now)
Section 7  Reviews         -> click-to-play facades, no reference needed
Section 8  Pricing         -> CSS for JS pricing + guarantee adjacency; Apna College EMI framing
Section 9  FAQ             -> Joy of React objection-led FAQ
Section 10 Final CTA       -> Scaler dual CTA (primary form + secondary lead magnet)
```

### A.5 — Standing rule

If you find yourself reproducing a reference's colours, fonts, illustrations, or copy, stop. You have crossed from referencing a pattern to cloning a site. The tokens in §6 are the only visual identity for this build.
