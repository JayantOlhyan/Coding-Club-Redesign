import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  CtaBlock,
} from "@/lib/content";

interface CtaBandBaseProps {
  headings?: Array<{ index: number; as?: "h2" | "h3" | "p"; className?: string }>;
  paragraph?: { index: number; className?: string };
  cta: { index: number; className?: string };
}

export function CtaBandBase({
  headings = [],
  paragraph,
  cta,
}: CtaBandBaseProps) {
  const ctaBlock = getBlock<CtaBlock>(cta.index);

  return (
    <section className="w-full bg-[var(--ink-surface)] py-16 md:py-20">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {headings.map((item) => {
          const block = getBlock<HeadingBlock>(item.index);
          const Tag = item.as || "h2";
          const defaultClass =
            Tag === "h2"
              ? "text-[28px] lg:text-[40px] font-semibold text-[var(--ink-on-dark)] tracking-[-0.02em] mb-4 leading-tight"
              : Tag === "h3"
              ? "text-[20px] lg:text-[24px] font-semibold text-[var(--ink-on-dark)] tracking-[-0.01em] mb-3 leading-snug"
              : "text-base lg:text-[17px] font-normal text-[var(--ink-on-dark)]/90 leading-[1.6] mb-6";

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
                "text-base lg:text-[17px] font-normal text-[var(--ink-on-dark)]/90 leading-[1.6] mb-8 max-w-[620px]"
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
              "inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-8 py-4 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--ink)] font-semibold text-base md:text-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer"
            }
          >
            {ctaBlock.text}
          </a>
        </div>
      </div>
    </section>
  );
}

// Instance A: Blocks 28, 29, 30
export function CtaBandA() {
  return (
    <CtaBandBase
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
      cta={{ index: SECTION_MAP.ctaBandC.cta }}
    />
  );
}

// Instance D: Blocks 292, 293, 294, 295
export function CtaBandD() {
  return (
    <CtaBandBase
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
      headings={[
        { index: SECTION_MAP.ctaBandE.headings[0], as: "h2" },
        { index: SECTION_MAP.ctaBandE.headings[1], as: "h3" },
      ]}
      cta={{ index: SECTION_MAP.ctaBandE.cta }}
    />
  );
}
