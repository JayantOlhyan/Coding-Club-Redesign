"use client";

import { useEffect, useState } from "react";
import { COHORT } from "@/lib/cohort";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDateStr: string): TimeLeft {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

function formatBatchDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function CohortDate({ className = "" }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(COHORT.startDate)
  );

  useEffect(() => {
    if (!COHORT.showCountdown) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(COHORT.startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = formatBatchDate(COHORT.startDate);

  // If countdown is disabled (default per PRD §9), render plain batch start date
  if (!COHORT.showCountdown) {
    return (
      <span className={`inline-flex items-center text-sm md:text-base font-medium text-[var(--body)] ${className}`}>
        {COHORT.batchLabelPrefix} {formattedDate}
      </span>
    );
  }

  // If countdown expired, return nothing
  if (timeLeft.isExpired) {
    return null;
  }

  // Active countdown timer when enabled by client
  return (
    <div className={`inline-flex items-center gap-2 text-sm font-medium text-[var(--body)] ${className}`}>
      <span>{COHORT.countdownLabel}:</span>
      <span className="font-semibold text-[var(--ink)] tabular-nums">
        {String(timeLeft.days).padStart(2, "0")}d : {String(timeLeft.hours).padStart(2, "0")}h :{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}
