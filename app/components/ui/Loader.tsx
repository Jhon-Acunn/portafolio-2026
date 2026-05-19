"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "@/app/data/personal";

interface LoaderProps {
  onFinish: () => void;
}

export function Loader({ onFinish }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated ring */}
        <motion.div
          className="w-16 h-16 rounded-full border border-[#00D4FF]/20 mb-8"
          style={{ borderTopColor: "#00D4FF" }}
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
          <p className="text-xs text-zinc-500 tracking-[0.2em] uppercase">
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
