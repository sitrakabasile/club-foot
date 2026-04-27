import { SkeletonCard } from "@/components/shared/skeleton-card";

/**
 * Global loading state — displayed during route transitions.
 * Uses skeleton cards matching the glassmorphism design for a cohesive UX.
 */
export default function Loading() {
  return (
    <div className="min-h-screen px-4 pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero skeleton */}
        <div className="text-center mb-16 space-y-4">
          <div className="skeleton h-6 w-48 mx-auto rounded-full" />
          <div className="skeleton h-12 w-96 mx-auto rounded-lg" />
          <div className="skeleton h-12 w-80 mx-auto rounded-lg" />
          <div className="skeleton h-5 w-64 mx-auto rounded" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} lines={1} className="py-4" />
          ))}
        </div>

        {/* Feature cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} lines={3} />
          ))}
        </div>
      </div>
    </div>
  );
}
