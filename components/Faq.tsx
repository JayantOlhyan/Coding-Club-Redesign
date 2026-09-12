"use client";

import {
  getBlock,
  SECTION_MAP,
  HeadingBlock,
  ParagraphBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";

export function Faq() {
  const h367 = getBlock<HeadingBlock>(SECTION_MAP.faq.heading);
  const faqItems = SECTION_MAP.faq.items;

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full bg-white py-24 lg:py-36 border-b border-slate-200/80"
    >
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-left mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60 mb-3">
              Clear Answers
            </span>
            <h2
              data-block={SECTION_MAP.faq.heading}
              className="text-[28px] lg:text-[42px] font-semibold text-slate-900 tracking-[-0.02em] leading-tight"
            >
              {h367.text}
            </h2>
          </div>
        </ScrollReveal>

        {/* 8 Native Details/Summary Accordion Items */}
        <div className="space-y-4 w-full">
          {faqItems.map((item, i) => {
            const qBlock = getBlock<HeadingBlock>(item.q);
            const aBlock = getBlock<ParagraphBlock>(item.a);

            return (
              <ScrollReveal key={item.q} direction="up" delay={80 + i * 40}>
                <details
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-blue-300 transition-all duration-200"
                >
                  <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 gap-4">
                    <h3
                      data-block={item.q}
                      className="text-[18px] lg:text-[20px] font-semibold text-slate-900 leading-snug text-left group-open:text-blue-600 transition-colors"
                    >
                      {qBlock.text}
                    </h3>
                    <div className="flex-shrink-0 text-slate-400 group-open:rotate-180 group-open:text-blue-600 transition-all duration-200">
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

                  <div className="px-5 md:px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50 text-left">
                    <p
                      data-block={item.a}
                      className="text-base lg:text-[17px] font-normal text-slate-700 leading-[1.6]"
                    >
                      {aBlock.text}
                    </p>
                  </div>
                </details>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
