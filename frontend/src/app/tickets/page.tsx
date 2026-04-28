"use client";

import { motion } from "framer-motion";
import { 
  Ticket as TicketIcon, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Shield, 
  Users,
  CreditCard,
  QrCode,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";

const UPCOMING_MATCHES = [
  {
    id: "1",
    homeTeam: "FC NextGen",
    awayTeam: "Olympique Lyonnais",
    date: "SAM. 26 OCT.",
    time: "21:00",
    venue: "Stade de l'Élite",
    competition: "Ligue 1",
    minPrice: 25,
    status: "SELLING_FAST",
  },
  {
    id: "2",
    homeTeam: "FC NextGen",
    awayTeam: "Bayern Munich",
    date: "MER. 30 OCT.",
    time: "20:45",
    venue: "Stade de l'Élite",
    competition: "Champions League",
    minPrice: 65,
    status: "HIGH_DEMAND",
  },
  {
    id: "3",
    homeTeam: "FC NextGen",
    awayTeam: "Olympique de Marseille",
    date: "DIM. 03 NOV.",
    time: "20:45",
    venue: "Stade de l'Élite",
    competition: "Ligue 1",
    minPrice: 45,
    status: "AVAILABLE",
  },
];

/**
 * TicketsPage — Match booking and stadium seating selection.
 * Features:
 * - Match cards with pricing and status
 * - Quick booking flow
 * - Interactive stadium map (placeholder)
 */
export default function TicketsPage() {
  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        {/* Back Button */}
        <Link href="/">
          <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-4">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Accueil
          </button>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-sekuya uppercase">
              Accès Billetterie
            </h1>
            <p className="text-muted-foreground">Réservez votre ticket pour le prochain match.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-10 px-4 rounded-xl glass glass-hover text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Users className="h-4 w-4" /> Groupes & CE
            </button>
            <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Mes Commandes
            </button>
          </div>
        </div>

        {/* Membership Promo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-8 border-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={120} className="text-primary" />
            </div>
            <div className="max-w-xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tracking-widest">privilège voyageur</span>
              <h2 className="font-heading text-3xl font-black tracking-tight leading-none">
                priorité de voyage pour le <span className="text-gradient-blue">clasico multivers</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                devenez membre "élite silver" ou "gold" pour accéder à la billetterie 48h avant le grand public.
              </p>
              <button className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
                explorer le multivers
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {UPCOMING_MATCHES.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-0 overflow-hidden flex flex-col sm:flex-row h-full group hover:border-primary/40 transition-all">
                {/* Date Side */}
                <div className="w-full sm:w-32 bg-white/[0.03] border-b sm:border-b-0 sm:border-r border-white/5 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase">{match.date.split(' ')[0]}</span>
                  <span className="text-2xl font-heading font-black">{match.date.split(' ')[1]}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase">{match.date.split(' ')[2]}</span>
                  <div className="mt-2 text-[10px] font-bold text-primary">{match.time}</div>
                </div>

                {/* Match Info */}
                <div className="flex-1 p-6 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{match.competition}</span>
                      {match.status === "SELLING_FAST" && (
                        <span className="text-[9px] font-black text-warning uppercase bg-warning/10 px-2 py-0.5 rounded border border-warning/20">places limitées</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-center">
                        <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">FCN</div>
                        <span className="text-xs font-bold uppercase truncate block">NextGen</span>
                      </div>
                      <span className="text-sm font-black text-white/20">VS</span>
                      <div className="flex-1 text-center">
                        <div className="h-10 w-10 mx-auto mb-2 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">{match.awayTeam.substring(0, 3).toUpperCase()}</div>
                        <span className="text-xs font-bold uppercase truncate block">{match.awayTeam}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase">À partir de</span>
                      <span className="text-xl font-heading font-black">{match.minPrice} €</span>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10 flex items-center gap-2">
                      Réserver <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stadium Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-xs tracking-widest">accès au stade</h3>
            <p className="text-[11px] text-muted-foreground">parking p1/p2 disponible. navettes gratuites depuis le centre-ville.</p>
          </GlassCard>
          <GlassCard className="p-6 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <QrCode size={24} />
            </div>
            <h3 className="font-bold text-xs tracking-widest">e-billet</h3>
            <p className="text-[11px] text-muted-foreground">téléchargez vos billets directement sur votre mobile après achat.</p>
          </GlassCard>
          <GlassCard className="p-6 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-xs tracking-widest">matchs reportés</h3>
            <p className="text-[11px] text-muted-foreground">vos billets restent valables en cas de changement de date ou horaire.</p>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
