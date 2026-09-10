import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  BulletBlock,
  CtaBlock,
} from "@/lib/content";

export function Curriculum() {
  const closingCta = getBlock<CtaBlock>(SECTION_MAP.curriculum.closingCta);

  return (
    <section
      id="curriculum"
      aria-label="Curriculum"
      className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 9-Module Accordion List (Joy of React + Crio module cards pattern) */}
        <div className="space-y-4 max-w-[880px]">
          {SECTION_MAP.curriculum.modules.map((m) => {
            const hNum = getBlock<HeadingBlock>(m.headings[0]);
            const hTitle = getBlock<HeadingBlock>(m.headings[1]);
            const hSub = getBlock<HeadingBlock>(m.headings[2]);
            const desc = getBlock<ParagraphBlock>(m.description);

            return (
              <details
                key={m.number}
                className="group border border-[var(--border)] rounded bg-[var(--surface-2)] overflow-hidden transition-colors"
              >
                <summary className="flex items-start justify-between p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] gap-4">
                  <div className="text-left">
                    <span
                      data-block={m.headings[0]}
                      className="inline-block text-xs md:text-sm font-semibold text-[var(--body)] uppercase tracking-wider mb-1"
                    >
                      {hNum.text}
                    </span>
                    <h3
                      data-block={m.headings[1]}
                      className="text-lg sm:text-xl font-semibold text-[var(--ink)] leading-snug"
                    >
                      {hTitle.text}
                    </h3>
                    <p
                      data-block={m.headings[2]}
                      className="text-sm font-normal text-[var(--body)] mt-1"
                    >
                      {hSub.text}
                    </p>
                  </div>
                  <div className="pt-1 flex-shrink-0 text-[var(--body)] group-open:rotate-180 transition-transform duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>

                <div className="px-5 md:px-6 pb-6 pt-3 border-t border-[var(--border)]">
                  <p
                    data-block={m.description}
                    className="text-sm md:text-base text-[var(--body)] font-normal leading-[1.6] mb-5"
                  >
                    {desc.text}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {m.bullets.map((bIdx) => {
                      const bullet = getBlock<BulletBlock>(bIdx);
                      return (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--body)] leading-[1.5]"
                        >
                          <svg
                            className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 fill-current text-[var(--accent)]"
                            viewBox="0 0 6 6"
                            aria-hidden="true"
                          >
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                          <span data-block={bIdx}>{bullet.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            );
          })}
        </div>

        {/* Closing Curriculum CTA */}
        <div className="mt-12 text-left">
          <a
            href="#lead-form"
            data-block={SECTION_MAP.curriculum.closingCta}
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-8 py-4 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--ink)] font-semibold text-base md:text-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer"
          >
            {closingCta.text}
          </a>
        </div>
      </div>
    </section>
  );
}
