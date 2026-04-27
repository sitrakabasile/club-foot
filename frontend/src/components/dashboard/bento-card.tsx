"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "../shared/glass-card";

interface BentoCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Bento grid span: col-span-X and row-span-Y */
  span?: string;
  /** Optional icon at top right */
  icon?: React.ReactNode;
  /** Magnetic hover effect */
  magnetic?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * BentoCard — Premium card for bento-style layouts.
 * Features:
 * - Responsive grid spanning
 * - Glassmorphism effects
 * - Fade-in animation
 * - Gradient overlays for depth
 */
export function BentoCard({
  title,
  subtitle,
  children,
  className,
  span = "col-span-1",
  icon,
  magnetic = true,
  onClick,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("relative group", span, onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <GlassCard
        magnetic={magnetic}
        className={cn(
          "h-full flex flex-col p-6 overflow-hidden",
          "border-white/5 hover:border-primary/20 transition-colors duration-500",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-xl bg-white/5 text-muted-foreground group-hover:text-primary transition-colors">
              {icon}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          {children}
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
      </GlassCard>
    </motion.div>
  );
}
