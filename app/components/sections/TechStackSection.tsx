import { TECH_STACK } from "@/app/data/tech-stack";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";

function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function TechStackSection() {
  return (
    <AnimatedSection
      id="skills"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            Expertise
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-16">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 stagger-children">
          {TECH_STACK.map((category) => (
            <div
              key={category.category}
              className="group relative p-6 rounded-xl border border-subtle bg-surface transition-all duration-500 hover:-translate-y-1 stagger-item"
              style={{
                borderColor: `${hexToRgba(category.color, 0.15)}`,
              }}
            >
              <div
                className="absolute top-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                }}
              />

              <h3
                className="text-sm font-medium mb-4 tracking-wide"
                style={{ color: category.color }}
              >
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-elevated text-secondary border border-subtle group-hover:border-[var(--border-hover)] transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
