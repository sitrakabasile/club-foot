"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Zap,
  ChevronRight,
  Filter,
  Shield,
  Loader2,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import { apiFetch } from "@/lib/api";
import { FullCalendarModal } from "@/components/dashboard/full-calendar-modal";
import { AddMatchModal } from "@/components/dashboard/add-match-modal";
import { Plus, Edit2, Trash2 } from "lucide-react";

/**
 * MatchCenter — Interactive calendar and live ticker.
 * Fetches real match data from the backend.
 */
export default function MatchCenterPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFullCalendarOpen, setIsFullCalendarOpen] = useState(false);
  const [isAddMatchOpen, setIsAddMatchOpen] = useState(false);
  const [matchToEdit, setMatchToEdit] = useState<any>(null);
  const [filter, setFilter] = useState("Tout");

  async function loadMatches() {
    setLoading(true);
    try {
      const data = await apiFetch("/matches");
      // Enrich data for display
      const enriched = data.map((m: any) => ({
        ...m,
        displayDate: new Date(m.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        displayTime: new Date(m.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        homeTeamName: m.homeTeam?.name || "Équipe A",
        awayTeamName: m.awayTeam?.name || "Équipe B",
        score: m.status === "COMPLETED" || m.status === "LIVE" ? `${m.scoreHome} - ${m.scoreAway}` : "vs",
      }));
      setMatches(enriched);
    } catch (err) {
      console.error("Match load error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  const handleDeleteMatch = async (id: string) => {
    try {
      await apiFetch(`/matches/${id}`, { method: "DELETE" });
      loadMatches();
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const handleEditMatch = (match: any) => {
    setMatchToEdit(match);
    setIsAddMatchOpen(true);
  };

  const filteredMatches = matches.filter(m => filter === "Tout" || m.competition === filter);
  const recentMatches = filteredMatches.slice(0, 8);

  if (loading && matches.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Match <span className="text-gradient-blue">Center</span>
            </h1>
            <p className="text-muted-foreground">Suivez les résultats en direct et gérez le calendrier des compétitions.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullCalendarOpen(true)}
              className="h-10 px-4 rounded-xl glass glass-hover text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-primary/10"
            >
              <CalendarIcon className="h-4 w-4" /> Calendrier Complet
            </button>
            <button 
              onClick={() => { setMatchToEdit(null); setIsAddMatchOpen(true); }}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
            >
              <Plus className="h-4 w-4" /> Nouveau Match
            </button>
          </div>
        </div>

        {/* Live / Featured Match */}
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[2rem] border border-primary/20 shadow-2xl shadow-primary/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 -z-10" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <div className="px-3 py-1 rounded-full bg-success/20 border border-success/30 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] font-bold text-success uppercase tracking-widest">
                  {matches[0].status === "LIVE" ? "Live" : "Prochain Match"}
                </span>
              </div>
            </div>

            <div className="p-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
              {/* Home Team */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{matches[0].homeTeamName}</h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Domicile</p>
                </div>
              </div>

              {/* Score & Info */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-7xl font-heading font-black tracking-tighter">
                  {matches[0].scoreHome} <span className="text-white/20">—</span> {matches[0].scoreAway}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">{matches[0].competition}</div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                  <Shield className="h-12 w-12 text-destructive" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{matches[0].awayTeamName}</h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Extérieur</p>
                </div>
              </div>
            </div>

            {/* Quick Actions for Featured Match */}
            <div className="absolute bottom-4 right-8 flex gap-2">
              <button 
                onClick={() => handleEditMatch(matches[0])}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={() => handleDeleteMatch(matches[0].id)}
                className="h-8 w-8 rounded-lg bg-destructive/20 hover:bg-destructive/30 flex items-center justify-center text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Filters & List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight">Calendrier Récent</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter("Tout")}
                className={cn(
                  "h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === "Tout" ? "bg-primary/20 text-primary border border-primary/30" : "glass glass-hover"
                )}
              >
                Tout
              </button>
              <button 
                onClick={() => setFilter("Ligue 1")}
                className={cn(
                  "h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === "Ligue 1" ? "bg-primary/20 text-primary border border-primary/30" : "glass glass-hover"
                )}
              >
                Ligue 1
              </button>
              <button 
                onClick={() => setFilter("LDC")}
                className={cn(
                  "h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === "LDC" ? "bg-primary/20 text-primary border border-primary/30" : "glass glass-hover"
                )}
              >
                LDC
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {recentMatches.map((match) => (
              <GlassCard key={match.id} className="p-0 overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center p-4 gap-4 md:gap-8">
                  <div className="flex flex-col items-center justify-center w-20 text-center border-r border-white/5 pr-4 md:pr-8">
                    <span className="text-sm font-bold uppercase">{match.displayDate}</span>
                    <span className="text-[10px] text-muted-foreground">{match.displayTime}</span>
                  </div>

                  <div className="flex-1 flex items-center justify-between gap-4 w-full">
                    <div className="flex-1 flex items-center justify-end gap-3 text-right">
                      <span className="text-sm font-bold uppercase hidden sm:inline">{match.homeTeamName}</span>
                      <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                        {match.homeTeamName.substring(0, 3).toUpperCase()}
                      </div>
                    </div>

                    <div className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-heading font-black tracking-tighter w-20 text-center",
                      match.status === "LIVE" ? "bg-success/10 text-success" : "bg-white/5 text-foreground"
                    )}>
                      {match.score}
                    </div>

                    <div className="flex-1 flex items-center justify-start gap-3 text-left">
                      <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                        {match.awayTeamName.substring(0, 3).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold uppercase hidden sm:inline">{match.awayTeamName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pl-4 md:pl-8 border-l border-white/5 w-full md:w-auto justify-between md:justify-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{match.competition}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin size={10} /> {match.venue}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditMatch(match); }}
                        className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteMatch(match.id); }}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {recentMatches.length === 0 && (
            <div className="py-20 text-center bg-white/5 rounded-[2rem] border border-white/10 border-dashed">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Aucun match trouvé pour ce filtre</p>
            </div>
          )}
        </div>

        {/* Full Calendar Modal */}
        <FullCalendarModal 
          isOpen={isFullCalendarOpen}
          onClose={() => setIsFullCalendarOpen(false)}
          matches={matches}
        />

        {/* Add/Edit Match Modal */}
        <AddMatchModal 
          isOpen={isAddMatchOpen}
          onClose={() => { setIsAddMatchOpen(false); setMatchToEdit(null); }}
          onSuccess={loadMatches}
          matchToEdit={matchToEdit}
        />
      </div>
    </PageTransition>
  );
}

import { cn } from "@/lib/utils";
