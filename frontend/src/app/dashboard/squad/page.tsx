"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Plus, Filter, Search, Download, Loader2, X } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { apiFetch } from "@/lib/api";
import { AddPlayerModal } from "@/components/dashboard/add-player-modal";
import { PlayerListRow } from "@/components/dashboard/player-list-row";

/**
 * SquadPage — Management interface for the team.
 * Displays players in a premium list view for better clarity.
 */
export default function SquadPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("Tous");
  const [showFilters, setShowFilters] = useState(false);

  async function loadSquad() {
    setLoading(true);
    try {
      const data = await apiFetch("/players");
      const enriched = data.map((p: any) => {
        const latestStat = p.statistics?.[0];
        return {
          ...p,
          rating: p.rating || Math.floor(latestStat?.rating || 85),
          stats: p.stats || {
            pac: Math.floor(latestStat?.pac || 80),
            sho: Math.floor(latestStat?.sho || 75),
            pas: Math.floor(latestStat?.pas || 78),
            dri: Math.floor(latestStat?.dri || 82),
            def: Math.floor(latestStat?.def || 60),
            phy: Math.floor(latestStat?.phy || 75)
          }
        };
      });
      setPlayers(enriched);
    } catch (err: any) {
      console.error("Squad load error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSquad();
  }, []);

  const handleDeletePlayer = async (id: string) => {
    try {
      await apiFetch(`/players/${id}`, { method: "DELETE" });
      loadSquad();
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = 
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (player.number && player.number.toString().includes(searchQuery));
      
      const matchesPosition = selectedPosition === "Tous" || player.position === selectedPosition;
      return matchesSearch && matchesPosition;
    });
  }, [players, searchQuery, selectedPosition]);

  const handleExportCSV = () => {
    if (players.length === 0) return;
    const headers = ["Nom", "Poste", "Note", "Numéro", "PAC", "SHO", "PAS", "DRI", "DEF", "PHY"];
    const rows = players.map(p => [
      p.name, p.position || "N/A", p.rating, p.number || "N/A",
      p.stats?.pac || 0, p.stats?.sho || 0, p.stats?.pas || 0,
      p.stats?.dri || 0, p.stats?.def || 0, p.stats?.phy || 0
    ]);
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `effectif_galaxy_fc_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const positions = ["Tous", "GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST"];

  if (loading && players.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-sekuya uppercase">
              Gestion de l'Effectif
            </h1>
            <p className="text-muted-foreground">Visualisez et gérez votre équipe Galaxy FC en temps réel.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`h-10 px-4 rounded-xl glass glass-hover text-xs font-bold tracking-widest flex items-center gap-2 transition-colors ${showFilters ? 'bg-accent/20 border-accent/50' : ''}`}
            >
              <Filter className="h-4 w-4" /> {showFilters ? 'fermer' : 'filtres'}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-bold tracking-widest shadow-lg shadow-accent/20 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Nouveau Joueur
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un joueur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button onClick={handleExportCSV} disabled={players.length === 0} className="h-10 px-4 rounded-xl glass glass-hover text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
              {positions.map((pos) => (
                <button key={pos} onClick={() => setSelectedPosition(pos)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all ${selectedPosition === pos ? 'bg-accent text-accent-foreground' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}>
                  {pos}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Player List View */}
        <div className="flex flex-col gap-3">
          {filteredPlayers.map((player) => (
            <PlayerListRow
              key={player.id}
              {...player}
              onDelete={handleDeletePlayer}
            />
          ))}

          {filteredPlayers.length === 0 && !loading && (
            <div className="py-20 text-center bg-white/5 rounded-3xl border border-white/10 border-dashed">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Aucun joueur trouvé</p>
            </div>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-16 rounded-2xl border-2 border-dashed border-white/10 hover:border-accent/40 flex items-center justify-center gap-4 group transition-all"
          >
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground group-hover:text-accent uppercase">Ajouter un Joueur</span>
          </button>
        </div>

        <AddPlayerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={loadSquad} />
      </div>
    </PageTransition>
  );
}
