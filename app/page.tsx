"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface TechCategory {
  category: string;
  color: string;
  items: string[];
}

interface LearningItem {
  name: string;
  status: "advanced" | "intermediate" | "beginner";
  progress: number;
}

interface NavItem {
  label: string;
  href: string;
}

// ═══════════════════════════════════════════════════════════════════
// DATA — Edit these to personalize your portfolio
// ═══════════════════════════════════════════════════════════════════

const PERSONAL = {
  name: "Jhonacunn",
  role: "Full-Stack Developer",
  headline: "Crafting digital experiences at the intersection of design and engineering.",
  about: [
    "I build high-performance web applications with modern technologies. Focused on creating seamless, intuitive user experiences that feel effortless.",
    "With a deep passion for clean architecture and elegant design, I transform complex problems into simple, beautiful solutions.",
  ],
  email: "hello@jhonacunn.dev",
  github: "https://github.com/Jhon-Acunn",
  linkedin: "https://linkedin.com/in/jhonacunn",
};

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
];

const TECH_STACK: TechCategory[] = [
  {
    category: "Frontend",
    color: "#00D4FF",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "#7C3AED",
    items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs"],
  },
  {
    category: "DevOps",
    color: "#10B981",
    items: ["Docker", "AWS", "CI/CD", "Linux", "Vercel"],
  },
  {
    category: "Databases",
    color: "#F59E0B",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    category: "Tools",
    color: "#EC4899",
    items: ["Git", "VS Code", "Figma", "Linear", "Notion"],
  },
];

const LEARNING_ITEMS: LearningItem[] = [
  { name: "System Design", status: "advanced", progress: 75 },
  { name: "Rust", status: "intermediate", progress: 40 },
  { name: "Kubernetes", status: "intermediate", progress: 50 },
  { name: "AWS Solutions Architect", status: "beginner", progress: 25 },
];

// ═══════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ═══════════════════════════════════════════════════════════════════
// ICON COMPONENTS (inline SVG — zero dependencies)
// ═══════════════════════════════════════════════════════════════════

