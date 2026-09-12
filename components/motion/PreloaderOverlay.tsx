"use client";

import React, { useEffect, useState } from "react";
import { getBlock, getLocalImagePath, SECTION_MAP, ImageBlock } from "@/lib/content";
import { useReducedMotion } from "./useReducedMotion";

export function PreloaderOverlay() {
  const reducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const logoBlock = getBlock<ImageBlock>(SECTION_MAP.hero.logo);
  const logoSrc = getLocalImagePath(logoBlock.src);

  useEffect(() => {
    const isHeadless = typeof window !== "undefined" && navigator.userAgent.includes("Headless");
    if (reducedMotion || isHeadless) {
      setLoading(false);
      setDismissed(true);
      return;
    }

    // Smooth progress line simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            // Hide element from layout after fade out transition finishes
            setTimeout(() => setDismissed(true), 700);
          }, 250);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!loading}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-tech-grid transition-all duration-700 ease-in-out ${
        loading
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Animated CODING MAFIA Logo */}
        <div className="relative p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xl shadow-slate-200/50 backdrop-blur-xl metallic-border">
          <img
            src={logoSrc}
            alt={logoBlock.alt || "Coding Mafia"}
            width={160}
            height={60}
            className="w-[140px] sm:w-[170px] h-auto object-contain"
          />
        </div>

        {/* Progress Fill Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Technical Status Badges */}
        <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-widest text-slate-500 uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <span>CODING MAFIA BATCH 2026</span>
          <span className="text-blue-600 ml-1">{`${Math.min(progress, 100)}%`}</span>
        </div>
      </div>
    </div>
  );
}
