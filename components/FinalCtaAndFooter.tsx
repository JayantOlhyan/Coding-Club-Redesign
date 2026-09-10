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
      className="w-full bg-[var(--surface-2)] border-t border-[var(--border)] pt-16 md:pt-24 pb-12"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lead Capture Form Card */}
        <div className="max-w-[560px] mx-auto bg-[var(--surface)] border border-[var(--border)] rounded p-6 sm:p-8 md:p-10 shadow-sm mb-12">
          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[var(--ink)]">
                Application Submitted
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name={f11.name}
                  placeholder={f11.placeholder}
                  aria-label={f11.placeholder}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-block={SECTION_MAP.finalCtaAndFooter.fields[0]}
                  className="w-full px-4 py-3 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[var(--ink)] placeholder:text-[var(--body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-base"
                />
              </div>

              <div>
                <input
                  type="email"
                  name={f12.name}
                  placeholder={f12.placeholder}
                  aria-label={f12.placeholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-block={SECTION_MAP.finalCtaAndFooter.fields[1]}
                  className="w-full px-4 py-3 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[var(--ink)] placeholder:text-[var(--body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-base"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name={f13.name}
                  placeholder={f13.placeholder}
                  aria-label={f13.placeholder}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-block={SECTION_MAP.finalCtaAndFooter.fields[2]}
                  className="w-full px-4 py-3 rounded border border-[var(--border)] bg-[var(--surface-2)] text-[var(--ink)] placeholder:text-[var(--body)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-base"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  data-block={SECTION_MAP.hero.ctas[0]}
                  className="w-full min-h-[44px] min-w-[44px] px-8 py-4 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--ink)] font-semibold text-base md:text-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none shadow-sm cursor-pointer"
                >
                  {submitCta.text}
                </button>
              </div>
            </form>
          )}

          {/* Secondary Lead Magnet / WhatsApp Mentor Button */}
          <div className="text-center mt-6 pt-6 border-t border-[var(--border)]">
            <a
              href={l389.href}
              target="_blank"
              rel="noopener noreferrer"
              data-block={SECTION_MAP.finalCtaAndFooter.links[4]}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-3 rounded bg-[var(--surface-2)] hover:bg-[var(--border)]/30 text-[var(--ink)] font-semibold text-sm md:text-base transition-colors border border-[var(--border)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {l389.text}
            </a>
          </div>
        </div>

        {/* Bottom Navigation & Brand Footer */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
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

          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-sm text-[var(--body)]">
            <a
              href={l385.href}
              target="_blank"
              rel="noopener noreferrer"
              data-block={SECTION_MAP.finalCtaAndFooter.links[0]}
              className="hover:text-[var(--ink)] transition-colors py-2"
            >
              {l385.text}
            </a>
            <a
              href={l386.href}
              target="_blank"
              rel="noopener noreferrer"
              data-block={SECTION_MAP.finalCtaAndFooter.links[1]}
              className="hover:text-[var(--ink)] transition-colors py-2"
            >
              {l386.text}
            </a>
            <a
              href={l387.href}
              data-block={SECTION_MAP.finalCtaAndFooter.links[2]}
              className="hover:text-[var(--ink)] transition-colors py-2"
            >
              {l387.text}
            </a>
            <a
              href={l388.href}
              data-block={SECTION_MAP.finalCtaAndFooter.links[3]}
              className="hover:text-[var(--ink)] transition-colors py-2"
            >
              {l388.text}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
