import { LEARNING_ITEMS, STATUS_COLORS, STATUS_LABELS } from "@/app/data/learning";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";

export function LearningSection() {
  return (
    <AnimatedSection id="learning" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#7C3AED]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            Growth
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-16">
          Currently Exploring
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {LEARNING_ITEMS.map((item) => (
            <div
              key={item.name}
              className="group p-6 rounded-xl border border-subtle bg-surface hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-1 stagger-item"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[item.status] }}
                />
                <span className="text-xs text-tertiary tracking-wide">
                  {STATUS_LABELS[item.status]}
                </span>
              </div>

              <h3 className="text-base font-medium text-primary mb-4">
                {item.name}
              </h3>

              <div className="h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${item.progress}%`,
                    backgroundColor: STATUS_COLORS[item.status],
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-tertiary">
                {item.progress}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-subtle bg-surface/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-tertiary">
            <span className="flex items-center gap-2 text-accent text-xs tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Focus
            </span>
            <span className="text-secondary font-light">
              System Design &mdash; Building scalable architectures
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
