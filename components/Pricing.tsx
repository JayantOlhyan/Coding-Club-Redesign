import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  BulletBlock,
  CtaBlock,
} from "@/lib/content";

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
      className="w-full bg-[var(--surface-2)] border-b border-[var(--border)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.pricing.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h351.text}
          </span>
          <h2
            data-block={SECTION_MAP.pricing.headings[1]}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight"
          >
            {h352.text}
          </h2>
        </div>

        {/* Structured Pricing Card (CSS for JS + Apna College EMI pattern) */}
        <div className="max-w-[780px] bg-[var(--surface)] border border-[var(--border)] rounded p-6 sm:p-8 md:p-10 shadow-sm mb-12">
          {/* Plan Identifier */}
          <div className="inline-block px-3 py-1 rounded bg-[var(--surface-2)] border border-[var(--border)] text-xs md:text-sm font-semibold text-[var(--ink)] tracking-wider mb-4">
            <span data-block={SECTION_MAP.pricing.planName}>
              {planName.text}
            </span>
          </div>

          {/* Pricing Tiers & Discount Pill */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-6">
            <h3
              data-block={SECTION_MAP.pricing.priceTiers[0]}
              className="text-xl sm:text-2xl font-semibold text-[var(--ink)]"
            >
              {price1.text}
            </h3>
            <span
              data-block={SECTION_MAP.pricing.priceTiers[1]}
              className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-[var(--accent)]/15 text-[var(--ink)] border border-[var(--accent)] self-start sm:self-auto"
            >
              {price2.text}
            </span>
          </div>

          {/* Value Bullets List */}
          <ul className="space-y-4 mb-8 pt-4 border-t border-[var(--border)]">
            {SECTION_MAP.pricing.bullets.map((bIdx) => {
              const b = getBlock<BulletBlock>(bIdx);
              return (
                <li
                  key={bIdx}
                  className="flex items-start gap-3 text-sm md:text-base text-[var(--body)] leading-[1.6]"
                >
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--success)] fill-none stroke-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
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
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] w-full px-8 py-4 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--ink)] font-semibold text-base md:text-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer text-center"
            >
              {cta.text}
            </a>
          </div>
        </div>

        {/* Structured Program Logistics (WHAT, WHEN, WHY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[780px] mb-12">
          {/* WHAT Card */}
          <div className="p-5 rounded bg-[var(--surface)] border border-[var(--border)]">
            <h4
              data-block={SECTION_MAP.pricing.details[0].heading}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--body)] mb-1"
            >
              {whatH.text}
            </h4>
            <p
              data-block={SECTION_MAP.pricing.details[0].text}
              className="text-sm font-medium text-[var(--ink)] leading-snug"
            >
              {whatText.text}
            </p>
          </div>

          {/* WHEN Card */}
          <div className="p-5 rounded bg-[var(--surface)] border border-[var(--border)]">
            <h4
              data-block={SECTION_MAP.pricing.details[1].heading}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--body)] mb-1"
            >
              {whenH.text}
            </h4>
            <p
              data-block={SECTION_MAP.pricing.details[1].text}
              className="text-sm font-medium text-[var(--ink)] leading-snug"
            >
              {whenText.text}
            </p>
          </div>

          {/* WHY Card */}
          <div className="p-5 rounded bg-[var(--surface)] border border-[var(--border)]">
            <h4
              data-block={SECTION_MAP.pricing.details[2].heading}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--body)] mb-1"
            >
              {whyH.text}
            </h4>
            <p
              data-block={SECTION_MAP.pricing.details[2].text}
              className="text-sm font-medium text-[var(--ink)] leading-snug"
            >
              {whyText.text}
            </p>
          </div>
        </div>

        {/* Closing Headings Affirmation */}
        <div className="text-left max-w-[780px]">
          <p
            data-block={SECTION_MAP.pricing.closingHeadings[0]}
            className="text-base md:text-lg font-medium text-[var(--body)] mb-2"
          >
            {closingH1.text}
          </p>
          <h3
            data-block={SECTION_MAP.pricing.closingHeadings[1]}
            className="text-xl sm:text-2xl font-semibold text-[var(--ink)]"
          >
            {closingH2.text}
          </h3>
        </div>
      </div>
    </section>
  );
}
