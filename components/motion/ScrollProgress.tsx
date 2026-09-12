"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
