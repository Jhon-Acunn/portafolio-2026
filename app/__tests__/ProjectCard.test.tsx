import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/app/components/ui/ProjectCard";
import type { Project } from "@/app/data/projects";

const mockProject: Project = {
  title: "Test Project",
  description: "A test project description",
  longDescription: "A longer description for testing purposes",
  tags: ["React", "TypeScript"],
  color: "#00D4FF",
  href: "https://example.com",
  github: "https://github.com/test/project",
};

describe("ProjectCard", () => {
  it("renders the project title", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders all tags", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("links to the project URL", () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has accessible aria-label", () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "View project: Test Project");
  });
});
