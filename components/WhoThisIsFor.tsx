import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  BulletBlock,
  ParagraphBlock,
} from "@/lib/content";

export function WhoThisIsFor() {
  const h17 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[0]);
  const h18 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[1]);
  const h19 = getBlock<HeadingBlock>(SECTION_MAP.whoThisIsFor.headings[2]);
  const imgBlock = getBlock<ImageBlock>(SECTION_MAP.whoThisIsFor.image);
  const items = SECTION_MAP.whoThisIsFor.items.map((idx) => getBlock<BulletBlock>(idx));
  const closingBlock = getBlock<ParagraphBlock>(SECTION_MAP.whoThisIsFor.closingText);

  const imgMeta = getImageMeta(imgBlock.src);
  const imgSrc = getLocalImagePath(imgBlock.src);

  return (
    <section className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-16 md:py-24">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.whoThisIsFor.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h17.text}
          </span>
          <h2
            data-block={SECTION_MAP.whoThisIsFor.headings[1]}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight mb-4"
          >
            {h18.text}
          </h2>
          <p
            data-block={SECTION_MAP.whoThisIsFor.headings[2]}
            className="text-base md:text-lg font-normal text-[var(--body)] leading-[1.6]"
          >
            {h19.text}
          </p>
        </div>

        {/* 2-Column Grid: 6 Value / Persona Cards with Image Accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Grid (8 Cols on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => {
              const blockIdx = SECTION_MAP.whoThisIsFor.items[i];
              return (
                <div
                  key={blockIdx}
                  className="p-6 rounded bg-[var(--surface-2)] border border-[var(--border)] flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                    </span>
                    <p
                      data-block={blockIdx}
                      className="text-base md:text-[17px] font-normal text-[var(--body)] leading-[1.6]"
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Supporting Visual Feature (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] rounded overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] shadow-sm">
              <img
                src={imgSrc}
                alt={imgBlock.alt}
                width={imgMeta.width}
                height={imgMeta.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Closing Affirmation Callout */}
        <div className="mt-12 p-6 md:p-8 rounded bg-[var(--surface-2)] border border-[var(--border)] text-left">
          <p
            data-block={SECTION_MAP.whoThisIsFor.closingText}
            className="text-base md:text-[17px] font-normal text-[var(--ink)] leading-[1.6]"
          >
            {closingBlock.text}
          </p>
        </div>
      </div>
    </section>
  );
}
