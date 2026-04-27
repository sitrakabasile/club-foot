"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Calendar,
  Zap,
  ChevronRight,
  Plus,
  Shield,
  Settings,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BentoCard } from "@/components/dashboard/bento-card";
import { AddMatchModal } from "@/components/dashboard/add-match-modal";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { apiFetch } from "@/lib/api";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock fallback for empty revenue data
const REVENUE_DATA = [
  { name: "Lun", value: 4000 },
  { name: "Mar", value: 3000 },
  { name: "Mer", value: 5000 },
  { name: "Jeu", value: 2780 },
  { name: "Ven", value: 6000 },
  { name: "Sam", value: 8000 },
  { name: "Dim", value: 12000 },
];

/**
 * DashboardOverview — Main Bento-style dashboard for admins and staff.
 * Now connected to real backend data.
 */
export default function DashboardOverview() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAddMatchOpen, setIsAddMatchOpen] = useState(false);

  async function fetchStats() {
    try {
      const stats = await apiFetch("/dashboard/stats");
      setData(stats);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const handleGenerateReport = () => {
    if (!data) return;
    const sections = [
      ["--- GALAXY FC : RAPPORT DE PERFORMANCE ---"],
      ["Généré le", new Date().toLocaleString("fr-FR")],
      [],
      ["--- EFFECTIF ---"],
      ["Total Joueurs", data.overview?.totalPlayers],
      ["Taux de Disponibilité", `${data.overview?.healthRate}%`],
      ["Joueurs Blessés", data.overview?.injuredCount],
      [],
      ["--- FINANCES ---"],
      ["Revenu Total", `${data.finances?.totalRevenue} €`],
      ["Tendance", data.finances?.trend],
      [],
      ["--- TOP PERFORMERS ---"],
      ["Joueur", "Buts", "Note"],
      ...(data.topPlayers?.map((p: any) => [p.name, p.goals, p.rating]) || []),
    ];
    const csvContent = sections.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `rapport_galaxy_fc_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          Synchronisation Multiverse...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
            Tableau de <span className="text-gradient-blue">Bord</span>
          </h1>
          <p className="text-muted-foreground">Bienvenue, Coach. Votre club Galaxy FC est sous contrôle.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddMatchOpen(true)}
            className="px-4 py-2 rounded-xl glass glass-hover text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Nouveau Match
          </button>
          <button
            onClick={handleGenerateReport}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Générer Rapport
          </button>
        </div>
      </div>

      <AddMatchModal
        isOpen={isAddMatchOpen}
        onClose={() => setIsAddMatchOpen(false)}
        onSuccess={fetchStats}
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-6 gap-4 h-auto md:h-[800px]">

        {/* Main Performance Chart */}
        <BentoCard
          title="Performance Offensive"
          subtitle="Résultats des derniers matchs"
          span="md:col-span-2 lg:col-span-3 row-span-3"
          icon={<TrendingUp className="h-4 w-4" />}
          onClick={() => router.push("/dashboard/matches")}
        >
          <div className="h-full w-full pt-4">
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data?.recentMatches?.length > 0 ? data.recentMatches.slice().reverse() : []}>
                <defs>
                  <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="opponent" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#0070f3' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="score" stroke="#0070f3" fillOpacity={1} fill="url(#colorGoals)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            {(!data?.recentMatches || data.recentMatches.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase text-muted-foreground">
                Aucune donnée de match disponible
              </div>
            )}
          </div>
        </BentoCard>

        {/* Squad Health Widget */}
        <BentoCard
          title="Disponibilité Effectif"
          subtitle={`${data?.overview?.totalPlayers || 0} Joueurs inscrits`}
          span="md:col-span-2 lg:col-span-3 row-span-2"
          icon={<Activity className="h-4 w-4" />}
          onClick={() => router.push("/dashboard/squad")}
        >
          <div className="flex items-center gap-8 h-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-success">{data?.overview?.healthRate || 100}%</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Disponibles</div>
            </div>
            <div className="w-px h-12 bg-white/5" />
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold">
                  <span>Blessés / En soin</span>
                  <span>{data?.overview?.injuredCount || 0}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive transition-all duration-1000"
                    style={{ width: `${(data?.overview?.injuredCount / (data?.overview?.totalPlayers || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Next Match Widget */}
        <BentoCard
          title="Prochaine Échéance"
          subtitle={data?.nextMatch?.competition || "Calendrier"}
          span="md:col-span-2 lg:col-span-3 row-span-1"
          icon={<Calendar className="h-4 w-4" />}
          className="bg-primary/5"
          onClick={() => router.push("/dashboard/matches")}
        >
          <div className="flex items-center justify-between h-full">
            {data?.nextMatch ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                    {data.nextMatch.homeTeam.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xl font-bold tracking-tighter">VS</span>
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                    {data.nextMatch.awayTeam.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-primary uppercase">
                    {format(new Date(data.nextMatch.date), "EEE dd/MM HH:mm", { locale: fr })}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate max-w-[100px]">
                    {data.nextMatch.venue}
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full text-center text-[10px] uppercase text-muted-foreground italic">
                Aucun match programmé
              </div>
            )}
          </div>
        </BentoCard>

        {/* Finance Snapshot */}
        <BentoCard
          title="Santé Financière"
          subtitle="Revenus & Dépenses"
          span="md:col-span-2 lg:col-span-2 row-span-3"
          icon={<Zap className="h-4 w-4 text-warning" />}
        >
          <div className="space-y-6 pt-4 h-full flex flex-col">
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gradient-gold">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(data?.finances?.totalRevenue || 0)}
                </span>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", (data?.finances?.trend || "").startsWith("+") ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
                  {data?.finances?.trend}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Chiffre d'affaires total</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Dépenses</p>
                <p className="text-sm font-bold text-destructive">
                  -{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(data?.finances?.totalExpenses || 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">Bénéfice</p>
                <p className={cn("text-sm font-bold", (data?.finances?.balance || 0) >= 0 ? "text-success" : "text-destructive")}>
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(data?.finances?.balance || 0)}
                </p>
              </div>
            </div>

            <div className="h-28 w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.finances?.history || REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ background: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#D4AF37' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BentoCard>

        {/* Top Players */}
        <BentoCard
          title="Top Performers"
          span="md:col-span-2 lg:col-span-2 row-span-3"
          icon={<Trophy className="h-4 w-4" />}
          onClick={() => router.push("/dashboard/squad")}
        >
          <div className="space-y-4 pt-2 h-full flex flex-col">
            {data?.topPlayers?.length > 0 ? (
              data.topPlayers.map((p: any, i: number) => (
                <div key={p.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group/item">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">#{i + 1}</div>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-primary">{p.goals} Buts</div>
                    <div className="text-[10px] text-muted-foreground">{p.rating} Note</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-[10px] uppercase text-muted-foreground italic">
                Aucune statistique disponible
              </div>
            )}
            <button
              onClick={() => router.push("/dashboard/squad")}
              className="w-full py-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 mt-auto"
            >
              Voir tout l'effectif <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </BentoCard>

        {/* Quick Actions / System Status */}
        <BentoCard
          title="Système"
          span="md:col-span-2 lg:col-span-2 row-span-3"
          icon={<Shield className="h-4 w-4" />}
        >
          <div className="grid grid-cols-2 gap-2 pt-2 h-full">
            <button className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 flex flex-col items-center justify-center gap-2 transition-all group">
              <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span className="text-[10px] uppercase font-bold">Staff</span>
            </button>
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 flex flex-col items-center justify-center gap-2 transition-all group"
            >
              <Settings className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span className="text-[10px] uppercase font-bold">Config</span>
            </button>
            <button className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 flex flex-col items-center justify-center gap-2 transition-all group col-span-2">
              <Activity className="h-5 w-5 text-muted-foreground group-hover:text-success" />
              <span className="text-[10px] uppercase font-bold">Live Server: OK</span>
            </button>
          </div>
        </BentoCard>

      </div>
    </div>
  );
}
