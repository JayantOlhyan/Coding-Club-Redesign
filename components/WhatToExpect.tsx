import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
} from "@/lib/content";
import { COHORT } from "@/lib/cohort";

export function WhatToExpect() {
  const h46 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.heading);
  const h49 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[0]);
  const h50 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[1]);
  const h51 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[2]);
  const h52 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[3]);
  const h53 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[4]);
  const h54 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[5]);
  const h55 = getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.h1Features[6]);
  const p57 = getBlock<ParagraphBlock>(SECTION_MAP.whatToExpect.scarcityText);

  return (
    <section className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[780px] text-left">
          {/* Section Heading */}
          <h2
            data-block={SECTION_MAP.whatToExpect.heading}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight mb-8"
          >
            {h46.text}
          </h2>

          {/* Live Batch Highlight Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-sm font-semibold text-[var(--ink)] mb-6">
            <span
              className="w-2 h-2 rounded-full bg-[var(--success)]"
              aria-hidden="true"
            />
            <span data-block={SECTION_MAP.whatToExpect.h1Features[0]}>
              {h49.text}
            </span>
          </div>

          {/* Key Value Subheading */}
          <h3
            data-block={SECTION_MAP.whatToExpect.h1Features[1]}
            className="text-xl sm:text-2xl font-semibold text-[var(--ink)] mb-8 leading-snug"
          >
            {h50.text}
          </h3>

          {/* Structured Value Proposition Panel */}
          <div className="p-6 md:p-8 rounded bg-[var(--surface-2)] border border-[var(--border)] mb-8">
            <p
              data-block={SECTION_MAP.whatToExpect.h1Features[2]}
              className="text-base sm:text-lg font-medium text-[var(--ink)] mb-2"
            >
              {h51.text}
            </p>
            <h4
              data-block={SECTION_MAP.whatToExpect.h1Features[3]}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--ink)] mb-3 leading-tight"
            >
              {h52.text}
            </h4>
            <p
              data-block={SECTION_MAP.whatToExpect.h1Features[4]}
              className="text-base sm:text-lg font-medium text-[var(--ink)] mb-1"
            >
              {h53.text}
            </p>
            <p
              data-block={SECTION_MAP.whatToExpect.h1Features[5]}
              className="text-base sm:text-lg font-normal text-[var(--body)]"
            >
              {h54.text}
            </p>
          </div>

          {/* Founder Quote Callout */}
          <div className="p-6 rounded border-l-4 border-[var(--accent)] bg-[var(--surface-2)] mb-8">
            <blockquote
              data-block={SECTION_MAP.whatToExpect.h1Features[6]}
              className="text-base md:text-lg font-normal italic text-[var(--ink)] leading-[1.6]"
            >
              {h55.text}
            </blockquote>
          </div>

          {/* Urgency & Scarcity Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            {COHORT.showCountdown && (
              <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--body)]">
                <span
                  className="w-2 h-2 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
                <span data-block={SECTION_MAP.whatToExpect.urgencyLabel}>
                  {getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.urgencyLabel).text}
                </span>
              </div>
            )}
            <div className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[var(--ink)]">
              <span
                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span data-block={SECTION_MAP.whatToExpect.scarcityText}>
                {p57.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
