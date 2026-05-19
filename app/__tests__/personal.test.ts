import { describe, it, expect } from "vitest";
import { PERSONAL } from "@/app/data/personal";

describe("Personal data", () => {
  it("has a name", () => {
    expect(PERSONAL.name).toBeTruthy();
    expect(typeof PERSONAL.name).toBe("string");
  });

  it("has a role", () => {
    expect(PERSONAL.role).toBeTruthy();
    expect(PERSONAL.role).toContain("Developer");
  });

  it("has a headline", () => {
    expect(PERSONAL.headline).toBeTruthy();
    expect(PERSONAL.headline.length).toBeGreaterThan(20);
  });

  it("has at least one about paragraph", () => {
    expect(PERSONAL.about.length).toBeGreaterThanOrEqual(1);
    PERSONAL.about.forEach((p) => {
      expect(typeof p).toBe("string");
      expect(p.length).toBeGreaterThan(10);
    });
  });

  it("has an email with valid format", () => {
    expect(PERSONAL.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has GitHub and LinkedIn URLs", () => {
    expect(PERSONAL.github).toContain("github.com");
    expect(PERSONAL.linkedin).toContain("linkedin.com");
  });
});
