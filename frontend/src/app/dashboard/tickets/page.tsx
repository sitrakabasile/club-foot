"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  CheckCircle2, 
  Loader2,
  TrendingUp,
  Users,
  Trash2
} from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { apiFetch } from "@/lib/api";

/**
 * TicketingHub — Premium match ticketing management.
 */
export default function TicketingPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateData, setGenerateData] = useState({
    matchId: "",
    quantity: "50",
    price: "25",
    section: "Tribune Nord"
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [tData, mData] = await Promise.all([
        apiFetch("/tickets"),
        apiFetch("/matches")
      ]);
      setTickets(tData);
      setMatches(mData);
    } catch (err) {
      console.error("Failed to load ticketing data", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/tickets/${id}`, { method: "DELETE" });
      loadData();
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await apiFetch("/tickets/bulk/delete-all", { method: "DELETE" });
      loadData();
    } catch (err) {
      // Silent fail as requested
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const quantity = parseInt(generateData.quantity);
    const price = parseFloat(generateData.price);

    if (isNaN(quantity) || isNaN(price)) {
      console.error("Invalid quantity or price");
      setLoading(false);
      return;
    }

    try {
      await apiFetch("/tickets/generate", {
        method: "POST",
        body: JSON.stringify({
          ...generateData,
          quantity,
          price
        })
      });
      setIsGenerateModalOpen(false);
      loadData();
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const ticketStats = {
    total: tickets.length,
    sold: tickets.filter(t => t.status === "SOLD").length,
    available: tickets.filter(t => t.status === "AVAILABLE").length,
    revenue: tickets.filter(t => t.status === "SOLD").reduce((sum, t) => sum + t.price, 0)
  };

  return (
    <PageTransition>
      <div className="p-6 space-y-8 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Billetterie <span className="text-gradient-gold">Stade</span>
            </h1>
            <p className="text-muted-foreground">Gérez l'accès au stade et les ventes de billets pour les matchs.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDeleteAll}
              className="h-12 px-6 rounded-2xl border border-destructive/30 text-destructive text-[10px] font-black uppercase tracking-widest hover:bg-destructive/10 transition-all"
            >
              Supprimer Tout
            </button>
            <button 
              onClick={() => setIsGenerateModalOpen(true)}
              className="h-12 px-6 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center gap-2"
            >
              <Plus size={16} />
              Générer Billets
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-6 border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Total Billets</p>
            <p className="text-3xl font-heading font-black text-white">{ticketStats.total}</p>
          </GlassCard>
          <GlassCard className="p-6 border-white/5">
            <p className="text-[10px] text-success uppercase font-black tracking-widest">Vendus</p>
            <p className="text-3xl font-heading font-black text-success">{ticketStats.sold}</p>
          </GlassCard>
          <GlassCard className="p-6 border-white/5">
            <p className="text-[10px] text-accent uppercase font-black tracking-widest">Disponibles</p>
            <p className="text-3xl font-heading font-black text-accent">{ticketStats.available}</p>
          </GlassCard>
          <GlassCard className="p-6 border-white/5">
            <p className="text-[10px] text-gradient-gold uppercase font-black tracking-widest">Revenus</p>
            <p className="text-3xl font-heading font-black text-white">{ticketStats.revenue}€</p>
          </GlassCard>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold uppercase">Registres des Ventes</h2>
            <div className="flex items-center gap-2">
              <Search size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Filtrer par match..." className="bg-transparent border-none text-xs focus:ring-0 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] blur-xl" />
                <GlassCard className="p-6 relative overflow-hidden border-white/5 group-hover:border-accent/30 transition-all duration-500">
                  {/* Perforation pattern for ticket look */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-3 bg-[#0a0a0a] rounded-r-full" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-3 bg-[#0a0a0a] rounded-l-full" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] text-accent uppercase font-black tracking-widest">Match Ticket</p>
                      <h3 className="font-bold text-white text-sm">
                        {ticket.match?.homeTeam?.name} <span className="text-muted-foreground">vs</span> {ticket.match?.awayTeam?.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                        ticket.status === "SOLD" ? "bg-success/20 text-success border border-success/30" : "bg-accent/20 text-accent border border-accent/30"
                      )}>
                        {ticket.status}
                      </span>
                      <button 
                        onClick={() => handleDelete(ticket.id)}
                        className="h-8 w-8 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-destructive transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span className="text-[10px] font-bold uppercase">{ticket.section}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={14} />
                      <span className="text-[10px] font-bold uppercase">{ticket.seat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={14} />
                      <span className="text-[10px] font-bold uppercase">
                        {ticket.match?.date ? new Date(ticket.match.date).toLocaleDateString() : "TBD"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp size={14} className="text-accent" />
                      <span className="text-[10px] font-bold uppercase">{ticket.price}€</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode size={20} className="text-white/40" />
                      <span className="text-[8px] text-white/20 font-mono">{ticket.qrCode.substring(0, 15)}...</span>
                    </div>
                    {ticket.status === "SOLD" && (
                      <p className="text-[8px] text-muted-foreground uppercase italic">Propriétaire: {ticket.user?.email || "Anonyme"}</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {tickets.length === 0 && !loading && (
              <div className="col-span-full py-24 text-center space-y-4 opacity-30">
                <Ticket size={64} className="mx-auto" />
                <p className="text-xs font-black uppercase tracking-widest">Aucun billet n'a été généré pour le moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Generation Modal */}
        <AnimatePresence>
          {isGenerateModalOpen && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsGenerateModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
              >
                <form onSubmit={handleGenerate} className="space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-heading font-black uppercase">Générer Billets</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Incrémentation de la capacité du stade</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Match concerné</label>
                      <select 
                        required
                        value={generateData.matchId}
                        onChange={(e) => setGenerateData({...generateData, matchId: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      >
                        <option value="" disabled>Sélectionner un match</option>
                        {matches.map(m => (
                          <option key={m.id} value={m.id} className="bg-[#1a1a1a]">
                            {m.homeTeam?.name} vs {m.awayTeam?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Quantité</label>
                        <input 
                          type="number"
                          value={generateData.quantity}
                          onChange={(e) => setGenerateData({...generateData, quantity: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Prix (€)</label>
                        <input 
                          type="number"
                          value={generateData.price}
                          onChange={(e) => setGenerateData({...generateData, price: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Section / Tribune</label>
                      <input 
                        type="text"
                        value={generateData.section}
                        onChange={(e) => setGenerateData({...generateData, section: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
                        placeholder="ex: Tribune Nord"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsGenerateModalOpen(false)}
                      className="flex-1 py-4 rounded-2xl glass glass-hover text-[10px] font-black uppercase tracking-widest"
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Lancer la génération"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
