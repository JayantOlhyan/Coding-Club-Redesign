"use client";

import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  BulletBlock,
  CtaBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function Pricing() {
  const planName = getBlock<HeadingBlock>(SECTION_MAP.pricing.planName);
  const h351 = getBlock<HeadingBlock>(SECTION_MAP.pricing.headings[0]);
  const h352 = getBlock<HeadingBlock>(SECTION_MAP.pricing.headings[1]);

  const bullets = SECTION_MAP.pricing.bullets.map((idx) =>
    getBlock<BulletBlock>(idx)
  );
  const price1 = getBlock<HeadingBlock>(SECTION_MAP.pricing.priceTiers[0]);
  const price2 = getBlock<HeadingBlock>(SECTION_MAP.pricing.priceTiers[1]);
  const cta = getBlock<CtaBlock>(SECTION_MAP.pricing.cta);

  const whatH = getBlock<HeadingBlock>(SECTION_MAP.pricing.details[0].heading);
  const whatText = getBlock<ParagraphBlock>(SECTION_MAP.pricing.details[0].text);
  const whenH = getBlock<HeadingBlock>(SECTION_MAP.pricing.details[1].heading);
  const whenText = getBlock<ParagraphBlock>(SECTION_MAP.pricing.details[1].text);
  const whyH = getBlock<HeadingBlock>(SECTION_MAP.pricing.details[2].heading);
  const whyText = getBlock<ParagraphBlock>(SECTION_MAP.pricing.details[2].text);

  const closingH1 = getBlock<HeadingBlock>(
    SECTION_MAP.pricing.closingHeadings[0]
  );
  const closingH2 = getBlock<HeadingBlock>(
    SECTION_MAP.pricing.closingHeadings[1]
  );

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="relative w-full bg-slate-50/80 py-24 lg:py-36 border-b border-slate-200/80 bg-tech-grid"
    >
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Centered */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-10">
            <span
              data-block={SECTION_MAP.pricing.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h351.text}
            </span>
            <h2
              data-block={SECTION_MAP.pricing.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h352.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* Structured Pricing Card */}
        {/* TODO: image-locked copy, awaiting client text */}
        <ScrollReveal direction="up" delay={100}>
          <MotionCard className="!p-6 sm:!p-8 md:!p-10 mb-10 text-left bg-gradient-to-b from-white via-white to-blue-50/20 shadow-xl border-blue-200/60">
            {/* Plan Identifier */}
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 tracking-wider mb-4">
              <span data-block={SECTION_MAP.pricing.planName}>
                {planName.text}
              </span>
            </div>

            {/* Pricing Tiers & Discount Pill */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-6">
              <h3
                data-block={SECTION_MAP.pricing.priceTiers[0]}
                className="text-[22px] lg:text-[28px] font-semibold text-slate-900 tracking-[-0.01em]"
              >
                {price1.text}
              </h3>
              <span
                data-block={SECTION_MAP.pricing.priceTiers[1]}
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 self-start sm:self-auto shadow-xs"
              >
                {price2.text}
              </span>
            </div>

            {/* Value Bullets List */}
            <ul className="space-y-4 mb-8 pt-4 border-t border-slate-100">
              {SECTION_MAP.pricing.bullets.map((bIdx) => {
                const b = getBlock<BulletBlock>(bIdx);
                return (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3 text-sm md:text-base text-slate-700 leading-[1.6]"
                  >
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-600 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span data-block={bIdx}>{b.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* Primary Plan CTA Button */}
            <div className="pt-2">
              <a
                href="#lead-form"
                data-block={SECTION_MAP.pricing.cta}
                className="group relative inline-flex items-center justify-center min-h-[48px] w-full px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {cta.text}
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </MotionCard>
        </ScrollReveal>

        {/* Structured Program Logistics (WHAT, WHEN, WHY) */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10 text-left">
            {/* WHAT Card */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4
                data-block={SECTION_MAP.pricing.details[0].heading}
                className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1"
              >
                {whatH.text}
              </h4>
              <p
                data-block={SECTION_MAP.pricing.details[0].text}
                className="text-sm font-medium text-slate-900 leading-snug"
              >
                {whatText.text}
              </p>
            </div>

            {/* WHEN Card */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4
                data-block={SECTION_MAP.pricing.details[1].heading}
                className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1"
              >
                {whenH.text}
              </h4>
              <p
                data-block={SECTION_MAP.pricing.details[1].text}
                className="text-sm font-medium text-slate-900 leading-snug"
              >
                {whenText.text}
              </p>
            </div>

            {/* WHY Card */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h4
                data-block={SECTION_MAP.pricing.details[2].heading}
                className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1"
              >
                {whyH.text}
              </h4>
              <p
                data-block={SECTION_MAP.pricing.details[2].text}
                className="text-sm font-medium text-slate-900 leading-snug"
              >
                {whyText.text}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Closing Headings Affirmation: Centered */}
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center w-full">
            <p
              data-block={SECTION_MAP.pricing.closingHeadings[0]}
              className="text-base lg:text-[17px] font-medium text-slate-600 mb-2"
            >
              {closingH1.text}
            </p>
            <h3
              data-block={SECTION_MAP.pricing.closingHeadings[1]}
              className="text-[20px] lg:text-[26px] font-semibold text-slate-900 tracking-[-0.01em]"
            >
              {closingH2.text}
            </h3>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
