"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, User, Calendar, FileText, Activity } from "lucide-react";
import { GlassCard } from "../shared/glass-card";
import { apiFetch } from "@/lib/api";

interface ReportInjuryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReportInjuryModal({ isOpen, onClose, onSuccess }: ReportInjuryModalProps) {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    playerId: "",
    type: "INJURY",
    diagnosis: "",
    severity: "MODERATE",
    dateOccurred: new Date().toISOString().split('T')[0],
    dateReturn: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      loadPlayers();
      setFormData({
        playerId: "",
        type: "INJURY",
        diagnosis: "",
        severity: "MODERATE",
        dateOccurred: new Date().toISOString().split('T')[0],
        dateReturn: "",
        description: "",
      });
    }
  }, [isOpen]);

  async function loadPlayers() {
    try {
      const data = await apiFetch("/players");
      setPlayers(data);
    } catch (err: any) {
      console.error("Players load error:", err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiFetch("/medical", {
        method: "POST",
        body: JSON.stringify(formData),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Signaler Blessure</h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Rapport Médical Express</p>
                </div>
              </div>
              <button onClick={onClose} className="h-10 w-10 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Player Select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Joueur Concerné</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      required
                      value={formData.playerId}
                      onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Sélectionner un joueur</option>
                      {players.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#1a1a1a]">{p.name} (#{p.number})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type Select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Type de Signalement</label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option value="INJURY" className="bg-[#1a1a1a]">Blessure</option>
                      <option value="ILLNESS" className="bg-[#1a1a1a]">Maladie</option>
                      <option value="CHECKUP" className="bg-[#1a1a1a]">Check-up requis</option>
                    </select>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Diagnostic / Libellé</label>
                  <input
                    required
                    type="text"
                    placeholder="ex: Entorse cheville droite"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Date Occurred */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Date de l'incident</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      required
                      type="date"
                      value={formData.dateOccurred}
                      onChange={(e) => setFormData({ ...formData, dateOccurred: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Severity */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Sévérité estimée</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                  >
                    <option value="MINOR" className="bg-[#1a1a1a]">Mineure (1-7 jours)</option>
                    <option value="MODERATE" className="bg-[#1a1a1a]">Modérée (1-4 semaines)</option>
                    <option value="SEVERE" className="bg-[#1a1a1a]">Sévère (1+ mois)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase ml-1">Notes Additionnelles</label>
                <textarea
                  rows={3}
                  placeholder="Détails sur l'incident, protocole immédiat..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl glass glass-hover text-sm font-bold uppercase tracking-widest transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-4 rounded-2xl bg-destructive text-white text-sm font-bold uppercase tracking-widest shadow-xl shadow-destructive/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {loading ? "Traitement..." : "Signaler la blessure"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
