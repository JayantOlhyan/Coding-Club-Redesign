"use client";

import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  BulletBlock,
  ParagraphBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function WhoThisIsFor() {
  const h17 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[0]);
  const h18 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[1]);
  const h19 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[2]);
  const imgBlock = getBlock<ImageBlock>(SECTION_MAP.whoThisIsFor.image);
  const items = SECTION_MAP.whoThisIsFor.items.map((idx) => getBlock<BulletBlock>(idx));
  const closingBlock = getBlock<ParagraphBlock>(SECTION_MAP.whoThisIsFor.closingText);

  const imgMeta = getImageMeta(imgBlock.src);
  const imgSrc = getLocalImagePath(imgBlock.src);

  return (
    <section id="who-this-is-for" className="relative w-full bg-white py-24 lg:py-36 border-b border-slate-200/80">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span
              data-block={SECTION_MAP.whoThisIsFor.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h17.text}
            </span>
            <h2
              data-block={SECTION_MAP.whoThisIsFor.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] mb-4 leading-tight"
            >
              {h18.text}
            </h2>
            <p
              data-block={SECTION_MAP.whoThisIsFor.headings[2]}
              className="text-base lg:text-[18px] font-normal text-slate-600 leading-[1.6]"
            >
              {h19.text}
            </p>
          </div>
        </ScrollReveal>

        {/* Responsive Grid / Mobile Swipe Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Container: Mobile touch carousel (<md) / 2-Col Grid (md+) */}
          <div className="lg:col-span-8 flex md:grid flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible gap-4 md:gap-6 pb-3 md:pb-0 snap-x touch-pan-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-2">
            {items.map((item, i) => {
              const blockIdx = SECTION_MAP.whoThisIsFor.items[i];
              return (
                <ScrollReveal key={blockIdx} direction="up" delay={100 + i * 60} className="snap-start shrink-0 w-[82vw] max-w-[320px] md:w-auto md:max-w-none">
                  <MotionCard className="h-full flex flex-col justify-between hover:border-blue-400/60 transition-all duration-300">
                    <div className="flex items-start gap-3.5">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-200 shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                      </span>
                      <p
                        data-block={blockIdx}
                        className="text-sm sm:text-base lg:text-[17px] font-normal text-slate-700 leading-[1.6]"
                      >
                        {item.text}
                      </p>
                    </div>
                  </MotionCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Supporting Visual Feature (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <ScrollReveal direction="left" delay={200}>
              <div className="w-full max-w-[340px] rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50 metallic-panel">
                <img
                  src={imgSrc}
                  alt={imgBlock.alt}
                  width={imgMeta.width}
                  height={imgMeta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Closing Affirmation Callout */}
        <ScrollReveal direction="up" delay={300}>
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white border border-blue-200/80 text-left shadow-sm">
            <p
              data-block={SECTION_MAP.whoThisIsFor.closingText}
              className="text-base lg:text-[18px] font-medium text-slate-900 leading-[1.6]"
            >
              {closingBlock.text}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
