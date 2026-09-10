import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
} from "@/lib/content";

export function Mentors() {
  const h296 = getBlock<HeadingBlock>(SECTION_MAP.mentors.headings[0]);
  const h297 = getBlock<HeadingBlock>(SECTION_MAP.mentors.headings[1]);
  const taHeading = getBlock<HeadingBlock>(SECTION_MAP.mentors.taHeading);
  const leadBadge = getBlock<HeadingBlock>(SECTION_MAP.mentors.leadBadge);
  const leadPhoto = getBlock<ImageBlock>(SECTION_MAP.mentors.leadPhoto);

  const mentors = SECTION_MAP.mentors.instructors;
  const leadMentor = mentors[0];
  const midMentors = [mentors[1], mentors[2]];
  const taMentors = [mentors[3], mentors[4], mentors[5]];

  const leadPhotoMeta = getImageMeta(leadPhoto.src);
  const leadPhotoSrc = getLocalImagePath(leadPhoto.src);

  const m1Photo = getBlock<ImageBlock>(leadMentor.photo);
  const m1PhotoMeta = getImageMeta(m1Photo.src);
  const m1PhotoSrc = getLocalImagePath(m1Photo.src);
  const m1Name = getBlock<HeadingBlock>(leadMentor.name);
  const m1Bio = getBlock<ParagraphBlock>(leadMentor.bio);

  return (
    <section
      id="mentors"
      aria-label="Mentors"
      className="w-full bg-[var(--surface)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12 max-w-[780px]">
          <span
            data-block={SECTION_MAP.mentors.headings[0]}
            className="block text-sm md:text-base font-normal text-[var(--body)] mb-2"
          >
            {h296.text}
          </span>
          <h2
            data-block={SECTION_MAP.mentors.headings[1]}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em]"
          >
            {h297.text}
          </h2>
        </div>

        {/* Lead Instructor Card (Rishabh Jain - Joy of React instructor block pattern) */}
        <div className="rounded bg-[var(--surface-2)] border border-[var(--border)] p-6 md:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Instructor Photos */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="w-full rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <img
                  src={m1PhotoSrc}
                  alt={m1Photo.alt || m1Name.text}
                  width={m1PhotoMeta.width}
                  height={m1PhotoMeta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full max-w-[200px] rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] hidden sm:block lg:hidden">
                <img
                  src={leadPhotoSrc}
                  alt={leadPhoto.alt || m1Name.text}
                  width={leadPhotoMeta.width}
                  height={leadPhotoMeta.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Instructor Details */}
            <div className="lg:col-span-8 text-left">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  data-block={SECTION_MAP.mentors.leadBadge}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--surface-2)] border border-[var(--border)] text-[var(--ink)]"
                >
                  {leadBadge.text}
                </span>
              </div>
              <h3
                data-block={leadMentor.name}
                className="text-[24px] lg:text-[32px] font-semibold text-[var(--ink)] tracking-[-0.02em] mb-4"
              >
                {m1Name.text}
              </h3>
              <p
                data-block={leadMentor.bio}
                className="text-base lg:text-[17px] font-normal text-[var(--body)] leading-[1.6]"
              >
                {m1Bio.text}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid for Instructors (Srishti & Abhishek) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {midMentors.map((m) => {
            const photoBlock = getBlock<ImageBlock>(m.photo);
            const photoMeta = getImageMeta(photoBlock.src);
            const photoSrc = getLocalImagePath(photoBlock.src);
            const nameBlock = getBlock<HeadingBlock>(m.name);
            const bioBlock = getBlock<ParagraphBlock>(m.bio);

            return (
              <div
                key={m.id}
                className="rounded bg-[var(--surface-2)] border border-[var(--border)] p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-full max-w-[160px] rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] mb-4">
                    <img
                      src={photoSrc}
                      alt={photoBlock.alt || nameBlock.text}
                      width={photoMeta.width}
                      height={photoMeta.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3
                    data-block={m.name}
                    className="text-xl font-semibold text-[var(--ink)] mb-3"
                  >
                    {nameBlock.text}
                  </h3>
                  <p
                    data-block={m.bio}
                    className="text-sm md:text-base font-normal text-[var(--body)] leading-[1.6]"
                  >
                    {bioBlock.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Teaching Assistance Group */}
        <div className="text-left mb-8 pt-4 border-t border-[var(--border)]">
          <h3
            data-block={SECTION_MAP.mentors.taHeading}
            className="text-[20px] lg:text-[24px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-6"
          >
            {taHeading.text}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {taMentors.map((m) => {
              const photoBlock = getBlock<ImageBlock>(m.photo);
              const photoMeta = getImageMeta(photoBlock.src);
              const photoSrc = getLocalImagePath(photoBlock.src);
              const nameBlock = getBlock<HeadingBlock>(m.name);
              const bioBlock = getBlock<ParagraphBlock>(m.bio);

              return (
                <div
                  key={m.id}
                  className="rounded bg-[var(--surface-2)] border border-[var(--border)] p-6 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-[100px] h-[100px] rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
                        <img
                          src={photoSrc}
                          alt={photoBlock.alt || nameBlock.text}
                          width={photoMeta.width}
                          height={photoMeta.height}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {m.altPhoto && (() => {
                        const altBlock = getBlock<ImageBlock>(m.altPhoto);
                        const altMeta = getImageMeta(altBlock.src);
                        const altSrc = getLocalImagePath(altBlock.src);
                        return (
                          <div className="w-[50px] h-[50px] rounded overflow-hidden border border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
                            <img
                              src={altSrc}
                              alt={altBlock.alt || "Credentials badge"}
                              width={altMeta.width}
                              height={altMeta.height}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        );
                      })()}
                    </div>
                    <h4
                      data-block={m.name}
                      className="text-lg font-semibold text-[var(--ink)] mb-2"
                    >
                      {nameBlock.text}
                    </h4>
                    <p
                      data-block={m.bio}
                      className="text-xs md:text-sm font-normal text-[var(--body)] leading-[1.6]"
                    >
                      {bioBlock.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
