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
  bg?: "surface" | "surface-2";
}

export function CtaBandBase({
  headings = [],
  paragraph,
  cta,
  bg = "surface-2",
}: CtaBandBaseProps) {
  const ctaBlock = getBlock<CtaBlock>(cta.index);

  return (
    <section
      className={`w-full ${
        bg === "surface" ? "bg-[var(--surface)]" : "bg-[var(--surface-2)]"
      } border-b border-[var(--border)] py-16 md:py-20`}
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px] text-left">
          {headings.map((item) => {
            const block = getBlock<HeadingBlock>(item.index);
            const Tag = item.as || "h2";
            const defaultClass =
              Tag === "h2"
                ? "text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-4"
                : Tag === "h3"
                ? "text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight mb-3"
                : "text-base md:text-lg font-normal text-[var(--body)] leading-[1.6] mb-6";

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
                  "text-base md:text-lg font-normal text-[var(--body)] leading-[1.6] mb-8"
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
      </div>
    </section>
  );
}

// Instance A: Blocks 28, 29, 30
export function CtaBandA() {
  return (
    <CtaBandBase
      headings={[
        {
          index: SECTION_MAP.ctaBandA.headings[0],
          as: "h2",
          className: "text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-4",
        },
        {
          index: SECTION_MAP.ctaBandA.headings[1],
          as: "p",
          className: "text-base md:text-lg font-normal text-[var(--body)] leading-[1.6] mb-8",
        },
      ]}
      cta={{ index: SECTION_MAP.ctaBandA.cta }}
      bg="surface-2"
    />
  );
}

// Instance B: Blocks 42, 43, 44, 45
export function CtaBandB() {
  return (
    <CtaBandBase
      headings={[
        {
          index: SECTION_MAP.ctaBandB.headings[0],
          as: "h2",
          className: "text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-2",
        },
        {
          index: SECTION_MAP.ctaBandB.headings[1],
          as: "h3",
          className: "text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight mb-4",
        },
      ]}
      paragraph={{
        index: SECTION_MAP.ctaBandB.paragraph,
        className: "text-base md:text-lg font-normal text-[var(--body)] leading-[1.6] mb-8",
      }}
      cta={{ index: SECTION_MAP.ctaBandB.cta }}
      bg="surface-2"
    />
  );
}

// Instance C: Block 59
export function CtaBandC() {
  return (
    <CtaBandBase
      cta={{ index: SECTION_MAP.ctaBandC.cta }}
      bg="surface-2"
    />
  );
}

// Instance D: Blocks 292, 293, 294, 295
export function CtaBandD() {
  return (
    <CtaBandBase
      headings={[
        {
          index: SECTION_MAP.ctaBandD.headings[0],
          as: "h2",
          className: "text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-3",
        },
        {
          index: SECTION_MAP.ctaBandD.headings[1],
          as: "p",
          className: "text-base md:text-lg font-normal text-[var(--body)] leading-[1.6] mb-3",
        },
        {
          index: SECTION_MAP.ctaBandD.headings[2],
          as: "h3",
          className: "text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight mb-8",
        },
      ]}
      cta={{ index: SECTION_MAP.ctaBandD.cta }}
      bg="surface-2"
    />
  );
}

// Instance E: Blocks 314, 315, 316
export function CtaBandE() {
  return (
    <CtaBandBase
      headings={[
        {
          index: SECTION_MAP.ctaBandE.headings[0],
          as: "h2",
          className: "text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-3",
        },
        {
          index: SECTION_MAP.ctaBandE.headings[1],
          as: "h3",
          className: "text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight mb-8",
        },
      ]}
      cta={{ index: SECTION_MAP.ctaBandE.cta }}
      bg="surface-2"
    />
  );
}
