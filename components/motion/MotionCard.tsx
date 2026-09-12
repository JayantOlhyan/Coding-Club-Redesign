"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
}

export function MotionCard({
  children,
  className = "",
  glowColor = "rgba(37, 99, 235, 0.08)",
  enableTilt = true,
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current || !enableTilt) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 ${className}`}
      style={
        isHovered && !reducedMotion
          ? {
              backgroundImage: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent 40%)`,
            }
          : undefined
      }
    >
      {/* Top subtle metallic shine accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent opacity-60 group-hover:via-blue-500/60" />
      
      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
