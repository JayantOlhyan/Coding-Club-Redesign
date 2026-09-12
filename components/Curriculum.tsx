"use client";

import React, { useState } from "react";
import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
  BulletBlock,
  CtaBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";

// Map 9 modules across 6 journey milestones
const JOURNEY_MONTHS = [
  { month: "MONTH 01", title: "Programming Fundamentals", modules: [1] },
  { month: "MONTH 02", title: "DSA & Algorithms", modules: [2, 3] },
  { month: "MONTH 03", title: "Python & Data Science", modules: [4] },
  { month: "MONTH 04", title: "Machine Learning & AI", modules: [5] },
  { month: "MONTH 05", title: "Full Stack Development", modules: [6, 7] },
  { month: "MONTH 06", title: "CS Core & Career Prep", modules: [8, 9] },
];

export function Curriculum() {
  const closingCta = getBlock<CtaBlock>(SECTION_MAP.curriculum.closingCta);
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);

  return (
    <section
      id="curriculum"
      aria-label="Curriculum"
      className="relative w-full bg-slate-50/80 py-24 lg:py-36 border-b border-slate-200/80 bg-tech-grid overflow-hidden"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-10 max-w-[780px]">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3">
              6-Month Structured Journey
            </span>
            <h2 className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] mb-4 leading-tight">
              Complete Technical Roadmap
            </h2>
            <p className="text-base lg:text-[18px] font-normal text-slate-600 leading-[1.6]">
              A step-by-step 6-month live mentorship program designed to take you from ground zero to a confident, job-ready developer.
            </p>
          </div>
        </ScrollReveal>

        {/* 6-Month Timeline Progress Bar */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-12 overflow-x-auto pb-4 no-scrollbar max-w-full">
            <div className="flex items-center min-w-[640px] justify-between relative px-2">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${(activeMonthIdx / (JOURNEY_MONTHS.length - 1)) * 100}%` }}
              />

              {JOURNEY_MONTHS.map((item, idx) => {
                const isActive = idx === activeMonthIdx;
                return (
                  <button
                    key={item.month}
                    onClick={() => setActiveMonthIdx(idx)}
                    className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer transition-all duration-200 ${
                      isActive ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 ring-4 ring-blue-100"
                          : "bg-white text-slate-600 border-slate-300 group-hover:border-blue-400"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div className="text-center">
                      <span className={`block text-[11px] font-mono font-semibold tracking-wider ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                        {item.month}
                      </span>
                      <span className={`block text-xs font-medium max-w-[95px] truncate ${isActive ? "text-slate-900" : "text-slate-500"}`}>
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 9-Module Accordion Spine (v2.6 numbered spine) */}
        <div className="space-y-4">
          {SECTION_MAP.curriculum.modules.map((m) => {
            const hNum = getBlock<HeadingBlock>(m.headings[0]);
            const hTitle = getBlock<HeadingBlock>(m.headings[1]);
            const hSub = getBlock<HeadingBlock>(m.headings[2]);
            const desc = getBlock<ParagraphBlock>(m.description);

            return (
              <ScrollReveal key={m.number} direction="up" delay={100 + m.number * 40}>
                <details
                  className="group rounded-2xl border border-slate-200 border-l-4 border-l-slate-300 group-open:border-l-blue-600 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <summary className="flex items-start justify-between p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 gap-4 sm:gap-6">
                    <div className="flex items-start gap-4 sm:gap-6 text-left">
                      {/* Large numeral spine in its own left gutter */}
                      <div
                        className="curriculum-module-num flex items-center justify-center w-8 sm:w-10 shrink-0 pt-0.5"
                        data-module={String(m.number).padStart(2, "0")}
                        aria-hidden="true"
                      />
                      <div>
                        <span
                          data-block={m.headings[0]}
                          className="inline-block text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1"
                        >
                          {hNum.text}
                        </span>
                        <h3
                          data-block={m.headings[1]}
                          className="text-[20px] lg:text-[24px] font-semibold text-slate-900 tracking-[-0.01em] leading-snug"
                        >
                          {hTitle.text}
                        </h3>
                        <p
                          data-block={m.headings[2]}
                          className="text-base lg:text-[17px] font-normal text-slate-600 mt-1"
                        >
                          {hSub.text}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1 flex-shrink-0 text-slate-400 group-open:rotate-180 group-open:text-blue-600 transition-all duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </summary>

                  <div className="px-5 md:px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50">
                    <p
                      data-block={m.description}
                      className="text-base lg:text-[17px] text-slate-700 font-normal leading-[1.6] mb-5"
                    >
                      {desc.text}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {m.bullets.map((bIdx) => {
                        const bullet = getBlock<BulletBlock>(bIdx);
                        return (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 leading-[1.5]"
                          >
                            <svg
                              className="w-2 h-2 mt-1.5 flex-shrink-0 fill-current text-blue-600"
                              viewBox="0 0 6 6"
                              aria-hidden="true"
                            >
                              <circle cx="3" cy="3" r="3" />
                            </svg>
                            <span data-block={bIdx}>{bullet.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </details>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Closing Curriculum CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12 text-left">
            <a
              href="#lead-form"
              data-block={SECTION_MAP.curriculum.closingCta}
              className="group relative inline-flex items-center justify-center min-h-[48px] px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {closingCta.text}
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
