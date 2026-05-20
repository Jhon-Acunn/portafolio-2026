"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "es" : "en")}
      className="relative text-xs tracking-wider uppercase text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-300 font-medium px-2 py-1"
      aria-label={`Switch language to ${locale === "en" ? "Spanish" : "English"}`}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
}
