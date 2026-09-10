import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { CtaBandA, CtaBandB, CtaBandC, CtaBandD } from "@/components/CtaBand";
import { Benefits } from "@/components/Benefits";
import { WhatToExpect } from "@/components/WhatToExpect";
import { Curriculum } from "@/components/Curriculum";

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

      {/* Section 6: Curriculum (Blocks 60-74, 83-140, 142-164, 165-291, 82) */}
      <Curriculum />

      {/* CTA Band Instance D (Blocks 292-295) */}
      <CtaBandD />

      {/* Target anchor for Hero CTA scroll */}
      <div id="lead-form" className="sr-only" aria-hidden="true" />
    </main>
  );
}
