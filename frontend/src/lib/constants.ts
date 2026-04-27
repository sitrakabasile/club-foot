/**
 * Application-wide constants for the Next-Gen Football Hub.
 * Centralizes configuration values to avoid magic strings/numbers.
 */

export const APP_NAME = "MyClub App";
export const APP_DESCRIPTION =
  "la porte d'entrée vers le futur du football avec Galaxy FC — ressentez vos rêves.";

/** Navigation items for the floating navbar */
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Effectif", href: "/dashboard/squad", icon: "Users" },
  { label: "Matchs", href: "/dashboard/matches", icon: "Trophy" },
  { label: "Médical", href: "/dashboard/medical", icon: "Stethoscope" },
  { label: "Boutique", href: "/dashboard/shop", icon: "ShoppingBag" },
  { label: "Billetterie", href: "/dashboard/tickets", icon: "Ticket" },
  { label: "Contrats", href: "/dashboard/contracts", icon: "FileText" },
  { label: "Paramètres", href: "/dashboard/settings", icon: "Settings" },
  { label: "News", href: "/news", icon: "Newspaper" },
] as const;

export const FAN_NAV_ITEMS = [
  { label: "Accueil", href: "/fan", icon: "Home" },
  { label: "Actualités", href: "/fan/news", icon: "Newspaper" },
  { label: "Billetterie", href: "/fan/tickets", icon: "Ticket" },
  { label: "Boutique", href: "/fan/shop", icon: "ShoppingBag" },
  { label: "Fidélité", href: "/fan/loyalty", icon: "Star" },
] as const;

/** Animation configuration constants (framer-motion) */
export const ANIMATION = {
  /** Page transition settings */
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  /** Stagger children for list animations */
  stagger: {
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  },
  /** Fade-in from bottom for individual items */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
  /** Magnetic hover effect for cards */
  magneticHover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
} as const;

/** User roles matching backend RBAC */
export const ROLES = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  PLAYER: "PLAYER",
  FAN: "FAN",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

/** API base URL for the separate Express backend */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
