"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Loader2
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import { AddContractModal } from "@/components/dashboard/add-contract-modal";
import { apiFetch } from "@/lib/api";

/**
 * ContractsPage — Player contract management and financial overview.
 */
export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<any>(null);

  const loadContracts = async () => {
    try {
      const data = await apiFetch("/contracts");
      setContracts(data);
    } catch (err) {
      console.error("Failed to load contracts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/contracts/${id}`, { method: "DELETE" });
      loadContracts();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const handleEdit = (contract: any) => {
    setEditingContract(contract);
    setIsModalOpen(true);
  };

  const totalWage = contracts.reduce((acc, c) => acc + (c.status === "ACTIVE" ? c.salary : 0), 0);
  const expiringSoon = contracts.filter(c => {
    const end = new Date(c.endDate);
    const now = new Date();
    const months = (end.getFullYear() - now.getFullYear()) * 12 + end.getMonth() - now.getMonth();
    return months <= 12 && c.status === "ACTIVE";
  }).length;

  if (loading) {
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
            <h1 className="font-heading text-4xl font-black tracking-tight text-sekuya uppercase">
              Gestion des Contrats
            </h1>
            <p className="text-muted-foreground">Supervision financière, renouvellements et planification salariale.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setEditingContract(null); setIsModalOpen(true); }}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" /> Nouveau Contrat
            </button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <DollarSign size={20} />
              </div>
              <span className="text-[10px] font-bold text-success">+4.2%</span>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Masse Salariale Mensuelle</p>
              <p className="text-3xl font-heading font-black">{totalWage.toLocaleString()} €</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-warning/10 text-warning">
                <Clock size={20} />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Échéance Proche (12m)</p>
              <p className="text-3xl font-heading font-black">{String(expiringSoon).padStart(2, '0')}</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-destructive/10 text-destructive">
                <AlertCircle size={20} />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Joueurs Sans Contrat</p>
              <p className="text-3xl font-heading font-black">00</p>
            </div>
          </GlassCard>
        </div>

        {/* Contracts Filter & List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un joueur..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Joueur</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Salaire / Mois</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Échéance</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Statut</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contracts.map((contract) => (
                    <motion.tr 
                      key={contract.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">
                            {contract.player?.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{contract.player?.name}</p>
                            <p className="text-[10px] text-muted-foreground font-bold">{contract.player?.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center font-heading font-bold text-sm">
                        {contract.salary.toLocaleString()} €
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-xs font-bold text-foreground">
                          {new Date(contract.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                            contract.status === "ACTIVE" ? "bg-success/10 text-success border-success/20" :
                            contract.status === "EXPIRED" ? "bg-destructive/10 text-destructive border-destructive/20" :
                            "bg-warning/10 text-warning border-warning/20"
                          )}>
                            {contract.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(contract)}
                            className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(contract.id)}
                            className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <AddContractModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={loadContracts}
          editContract={editingContract}
        />
      </div>
    </PageTransition>
  );
}

import { cn } from "@/lib/utils";
