"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "@/app/data/personal";
import { IconGitHub } from "@/app/components/icons/IconGitHub";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
  }, []);

  const scrollToSection = (id: string) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 212, 255, 0.06), transparent 60%)`,
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none max-sm:w-[250px] max-sm:h-[250px] max-sm:-left-16"
        style={{
          background: "radial-gradient(circle, #00D4FF, transparent)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none max-sm:w-[300px] max-sm:h-[300px] max-sm:-right-16"
        style={{
          background: "radial-gradient(circle, #7C3AED, transparent)",
        }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Role Label */}
        <motion.div
          variants={staggerItem}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-default bg-surface text-xs tracking-[0.15em] uppercase text-secondary mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          {PERSONAL.role}
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-primary leading-[0.85] mb-6"
        >
          {PERSONAL.name.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block hover:text-[#00D4FF] transition-colors duration-300"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </motion.h1>

        {/* Headline */}
        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed font-light"
        >
          {PERSONAL.headline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <motion.button
            onClick={() => scrollToSection("#contact")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3.5 rounded-full bg-accent text-[var(--accent-foreground)] font-medium text-sm tracking-wide overflow-hidden"
          >
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute -inset-2 bg-[#00D4FF] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          </motion.button>

          <motion.a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-3.5 rounded-full border border-default text-secondary font-medium text-sm tracking-wide hover:border-accent/30 hover:text-primary transition-all duration-300"
            aria-label={`View ${PERSONAL.name} on GitHub`}
          >
            <span className="flex items-center gap-2">
              <IconGitHub className="w-4 h-4" />
              View GitHub
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#00D4FF]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
