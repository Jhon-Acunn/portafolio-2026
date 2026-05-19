"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

/**
 * Lightweight section wrapper that reveals content on scroll using CSS transitions.
 * Replaces framer-motion `whileInView` for entry animations — zero JS cost after mount.
 */
export function AnimatedSection({
  children,
  className = "",
  id,
  as: Tag = "section",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
