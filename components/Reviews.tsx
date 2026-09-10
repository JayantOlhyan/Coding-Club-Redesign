"use client";

import { useState } from "react";
import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  EmbedBlock,
} from "@/lib/content";

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
      className="w-full bg-[var(--surface-2)] py-16 md:py-24"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left mb-12 max-w-[780px]">
          <h2
            data-block={SECTION_MAP.reviews.heading}
            className="text-[28px] lg:text-[40px] font-semibold text-[var(--ink)] tracking-[-0.02em]"
          >
            {h327.text}
          </h2>
        </div>

        {/* 9 Vimeo Video Facades in a Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoBlocks.map((item, i) => {
            const idx = SECTION_MAP.reviews.vimeoVideos[i];
            const isPlaying = activeVideos[idx];

            return (
              <div
                key={idx}
                className="relative aspect-video w-full rounded border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm flex items-center justify-center"
              >
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
                    className="group relative w-full h-full flex items-center justify-center bg-[var(--surface)] hover:bg-[var(--border)]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
                  >
                    {/* Play Button Icon Container */}
                    <div className="w-14 h-14 rounded-full bg-[var(--accent)] group-hover:bg-[var(--accent-hover)] text-[var(--ink)] flex items-center justify-center shadow transition-transform group-hover:scale-105">
                      <svg
                        className="w-6 h-6 ml-0.5 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
