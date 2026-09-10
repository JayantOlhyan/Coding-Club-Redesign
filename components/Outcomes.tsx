import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
} from "@/lib/content";

export function Outcomes() {
  const h317 = getBlock<HeadingBlock>(SECTION_MAP.outcomes.headings[0]);
  const h318 = getBlock<HeadingBlock>(SECTION_MAP.outcomes.headings[1]);
  const screenshots = SECTION_MAP.outcomes.screenshots.map((idx) =>
    getBlock<ImageBlock>(idx)
  );

  return (
    <section
      id="outcomes"
      aria-label="Outcomes"
      className="w-full bg-[var(--surface)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.outcomes.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h317.text}
          </span>
          <h2
            data-block={SECTION_MAP.outcomes.headings[1]}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em]"
          >
            {h318.text}
          </h2>
        </div>

        {/* TODO: image-locked copy, awaiting client text */}
        {/* Placement Proof Screenshots Grid (Scaler named-alumni pattern fallback) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {screenshots.map((item, i) => {
            const idx = SECTION_MAP.outcomes.screenshots[i];
            const meta = getImageMeta(item.src);
            const src = getLocalImagePath(item.src);

            return (
              <div
                key={idx}
                className="relative w-full rounded overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] shadow-sm"
              >
                {/* Placement indicator badge in --success */}
                <div
                  className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[var(--success)] text-white flex items-center justify-center shadow z-10"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </div>
                <img
                  src={src}
                  alt={item.alt || "Student placement success story"}
                  width={meta.width}
                  height={meta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Prepared semantic container for future accessible text-based alumni cards */}
        <div
          className="hidden"
          aria-hidden="true"
          data-comment="prepared-markup-for-future-alumni-cards"
        >
          {/* Future text-based alumni cards: student name, company, role, package */}
        </div>
      </div>
    </section>
  );
}
