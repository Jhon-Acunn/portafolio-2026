import { describe, it, expect } from "vitest";
import { TECH_STACK } from "@/app/data/tech-stack";

describe("Tech stack data", () => {
  it("has at least one category", () => {
    expect(TECH_STACK.length).toBeGreaterThan(0);
  });

  it("every category has required fields", () => {
    TECH_STACK.forEach((cat) => {
      expect(cat.category).toBeTruthy();
      expect(cat.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(cat.items.length).toBeGreaterThan(0);
    });
  });

  it("categories are unique", () => {
    const names = TECH_STACK.map((c) => c.category);
    expect(new Set(names).size).toBe(names.length);
  });

  it("all items are non-empty strings", () => {
    TECH_STACK.forEach((cat) => {
      cat.items.forEach((item) => {
        expect(typeof item).toBe("string");
        expect(item.length).toBeGreaterThan(0);
      });
    });
  });
});
