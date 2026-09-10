import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ImageBlock,
  BulletBlock,
} from "@/lib/content";

export function BeforeAndAfter() {
  const h337 = getBlock<HeadingBlock>(SECTION_MAP.beforeAndAfter.headings[0]);
  const h338 = getBlock<HeadingBlock>(SECTION_MAP.beforeAndAfter.headings[1]);

  const beforeHeading = getBlock<HeadingBlock>(
    SECTION_MAP.beforeAndAfter.before.heading
  );
  const beforeImage = getBlock<ImageBlock>(
    SECTION_MAP.beforeAndAfter.before.image
  );
  const beforeImageMeta = getImageMeta(beforeImage.src);
  const beforeImageSrc = getLocalImagePath(beforeImage.src);

  const afterHeading = getBlock<HeadingBlock>(
    SECTION_MAP.beforeAndAfter.after.heading
  );
  const afterImage = getBlock<ImageBlock>(
    SECTION_MAP.beforeAndAfter.after.image
  );
  const afterImageMeta = getImageMeta(afterImage.src);
  const afterImageSrc = getLocalImagePath(afterImage.src);

  return (
    <section
      id="before-after"
      aria-label="Before and After"
      className="w-full bg-[var(--surface)] border-b border-[var(--border)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.beforeAndAfter.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h337.text}
          </span>
          <h2
            data-block={SECTION_MAP.beforeAndAfter.headings[1]}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight"
          >
            {h338.text}
          </h2>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* BEFORE Card */}
          <div className="rounded bg-[var(--surface-2)] border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <h3
                data-block={SECTION_MAP.beforeAndAfter.before.heading}
                className="text-xl sm:text-2xl font-semibold text-[var(--ink)] mb-4"
              >
                {beforeHeading.text}
              </h3>

              <div className="w-full rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] mb-6">
                {/* TODO: image-locked copy, awaiting client text */}
                <img
                  src={beforeImageSrc}
                  alt={beforeImage.alt || beforeHeading.text}
                  width={beforeImageMeta.width}
                  height={beforeImageMeta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>

              <ul className="space-y-4">
                {SECTION_MAP.beforeAndAfter.before.bullets.map((bIdx) => {
                  const b = getBlock<BulletBlock>(bIdx);
                  return (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--body)] leading-[1.6]"
                    >
                      <svg
                        className="w-4 h-4 mt-1 flex-shrink-0 text-red-500 fill-none stroke-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span data-block={bIdx}>{b.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* AFTER Card */}
          <div className="rounded bg-[var(--surface-2)] border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <h3
                data-block={SECTION_MAP.beforeAndAfter.after.heading}
                className="text-xl sm:text-2xl font-semibold text-[var(--ink)] mb-4"
              >
                {afterHeading.text}
              </h3>

              <div className="w-full rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] mb-6">
                <img
                  src={afterImageSrc}
                  alt={afterImage.alt || afterHeading.text}
                  width={afterImageMeta.width}
                  height={afterImageMeta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>

              <ul className="space-y-4">
                {SECTION_MAP.beforeAndAfter.after.bullets.map((bIdx) => {
                  const b = getBlock<BulletBlock>(bIdx);
                  return (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--ink)] font-medium leading-[1.6]"
                    >
                      <svg
                        className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--success)] fill-none stroke-current"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
