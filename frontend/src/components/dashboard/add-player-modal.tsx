"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Shield, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddPlayerModal({ isOpen, onClose, onSuccess }: AddPlayerModalProps) {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "ST",
    number: "",
    nationality: "",
    teamId: "",
  });

  useEffect(() => {
    if (isOpen) {
      loadTeams();
      setFormData({ name: "", position: "ST", number: "", nationality: "", teamId: "" });
    }
  }, [isOpen]);

  async function loadTeams() {
    try {
      const data = await apiFetch("/teams");
      setTeams(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, teamId: data[0].id }));
      }
    } catch (err: any) {
      console.error("Teams load error:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teamId) {
      setError("Veuillez d'abord créer une équipe dans la section Matchs.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await apiFetch("/players/create", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          number: parseInt(formData.number),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <UserPlus size={20} />
                </div>
                <h2 className="font-heading text-xl font-bold text-sekuya uppercase">Nouveau Joueur</h2>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">nom complet</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="ex: kylian mbappé"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">poste</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                  >
                    <option value="GK">GK (gardien)</option>
                    <option value="CB">CB (défenseur central)</option>
                    <option value="LB">LB (latéral gauche)</option>
                    <option value="RB">RB (latéral droit)</option>
                    <option value="CDM">CDM (milieu défensif)</option>
                    <option value="CM">CM (milieu central)</option>
                    <option value="CAM">CAM (milieu offensif)</option>
                    <option value="LW">LW (ailier gauche)</option>
                    <option value="RW">RW (ailier droit)</option>
                    <option value="ST">ST (buteur)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">numéro</label>
                  <input
                    required
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="ex: 10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Équipe</label>
                <select
                  required
                  value={formData.teamId}
                  onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                >
                  {teams.length === 0 ? (
                    <option value="" disabled>Aucune équipe trouvée</option>
                  ) : (
                    teams.map(t => (
                      <option key={t.id} value={t.id} className="bg-[#1a1a1a]">{t.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">nationalité</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="ex: france"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold text-sm tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:bg-accent/90 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Shield size={16} />
                      Enregistrer le Joueur
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
