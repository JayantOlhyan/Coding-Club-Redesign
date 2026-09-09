# Agent Prompt — codingclub.tech Redesign Prototype

Copy everything below the line into your coding agent as the opening message.
Attach `PRD-codingclub-redesign.md` and `content.json` to the same session.

---

You are building a redesign prototype of an existing, revenue-generating sales page. Read this entire message before doing anything.

## Files in this session

- `PRD-codingclub-redesign.md` — the authoritative spec. Read it fully before your first action.
- `content.json` — 390 extracted content blocks from the live site, in document order. The single source of truth for all copy.
- `images.txt` — 36 image URLs to migrate locally.

If any instruction I give you later conflicts with the PRD, say so and ask which wins. Do not silently pick one.

## Mission

Rebuild https://codingclub.tech/ as a single static Next.js page that is 100% content-identical to the original but structurally and visually rebuilt per the PRD. This is a prototype for client approval, not a production deploy.

## Before you write a single line of code

Do all of this first:

1. Read `PRD-codingclub-redesign.md` in full.
2. Read `content.json` in full — all 390 blocks, not a sample.
3. Read `images.txt`.
4. Fetch https://codingclub.tech/ and inspect the live page so you understand the section rhythm and CTA placement you are replacing.
5. List the files already in the working directory. Do not assume the project is empty and do not overwrite anything you have not read.

Then produce **Phase 0 output** and stop:

- The section map you derived: which `content.json` block indices belong to which of the 10 sections in PRD §7.
- A count of blocks assigned per section.
- Every block you could not confidently assign, quoted with its index.
- Any conflict you found between the PRD and `content.json`.

**Stop there. Wait for my approval before Phase 1.**

## Non-negotiable rules

1. **No copy in code.** Every string a user reads comes from `content.json` via the typed loader. If a sentence of marketing copy appears in a `.tsx` file, that is a bug. I will grep for it.
2. **Preserve typos exactly.** The source contains "Hackkerrank", "Platfoms", "assignements", "referals", "Unforgetable", "Get Stared", "Coding Maifa". Render them verbatim. Append each to `CORRECTIONS.md` instead of fixing it inline. Content parity has to be provable to the client.
3. **Invent nothing.** No testimonial, statistic, company name, alumni name, price, placement figure, or claim that is not already in `content.json`. If a section needs text that only exists inside an image, render the image and add `<!-- TODO: image-locked copy, awaiting client text -->`. Do not write substitute copy.
4. **Do not rewrite, condense, reorder, or improve any sentence.** You are changing structure and presentation only. The copy is the client's revenue asset.
5. **No scope additions.** Nothing from the PRD §3 out-of-scope list. No extra sections, no dark mode, no scroll animation, no component library, no state manager, no form library.
6. **Follow the design spec exactly.** Fonts, type scale, color tokens, layout, and the forbidden-treatments list in PRD §6 are fixed decisions. Do not substitute your own aesthetic judgement, and do not "improve" the palette.
7. **Reference sites are for patterns, not appearance.** PRD Appendix A names a reference pattern for each of the 10 sections. Use them for structure, information hierarchy, and quality bar. Never reproduce a reference site's palette, typeface, illustrations, or copy — where a reference conflicts with §6, §6 wins. If you catch yourself cloning a site rather than applying a pattern, stop and say so.

## Workflow

Work in the phases defined in PRD §8. At each gate, stop and report. Do not chain phases.

| Phase | Deliverable | Gate |
|---|---|---|
| 0 | Section map + unassigned blocks | Stop, report, wait |
| 1 | Scaffold, fonts, tokens, content loader, image migration script | Stop, report, wait |
| 2 | Hero + trust bar only, fully responsive, real content | Stop, report with screenshots at 375px and 1440px, name the Appendix A pattern each section follows, wait |
| 3 | Sections 3–10, one commit per section | Report after each section |
| 4 | Full verification run | Report results table |

Commit after every section with a message naming the section. Never make a single commit containing more than one section.

## Verify your own work before claiming anything is done

You do not get to assert that a phase passed. You must show measured evidence:

- Write and run `scripts/verify-parity.ts`, which asserts every non-duplicate block in `content.json` renders on the page. Paste the actual output.
- Run Lighthouse mobile. Paste the four scores as numbers.
- Grep the codebase for hardcoded copy strings. Paste the result.
- Confirm zero network requests to `i.imgur.com` or `rvs-pricing-card.vercel.app`. Paste the evidence.
- Take screenshots at 320, 375, 768, 1024, 1440 and check for horizontal scroll.

Then report PRD §10 as a checklist with the real measured value next to each item. Mark anything that fails as **FAILED**, not as "mostly working" or "should be fine."

## When you are stuck or unsure

- If a requirement is ambiguous and the choice materially changes the output, **stop and ask one specific question.** Do not guess and do not build both variants.
- If something in `content.json` does not make sense, quote the block index and ask. Do not repair it.
- If you cannot make an acceptance criterion pass, say so plainly and explain what blocks it. A partial build with an honest gap list is worth more to me than a complete-looking build with invented content.
- Never report success on something you did not actually run.

## Forbidden actions

- Deleting or overwriting a file you have not read
- Running destructive git commands (`reset --hard`, `push --force`, `clean -fd`)
- Installing dependencies not required by the PRD stack
- Refactoring or reformatting code outside the section you are currently building
- Generating a timer from `Date.now() + n days` — see PRD §9, the cohort date is config-driven and defaults to no countdown
- Marking a checklist item as passing based on reasoning rather than execution

## Definition of done

All of PRD §10 passes with measured evidence, plus `CORRECTIONS.md` and `README.md` exist and are accurate.

Start with Phase 0 now.
