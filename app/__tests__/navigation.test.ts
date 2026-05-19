import { describe, it, expect } from "vitest";
import { NAV_ITEMS } from "@/app/data/navigation";

describe("Navigation data", () => {
  it("has at least one item", () => {
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it("every item has label and href", () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href).toMatch(/^#/);
    });
  });

  it("all hrefs are unique", () => {
    const hrefs = NAV_ITEMS.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("all labels are unique", () => {
    const labels = NAV_ITEMS.map((i) => i.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
