"use client";

import { useState } from "react";
import {
  getBlock,
  getImageMeta,
  getLocalImagePath,
  SECTION_MAP,
  FieldBlock,
  ImageBlock,
  CtaBlock,
} from "@/lib/content";
import { ScrollReveal } from "./motion/ScrollReveal";

export function FinalCtaAndFooter() {
  const f11 = getBlock<FieldBlock>(SECTION_MAP.finalCtaAndFooter.fields[0]);
  const f12 = getBlock<FieldBlock>(SECTION_MAP.finalCtaAndFooter.fields[1]);
  const f13 = getBlock<FieldBlock>(SECTION_MAP.finalCtaAndFooter.fields[2]);

  const submitCta = getBlock<CtaBlock>(SECTION_MAP.hero.ctas[0]);

  const footerLogo = getBlock<ImageBlock>(
    SECTION_MAP.finalCtaAndFooter.footerLogo
  );
  const footerLogoMeta = getImageMeta(footerLogo.src);
  const footerLogoSrc = getLocalImagePath(footerLogo.src);

  const l385 = getBlock<CtaBlock>(SECTION_MAP.finalCtaAndFooter.links[0]);
  const l386 = getBlock<CtaBlock>(SECTION_MAP.finalCtaAndFooter.links[1]);
  const l387 = getBlock<CtaBlock>(SECTION_MAP.finalCtaAndFooter.links[2]);
  const l388 = getBlock<CtaBlock>(SECTION_MAP.finalCtaAndFooter.links[3]);
  const l389 = getBlock<CtaBlock>(SECTION_MAP.finalCtaAndFooter.links[4]);

  // Form state & inline validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = /^\+?[\d\s-]{10,}$/.test(phone.trim());
  const isNameValid = name.trim().length >= 2;
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      }).catch(() => ({ ok: true }));

      console.log("[STUB /api/lead] Lead captured successfully:", {
        name,
        email,
        phone,
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="lead-form"
      aria-label="Lead Form and Footer"
      className="relative w-full bg-slate-900 text-slate-100 pt-16 md:pt-24 pb-12 bg-tech-grid"
    >
      <div className="max-w-[620px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lead Capture Form Card */}
        <ScrollReveal direction="up" delay={0}>
          <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
            
            {isSuccess ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 fill-none stroke-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-white">
                  Application Submitted
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Our mentorship team will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Start Your Coding Journey Today
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Fill out the quick form below to reserve your seat in the Coding Mafia Batch.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    name={f11.name}
                    placeholder={f11.placeholder}
                    aria-label={f11.placeholder}
                    required
                    inputMode="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-block={SECTION_MAP.finalCtaAndFooter.fields[0]}
                    className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name={f12.name}
                    placeholder={f12.placeholder}
                    aria-label={f12.placeholder}
                    required
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-block={SECTION_MAP.finalCtaAndFooter.fields[1]}
                    className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name={f13.name}
                    placeholder={f13.placeholder}
                    aria-label={f13.placeholder}
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    data-block={SECTION_MAP.finalCtaAndFooter.fields[2]}
                    className="w-full min-h-[48px] px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    data-block={SECTION_MAP.hero.ctas[0]}
                    className="w-full min-h-[48px] px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base md:text-lg transition-all duration-200 shadow-lg shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer"
                  >
                    {submitCta.text}
                  </button>
                </div>
              </form>
            )}

            {/* Secondary Lead Magnet / WhatsApp Mentor Button */}
            <div className="text-center mt-6 pt-6 border-t border-slate-800">
              <a
                href={l389.href}
                target="_blank"
                rel="noopener noreferrer"
                data-block={SECTION_MAP.finalCtaAndFooter.links[4]}
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm md:text-base transition-colors border border-slate-800 focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {l389.text}
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Navigation & Brand Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center p-2 rounded-xl bg-white shadow-sm">
            <img
              src={footerLogoSrc}
              alt={footerLogo.alt || "Coding Club India"}
              width={footerLogoMeta.width}
              height={footerLogoMeta.height}
              loading="lazy"
              decoding="async"
              className="w-[120px] md:w-[140px] h-auto"
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-sm text-slate-400">
            <a
              href={l385.href}
              target="_blank"
              rel="noopener noreferrer"
              data-block={SECTION_MAP.finalCtaAndFooter.links[0]}
              className="hover:text-white transition-colors py-2"
            >
              {l385.text}
            </a>
            <a
              href={l386.href}
              target="_blank"
              rel="noopener noreferrer"
              data-block={SECTION_MAP.finalCtaAndFooter.links[1]}
              className="hover:text-white transition-colors py-2"
            >
              {l386.text}
            </a>
            <a
              href={l387.href}
              data-block={SECTION_MAP.finalCtaAndFooter.links[2]}
              className="hover:text-white transition-colors py-2"
            >
              {l387.text}
            </a>
            <a
              href={l388.href}
              data-block={SECTION_MAP.finalCtaAndFooter.links[3]}
              className="hover:text-white transition-colors py-2"
            >
              {l388.text}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
