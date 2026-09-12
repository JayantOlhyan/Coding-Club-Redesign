"use client";

import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
} from "@/lib/content";
import { COHORT } from "@/lib/cohort";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

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
    <section className="relative w-full bg-white py-24 lg:py-36 border-b border-slate-200/80">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full text-left">
          {/* Section Heading */}
          <ScrollReveal direction="up" delay={0}>
            <h2
              data-block={SECTION_MAP.whatToExpect.heading}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] mb-8 leading-tight"
            >
              {h46.text}
            </h2>
          </ScrollReveal>

          {/* Live Batch Highlight Pill */}
          <ScrollReveal direction="up" delay={60}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-sm font-semibold text-emerald-800 mb-6 shadow-xs">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              <span data-block={SECTION_MAP.whatToExpect.h1Features[0]}>
                {h49.text}
              </span>
            </div>
          </ScrollReveal>

          {/* Key Value Subheading */}
          <ScrollReveal direction="up" delay={120}>
            <h3
              data-block={SECTION_MAP.whatToExpect.h1Features[1]}
              className="text-[20px] lg:text-[26px] font-semibold text-slate-900 tracking-[-0.01em] mb-8 leading-snug"
            >
              {h50.text}
            </h3>
          </ScrollReveal>

          {/* Structured Value Proposition Panel */}
          <ScrollReveal direction="up" delay={180}>
            <MotionCard className="!p-6 md:!p-8 mb-8 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
              <p
                data-block={SECTION_MAP.whatToExpect.h1Features[2]}
                className="text-base lg:text-[17px] font-semibold text-blue-600 mb-2"
              >
                {h51.text}
              </p>
              <h4
                data-block={SECTION_MAP.whatToExpect.h1Features[3]}
                className="text-[22px] lg:text-[26px] font-semibold text-slate-900 tracking-[-0.01em] mb-3 leading-tight"
              >
                {h52.text}
              </h4>
              <p
                data-block={SECTION_MAP.whatToExpect.h1Features[4]}
                className="text-base lg:text-[17px] font-medium text-slate-800 mb-1"
              >
                {h53.text}
              </p>
              <p
                data-block={SECTION_MAP.whatToExpect.h1Features[5]}
                className="text-base lg:text-[17px] font-normal text-slate-600"
              >
                {h54.text}
              </p>
            </MotionCard>
          </ScrollReveal>

          {/* Founder Quote Callout */}
          <ScrollReveal direction="up" delay={240}>
            <div className="p-6 md:p-8 rounded-2xl border-l-4 border-blue-600 bg-slate-50/90 shadow-sm mb-8">
              <blockquote
                data-block={SECTION_MAP.whatToExpect.h1Features[6]}
                className="text-base lg:text-[18px] font-medium italic text-slate-800 leading-[1.6]"
              >
                {h55.text}
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Urgency & Scarcity Section */}
          <ScrollReveal direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              {COHORT.showCountdown && (
                <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900 font-medium">
                  <span
                    className="w-2 h-2 rounded-full bg-amber-500"
                    aria-hidden="true"
                  />
                  <span data-block={SECTION_MAP.whatToExpect.urgencyLabel}>
                    {getBlock<HeadingBlock>(SECTION_MAP.whatToExpect.urgencyLabel).text}
                  </span>
                </div>
              )}
              <div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-slate-900">
                <span
                  className="w-2 h-2 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                <span data-block={SECTION_MAP.whatToExpect.scarcityText}>
                  {p57.text}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
