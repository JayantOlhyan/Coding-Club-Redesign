import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
} from "@/lib/content";

export function Faq() {
  const h367 = getBlock<HeadingBlock>(SECTION_MAP.faq.heading);
  const faqItems = SECTION_MAP.faq.items;

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="w-full bg-[var(--surface)] py-16 md:py-24"
    >
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left mb-12">
          <h2
            data-block={SECTION_MAP.faq.heading}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em]"
          >
            {h367.text}
          </h2>
        </div>

        {/* 8 Native Details/Summary Accordion Items (Joy of React objection-led pattern) */}
        <div className="space-y-4 w-full">
          {faqItems.map((item) => {
            const qBlock = getBlock<HeadingBlock>(item.q);
            const aBlock = getBlock<ParagraphBlock>(item.a);

            return (
              <details
                key={item.q}
                className="group border border-[var(--border)] rounded bg-[var(--surface-2)] overflow-hidden transition-colors"
              >
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] gap-4">
                  <h3
                    data-block={item.q}
                    className="text-[18px] lg:text-[20px] font-semibold text-[var(--ink)] leading-snug text-left"
                  >
                    {qBlock.text}
                  </h3>
                  <div className="flex-shrink-0 text-[var(--body)] group-open:rotate-180 transition-transform duration-200">
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

                <div className="px-5 md:px-6 pb-6 pt-3 border-t border-[var(--border)] text-left">
                  <p
                    data-block={item.a}
                    className="text-base lg:text-[17px] font-normal text-[var(--body)] leading-[1.6]"
                  >
                    {aBlock.text}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
