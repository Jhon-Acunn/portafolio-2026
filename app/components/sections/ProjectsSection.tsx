import { PROJECTS } from "@/app/data/projects";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { ProjectCard } from "@/app/components/ui/ProjectCard";

export function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            Work
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-4">
          Projects
        </h2>

        <p className="text-tertiary text-lg font-light mb-16">
          Real products, real impact
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
