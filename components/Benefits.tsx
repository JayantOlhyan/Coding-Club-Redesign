"use client";

import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  ParagraphBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function Benefits() {
  const h31 = getBlock<HeadingBlock>(SECTION_MAP.benefits.headings[0]);
  const h32 = getBlock<HeadingBlock>(SECTION_MAP.benefits.headings[1]);
  const panels = SECTION_MAP.benefits.panels.map((idx) => getBlock<ImageBlock>(idx));
  const p36 = getBlock<ParagraphBlock>(SECTION_MAP.benefits.prose);

  return (
    <section className="relative w-full bg-slate-50/70 py-24 lg:py-36 border-b border-slate-200/80">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span
              data-block={SECTION_MAP.benefits.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h31.text}
            </span>
            <h2
              data-block={SECTION_MAP.benefits.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] mb-4 leading-tight"
            >
              {h32.text}
            </h2>
            <p
              data-block={SECTION_MAP.benefits.prose}
              className="text-base lg:text-[18px] font-normal text-slate-600 leading-[1.6]"
            >
              {p36.text}
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Column Grid: Benefit Graphic Cards */}
        {/* TODO: image-locked copy, awaiting client text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {panels.map((panel, i) => {
            const idx = SECTION_MAP.benefits.panels[i];
            const meta = getImageMeta(panel.src);
            const src = getLocalImagePath(panel.src);
            return (
              <ScrollReveal key={idx} direction="up" delay={120 + i * 80}>
                <MotionCard className="!p-2 h-full bg-white hover:border-blue-400/60 shadow-md">
                  <img
                    src={src}
                    alt={panel.alt || "Benefit overview"}
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
      </div>
    </section>
  );
}