const IconGitHub = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const IconLinkedIn = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconMail = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconArrowUp = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > 80) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]">
        <motion.div
          className="h-full bg-[#00D4FF]"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-base font-medium tracking-tight text-white hover:text-[#00D4FF] transition-colors"
        >
          {PERSONAL.name}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`relative text-sm tracking-wide transition-colors ${
                activeSection === item.href
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D4FF]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useScrollProgress
// ═══════════════════════════════════════════════════════════════════

function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollYProgress = useTransform(scrollY, (current) => {
    if (typeof document === "undefined") return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? current / max : 0;
  });

  useEffect(() => {
    if (!isClient) return;
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, isClient]);

  return { scrollYProgress };
}

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      }
    },
    []
  );

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs tracking-[0.15em] uppercase text-zinc-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          {PERSONAL.role}
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={staggerItem}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-[0.85] mb-6"
        >
          {PERSONAL.name.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block hover:text-[#00D4FF] transition-colors duration-300"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {PERSONAL.headline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3.5 rounded-full bg-[#00D4FF] text-black font-medium text-sm tracking-wide overflow-hidden"
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
            className="group px-8 py-3.5 rounded-full border border-white/[0.12] text-zinc-300 font-medium text-sm tracking-wide hover:border-[#00D4FF]/30 hover:text-white transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <IconGitHub className="w-4 h-4" />
              View GitHub
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={staggerItem}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#00D4FF]/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════

function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Label */}
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#00D4FF]">
              About
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — Text */}
            <motion.div variants={staggerItem}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-8">
                Passionate about building{" "}
                <span className="text-[#00D4FF]">exceptional</span> digital
                experiences
              </h2>

              {PERSONAL.about.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-zinc-400 leading-relaxed mb-4 text-base md:text-lg font-light"
                >
                  {paragraph}
                </p>
              ))}

              {/* Stats Row */}
              <div className="flex gap-8 md:gap-12 mt-10 pt-10 border-t border-white/[0.06]">
                {[
                  { value: "3+", label: "Years Exp." },
                  { value: "15+", label: "Projects" },
                  { value: "10+", label: "Technologies" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-medium text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Core Skills */}
            <motion.div variants={staggerItem} className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-sm font-medium text-zinc-300 mb-6 tracking-wide">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "UI/UX Design",
                    "Frontend Engineering",
                    "Backend Architecture",
                    "System Design",
                    "Performance Optimization",
                    "Developer Experience",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full text-xs font-medium border border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-[#00D4FF]/30 hover:text-[#00D4FF] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative line */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                    Always exploring new frontiers
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TECH STACK SECTION
// ═══════════════════════════════════════════════════════════════════

function TechStackSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00D4FF]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#00D4FF]">
              Expertise
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-16"
          >
            Tech Stack
          </motion.h2>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {TECH_STACK.map((category) => (
              <motion.div
                key={category.category}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-opacity-30 transition-all duration-500"
                style={{
                  borderColor: `color-mix(in srgb, ${category.color} 15%, transparent)`,
                  boxShadow: `0 0 30px color-mix(in srgb, ${category.color} 0%, transparent)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px color-mix(in srgb, ${category.color} 10%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px color-mix(in srgb, ${category.color} 0%, transparent)`;
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
                />

                <h3
                  className="text-sm font-medium mb-4 tracking-wide"
                  style={{ color: category.color }}
                >
                  {category.category}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-zinc-400 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROJECTS SECTION — Empty State / Placeholder
// ═══════════════════════════════════════════════════════════════════

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#00D4FF]">
              Work
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-4"
          >
            Projects
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-zinc-500 text-lg font-light mb-16"
          >
            Building something great
          </motion.p>

          {/* Placeholder Cards */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[0, 1, 2].map((i) => (
              <PlaceholderCard key={i} index={i} />
            ))}
          </motion.div>

          {/* Message */}
          <motion.div
            variants={staggerItem}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="text-sm text-zinc-400 font-light">
                More projects are on the way — stay tuned
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default"
    >
      {/* Shimmer Image Placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
        />

        {/* Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center">
            <svg className="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="p-5">
        <div className="h-4 w-3/4 rounded-full bg-white/[0.04] mb-3" />
        <div className="h-3 w-1/2 rounded-full bg-white/[0.03] mb-4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-white/[0.03]" />
          <div className="h-6 w-16 rounded-full bg-white/[0.03]" />
          <div className="h-6 w-16 rounded-full bg-white/[0.03]" />
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/[0.03] to-transparent" />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LEARNING JOURNEY SECTION
// ═══════════════════════════════════════════════════════════════════

function LearningSection() {
  const statusColors: Record<string, string> = {
    advanced: "#00D4FF",
    intermediate: "#7C3AED",
    beginner: "#10B981",
  };

  const statusLabels: Record<string, string> = {
    advanced: "Advanced",
    intermediate: "Intermediate",
    beginner: "Exploring",
  };

  return (
    <section id="learning" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#7C3AED]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#00D4FF]">
              Growth
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-16"
          >
            Currently Exploring
          </motion.h2>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {LEARNING_ITEMS.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Status Dot + Label */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusColors[item.status] }}
                  />
                  <span className="text-xs text-zinc-500 tracking-wide">
                    {statusLabels[item.status]}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-medium text-white mb-4">
                  {item.name}
                </h3>

                {/* Progress Indicator (thin line) */}
                <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: statusColors[item.status] }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="mt-1 text-xs text-zinc-600">
                  {item.progress}%
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Roadmap hint */}
          <motion.div
            variants={staggerItem}
            className="mt-12 p-6 rounded-xl border border-white/[0.04] bg-white/[0.01]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-2 text-[#00D4FF] text-xs tracking-[0.15em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                Focus
              </span>
              <span className="text-zinc-400 font-light">
                System Design &mdash; Building scalable architectures
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════

function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-[#00D4FF]">
              Connect
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-white mb-16"
          >
            Get in Touch
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left — Contact Info */}
            <motion.div variants={staggerItem} className="space-y-8">
              <p className="text-zinc-400 leading-relaxed font-light">
                Have a project in mind or just want to say hello? I&apos;m always
                open to discussing new opportunities.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-[#00D4FF]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors duration-300">
                    <IconMail className="w-4 h-4 text-zinc-400 group-hover:text-[#00D4FF] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 tracking-wide">Email</div>
                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-300">
                      {PERSONAL.email}
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-[#00D4FF]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors duration-300">
                    <IconGitHub className="w-4 h-4 text-zinc-400 group-hover:text-[#00D4FF] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 tracking-wide">GitHub</div>
                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-300">
                      @Jhon-Acunn
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-[#00D4FF]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center group-hover:bg-[#00D4FF]/10 transition-colors duration-300">
                    <IconLinkedIn className="w-4 h-4 text-zinc-400 group-hover:text-[#00D4FF] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 tracking-wide">LinkedIn</div>
                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-300">
                      /in/jhonacunn
                    </div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div variants={staggerItem}>
              <AnimatePresence mode="wait">
                {formState === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center p-8 rounded-2xl border border-[#00D4FF]/20 bg-[#00D4FF]/[0.02]"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00D4FF]/10 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#00D4FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-zinc-400 text-sm font-light text-center">
                      Thank you for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-6 text-xs text-zinc-500 hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="group">
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00D4FF]/30 focus:bg-[#00D4FF]/[0.02] transition-all duration-300"
                        />
                      </div>
                      <div className="group">
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00D4FF]/30 focus:bg-[#00D4FF]/[0.02] transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        rows={5}
                        placeholder="Your message..."
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#00D4FF]/30 focus:bg-[#00D4FF]/[0.02] transition-all duration-300 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formState === "sending"}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="group relative w-full px-8 py-3.5 rounded-xl bg-[#00D4FF] text-black font-medium text-sm tracking-wide overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {formState === "sending" ? "Sending..." : "Send Message"}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-zinc-600 font-light">
          &copy; {new Date().getFullYear()} {PERSONAL.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="text-zinc-600 hover:text-[#00D4FF] transition-colors duration-300"
          >
            <IconMail className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-[#00D4FF] transition-colors duration-300"
          >
            <IconGitHub className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-[#00D4FF] transition-colors duration-300"
          >
            <IconLinkedIn className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOADER / SPLASH SCREEN
// ═══════════════════════════════════════════════════════════════════

function Loader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#07090D] flex flex-col items-center justify-center"
    >
      {/* Central loader */}
      <div className="relative flex flex-col items-center">
        {/* Animated ring */}
        <motion.div
          className="w-16 h-16 rounded-full border border-[#00D4FF]/20 mb-8"
          style={{
            borderTopColor: "#00D4FF",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Name reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl font-medium tracking-tight text-white mb-2">
            {PERSONAL.name}
          </h1>
          <p className="text-xs text-zinc-600 tracking-[0.2em] uppercase">
            {PERSONAL.role}
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#00D4FF]/50 mt-8"
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onFinish={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-[#07090D] min-h-screen font-sans text-white selection:bg-[#00D4FF]/20 selection:text-white"
      >
        {/* Decorative noise texture overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[60] opacity-[0.015] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />

        <Navbar />
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <LearningSection />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  );
}
