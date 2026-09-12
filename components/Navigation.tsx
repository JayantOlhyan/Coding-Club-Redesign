"use client";

import Link from "next/link";
import { getBlock, getImageMeta, getLocalImagePath, SECTION_MAP, ImageBlock, HeadingBlock } from "@/lib/content";
import { COHORT } from "@/lib/cohort";
import { ScrollProgress } from "./motion/ScrollProgress";

export function Navigation() {
  const logoBlock = getBlock<ImageBlock>(SECTION_MAP.hero.logo);
  const urgencyHeaderBlock = getBlock<HeadingBlock>(SECTION_MAP.hero.urgencyHeader);

  const logoMeta = getImageMeta(logoBlock.src);
  const logoSrc = getLocalImagePath(logoBlock.src);

  return (
    <div className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <ScrollProgress />
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
          </Link>

          {/* Multi-page Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="/curriculum" className="hover:text-blue-600 transition-colors">Curriculum</Link>
            <Link href="/mentors" className="hover:text-blue-600 transition-colors">Mentors</Link>
            <Link href="/reviews" className="hover:text-blue-600 transition-colors">Reviews</Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors font-semibold text-blue-600">Pricing</Link>
          </nav>

          {/* Right side CTA / Countdown badge */}
          <div className="flex items-center gap-3">
            {COHORT.showCountdown && (
              <div className="hidden sm:inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
                <span data-block={SECTION_MAP.hero.urgencyHeader}>{urgencyHeaderBlock.text}</span>
              </div>
            )}
            <Link
              href="/pricing#lead-form"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
            >
              Join Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
