import { getBlock, getImageMeta, getLocalImagePath, SECTION_MAP, HeadingBlock, ImageBlock, CtaBlock } from "@/lib/content";
import { CohortDate } from "./CohortDate";
import { COHORT } from "@/lib/cohort";

export function Hero() {
  const logoBlock = getBlock<ImageBlock>(SECTION_MAP.hero.logo);
  const urgencyHeaderBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.urgencyHeader);
  const h1Block = getBlock<HeadingBlock>(SECTION_MAP.hero.h1);
  const subhead1Block = getBlock<HeadingBlock>(SECTION_MAP.hero.subheads[0]);
  const subhead2Block = getBlock<HeadingBlock>(SECTION_MAP.hero.subheads[1]);
  const liveBadgeBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.liveBadge);
  const ctaBlock = getBlock<CtaBlock>(SECTION_MAP.hero.ctas[0]);
  const urgencyNoticeBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.urgencyNotice);

  const logoMeta = getImageMeta(logoBlock.src);
  const logoSrc = getLocalImagePath(logoBlock.src);

  return (
    <header className="w-full bg-[var(--surface)]">
      {/* Top Brand & Announcement Bar */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt={logoBlock.alt}
              width={logoMeta.width}
              height={logoMeta.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-[110px] md:w-[130px] h-auto"
            />
          </div>
          {COHORT.showCountdown && (
            <div className="inline-flex items-center gap-2 self-start sm:self-auto py-1.5 px-3 rounded bg-[var(--surface-2)] border border-[var(--border)] text-xs md:text-sm text-[var(--body)] font-normal">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span data-block={SECTION_MAP.hero.urgencyHeader}>{urgencyHeaderBlock.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero Core Content: 2 Columns on lg (max-w-[1120px]) */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text (max-w-[620px]) */}
          <div className="lg:col-span-7 max-w-[620px] text-left">
            {/* Live Status & Cohort Start Date */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                data-block={SECTION_MAP.hero.liveBadge}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs md:text-sm font-semibold tracking-wide bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--border)]"
              >
                {liveBadgeBlock.text}
              </span>
              <CohortDate />
            </div>

            {/* Single H1 on the entire page */}
            <h1
              data-block={SECTION_MAP.hero.h1}
              className="text-[36px] sm:text-[40px] lg:text-[64px] font-semibold text-[var(--ink)] leading-[1.1] tracking-[-0.03em] mb-6"
            >
              {h1Block.text}
            </h1>

            {/* Subheading & Value Proposition */}
            <p
              data-block={SECTION_MAP.hero.subheads[0]}
              className="text-base lg:text-[17px] font-normal text-[var(--ink)] mb-3 leading-[1.6]"
            >
              {subhead1Block.text}
            </p>
            <p
              data-block={SECTION_MAP.hero.subheads[1]}
              className="text-base lg:text-[17px] font-normal text-[var(--body)] leading-[1.6] mb-8"
            >
              {subhead2Block.text}
            </p>

            {/* Primary Action Button */}
            <div className="flex flex-col items-start gap-3">
              <a
                href="#lead-form"
                data-block={SECTION_MAP.hero.ctas.join(",")}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-8 py-4 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--ink)] font-semibold text-base md:text-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer"
              >
                {ctaBlock.text}
              </a>
              <p
                data-block={SECTION_MAP.hero.urgencyNotice}
                className="text-xs md:text-sm text-[var(--body)] font-normal"
              >
                {urgencyNoticeBlock.text}
              </p>
            </div>
          </div>

          {/* Right Column: Proof Panel (Hidden below lg, no text nodes) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <div className="w-full max-w-[380px] rounded border border-[var(--border)] bg-[var(--surface-2)] p-4 shadow-sm">
              <img
                src="/images/00Qw1Td.webp"
                alt=""
                width={320}
                height={320}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
