import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { CtaBandA } from "@/components/CtaBand";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Trust bar */}
      <TrustBar />

      {/* Section 3: Who this is for */}
      <WhoThisIsFor />

      {/* CTA Band Instance A (Blocks 28-30) */}
      <CtaBandA />

      {/* Target anchor for Hero CTA scroll */}
      <div id="lead-form" className="sr-only" aria-hidden="true" />
    </main>
  );
}
