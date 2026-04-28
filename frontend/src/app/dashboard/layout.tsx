"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Stethoscope,
  FileText,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

const MENU_ITEMS = [
  { label: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { label: "Effectif", href: "/dashboard/squad", icon: Users },
  { label: "Matchs", href: "/dashboard/matches", icon: Trophy },
  { label: "Médical", href: "/dashboard/medical", icon: Stethoscope },
  { label: "Contrats", href: "/dashboard/contracts", icon: FileText },
  { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

/**
 * DashboardLayout — Protected layout with a collapsible sidebar.
 * Integrates with AuthProvider to protect routes.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-40 border-r border-white/5 glass hidden lg:flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 justify-between border-b border-white/5">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg uppercase tracking-tight">NextGen</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 py-6 px-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,112,243,0.1)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon size={20} className={cn(isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </div>
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link href="/">
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Retour au Site
                  </motion.span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer (User Profile) */}
        <div className="p-4 border-t border-white/5">
          <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-white/[0.02]", isCollapsed && "justify-center")}>
            <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center font-bold overflow-hidden">
              {user?.profile?.photo ? (
                <img src={user.profile.photo} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                user?.profile?.firstName?.[0] || user?.email?.[0]?.toUpperCase()
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.profile?.firstName} {user?.profile?.lastName}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.role}</p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          "lg:ml-[260px]",
          isCollapsed && "lg:ml-[80px]"
        )}
      >
        <div className="max-w-7xl mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
