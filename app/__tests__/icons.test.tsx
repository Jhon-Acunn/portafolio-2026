import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { IconGitHub } from "@/app/components/icons/IconGitHub";
import { IconLinkedIn } from "@/app/components/icons/IconLinkedIn";
import { IconMail } from "@/app/components/icons/IconMail";

describe("Icon components", () => {
  it("IconGitHub renders with aria-hidden", () => {
    const { container } = render(<IconGitHub />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("IconGitHub accepts custom className", () => {
    const { container } = render(<IconGitHub className="w-8 h-8" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w-8");
    expect(svg).toHaveClass("h-8");
  });

  it("IconLinkedIn renders", () => {
    const { container } = render(<IconLinkedIn />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("IconMail renders", () => {
    const { container } = render(<IconMail />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("all icons render with stroke attribute", () => {
    const { container: c1 } = render(<IconGitHub />);
    const { container: c2 } = render(<IconLinkedIn />);
    const { container: c3 } = render(<IconMail />);

    expect(c1.querySelector("svg")).toHaveAttribute("stroke", "currentColor");
    expect(c2.querySelector("svg")).toHaveAttribute("stroke", "currentColor");
    expect(c3.querySelector("svg")).toHaveAttribute("stroke", "currentColor");
  });
});
