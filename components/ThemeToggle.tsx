"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SNAPPY_SPRING } from "@/lib/animation-constants";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 transition-colors shadow-lg group overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={SNAPPY_SPRING}
          className="flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px] text-primary select-none group-hover:scale-110 transition-transform">
            {isDark ? "dark_mode" : "light_mode"}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}
