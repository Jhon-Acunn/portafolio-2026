"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/app/data/navigation";
import { PERSONAL } from "@/app/data/personal";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";
import { LanguageToggle } from "@/app/components/ui/LanguageToggle";

const navTranslationKeys: Record<string, string> = {
  "#about": "nav.about",
  "#skills": "nav.skills",
  "#projects": "nav.projects",
  "#learning": "nav.learning",
  "#contact": "nav.contact",
};

export function Navbar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScrollProgress();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > 80) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );
    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-subtle)]">
        <motion.div
          className="h-full bg-accent"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="text-base font-medium tracking-tight text-primary hover:text-accent transition-colors"
          aria-label={t("nav.scrollToTop")}
        >
          {PERSONAL.name}
        </button>

        {/* Desktop nav + toggles */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              aria-current={
                activeSection === item.href ? "page" : undefined
              }
              className={`relative text-sm tracking-wide transition-colors ${
                activeSection === item.href
                  ? "text-primary"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t(navTranslationKeys[item.href])}
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
          <div className="w-px h-5 bg-[var(--border-subtle)]" />
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile: hamburger + toggles */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 relative z-50"
            aria-label={
              mobileOpen
                ? t("nav.closeMenu")
                : t("nav.openMenu")
            }
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 5 }
                    : { rotate: 0, y: 0 }
                }
                className="block h-[1.5px] w-full bg-primary rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[1.5px] w-full bg-white rounded-full"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -5 }
                    : { rotate: 0, y: 0 }
                }
                className="block h-[1.5px] w-full bg-primary rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  aria-current={
                    activeSection === item.href ? "page" : undefined
                  }
                  className={`text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-all ${
                    activeSection === item.href
                      ? "text-primary bg-[var(--bg-surface-hover)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  {t(navTranslationKeys[item.href])}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
