"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Activity, 
  AlertTriangle, 
  Heart, 
  Clock, 
  FileText,
  Search,
  Plus,
  Trash2
} from "lucide-react";
import { BentoCard } from "@/components/dashboard/bento-card";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import { ReportInjuryModal } from "@/components/dashboard/report-injury-modal";
import { apiFetch } from "@/lib/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const FATIGUE_DATA = [
  { name: "K. Mbappé", load: 88, risk: "Critique" },
  { name: "J. Bellingham", load: 72, risk: "Elevé" },
  { name: "V. Júnior", load: 95, risk: "Critique" },
  { name: "F. Valverde", load: 45, risk: "Modéré" },
  { name: "T. Courtois", load: 20, risk: "Bas" },
];

export default function MedicalHubPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [medicalData, playersData] = await Promise.all([
        apiFetch("/medical"),
        apiFetch("/players")
      ]);
      setRecords(medicalData);
      setPlayers(playersData);
    } catch (err) {
      console.error("Failed to load medical data", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/medical/${id}`, { method: "DELETE" });
      loadData();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const activeInjuries = records.filter(r => r.type === "INJURY").length;
  const reeducationCount = records.filter(r => r.severity === "MODERATE").length;
  const checkupsCount = records.filter(r => r.type === "CHECKUP").length;

  // Filter logic
  const filteredRecords = records.filter(r => {
    const matchesSearch = r.player?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "INJURY") return matchesSearch && r.type === "INJURY";
    if (activeFilter === "REHAB") return matchesSearch && r.severity === "MODERATE";
    if (activeFilter === "CHECKUP") return matchesSearch && r.type === "CHECKUP";
    
    return matchesSearch;
  });

  // Derived fatigue data from real players or fallback to static data
  const fatigueData = (players.length > 0 
    ? players.map(p => ({
        name: p.name,
        load: p.trainingLoad || Math.floor(Math.random() * 40) + 10, // Small random load if 0
        risk: p.trainingLoad > 85 ? "Critique" : p.trainingLoad > 65 ? "Elevé" : p.trainingLoad > 40 ? "Modéré" : "Bas"
      }))
    : FATIGUE_DATA
  ).sort((a, b) => b.load - a.load).slice(0, 5);

  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Hub <span className="text-gradient-gold">Médical</span>
            </h1>
            <p className="text-muted-foreground">Suivi physiologique, gestion des blessures et prévention des risques.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-widest shadow-lg shadow-destructive/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <AlertTriangle className="h-4 w-4" /> Signaler Blessure
            </button>
          </div>
        </div>

        {/* Top Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fatigue Monitoring */}
          <BentoCard
            title="Alerte Fatigue"
            subtitle="Charge d'entraînement (Top 5)"
            span="lg:col-span-2"
            icon={<Activity className="h-4 w-4" />}
          >
            <div className="h-64 w-full pt-4">
              {fatigueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fatigueData} layout="vertical">
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={100} />
                    <Tooltip 
                      cursor={{ fill: '#ffffff05' }}
                      contentStyle={{ background: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    />
                    <Bar 
                      dataKey="load" 
                      fill="#D4AF37" 
                      radius={[0, 8, 8, 0]} 
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[10px] uppercase font-bold text-muted-foreground">
                  Aucune donnée de fatigue
                </div>
              )}
            </div>
          </BentoCard>

          {/* Quick Stats */}
          <div className="space-y-4">
            <button 
              onClick={() => setActiveFilter(activeFilter === "INJURY" ? null : "INJURY")}
              className="w-full text-left transition-all"
            >
              <GlassCard className={cn(
                "p-6 flex items-center justify-between border-2 transition-all",
                activeFilter === "INJURY" ? "border-destructive bg-destructive/5" : "border-transparent"
              )}>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Indisponibles</p>
                  <p className="text-3xl font-heading font-black text-destructive">{String(activeInjuries).padStart(2, '0')}</p>
                </div>
                <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                  <AlertTriangle size={24} />
                </div>
              </GlassCard>
            </button>

            <button 
              onClick={() => setActiveFilter(activeFilter === "REHAB" ? null : "REHAB")}
              className="w-full text-left transition-all"
            >
              <GlassCard className={cn(
                "p-6 flex items-center justify-between border-2 transition-all",
                activeFilter === "REHAB" ? "border-warning bg-warning/5" : "border-transparent"
              )}>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">En rééducation</p>
                  <p className="text-3xl font-heading font-black text-warning">{String(reeducationCount).padStart(2, '0')}</p>
                </div>
                <div className="p-3 rounded-2xl bg-warning/10 text-warning">
                  <Heart size={24} />
                </div>
              </GlassCard>
            </button>

            <button 
              onClick={() => setActiveFilter(activeFilter === "CHECKUP" ? null : "CHECKUP")}
              className="w-full text-left transition-all"
            >
              <GlassCard className={cn(
                "p-6 flex items-center justify-between border-2 transition-all",
                activeFilter === "CHECKUP" ? "border-primary bg-primary/5" : "border-transparent"
              )}>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Check-ups requis</p>
                  <p className="text-3xl font-heading font-black text-primary">{String(checkupsCount).padStart(2, '0')}</p>
                </div>
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <FileText size={24} />
                </div>
              </GlassCard>
            </button>
          </div>
        </div>

        {/* Injury List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight">Registre Médical</h3>
              {activeFilter && (
                <button 
                  onClick={() => setActiveFilter(null)}
                  className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:bg-white/10"
                >
                  Effacer filtre: {activeFilter}
                </button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredRecords.length > 0 ? filteredRecords.map((record) => (
              <GlassCard key={record.id} className="p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-destructive/20 transition-all">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-sm text-primary">
                  {record.player?.name?.substring(0, 2).toUpperCase() || "??"}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-sm">{record.player?.name || "Joueur Inconnu"}</h4>
                  <p className="text-xs text-muted-foreground">{record.diagnosis}</p>
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start gap-1">
                  <div className="flex justify-between w-full max-w-[150px] text-[10px] font-bold uppercase">
                    <span>Gravité</span>
                    <span className={
                      record.severity === "SEVERE" ? "text-destructive" :
                      record.severity === "MODERATE" ? "text-warning" : "text-primary"
                    }>{record.severity}</span>
                  </div>
                  <div className="h-1.5 w-full max-w-[150px] bg-white/5 rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full transition-all duration-1000",
                      record.severity === "SEVERE" ? "bg-destructive" :
                      record.severity === "MODERATE" ? "bg-warning" : "bg-primary"
                    )} style={{ width: record.severity === "SEVERE" ? "100%" : record.severity === "MODERATE" ? "50%" : "25%" }} />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border",
                    record.type === "INJURY" ? "text-destructive bg-destructive/10 border-destructive/20" : 
                    record.type === "CHECKUP" ? "text-primary bg-primary/10 border-primary/20" :
                    "text-warning bg-warning/10 border-warning/20"
                  )}>
                    {record.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock size={10} /> Depuis le {new Date(record.dateOccurred).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="p-2 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </GlassCard>
            )) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Aucun signalement médical trouvé</p>
                {activeFilter && (
                  <button onClick={() => setActiveFilter(null)} className="mt-4 text-xs text-primary hover:underline uppercase font-black">Voir tous les dossiers</button>
                )}
              </div>
            )}
          </div>
        </div>

        <ReportInjuryModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </PageTransition>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
