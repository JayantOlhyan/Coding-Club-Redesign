"use client";

import { getBlock, getImageMeta, getLocalImagePath, SECTION_MAP, HeadingBlock, ImageBlock, CtaBlock } from "@/lib/content";
import { CohortDate } from "./CohortDate";
import { COHORT } from "@/lib/cohort";
import { ScrollProgress } from "./motion/ScrollProgress";
import { ScrollReveal } from "./motion/ScrollReveal";
import { ParallaxLayer } from "./motion/ParallaxLayer";

export function Hero() {
  const logoBlock = getBlock<ImageBlock>(SECTION_MAP.hero.logo);
  const urgencyHeaderBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.urgencyHeader);
  const h1Block = getBlock<HeadingBlock>(SECTION_MAP.hero.h1);
  const subhead1Block = getBlock<HeadingBlock>(SECTION_MAP.hero.subheads[0]);
  const subhead2Block = getBlock<HeadingBlock>(SECTION_MAP.hero.subheads[1]);
  const liveBadgeBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.liveBadge);
  const ctaBlock = getBlock<CtaBlock>(SECTION_MAP.hero.ctas[0]);
  const urgencyNoticeBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.urgencyNotice);

  const logoMeta = getImageMeta(logoBlock.src);
  const logoSrc = getLocalImagePath(logoBlock.src);

  return (
    <header className="relative w-full bg-white bg-tech-grid overflow-hidden border-b border-slate-200/80">
      <ScrollProgress />

      {/* Ambient background light gradients */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-400/10 via-indigo-300/5 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Glass Navigation & Announcement Bar */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img
                src={logoSrc}
                alt={logoBlock.alt}
                width={logoMeta.width}
                height={logoMeta.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-[110px] md:w-[130px] h-auto transition-transform duration-200 group-hover:scale-105"
              />
            </a>

            {/* Quick Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#who-this-is-for" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#curriculum" className="hover:text-blue-600 transition-colors">Curriculum</a>
              <a href="#mentors" className="hover:text-blue-600 transition-colors">Mentors</a>
              <a href="#reviews" className="hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">FAQs</a>
            </nav>

            {/* Right side CTA / Countdown badge */}
            <div className="flex items-center gap-3">
              {COHORT.showCountdown && (
                <div className="hidden sm:inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
                  <span data-block={SECTION_MAP.hero.urgencyHeader}>{urgencyHeaderBlock.text}</span>
                </div>
              )}
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
              >
                Join Now →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Core Content: 2 Columns on lg (max-w-[1120px]) */}
      <section className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text (max-w-[620px]) */}
          <div className="lg:col-span-7 max-w-[620px] text-left">
            <ScrollReveal direction="up" delay={0}>
              {/* Live Status & Cohort Start Date */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  data-block={SECTION_MAP.hero.liveBadge}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 animate-ping" />
                  {liveBadgeBlock.text}
                </span>
                <CohortDate />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              {/* Single H1 on the entire page */}
              <h1
                data-block={SECTION_MAP.hero.h1}
                className="text-[34px] sm:text-[42px] lg:text-[58px] font-semibold text-slate-900 leading-[1.12] tracking-[-0.03em] mb-6"
              >
                {h1Block.text}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              {/* Subheading & Value Proposition */}
              <p
                data-block={SECTION_MAP.hero.subheads[0]}
                className="text-base lg:text-[18px] font-normal text-slate-800 mb-3 leading-[1.6]"
              >
                {subhead1Block.text}
              </p>
              <p
                data-block={SECTION_MAP.hero.subheads[1]}
                className="text-base lg:text-[17px] font-normal text-slate-600 leading-[1.6] mb-8"
              >
                {subhead2Block.text}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              {/* Primary Action Button */}
              <div className="flex flex-col items-start gap-3">
                <a
                  href="#lead-form"
                  data-block={SECTION_MAP.hero.ctas.join(",")}
                  className="group relative inline-flex items-center justify-center min-h-[48px] px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaBlock.text}
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
                <p
                  data-block={SECTION_MAP.hero.urgencyNotice}
                  className="text-xs md:text-sm text-slate-500 font-normal"
                >
                  {urgencyNoticeBlock.text}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Parallax Layer Proof Composition */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <ParallaxLayer speed={0.12} className="w-full max-w-[380px]">
              <div className="relative rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-xl shadow-slate-200/50 backdrop-blur-xl metallic-border">
                {/* Decorative technical accent bar */}
                <div className="flex items-center justify-between mb-3 px-2 text-[11px] font-mono text-slate-400 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    CODING MAFIA BATCH
                  </span>
                  <span>LIVE 2026</span>
                </div>
                <img
                  src="/images/00Qw1Td.webp"
                  alt=""
                  width={320}
                  height={320}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded-xl object-cover aspect-square shadow-sm"
                />
              </div>
            </ParallaxLayer>
          </div>
        </div>

        {/* Tech Stack & Platform Badges Grid */}
        <ScrollReveal direction="up" delay={350}>
          <div className="mt-10 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 max-w-[620px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tech-pill">React</span>
              <span className="tech-pill">Next.js</span>
              <span className="tech-pill">Python</span>
              <span className="tech-pill">PyTorch</span>
              <span className="tech-pill">PostgreSQL</span>
              <span className="tech-pill">System Design</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 text-blue-700 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                100% Live Mentorship
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/80 text-emerald-700 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Interactive IDE
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <div className="mt-16 md:mt-20 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase">
          <span>Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-blue-600 rounded-full animate-bounce" />
          </div>
        </div>
      </section>
    </header>
  );
}
