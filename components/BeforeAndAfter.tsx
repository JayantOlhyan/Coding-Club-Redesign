"use client";

import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  BulletBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function BeforeAndAfter() {
  const h337 = getBlock<HeadingBlock>(SECTION_MAP.beforeAndAfter.headings[0]);
  const h338 = getBlock<HeadingBlock>(SECTION_MAP.beforeAndAfter.headings[1]);

  const beforeHeading = getBlock<HeadingBlock>(
    SECTION_MAP.beforeAndAfter.before.heading
  );
  const beforeImage = getBlock<ImageBlock>(
    SECTION_MAP.beforeAndAfter.before.image
  );
  const beforeImageMeta = getImageMeta(beforeImage.src);
  const beforeImageSrc = getLocalImagePath(beforeImage.src);

  const afterHeading = getBlock<HeadingBlock>(
    SECTION_MAP.beforeAndAfter.after.heading
  );
  const afterImage = getBlock<ImageBlock>(
    SECTION_MAP.beforeAndAfter.after.image
  );
  const afterImageMeta = getImageMeta(afterImage.src);
  const afterImageSrc = getLocalImagePath(afterImage.src);

  return (
    <section
      id="before-after"
      aria-label="Before and After"
      className="relative w-full bg-white py-24 lg:py-36 border-b border-slate-200/80 bg-tech-grid"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span
              data-block={SECTION_MAP.beforeAndAfter.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h337.text}
            </span>
            <h2
              data-block={SECTION_MAP.beforeAndAfter.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h338.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* BEFORE Card */}
          <ScrollReveal direction="right" delay={100}>
            <MotionCard className="h-full flex flex-col justify-between !border-rose-200 bg-rose-50/20 shadow-md">
              <div>
                <h3
                  data-block={SECTION_MAP.beforeAndAfter.before.heading}
                  className="text-[22px] lg:text-[26px] font-semibold text-rose-900 tracking-[-0.01em] mb-4 flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  {beforeHeading.text}
                </h3>

                <div className="w-full rounded-xl overflow-hidden border border-rose-200 bg-white mb-6 p-2 shadow-xs">
                  {/* TODO: image-locked copy, awaiting client text */}
                  <img
                    src={beforeImageSrc}
                    alt={beforeImage.alt || beforeHeading.text}
                    width={beforeImageMeta.width}
                    height={beforeImageMeta.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                <ul className="space-y-4">
                  {SECTION_MAP.beforeAndAfter.before.bullets.map((bIdx) => {
                    const b = getBlock<BulletBlock>(bIdx);
                    return (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-sm md:text-base text-slate-700 leading-[1.6]"
                      >
                        <svg
                          className="w-4 h-4 mt-1 flex-shrink-0 text-rose-500 fill-none stroke-current"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span data-block={bIdx}>{b.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </MotionCard>
          </ScrollReveal>

          {/* AFTER Card: Visually opposed with emerald accent */}
          <ScrollReveal direction="left" delay={150}>
            <MotionCard className="h-full flex flex-col justify-between !border-emerald-200 bg-emerald-50/20 border-l-4 border-l-emerald-600 shadow-md">
              <div>
                <h3
                  data-block={SECTION_MAP.beforeAndAfter.after.heading}
                  className="text-[22px] lg:text-[26px] font-semibold text-emerald-900 tracking-[-0.01em] mb-4 flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  {afterHeading.text}
                </h3>

                <div className="w-full rounded-xl overflow-hidden border border-emerald-200 bg-white mb-6 p-2 shadow-xs">
                  <img
                    src={afterImageSrc}
                    alt={afterImage.alt || afterHeading.text}
                    width={afterImageMeta.width}
                    height={afterImageMeta.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                <ul className="space-y-4">
                  {SECTION_MAP.beforeAndAfter.after.bullets.map((bIdx) => {
                    const b = getBlock<BulletBlock>(bIdx);
                    return (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-sm md:text-base text-slate-900 font-medium leading-[1.6]"
                      >
                        <svg
                          className="w-4 h-4 mt-1 flex-shrink-0 text-emerald-600 fill-none stroke-current"
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
              </div>
            </MotionCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
