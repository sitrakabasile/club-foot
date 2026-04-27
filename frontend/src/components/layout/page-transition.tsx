"use client";

import { motion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";

/**
 * PageTransition — Wraps page content with smooth framer-motion transitions.
 * Uses opacity + Y-translate for a polished entry/exit effect.
 * Apply this inside each page to animate route transitions.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={ANIMATION.pageTransition.initial}
      animate={ANIMATION.pageTransition.animate}
      exit={ANIMATION.pageTransition.exit}
      transition={ANIMATION.pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
