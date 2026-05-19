"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform } from "framer-motion";

export function useScrollProgress() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const scrollYProgress = useTransform(scrollY, (current) => {
    if (typeof document === "undefined") return 0;
    const max =
      document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? current / max : 0;
  });

  return { scrollYProgress };
}
