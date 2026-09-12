"use client";

import { useEffect, useState } from "react";
import { getBlock, SECTION_MAP, CtaBlock } from "@/lib/content";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const ctaBlock = getBlock<CtaBlock>(SECTION_MAP.hero.ctas[0]);

  useEffect(() => {
    const heroEl = document.querySelector("header");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Quick registration"
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 transition-transform duration-300 ease-in-out pb-[env(safe-area-inset-bottom)] shadow-lg ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-center py-2.5 px-4">
        <a
          href="#lead-form"
          data-block={SECTION_MAP.hero.ctas.join(",")}
          className="inline-flex items-center justify-center w-full max-w-md min-h-[48px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-md shadow-blue-600/25 active:scale-[0.98] cursor-pointer"
        >
          {ctaBlock.text}
        </a>
      </div>
    </aside>
  );
}
