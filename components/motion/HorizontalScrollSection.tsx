"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  scrollMultiplier?: number; // Multiplier for track height calculation
  onProgressChange?: (progress: number, activeIndex: number) => void;
  totalItems?: number;
}

export function HorizontalScrollSection({
  children,
  className = "",
  trackClassName = "",
  scrollMultiplier = 2.5,
  onProgressChange,
  totalItems = 1,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    let requestID: number;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // Calculate progress from 0 to 1
      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollableHeight));

      setProgress(rawProgress);

      // Total horizontal distance to translate
      const trackScrollWidth = track.scrollWidth - window.innerWidth + 64; // pad offset
      if (trackScrollWidth > 0) {
        const translateX = rawProgress * trackScrollWidth;
        track.style.transform = `translate3d(-${translateX}px, 0, 0)`;
      }

      if (onProgressChange) {
        const activeIdx = Math.min(
          totalItems - 1,
          Math.floor(rawProgress * totalItems)
        );
        onProgressChange(rawProgress, activeIdx);
      }
    };

    const onScroll = () => {
      requestID = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(requestID);
    };
  }, [isDesktop, reducedMotion, onProgressChange, totalItems]);

  // Mobile / Reduced Motion layout fallback
  if (!isDesktop || reducedMotion) {
    return (
      <div className={`w-full overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar ${className}`}>
        <div className={`flex gap-4 px-4 sm:px-6 min-w-max ${trackClassName}`}>
          {children}
        </div>
      </div>
    );
  }

  // Desktop Pinned Horizontal Scroll
  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div
          ref={trackRef}
          className={`flex gap-6 px-12 transition-transform duration-75 ease-out will-change-transform ${trackClassName}`}
          style={{ width: "max-content" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
