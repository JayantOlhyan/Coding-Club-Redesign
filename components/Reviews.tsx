"use client";

import { useState } from "react";
import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  EmbedBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";
import { MotionCard } from "./motion/MotionCard";

export function Reviews() {
  const h327 = getBlock<HeadingBlock>(SECTION_MAP.reviews.heading);
  const videoBlocks = SECTION_MAP.reviews.vimeoVideos.map((idx) =>
    getBlock<EmbedBlock>(idx)
  );

  // Track which videos have been activated by user click
  const [activeVideos, setActiveVideos] = useState<Record<number, boolean>>({});

  const handlePlay = (index: number) => {
    setActiveVideos((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="reviews"
      aria-label="Reviews"
      className="relative w-full bg-slate-50/80 py-24 lg:py-36 border-b border-slate-200/80 bg-tech-grid"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12 max-w-[780px]">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3">
              Video Testimonials
            </span>
            <h2
              data-block={SECTION_MAP.reviews.heading}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h327.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* 9 Vimeo Video Facades in a Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoBlocks.map((item, i) => {
            const idx = SECTION_MAP.reviews.vimeoVideos[i];
            const isPlaying = activeVideos[idx];

            return (
              <ScrollReveal key={idx} direction="up" delay={100 + (i % 3) * 80}>
                <MotionCard className="!p-0 relative aspect-video w-full overflow-hidden shadow-md group">
                  {isPlaying ? (
                    <iframe
                      src={`${item.src}&autoplay=1`}
                      title="Student Video Review"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePlay(idx)}
                      aria-label="Play student video review"
                      className="relative w-full h-full flex flex-col items-center justify-center bg-slate-900 hover:bg-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                    >
                      {/* Technical poster background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
                      <div className="absolute inset-0 bg-tech-grid opacity-30" />

                      {/* Play Button Icon Container */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all duration-300 group-hover:scale-110">
                        <svg
                          className="w-7 h-7 ml-1 fill-current"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      <span className="relative z-10 mt-3 text-xs font-mono font-medium text-slate-300 group-hover:text-white transition-colors">
                        Click to Watch Review
                      </span>
                    </button>
                  )}
                </MotionCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
