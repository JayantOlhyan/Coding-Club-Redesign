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

        {/* 6-Month Timeline Progress Bar (Responsive Mobile & Desktop) */}
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-10 w-full">
            {/* Desktop Timeline (md+) */}
            <div className="hidden md:block relative px-4 py-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm metallic-panel">
              <div className="flex items-center justify-between relative z-10">
                {/* Background Connecting Line */}
                <div className="absolute top-5 left-8 right-8 h-[3px] bg-slate-200 -translate-y-1/2 z-0" />
                {/* Active Progress Fill */}
                <div
                  className="absolute top-5 left-8 h-[3px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-out"
                  style={{ width: `calc(${activeMonthIdx} * (100% - 4rem) / ${JOURNEY_MONTHS.length - 1})` }}
                />

                {JOURNEY_MONTHS.map((item, idx) => {
                  const isActive = idx === activeMonthIdx;
                  return (
                    <button
                      key={item.month}
                      onClick={() => setActiveMonthIdx(idx)}
                      className={`relative z-10 flex flex-col items-center gap-2.5 group cursor-pointer transition-all duration-300 ${
                        isActive ? "scale-105" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30 ring-4 ring-blue-100"
                            : "bg-white text-slate-700 border-slate-300 group-hover:border-blue-400 group-hover:shadow-xs"
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div className="text-center">
                        <span className={`block text-[11px] font-mono font-semibold tracking-wider ${isActive ? "text-blue-600" : "text-slate-400"}`}>
                          {item.month}
                        </span>
                        <span className={`block text-xs md:text-sm font-semibold whitespace-nowrap mt-0.5 ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Touch Swipeable Pill Bar (<md) */}
            <div className="block md:hidden">
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 px-1 no-scrollbar snap-x touch-pan-x">
                {JOURNEY_MONTHS.map((item, idx) => {
                  const isActive = idx === activeMonthIdx;
                  return (
                    <button
                      key={item.month}
                      onClick={() => setActiveMonthIdx(idx)}
                      className={`snap-start shrink-0 px-3.5 py-2.5 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                          : "bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        0{idx + 1}
                      </span>
                      <div>
                        <span className={`block text-[10px] font-mono tracking-wider font-semibold ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                          {item.month}
                        </span>
                        <span className="block text-xs font-semibold whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
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
            const isBelongingToActiveMonth = JOURNEY_MONTHS[activeMonthIdx]?.modules.includes(m.number);

            return (
              <ScrollReveal key={m.number} direction="up" delay={100 + m.number * 40}>
                <details
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                    isBelongingToActiveMonth
                      ? "border-blue-300 border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50/40 via-white to-white ring-2 ring-blue-500/15"
                      : "border-slate-200 border-l-4 border-l-slate-300 group-open:border-l-blue-600 bg-white"
                  }`}
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
