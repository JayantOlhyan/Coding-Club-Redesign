import { getBlock, getImageMeta, getLocalImagePath, SECTION_MAP, HeadingBlock, ImageBlock } from "@/lib/content";

export function TrustBar() {
  const logoHeadingBlock = getBlock<HeadingBlock>(SECTION_MAP.trustBar.logoStripHeading);
  const logoImageBlock = getBlock<ImageBlock>(SECTION_MAP.trustBar.logoStripImage);
  const communityHeadingBlock = getBlock<HeadingBlock>(SECTION_MAP.trustBar.communityHeading);
  const proofImageBlocks = SECTION_MAP.trustBar.proofImages.map((idx) =>
    getBlock<ImageBlock>(idx)
  );

  const logoMeta = getImageMeta(logoImageBlock.src);
  const logoSrc = getLocalImagePath(logoImageBlock.src);

  return (
    <section className="w-full bg-[var(--surface-2)] py-12 md:py-16">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-band 1: Company Logos Placement Strip (Scaler pattern) */}
        <div className="text-left pb-10 border-b border-[var(--border)]">
          <h2
            data-block={SECTION_MAP.trustBar.logoStripHeading}
            className="text-base lg:text-[17px] font-medium text-[var(--ink)] mb-4"
          >
            {logoHeadingBlock.text}
          </h2>

          {/* TODO: image-locked copy, awaiting client text */}
          <div className="w-full flex items-center justify-center bg-[var(--surface)] p-4 md:p-6 rounded border border-[var(--border)]">
            <img
              src={logoSrc}
              alt={logoImageBlock.alt || logoHeadingBlock.text}
              width={logoMeta.width}
              height={logoMeta.height}
              loading="eager"
              decoding="async"
              className="w-full max-h-[120px] md:max-h-[160px] object-contain mx-auto"
            />
          </div>

          {/* Prepared semantic container for future accessible text/SVG company logo strip */}
          <div className="hidden" aria-hidden="true" data-comment="prepared-markup-for-future-logo-strip">
            {/* Future SVG icons for Google, Amazon, Microsoft, Flipkart, etc. */}
          </div>
        </div>

        {/* Sub-band 2: Community Proof */}
        <div className="text-left pt-10">
          <h2
            data-block={SECTION_MAP.trustBar.communityHeading}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em] mb-6 leading-tight"
          >
            {communityHeadingBlock.text}
          </h2>

          {/* 2x2 grid on mobile, 4-column single row on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {proofImageBlocks.map((block, i) => {
              const meta = getImageMeta(block.src);
              const src = getLocalImagePath(block.src);
              return (
                <div
                  key={i}
                  className="w-full bg-[var(--surface)] rounded border border-[var(--border)] overflow-hidden shadow-sm"
                >
                  {/* TODO: image-locked copy, awaiting client text */}
                  <img
                    src={src}
                    alt={block.alt || communityHeadingBlock.text}
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
      </div>
    </section>
  );
}
