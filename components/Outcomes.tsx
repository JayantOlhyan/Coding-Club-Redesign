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
      className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-16 md:py-24"
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
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight"
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
                className="w-full rounded overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] shadow-sm"
              >
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
