"use client";

import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

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
      className="relative w-full bg-white py-24 lg:py-36 border-b border-slate-200/80"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span
              data-block={SECTION_MAP.mentors.headings[0]}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3"
            >
              {h296.text}
            </span>
            <h2
              data-block={SECTION_MAP.mentors.headings[1]}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h297.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* Lead Instructor Card (Rishabh Jain) */}
        <ScrollReveal direction="up" delay={100}>
          <MotionCard className="!p-6 md:!p-8 mb-12 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Instructor Photos */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
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
                <div className="w-full max-w-[200px] rounded-2xl overflow-hidden border border-slate-200 bg-white hidden sm:block lg:hidden shadow-sm">
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
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {leadBadge.text}
                  </span>
                </div>
                <h3
                  data-block={leadMentor.name}
                  className="text-[26px] lg:text-[34px] font-semibold text-slate-900 tracking-[-0.02em] mb-4"
                >
                  {m1Name.text}
                </h3>
                <p
                  data-block={leadMentor.bio}
                  className="text-base lg:text-[17px] font-normal text-slate-700 leading-[1.6]"
                >
                  {m1Bio.text}
                </p>
              </div>
            </div>
          </MotionCard>
        </ScrollReveal>

        {/* 2-Column Grid for Instructors (Srishti & Abhishek) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {midMentors.map((m, i) => {
            const photoBlock = getBlock<ImageBlock>(m.photo);
            const photoMeta = getImageMeta(photoBlock.src);
            const photoSrc = getLocalImagePath(photoBlock.src);
            const nameBlock = getBlock<HeadingBlock>(m.name);
            const bioBlock = getBlock<ParagraphBlock>(m.bio);

            return (
              <ScrollReveal key={m.id} direction="up" delay={150 + i * 80}>
                <MotionCard className="h-full flex flex-col justify-between shadow-md">
                  <div>
                    <div className="w-full max-w-[160px] rounded-xl overflow-hidden border border-slate-200 bg-white mb-4 shadow-sm">
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
                      className="text-xl font-semibold text-slate-900 mb-3"
                    >
                      {nameBlock.text}
                    </h3>
                    <p
                      data-block={m.bio}
                      className="text-sm md:text-base font-normal text-slate-600 leading-[1.6]"
                    >
                      {bioBlock.text}
                    </p>
                  </div>
                </MotionCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Teaching Assistance Group */}
        <div className="text-left pt-6 border-t border-slate-200">
          <ScrollReveal direction="up" delay={100}>
            <h3
              data-block={SECTION_MAP.mentors.taHeading}
              className="text-[22px] lg:text-[26px] font-semibold text-slate-900 tracking-[-0.01em] mb-8"
            >
              {taHeading.text}
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {taMentors.map((m, i) => {
              const photoBlock = getBlock<ImageBlock>(m.photo);
              const photoMeta = getImageMeta(photoBlock.src);
              const photoSrc = getLocalImagePath(photoBlock.src);
              const nameBlock = getBlock<HeadingBlock>(m.name);
              const bioBlock = getBlock<ParagraphBlock>(m.bio);

              return (
                <ScrollReveal key={m.id} direction="up" delay={150 + i * 80}>
                  <MotionCard className="h-full flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-[90px] h-[90px] rounded-xl overflow-hidden border border-slate-200 bg-white flex-shrink-0 shadow-xs">
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
                            <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-slate-200 bg-white flex-shrink-0 shadow-xs">
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
                        className="text-lg font-semibold text-slate-900 mb-2"
                      >
                        {nameBlock.text}
                      </h4>
                      <p
                        data-block={m.bio}
                        className="text-xs md:text-sm font-normal text-slate-600 leading-[1.6]"
                      >
                        {bioBlock.text}
                      </p>
                    </div>
                  </MotionCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
