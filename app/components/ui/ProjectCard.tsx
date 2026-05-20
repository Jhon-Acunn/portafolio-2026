"use client";

import type { Project } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/LanguageProvider";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block stagger-item"
      aria-label={t("project.viewAria", { title: project.title })}
    >
      <div className="relative overflow-hidden rounded-xl border border-subtle bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)]">
        {/* Image area */}
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: project.color }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}20`,
              }}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: project.color }}
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-medium text-primary group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <svg
              className="w-4 h-4 text-tertiary group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>

          <p className="text-sm text-secondary font-light leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] rounded-full bg-elevated text-tertiary border border-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent"
            style={{
              background: `linear-gradient(to top, ${project.color}08, transparent)`,
            }}
          />
        </div>
      </div>
    </a>
  );
}
