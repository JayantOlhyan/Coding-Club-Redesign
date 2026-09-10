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
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--ink-surface)] border-t border-[var(--border)] transition-transform duration-300 ease-in-out pb-[env(safe-area-inset-bottom)] ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ maxHeight: "72px" }}
    >
      <div className="flex items-center justify-center h-16 px-4">
        <a
          href="#lead-form"
          data-block={SECTION_MAP.hero.ctas.join(",")}
          className="inline-flex items-center justify-center w-full max-w-sm h-11 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--ink-surface)] font-semibold text-base transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer"
        >
          {ctaBlock.text}
        </a>
      </div>
    </aside>
  );
}
