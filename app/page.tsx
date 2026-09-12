import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhoThisIsFor } from "@/components/WhoThisIsFor";
import { CtaBandA, CtaBandB, CtaBandC, CtaBandD, CtaBandE } from "@/components/CtaBand";
import { Benefits } from "@/components/Benefits";
import { WhatToExpect } from "@/components/WhatToExpect";
import { Curriculum } from "@/components/Curriculum";
import { Mentors } from "@/components/Mentors";
import { Outcomes } from "@/components/Outcomes";
import { Reviews } from "@/components/Reviews";
import { BeforeAndAfter } from "@/components/BeforeAndAfter";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCtaAndFooter } from "@/components/FinalCtaAndFooter";
import { StickyMobileCta } from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)] pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
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

      {/* Section 7: Mentors (Blocks 75-81, 296-313) */}
      <Mentors />

      {/* CTA Band Instance E (Blocks 314-316) */}
      <CtaBandE />

      {/* Section 8: Outcomes (Blocks 317-326) */}
      <Outcomes />

      {/* Section 9: Reviews (Blocks 327-336) */}
      <Reviews />

      {/* Section 10: Before & After (Blocks 337-350) */}
      <BeforeAndAfter />

      {/* Section 11: Pricing (Blocks 2, 351-366) */}
      <Pricing />

      {/* Section 12: FAQ (Blocks 367-383) */}
      <Faq />

      {/* Section 13: Final CTA + Form + Footer (Blocks 11-13, 384-389) */}
      <FinalCtaAndFooter />

      {/* Persistent Mobile Sticky CTA (Hidden at md+) */}
      <StickyMobileCta />
    </main>
  );
}
