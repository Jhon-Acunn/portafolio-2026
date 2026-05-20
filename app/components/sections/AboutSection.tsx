"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { PERSONAL } from "@/app/data/personal";
import { useLanguage } from "@/app/providers/LanguageProvider";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            {t("about.label")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-8">
              {(() => {
                const parts = t("about.heading").split(t("about.headingHighlight"));
                return (
                  <>
                    {parts[0]}
                    <span className="text-accent">{t("about.headingHighlight")}</span>
                    {parts[1]}
                  </>
                );
              })()}
            </h2>

            {PERSONAL.about.map((paragraph, i) => (
              <p
                key={i}
                className="text-secondary leading-relaxed mb-4 text-base md:text-lg font-light"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex gap-8 md:gap-12 mt-10 pt-10 border-t border-subtle">
              {[
                { value: "3+", label: t("about.statYears") },
                { value: "15+", label: t("about.statProjects") },
                { value: "10+", label: t("about.statTechnologies") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-medium text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-tertiary mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="p-8 rounded-2xl border border-subtle bg-surface">
              <h3 className="text-sm font-medium text-primary mb-6 tracking-wide">
                {t("about.competencies")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  t("about.skillUIUX"),
                  t("about.skillFrontend"),
                  t("about.skillBackend"),
                  t("about.skillSystem"),
                  t("about.skillPerformance"),
                  t("about.skillDX"),
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-xs font-medium border border-subtle bg-surface text-secondary hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-subtle">
                <div className="flex items-center gap-3 text-xs text-tertiary">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {t("about.tagline")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
