"use client";

import { getBlock, getImageMeta, getLocalImagePath, SECTION_MAP, HeadingBlock, ImageBlock } from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function TrustBar() {
  const logoHeadingBlock = getBlock<HeadingBlock>(SECTION_MAP.trustBar.logoStripHeading);
  const logoImageBlock = getBlock<ImageBlock>(SECTION_MAP.trustBar.logoStripImage);
  const communityHeadingBlock = getBlock<HeadingBlock>(SECTION_MAP.trustBar.communityHeading);
  const proofImageBlocks = SECTION_MAP.trustBar.proofImages.map((idx) =>
    getBlock<ImageBlock>(idx)
  );

  const logoMeta = getImageMeta(logoImageBlock.src);
  const logoSrc = getLocalImagePath(logoImageBlock.src);

  return (
    <section className="relative w-full bg-slate-50/80 py-12 md:py-20 border-b border-slate-200/80">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-band 1: Company Logos Placement Strip */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left pb-12 border-b border-slate-200/80">
            <h2
              data-block={SECTION_MAP.trustBar.logoStripHeading}
              className="text-base lg:text-[17px] font-semibold text-slate-900 mb-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              {logoHeadingBlock.text}
            </h2>

            {/* TODO: image-locked copy, awaiting client text */}
            <div className="w-full flex items-center justify-center bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm metallic-panel">
              <img
                src={logoSrc}
                alt={logoImageBlock.alt || logoHeadingBlock.text}
                width={logoMeta.width}
                height={logoMeta.height}
                loading="eager"
                decoding="async"
                className="w-full max-h-[120px] md:max-h-[160px] object-contain mx-auto transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>

            {/* Prepared semantic container for future accessible text/SVG company logo strip */}
            <div className="hidden" aria-hidden="true" data-comment="prepared-markup-for-future-logo-strip">
              {/* Future SVG icons for Google, Amazon, Microsoft, Flipkart, etc. */}
            </div>
          </div>
        </ScrollReveal>

        {/* Sub-band 2: Community Proof */}
        <div className="text-left pt-12">
          <ScrollReveal direction="up" delay={100}>
            <h2
              data-block={SECTION_MAP.trustBar.communityHeading}
              className="text-[28px] lg:text-[40px] font-semibold text-slate-900 tracking-[-0.02em] mb-8 leading-tight"
            >
              {communityHeadingBlock.text}
            </h2>
          </ScrollReveal>

          {/* 2x2 grid on mobile, 4-column single row on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {proofImageBlocks.map((block, i) => {
              const meta = getImageMeta(block.src);
              const src = getLocalImagePath(block.src);
              return (
                <ScrollReveal key={i} direction="up" delay={150 + i * 80}>
                  <MotionCard className="!p-2 bg-white hover:border-blue-400/50 shadow-sm">
                    {/* TODO: image-locked copy, awaiting client text */}
                    <img
                      src={src}
                      alt={block.alt || communityHeadingBlock.text}
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
      </div>
    </section>
  );
}
