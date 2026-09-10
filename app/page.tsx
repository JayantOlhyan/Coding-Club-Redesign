import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { CtaBandA, CtaBandB, CtaBandC } from "@/components/CtaBand";
import { Benefits } from "@/components/Benefits";
import { WhatToExpect } from "@/components/WhatToExpect";

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

      {/* Section 4: Why join / Benefits (Blocks 31-36) */}
      <Benefits />

      {/* CTA Band Instance B (Blocks 42-45) */}
      <CtaBandB />

      {/* Section 5: What to expect (Blocks 46, 49-57) */}
      <WhatToExpect />

      {/* CTA Band Instance C (Block 59) */}
      <CtaBandC />

      {/* Target anchor for Hero CTA scroll */}
      <div id="lead-form" className="sr-only" aria-hidden="true" />
    </main>
  );
}
