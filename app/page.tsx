import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { TechStackSection } from "@/app/components/sections/TechStackSection";

// Lazy-loaded sections below the fold
import dynamic from "next/dynamic";

const ProjectsSection = dynamic(
  () =>
    import("@/app/components/sections/ProjectsSection").then(
      (mod) => mod.ProjectsSection
    ),
  {
    loading: () => (
      <div className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-4 w-16 rounded-full bg-white/[0.03] mb-4" />
          <div className="h-10 w-48 rounded-lg bg-white/[0.03] mb-4" />
          <div className="h-5 w-36 rounded-full bg-white/[0.02] mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] aspect-[4/3] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

const LearningSection = dynamic(
  () =>
    import("@/app/components/sections/LearningSection").then(
      (mod) => mod.LearningSection
    ),
  {
    loading: () => (
      <div className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-4 w-20 rounded-full bg-white/[0.03] mb-4" />
          <div className="h-10 w-64 rounded-lg bg-white/[0.03] mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] h-32 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () =>
    import("@/app/components/sections/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  {
    loading: () => (
      <div className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-4 w-24 rounded-full bg-white/[0.03] mb-4" />
          <div className="h-10 w-48 rounded-lg bg-white/[0.03] mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-white/[0.01] border border-white/[0.04] animate-pulse"
                />
              ))}
            </div>
            <div className="h-80 rounded-xl bg-white/[0.01] border border-white/[0.04] animate-pulse" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main
      id="main-content"
      className="bg-surface min-h-screen font-sans text-white selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]"
    >
      {/* Decorative noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.015] mix-blend-soft-light bg-noise"
      />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <LearningSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
