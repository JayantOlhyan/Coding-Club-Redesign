# codingclub.tech Redesign Prototype

This repository contains the static Next.js redesign prototype for `codingclub.tech` ("Coding Mafia Batch"), built to strict parity specifications defined in `PRD-codingclub-redesign.md` and amended by client instructions.

---

## 1. Project Summary & Parity Guarantee

- **Framework**: Next.js 15 (App Router) configured for 100% static HTML export (`output: 'export'`).
- **Source of Truth**: `content.json` (390 extracted content blocks from the original production site).
- **Parity Guarantee**:
  - **100% Bijection**: Every one of the 390 blocks is accounted for — 383 active in the DOM tree across 13 sections, and exactly 7 documented drops (PRD Rule 5 and mobile duplicates, documented in `CORRECTIONS.md`).
  - **100% Copy Fidelity**: Zero copy invented, modified, or omitted. All copy is loaded via type-safe accessors in `lib/content.ts` from `content.json`.
  - **Zero Hardcoded Copy**: Grep assertions enforce zero string literals in UI component code.
  - **Zero Un-attributed DOM Leaks**: Puppeteer TreeWalker audits every text node in the document body. Only client-authorized dynamic text (`COHORT.batchDate` and `COHORT.label`) is permitted outside `[data-block]` elements.

---

## 2. Technical Architecture & Design System

### Typography
Self-hosted WOFF2 fonts from Fontshare (Indian Type Foundry) via `@font-face` in `app/globals.css`:
- **Headings**: Clash Grotesk (weights 500 and 600 only).
- **Body**: Satoshi (weights 400 and 700 only). Satoshi 500 is strictly excluded per spec.
- Type scale: `h1` (32px mobile / 48px desktop), `h2` (24px / 32px), `h3` (20px / 24px), `body` (16px / 17px, line-height 1.6, max width 68ch).

### Color & Elevation Tokens
- `--ink: #16181D` (headings)
- `--body: #444750` (body text)
- `--surface: #FFFFFF` (primary cards)
- `--surface-2: #F7F6F3` (alternating section bands)
- `--accent: #F59E0B` (primary CTA amber)
- `--accent-hover: #D97706` (CTA hover state)
- `--success: #0E7C5A` (outcome/placement badges)
- `--border: #E4E2DD` (card borders and dividers)

### Section Architecture (13 Sections)
1. **Section 1 — Hero**: Main headline (`Block 6`, single responsive `<h1>`), subhead (`Block 8`), dynamic cohort date (`COHORT`), primary CTA (`Block 14`).
2. **Section 2 — Trust Bar**: Student count (`Block 4`), mentor credentials (`Blocks 9, 10`), company placement proof (`Blocks 0, 1`), community metrics (`Blocks 37–41`).
3. **Section 3 — Who This Is For**: 6 target audience personas (`Blocks 17–27`) in a 2-col responsive grid.
4. **CtaBand A**: Mid-page CTA (`Blocks 28–30`).
5. **Section 4 — Why Join / Benefits**: 4 core curriculum advantages (`Blocks 31–36`).
6. **CtaBand B**: Urgency band (`Blocks 42–45`).
7. **Section 5 — What to Expect**: Step-by-step masterclass expectations (`Blocks 46, 49–57`).
8. **CtaBand C**: Action prompt (`Block 59`).
9. **Section 6 — Curriculum**: 9 modules (`Blocks 60–74, 83–140, 142–164, 165–291, 82`), 186 bullets, all collapsed by default via native `<details>`/`<summary>`.
10. **CtaBand D**: Scarcity CTA (`Blocks 292–295`).
11. **Section 7 — Mentors**: 6 industry mentors & TAs (`Blocks 75–81, 296–313`) with bios and credentials.
12. **CtaBand E**: Final push CTA (`Blocks 314–316`).
13. **Section 8 — Outcomes**: Alumni placement proofs (`Blocks 317–326`).
14. **Section 9 — Reviews**: 9 Vimeo video click-to-play facades (`Blocks 327–336`) with zero initial third-party scripts.
15. **Section 10 — Before & After**: 2-column comparative transformation grid (`Blocks 337–350`).
16. **Section 11 — Pricing**: Plan details (`Blocks 2, 351–366`) with full semantic HTML card structure and image-locked WebP fallback.
17. **Section 12 — FAQ**: 8 accordion questions and answers (`Blocks 367–383`), native `<details>`, all collapsed by default.
18. **Section 13 — Final CTA + Form + Footer**: Lead capture form (`Blocks 11, 12, 13`), WhatsApp direct line (`Block 389`), and legal links (`Blocks 385–388`).

---

## 3. Performance & Audit Scores

- **Lighthouse Mobile Performance**: **100 / 100**
- **Lighthouse Mobile Accessibility**: **100 / 100**
- **First Contentful Paint (FCP)**: **1.5s**
- **Largest Contentful Paint (LCP)**: **1.5s**
- **Cumulative Layout Shift (CLS)**: **0.000**
- **Total Blocking Time (TBT)**: **10ms**
- **HTML Wire Transfer (gzip)**: **34.9 KB** (budget: < 60 KB)
- **Zero Remote Runtime Requests**: All images converted to WebP locally (`public/images/`), zero calls to imgur or `rvs-pricing-card`.

---

## 4. Verification Suite

Run all quality and parity verification gates with:

```bash
# 1. Verify 1-to-1 Bijection and Image Manifest
npx tsx scripts/verify-parity.ts

# 2. Verify Exact Copy Fidelity and Inverse DOM TreeWalker Leaks
npx tsx scripts/verify-copy.ts

# 3. Verify Responsive Viewports, Interactivity, Forms, and Accordions
npx tsx scripts/test-phase4.ts

# 4. Build Static HTML Production Export
npm run build
```

---

## 5. Client Documentation

See [`CORRECTIONS.md`](./CORRECTIONS.md) for:
- Complete table of source copy typos preserved verbatim.
- Detailed accounting and rationale for all 7 documented block drops.
- CCPA Dark Pattern compliance review on scarcity and countdown timer claims.
- Trademark and third-party placement proof advisory notes.
