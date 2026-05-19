import { describe, it, expect } from "vitest";
import { PROJECTS } from "@/app/data/projects";

describe("Projects data", () => {
  it("has at least one project", () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(1);
  });

  it("every project has required fields", () => {
    PROJECTS.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.longDescription).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(project.href).toBeTruthy();
    });
  });

  it("every project has unique title", () => {
    const titles = PROJECTS.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("tags contain only strings", () => {
    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => {
        expect(typeof tag).toBe("string");
      });
    });
  });
});
