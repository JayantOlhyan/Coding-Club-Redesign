# Client Corrections & Technical Deviations Log

This document records all preserved typos, structural adaptations, documented block drops, and regulatory compliance decisions made during the redesign of `codingclub.tech`.

---

## 1. Source Typos Preserved Verbatim

Per PRD §5 Rule 2 and client instructions, all original copy is rendered verbatim on the page. None of the following typos have been altered inline:

| # | Block Index | Original Text Excerpt | Typo / Anomaly | Suggested Client Correction |
|---|---|---|---|---|
| 1 | 62 | `(Starting from scratch and practice on Hackkerrank)` | "Hackkerrank" (double k) | "Hackerrank" |
| 2 | 104 | `Choose Java or C++ (Practice on Leetcode, SPOJ, CSES Platfoms)` | "Platfoms" (missing r) | "Platforms" |
| 3 | 353 | `...exclusive 'Coding Mafia Batch' live classes, assignements...` | "assignements" (extra e) | "assignments" |
| 4 | 342 | `No good resume to get referals` | "referals" (single r) | "referrals" |
| 5 | 365 | `Now's The Time Get Stared For Unforgetable Experience...` | "Get Stared" & "Unforgetable" | "Get Started" & "Unforgettable" |
| 6 | 19 | keywords in meta: `Coding Maifa` | "Coding Maifa" | "Coding Mafia" |
| 7 | 350 | `Knowing EXACTLY how to solve any hard coding problems on tips!` | "on tips!" (idiomatic) | "at your fingertips!" |
| 8 | 358 | `YES, I Want To Join Coding Mafia BatchClick to avail...` | Missing space before "Click" | "Batch. Click" |
| 9 | 362 | `Starts on Registration Closing on` | Fragmented dates placeholder | Real batch dates |
| 10 | 368 | `Is this course is beginner friendly ?` | "Is this course is" (double is) | "Is this course beginner-friendly?" |
| 11 | 381 | `...if you are in hurry consult with team...` | "in hurry" | "in a hurry" |

---

## 2. Documented Block Drops

Per the governing client decision, the following 7 blocks from `content.json` are dropped from the active DOM tree:

| Block Index | Original Type | Content / URL | Reason for Drop |
|---|---|---|---|
| **3** | `image` | `https://rvs-pricing-card.vercel.app/tick.svg` | **Third-party runtime dependency.** Eliminated per PRD Rule 5. Replaced with local inline SVG checkmark. |
| **7** | `heading` (h1) | `"How To Start, Prepare, Or Crack High Paying Job/Intern Offers Using A ‘Coding Mafia’ (Online)!"` | **Mobile duplicate H1.** Desktop version (`Block 6`) is designated as the single responsive `<h1>` per PRD §10. |
| **47** | `image` | `https://codingclub.tech/static/images/cm/leftarrow.svg` | **Decorative SVG arrow.** Obsolete in responsive CSS layout; replaced with inline SVG if needed. |
| **48** | `image` | `https://codingclub.tech/static/images/cm/rightarrow.svg` | **Decorative SVG arrow.** Obsolete in responsive CSS layout; replaced with inline SVG if needed. |
| **58** | `image` | `https://codingclub.tech/static/images/cm/down.svg` | **Decorative SVG arrow.** Obsolete in responsive CSS layout; replaced with inline SVG if needed. |
| **141** | `image` | `https://i.imgur.com/A8rtTVc.jpg` | **Duplicate instructor headshot.** Repeated Rishabh Jain photo placed after Module 4; deduplicated per PRD §7 & §11. |
| **243** | `image` | `https://i.imgur.com/Vhbv4ng.jpg` | **Duplicate instructor headshot.** Repeated Rishabh Jain photo placed after Module 8; deduplicated per PRD §7 & §11. |

---

## 3. Structural & Functional Adaptations

1. **Section Structure Expanded (10 → 13 Sections)**:
   - Added Section 4: *Why join / Benefits* (`Blocks 31–36`)
   - Added Section 5: *What to expect* (`Blocks 46, 49–57`)
   - Added Section 10: *Before & After* (`Blocks 337–350`)
   - Moved community proof (`Blocks 37–41`) into Section 2 (*Trust bar*).
   - Preserved 5 deliberate CTA bands via reusable `<CtaBand>` component (`A: 28-30, B: 42-45, C: 59, D: 292-295, E: 314-316`).

2. **Lead Form Location & Required Fields**:
   - In the live site, form fields (`Blocks 11, 12, 13`) were hidden in the Hero section (`data-show-only="none"`). They are now rendered in Section 13 (*Final CTA + form*).
   - `phone` field (`Block 13`: `"Phone Number (Optional)"`) is now configured as a **required field** with validation, per PRD §7 & §10.

3. **Curriculum & Mentors Re-organization (Group D)**:
   - Blocks 75–81 (Teaching Assistance preview) and Block 82 (mid-curriculum CTA) previously interrupted Module 1.
   - Block 75 ("Teaching Assistance") now groups Teaching Assistants in Section 7 (Mentors).
   - Blocks 77 ("Rajat Bansal") and 79 ("Ashutosh Negi") provide the name headings for Mentors 4 and 6 in Section 7 (resolving the deduplication omission).
   - Block 82 serves as the closing CTA for Section 6 (Curriculum).

4. **Pricing Plan Name & Companies Banner (Blocks 0, 1, 2)**:
   - Blocks 0 ("You will be next one to crack:"), 1 (Companies logo banner), and 2 ("6 Month Batch") originally lived in the Razorpay modal. They are now integrated directly into Section 11 (*Pricing*).

---

## 4. Urgency and Scarcity Claims (Regulatory Review)

Under India's **Central Consumer Protection Authority (CCPA) Guidelines for Prevention and Regulation of Dark Patterns, 2023**, "False Urgency" (creating a false sense of urgency or scarcity to induce immediate purchase) is strictly regulated.

The following claims are present in `content.json` and are handled as follows:

| Block Index | Text / Claim | Original Context | Redesign Treatment | Client Action Required |
|---|---|---|---|---|
| **5** | `"Limited Seats. Registration Closing In"` | Top countdown bar | Handled via `<CohortDate />` component. Rendered with fixed date ("Next batch starts 6 October 2026") without resetting fake countdown timer. | Confirm cohort start date. |
| **16** | `"Don’t Wait! Registration Closes Soon!"` | Below hero CTA button | Rendered verbatim as supporting notice. | Review phrasing for compliance. |
| **56** | `"Registration Closing In:"` | Above batch countdown | Rendered only when `showCountdown: true` in `COHORT` config. | Keep toggleable for real batch deadlines. |
| **57** | `"Limited Seats, for 6 months batch!"` | Scarcity notice | Rendered verbatim as client prose. | Confirm actual batch seat cap. |
| **292–294** | `"But Hurry! We're Filling Up Fast... We are limited on our virtual bandwidth. That means once we’ve reached capacity, we’re closing down this page... So Don’t Wait! Join The Coding Mafia Batch Now!"` | Post-curriculum urgency band | Rendered verbatim in `<CtaBand>` D. | Review whether "virtual bandwidth limit" claim requires substantiation. |
