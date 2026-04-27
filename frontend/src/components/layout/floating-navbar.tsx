"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Trophy,
  HeartPulse,
  FileText,
  GraduationCap,
  BarChart3,
  Brain,
  Menu,
  X,
  Shield,
  ShoppingBag,
  Ticket,
  Newspaper,
  Stethoscope,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";

/**
 * Icon mapping: resolves icon name strings to Lucide React components.
 * This avoids dynamic imports and keeps the bundle predictable.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Trophy,
  HeartPulse,
  FileText,
  GraduationCap,
  BarChart3,
  Brain,
  ShoppingBag,
  Ticket,
  Newspaper,
  Stethoscope,
};

/**
 * FloatingNavbar — Glassmorphism navigation bar with:
 * - Hide on scroll down, reveal on scroll up
 * - Magnetic hover effects on nav items
 * - Mobile drawer with animated stagger
 * - Active link highlighting with animated underline
 */
export function FloatingNavbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  /** Scroll handler: hide navbar on scroll down, show on scroll up */
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show navbar when near top of page
    if (currentScrollY < 50) {
      setIsVisible(true);
      setIsScrolled(false);
    } else {
      // Hide when scrolling down, show when scrolling up
      setIsVisible(currentScrollY < lastScrollY);
      setIsScrolled(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ---- Desktop Floating Navbar ---- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "w-[calc(100%-2rem)] max-w-6xl",
          "rounded-2xl",
          "glass",
          // Increase blur & shadow when scrolled for visual depth
          isScrolled && "shadow-[0_8px_32px_rgba(0,112,243,0.12)]"
        )}
      >
        <nav className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            {/* Shield icon as club logo placeholder */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <Shield className="h-8 w-8 text-accent fill-accent/20" />
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-lg group-hover:bg-accent/20 transition-colors" />
            </motion.div>
            <span className="font-heading text-xl font-bold tracking-tight uppercase hidden sm:block">
              <span className="text-foreground">FC</span>{" "}
              <span className="text-gradient-gold">NextGen</span>
            </span>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium",
                      "transition-colors duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span className="hidden xl:inline">{item.label}</span>

                    {/* Active indicator — animated underline */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right side — User menu placeholder + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* User Avatar / Profile link */}
            {user ? (
              <Link href="/dashboard/settings">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="relative h-8 w-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {user.profile?.photo ? (
                    <img src={user.profile.photo} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold">
                      {user.profile?.firstName?.[0] || user.email?.[0].toUpperCase()}
                    </span>
                  )}
                  {/* Status dot */}
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border border-black animate-pulse-glow" />
                </motion.div>
              </Link>
            ) : (
              <div className="relative hidden md:block">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-xl glass-hover text-muted-foreground hover:text-foreground"
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ---- Mobile Drawer Overlay ---- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Mobile nav panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed right-0 top-0 bottom-0 z-50 w-80 lg:hidden",
                "glass rounded-l-2xl",
                "flex flex-col p-6"
              )}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-7 w-7 text-accent fill-accent/20" />
                  <span className="font-heading text-lg font-bold tracking-tight uppercase">
                    <span className="text-foreground">FC</span>{" "}
                    <span className="text-gradient-gold">NextGen</span>
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Mobile nav items — staggered animation */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-1 flex-1"
              >
                {NAV_ITEMS.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                          "transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Mobile footer */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  {APP_NAME} © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
