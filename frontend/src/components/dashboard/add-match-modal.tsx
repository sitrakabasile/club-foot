"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Trophy, Loader2, Shield } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface AddMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  matchToEdit?: any;
}

export function AddMatchModal({ isOpen, onClose, onSuccess, matchToEdit }: AddMatchModalProps) {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [isNewHome, setIsNewHome] = useState(false);
  const [isNewAway, setIsNewAway] = useState(false);
  const [newHomeName, setNewHomeName] = useState("");
  const [newAwayName, setNewAwayName] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    venue: "",
    competition: "",
    homeTeamId: "",
    awayTeamId: "",
    status: "SCHEDULED",
    scoreHome: 0,
    scoreAway: 0,
  });

  useEffect(() => {
    if (isOpen) {
      loadTeams();
      setIsNewHome(false);
      setIsNewAway(false);
      setNewHomeName("");
      setNewAwayName("");
      
      if (matchToEdit) {
        const d = new Date(matchToEdit.date);
        setFormData({
          date: d.toISOString().split('T')[0],
          time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }),
          venue: matchToEdit.venue,
          competition: matchToEdit.competition,
          homeTeamId: matchToEdit.homeTeamId,
          awayTeamId: matchToEdit.awayTeamId,
          status: matchToEdit.status,
          scoreHome: matchToEdit.scoreHome,
          scoreAway: matchToEdit.scoreAway,
        });
      } else {
        setFormData({
          date: "",
          time: "",
          venue: "",
          competition: "",
          homeTeamId: "",
          awayTeamId: "",
          status: "SCHEDULED",
          scoreHome: 0,
          scoreAway: 0,
        });
      }
    }
  }, [isOpen, matchToEdit]);

  async function loadTeams() {
    try {
      const data = await apiFetch("/teams");
      setTeams(data);
    } catch (err: any) {
      console.error("Teams load error:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let hId = formData.homeTeamId;
      let aId = formData.awayTeamId;

      // Create new teams if needed
      if (isNewHome && newHomeName) {
        const team = await apiFetch("/teams", {
          method: "POST",
          body: JSON.stringify({ name: newHomeName, category: "SENIOR" }),
        });
        hId = team.id;
      }

      if (isNewAway && newAwayName) {
        const team = await apiFetch("/teams", {
          method: "POST",
          body: JSON.stringify({ name: newAwayName, category: "SENIOR" }),
        });
        aId = team.id;
      }

      if (!hId || !aId) {
        throw new Error("Veuillez sélectionner ou saisir les deux équipes.");
      }

      // Combine date and time
      const matchDate = new Date(`${formData.date}T${formData.time}`);
      
      const endpoint = matchToEdit ? `/matches/${matchToEdit.id}` : "/matches/create";
      const method = matchToEdit ? "PUT" : "POST";

      await apiFetch(endpoint, {
        method,
        body: JSON.stringify({
          ...formData,
          homeTeamId: hId,
          awayTeamId: aId,
          date: matchDate.toISOString(),
        }),
      });
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                    {matchToEdit ? "Modifier le Match" : "Nouveau Match"}
                  </h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    {matchToEdit ? "Mettre à jour la rencontre" : "Planifier une rencontre"}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="h-10 w-10 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold uppercase tracking-widest">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                {/* Home Team */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Équipe Domicile</label>
                    <button 
                      type="button" 
                      onClick={() => setIsNewHome(!isNewHome)}
                      className="text-[9px] text-primary hover:underline uppercase font-bold"
                    >
                      {isNewHome ? "Sélectionner" : "+ Nouveau"}
                    </button>
                  </div>
                  {isNewHome ? (
                    <input
                      required
                      type="text"
                      value={newHomeName}
                      onChange={(e) => setNewHomeName(e.target.value)}
                      placeholder="Nom de l'équipe..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  ) : (
                    <select
                      required
                      value={formData.homeTeamId}
                      onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Sélectionner une équipe</option>
                      {teams.map(t => (
                        <option key={t.id} value={t.id} className="bg-[#1a1a1a]">{t.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Away Team */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Équipe Extérieur</label>
                    <button 
                      type="button" 
                      onClick={() => setIsNewAway(!isNewAway)}
                      className="text-[9px] text-primary hover:underline uppercase font-bold"
                    >
                      {isNewAway ? "Sélectionner" : "+ Nouveau"}
                    </button>
                  </div>
                  {isNewAway ? (
                    <input
                      required
                      type="text"
                      value={newAwayName}
                      onChange={(e) => setNewAwayName(e.target.value)}
                      placeholder="Nom de l'équipe..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  ) : (
                    <select
                      required
                      value={formData.awayTeamId}
                      onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Sélectionner une équipe</option>
                      {teams.map(t => (
                        <option key={t.id} value={t.id} className="bg-[#1a1a1a]">{t.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Date</label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Heure</label>
                  <input
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Score Home */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Score Domicile</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.scoreHome}
                    onChange={(e) => setFormData({ ...formData, scoreHome: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Score Away */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Score Extérieur</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.scoreAway}
                    onChange={(e) => setFormData({ ...formData, scoreAway: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Compétition</label>
                  <input
                    required
                    type="text"
                    value={formData.competition}
                    onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="ex: Ligue 1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                  >
                    <option value="SCHEDULED" className="bg-[#1a1a1a]">Planifié</option>
                    <option value="LIVE" className="bg-[#1a1a1a]">En Direct</option>
                    <option value="COMPLETED" className="bg-[#1a1a1a]">Terminé</option>
                    <option value="POSTPONED" className="bg-[#1a1a1a]">Reporté</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Stade / Lieu</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    required
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="ex: Stade de l'Élite"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-sm tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Shield size={18} />
                      {matchToEdit ? "Mettre à jour" : "Créer le Match"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
