"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable magnetic hover effect (scale + glow) */
  magnetic?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * GlassCard — Reusable glassmorphism card component.
 * Features:
 * - Frosted glass background with backdrop blur
 * - Subtle border glow on hover
 * - Optional magnetic hover animation (scale + shadow shift)
 * - Smooth transitions following 200-300ms best practice
 */
export function GlassCard({
  children,
  className,
  magnetic = false,
  onClick,
}: GlassCardProps) {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        "glass glass-hover rounded-2xl p-6",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );

  if (!magnetic) return content;

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 } as const,
      }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      {content}
    </motion.div>
  );
}
