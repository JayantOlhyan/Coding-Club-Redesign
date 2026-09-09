import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Trust bar */}
      <TrustBar />

      {/* Target anchor for Hero CTA scroll */}
      <div id="lead-form" className="sr-only" aria-hidden="true" />
    </main>
  );
}
