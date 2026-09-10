# codingclub.tech Redesign Prototype

This repository contains the static Next.js redesign prototype for `codingclub.tech` ("Coding Mafia Batch"), built to strict parity specifications defined in `PRD-codingclub-redesign.md` and amended by client instructions.

---

## 1. Quick Start (Install, Dev & Static Export)

### Prerequisites
- Node.js 18.x or 20.x+
- npm

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
# Starts local development server at http://localhost:3000
```

### Static HTML Production Export
```bash
npm run build
# Compiles Next.js and outputs standalone static HTML bundle to out/
```

To preview the production static export locally:
```bash
npx serve out -l 3000
```

---

## 2. Parity Guarantee & Content Architecture

- **Single Source of Truth**: `content.json` (390 extracted blocks from live site).
- **100% Bijection**: Every block is accounted for — 383 active in `SECTION_MAP`, exactly 7 documented drops (`CORRECTIONS.md`).
- **100% Copy Fidelity**: All copy loaded via `lib/content.ts` from `content.json`. Zero hardcoded string literals in `.tsx` components.
- **Zero DOM Leaks**: Monitored by a Puppeteer TreeWalker audit ensuring zero un-attributed text nodes in the DOM body.

---

## 3. How to Edit Content via `content.json`

To update headlines, bullet points, bios, or FAQs:
1. Open `content.json`.
2. Locate the corresponding block by index or search for the text.
3. Edit the `text` field directly.
4. Run `npm run build` to re-export the static site.
5. Run `npx tsx scripts/verify-copy.ts` to confirm exact string equality and check for unintended regressions.

---

## 4. How to Re-run the Extractor to Re-sync with Live Site

If copy changes are made to the legacy production website at `https://codingclub.tech/`:
1. Re-run the Python extraction script:
   ```bash
   python3 scripts/extract_content.py
   ```
2. Update `content.json` with newly extracted blocks.
3. Run the parity verifier:
   ```bash
   npx tsx scripts/verify-parity.ts
   ```
4. Re-run image migration if new images were added:
   ```bash
   npx tsx scripts/fetch-images.ts
   ```

---

## 5. How to Toggle Cohort Date and Countdown

Cohort scheduling and urgency banners are configured in [`lib/cohort.ts`](./lib/cohort.ts):

```ts
export const COHORT = {
  startDate: "2026-10-06",        // Real batch start date (YYYY-MM-DD)
  showCountdown: false,          // Toggle: false = static date, true = live countdown
  batchLabelPrefix: "Next batch starts",
  countdownLabel: "Batch starts in",
};
```

- **When `showCountdown: false` (Default)**: The announcement pill and Section 5 display the real batch date cleanly without false countdowns. Blocks 5 and 56 are conditionally omitted to prevent dangling labels.
- **When `showCountdown: true`**: Blocks 5 and 56 render verbatim, followed by an active JavaScript countdown clock calculating days, hours, minutes, and seconds to `COHORT.startDate`.
- **Build-Time Assertion**: The build fails immediately if `COHORT.startDate` is set in the past relative to the build date.

---

## 6. Verification Suite

Run all quality and parity verification gates:

```bash
# 1. Verify 1-to-1 Bijection and Image Manifest
npx tsx scripts/verify-parity.ts

# 2. Verify Exact Copy Fidelity and Inverse DOM TreeWalker Leaks
npx tsx scripts/verify-copy.ts

# 3. Verify Responsive Viewports, Interactivity, Forms, and Accordions
npx tsx scripts/test-phase4.ts
```

---

## 7. Technical Architecture & Design System

### Typography
Self-hosted WOFF2 fonts via `@font-face` in `app/globals.css`:
- **Headings**: Clash Grotesk (weights 500 and 600 only).
- **Body**: Satoshi (weights 400 and 700 only; 500 strictly excluded).
- Scale: `h1` (32px mobile / 48px desktop), `h2` (24px / 32px), `h3` (20px / 24px), `body` (16px / 17px, line-height 1.6, max width 68ch).

### Color & Elevation Tokens
- `--ink: #16181D` (headings)
- `--body: #444750` (body text)
- `--surface: #FFFFFF` (primary cards)
- `--surface-2: #F7F6F3` (alternating section bands)
- `--accent: #F59E0B` (primary CTA amber)
- `--accent-hover: #D97706` (CTA hover state)
- `--success: #0E7C5A` (outcome/placement badges)
- `--border: #E4E2DD` (card borders and dividers)

### 13-Section Layout Structure
1. Hero (`Block 6`, single `<h1>`, dynamic cohort date)
2. Trust Bar (Student count, mentor credentials, company logo strip, community metrics)
3. Who This Is For (6 persona cards in 2-col responsive grid)
4. CtaBand A (`Blocks 28–30`)
5. Why Join / Benefits (4 core advantages)
6. CtaBand B (`Blocks 42–45`)
7. What to Expect (Masterclass value proposition)
8. CtaBand C (`Block 59`)
9. Curriculum (9 modules, 186 bullets, native `<details>` accordions)
10. CtaBand D (`Blocks 292–295`)
11. Mentors (6 mentors & TAs, deduplicated bios)
12. CtaBand E (`Blocks 314–316`)
13. Outcomes (Alumni placement proofs)
14. Reviews (9 Vimeo click-to-play facades)
15. Before & After (2-col comparative transformation grid)
16. Pricing (Semantic HTML card + WebP fallback)
17. FAQ (8 native `<details>` items, collapsed by default)
18. Final CTA + Form + Footer (Lead form with validation, WhatsApp link, legal links)

---

## 8. Measured Performance & Audit Scores

| Category | Live Site (`https://codingclub.tech/`) | Prototype (`out/`) |
|---|:---:|:---:|
| **Performance** | 56 | **99** |
| **Accessibility** | 74 | **100** |
| **Best Practices** | 69 | **96** |
| **SEO** | 92 | **100** |
| **First Contentful Paint (FCP)** | 3.6 s | **1.5 s** |
| **Largest Contentful Paint (LCP)** | 8.8 s | **1.5 s** |
| **Cumulative Layout Shift (CLS)** | 0.107 | **0.000** |
| **Total Blocking Time (TBT)** | 320 ms | **10 ms** |

---

## 9. Client Documentation & Deployment

- [`DECISIONS.md`](./DECISIONS.md) — Plain-language client review package (Part A: Changes & Rationale, Part B: Image-locked Assets Needed, Part C: Strategic Decisions).
- [`CORRECTIONS.md`](./CORRECTIONS.md) — Engineering log of preserved typos, structural adaptations, and regulatory review.
- [`DEPLOY.md`](./DEPLOY.md) — Production hosting targets (Cloudflare Pages/Netlify), DNS configuration, and lead form backend wiring.
- [`IMAGE-LEDGER.md`](./IMAGE-LEDGER.md) — Complete 36-image migration ledger.
