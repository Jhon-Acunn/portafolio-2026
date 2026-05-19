"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMail } from "@/app/components/icons/IconMail";
import { IconGitHub } from "@/app/components/icons/IconGitHub";
import { IconLinkedIn } from "@/app/components/icons/IconLinkedIn";
import { PERSONAL } from "@/app/data/personal";
import { AnimatedSection } from "@/app/components/ui/AnimatedSection";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ContactSection() {
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  return (
    <AnimatedSection id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-accent">
            Connect
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-16">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left — Contact Info */}
          <div className="space-y-8">
            <p className="text-secondary leading-relaxed font-light">
              Have a project in mind or just want to say hello? I&apos;m always
              open to discussing new opportunities.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-subtle hover:border-accent/20 transition-all duration-300"
                aria-label={`Send email to ${PERSONAL.email}`}
              >
                <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center group-hover:bg-[var(--accent-surface)] transition-colors duration-300">
                  <IconMail className="w-4 h-4 text-tertiary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-tertiary tracking-wide">Email</div>
                  <div className="text-sm text-secondary group-hover:text-primary transition-colors duration-300">
                    {PERSONAL.email}
                  </div>
                </div>
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-subtle hover:border-accent/20 transition-all duration-300"
                aria-label={`View ${PERSONAL.name} on GitHub`}
              >
                <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center group-hover:bg-[var(--accent-surface)] transition-colors duration-300">
                  <IconGitHub className="w-4 h-4 text-tertiary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-tertiary tracking-wide">GitHub</div>
                  <div className="text-sm text-secondary group-hover:text-primary transition-colors duration-300">
                    @Jhon-Acunn
                  </div>
                </div>
              </a>

              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-subtle hover:border-accent/20 transition-all duration-300"
                aria-label={`View ${PERSONAL.name} on LinkedIn`}
              >
                <div className="w-10 h-10 rounded-lg bg-elevated flex items-center justify-center group-hover:bg-[var(--accent-surface)] transition-colors duration-300">
                  <IconLinkedIn className="w-4 h-4 text-tertiary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-tertiary tracking-wide">LinkedIn</div>
                  <div className="text-sm text-secondary group-hover:text-primary transition-colors duration-300">
                    /in/jhonacunn
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <AnimatePresence mode="wait">
              {formState === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center p-8 rounded-2xl border border-accent/20 bg-[var(--accent-surface)]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-surface)] flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-primary mb-2">Message Sent!</h3>
                  <p className="text-secondary text-sm font-light text-center">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-xs text-tertiary hover:text-primary transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="sr-only">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        required
                        aria-required="true"
                        className="w-full px-5 py-3.5 rounded-xl bg-surface border border-default text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/30 focus:bg-[var(--accent-surface)] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        aria-required="true"
                        className="w-full px-5 py-3.5 rounded-xl bg-surface border border-default text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/30 focus:bg-[var(--accent-surface)] transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Your message..."
                      required
                      aria-required="true"
                      className="w-full px-5 py-3.5 rounded-xl bg-surface border border-default text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/30 focus:bg-[var(--accent-surface)] transition-all duration-300 resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <div className="text-sm text-red-400 bg-red-400/10 px-4 py-3 rounded-lg" role="alert">
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={formState === "sending"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative w-full px-8 py-3.5 rounded-xl bg-accent text-[var(--accent-foreground)] font-medium text-sm tracking-wide overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {formState === "sending" ? "Sending..." : "Send Message"}
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
