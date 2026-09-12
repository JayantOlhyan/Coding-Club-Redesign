"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // e.g., -0.2 for slower, 0.3 for faster
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.15,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let requestID: number;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if in or near viewport
      if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
        const centerY = rect.top + rect.height / 2;
        const viewportCenterY = windowHeight / 2;
        const offset = (centerY - viewportCenterY) * speed;

        ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const onScroll = () => {
      requestID = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(requestID);
    };
  }, [speed, reducedMotion]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
