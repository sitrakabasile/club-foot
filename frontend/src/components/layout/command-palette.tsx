"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  Trophy,
  Users,
  Shield,
  Stethoscope,
  Ticket,
  ShoppingBag,
} from "lucide-react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CommandPalette — Elite navigation and action menu (CMD+K).
 * Uses cmdk for high-performance filtering and framer-motion for premium entry.
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle on CMD+K / CTRL+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl glass border border-white/10 shadow-2xl"
          >
            <Command className="flex h-full w-full flex-col overflow-hidden">
              <div className="flex items-center border-b border-white/5 px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                  placeholder="Rechercher un joueur, un match ou une action..."
                  className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  Aucun résultat trouvé.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Dashboard Principal</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/dashboard/squad"))}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Gestion d'Effectif</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/dashboard/matches"))}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>Match Center</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/dashboard/medical"))}
                  >
                    <Stethoscope className="mr-2 h-4 w-4" />
                    <span>Hub Médical</span>
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-white/5 my-2" />

                <Command.Group heading="Fan Zone" className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/fan/shop"))}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Boutique Officielle</span>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/fan/tickets"))}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Billetterie</span>
                  </CommandItem>
                </Command.Group>

                <Command.Separator className="h-px bg-white/5 my-2" />

                <Command.Group heading="Paramètres" className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/settings/profile"))}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Mon Profil</span>
                    <Command.Shortcut>⌘P</Command.Shortcut>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runCommand(() => router.push("/settings/security"))}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Sécurité & 2FA</span>
                    <Command.Shortcut>⌘S</Command.Shortcut>
                  </CommandItem>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-3 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/10 px-1 py-0.5">↑↓</kbd> Naviguer
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/10 px-1 py-0.5">Enter</kbd> Sélectionner
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-white/10 px-1 py-0.5">Esc</kbd> Fermer
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CommandItem({
  children,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-3 text-sm outline-none transition-colors",
        "aria-selected:bg-primary/20 aria-selected:text-primary aria-selected:shadow-[0_0_15px_rgba(0,112,243,0.1)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
    >
      {children}
    </Command.Item>
  );
}
