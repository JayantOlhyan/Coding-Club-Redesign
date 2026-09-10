import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  ParagraphBlock,
} from "@/lib/content";

export function Benefits() {
  const h31 = getBlock<HeadingBlock>(SECTION_MAP.benefits.headings[0]);
  const h32 = getBlock<HeadingBlock>(SECTION_MAP.benefits.headings[1]);
  const panels = SECTION_MAP.benefits.panels.map((idx) => getBlock<ImageBlock>(idx));
  const p36 = getBlock<ParagraphBlock>(SECTION_MAP.benefits.prose);

  return (
    <section className="w-full bg-[var(--surface)] py-16 md:py-24">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.benefits.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h31.text}
          </span>
          <h2
            data-block={SECTION_MAP.benefits.headings[1]}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em] mb-4"
          >
            {h32.text}
          </h2>
          <p
            data-block={SECTION_MAP.benefits.prose}
            className="text-base lg:text-[17px] font-normal text-[var(--body)] leading-[1.6]"
          >
            {p36.text}
          </p>
        </div>

        {/* 3-Column Grid: Benefit Graphic Cards */}
        {/* TODO: image-locked copy, awaiting client text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {panels.map((panel, i) => {
            const idx = SECTION_MAP.benefits.panels[i];
            const meta = getImageMeta(panel.src);
            const src = getLocalImagePath(panel.src);
            return (
              <div
                key={idx}
                className="w-full rounded border border-[var(--border)] bg-[var(--surface-2)] overflow-hidden shadow-sm flex flex-col"
              >
                <img
                  src={src}
                  alt={panel.alt || "Benefit overview"}
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
      </div>
    </section>
  );
}
