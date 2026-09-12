"use client";

import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  CtaBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";

interface CtaBandBaseProps {
  headings?: Array<{ index: number; as?: "h2" | "h3" | "p"; className?: string }>;
  paragraph?: { index: number; className?: string };
  cta: { index: number; className?: string };
  variant?: "dark" | "gradient" | "light";
}

export function CtaBandBase({
  headings = [],
  paragraph,
  cta,
  variant = "gradient",
}: CtaBandBaseProps) {
  const ctaBlock = getBlock<CtaBlock>(cta.index);

  const getContainerStyle = () => {
    switch (variant) {
      case "dark":
        return "bg-slate-900 text-white border-y border-slate-800 bg-tech-grid";
      case "light":
        return "bg-slate-50 text-slate-900 border-y border-slate-200/80 bg-tech-grid-dots";
      case "gradient":
      default:
        return "bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border-y border-blue-800/50 bg-tech-grid";
    }
  };

  return (
    <section className={`w-full py-16 md:py-20 relative overflow-hidden ${getContainerStyle()}`}>
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
        <ScrollReveal direction="up" delay={0}>
          {headings.map((item) => {
            const block = getBlock<HeadingBlock>(item.index);
            const Tag = item.as || "h2";
            const defaultClass =
              Tag === "h2"
                ? "text-[28px] lg:text-[40px] font-semibold tracking-[-0.02em] mb-4 leading-tight"
                : Tag === "h3"
                ? "text-[20px] lg:text-[24px] font-semibold tracking-[-0.01em] mb-3 leading-snug"
                : "text-base lg:text-[18px] font-normal leading-[1.6] mb-6 opacity-90";

            return (
              <Tag
                key={item.index}
                data-block={item.index}
                className={item.className || defaultClass}
              >
                {block.text}
              </Tag>
            );
          })}

          {paragraph && (() => {
            const pBlock = getBlock<ParagraphBlock>(paragraph.index);
            return (
              <p
                data-block={paragraph.index}
                className={
                  paragraph.className ||
                  "text-base lg:text-[18px] font-normal opacity-90 leading-[1.6] mb-8 max-w-[620px] mx-auto"
                }
              >
                {pBlock.text}
              </p>
            );
          })()}

          <div className="pt-2">
            <a
              href="#lead-form"
              data-block={cta.index}
              className={
                cta.className ||
                "group relative inline-flex items-center justify-center min-h-[48px] px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] cursor-pointer"
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                {ctaBlock.text}
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Instance A: Blocks 28, 29, 30
export function CtaBandA() {
  return (
    <CtaBandBase
      variant="gradient"
      headings={[
        { index: SECTION_MAP.ctaBandA.headings[0], as: "h2" },
        { index: SECTION_MAP.ctaBandA.headings[1], as: "p" },
      ]}
      cta={{ index: SECTION_MAP.ctaBandA.cta }}
    />
  );
}

// Instance B: Blocks 42, 43, 44, 45
export function CtaBandB() {
  return (
    <CtaBandBase
      variant="dark"
      headings={[
        { index: SECTION_MAP.ctaBandB.headings[0], as: "h2" },
        { index: SECTION_MAP.ctaBandB.headings[1], as: "h3" },
      ]}
      paragraph={{ index: SECTION_MAP.ctaBandB.paragraph }}
      cta={{ index: SECTION_MAP.ctaBandB.cta }}
    />
  );
}

// Instance C: Block 59
export function CtaBandC() {
  return (
    <CtaBandBase
      variant="light"
      cta={{ index: SECTION_MAP.ctaBandC.cta }}
    />
  );
}

// Instance D: Blocks 292, 293, 294, 295
export function CtaBandD() {
  return (
    <CtaBandBase
      variant="gradient"
      headings={[
        { index: SECTION_MAP.ctaBandD.headings[0], as: "h2" },
        { index: SECTION_MAP.ctaBandD.headings[1], as: "p" },
        { index: SECTION_MAP.ctaBandD.headings[2], as: "h3" },
      ]}
      cta={{ index: SECTION_MAP.ctaBandD.cta }}
    />
  );
}

// Instance E: Blocks 314, 315, 316
export function CtaBandE() {
  return (
    <CtaBandBase
      variant="dark"
      headings={[
        { index: SECTION_MAP.ctaBandE.headings[0], as: "h2" },
        { index: SECTION_MAP.ctaBandE.headings[1], as: "h3" },
      ]}
      cta={{ index: SECTION_MAP.ctaBandE.cta }}
    />
  );
}
