import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  /** Number of text lines to simulate */
  lines?: number;
  /** Show a circular avatar placeholder */
  avatar?: boolean;
  /** Show an image placeholder at top */
  image?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SkeletonCard — Sophisticated skeleton loader with shimmer effect.
 * Provides a premium loading state that matches the glassmorphism design.
 * The shimmer animation is defined in globals.css (.skeleton class).
 */
export function SkeletonCard({
  lines = 3,
  avatar = false,
  image = false,
  className,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 space-y-4 animate-pulse",
        className
      )}
    >
      {/* Image placeholder */}
      {image && (
        <div className="skeleton h-40 w-full rounded-xl" />
      )}

      {/* Header row: avatar + title */}
      <div className="flex items-center gap-3">
        {avatar && (
          <div className="skeleton h-10 w-10 rounded-full flex-shrink-0" />
        )}
        <div className="space-y-2 flex-1">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>

      {/* Content lines */}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-3 rounded"
            style={{
              /* Vary line widths for realistic look */
              width: `${85 - i * 15}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * SkeletonLine — Simple inline skeleton for text placeholders.
 */
export function SkeletonLine({
  width = "100%",
  height = "1rem",
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("skeleton rounded", className)}
      style={{ width, height }}
    />
  );
}
