"use client";

import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function Outcomes() {
  const h317 = getBlock<HeadingBlock>(SECTION_MAP.outcomes.headings[0]);
  const h318 = getBlock<HeadingBlock>(SECTION_MAP.outcomes.headings[1]);
  const screenshots = SECTION_MAP.outcomes.screenshots.map((idx) =>
    getBlock<ImageBlock>(idx)
  );

  return (
    <section
      id="outcomes"
      aria-label="Outcomes"
      className="relative w-full bg-slate-50/70 py-24 lg:py-36 border-b border-slate-200/80"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span
              data-block={SECTION_MAP.outcomes.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h317.text}
            </span>
            <h2
              data-block={SECTION_MAP.outcomes.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h318.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* TODO: image-locked copy, awaiting client text */}
        {/* Placement Proof Screenshots Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {screenshots.map((item, i) => {
            const idx = SECTION_MAP.outcomes.screenshots[i];
            const meta = getImageMeta(item.src);
            const src = getLocalImagePath(item.src);

            return (
              <ScrollReveal key={idx} direction="up" delay={120 + i * 60}>
                <MotionCard className="!p-2 relative bg-white hover:border-emerald-400/60 shadow-md">
                  {/* Placement indicator badge */}
                  <div
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md z-10"
                    aria-hidden="true"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                  </div>
                  <img
                    src={src}
                    alt={item.alt || "Student placement success story"}
                    width={meta.width}
                    height={meta.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </MotionCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Prepared semantic container for future accessible text-based alumni cards */}
        <div
          className="hidden"
          aria-hidden="true"
          data-comment="prepared-markup-for-future-alumni-cards"
        >
          {/* Future text-based alumni cards: student name, company, role, package */}
        </div>
      </div>
    </section>
  );
}
