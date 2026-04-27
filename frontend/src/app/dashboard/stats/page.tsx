"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Target, 
  Percent, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";

const PERFORMANCE_DATA = [
  { month: "Août", intensity: 65, goals: 12 },
  { month: "Sept", intensity: 78, goals: 15 },
  { month: "Oct", intensity: 82, goals: 18 },
  { month: "Nov", intensity: 75, goals: 14 },
  { month: "Déc", intensity: 90, goals: 22 },
];

const SKILL_DATA = [
  { subject: 'Attaque', A: 120, B: 110, fullMark: 150 },
  { subject: 'Défense', A: 98, B: 130, fullMark: 150 },
  { subject: 'Vitesse', A: 86, B: 130, fullMark: 150 },
  { subject: 'Physique', A: 99, B: 100, fullMark: 150 },
  { subject: 'Technique', A: 85, B: 90, fullMark: 150 },
];

export default function StatsPage() {
  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Analytics <span className="text-gradient-blue">Pro</span>
            </h1>
            <p className="text-muted-foreground">Analyses de données avancées et rapports de performance du club.</p>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
            Exporter PDF <ChevronRight size={14} />
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Possession Moyenne", value: "58.4%", trend: "+2.1%", icon: Activity, color: "text-primary" },
            { label: "Buts par Match", value: "2.8", trend: "+0.4", icon: Target, color: "text-accent" },
            { label: "Précision Passes", value: "89%", trend: "-1.2%", icon: Percent, color: "text-success" },
            { label: "Intensité Moyenne", value: "92", trend: "+5", icon: Zap, color: "text-warning" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-xl bg-white/5 ${kpi.color}`}>
                    <kpi.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.trend.startsWith("+") ? "text-success" : "text-destructive"}`}>
                    {kpi.trend.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-heading font-black">{kpi.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{kpi.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <GlassCard className="lg:col-span-2 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight">Intensité de Performance</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Intensité
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#0070f3' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="intensity" 
                    stroke="#0070f3" 
                    fillOpacity={1} 
                    fill="url(#colorIntensity)" 
                    strokeWidth={4} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Secondary Stats */}
          <div className="space-y-6">
            <GlassCard className="p-8 h-full flex flex-col">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-8">Efficacité Offensive</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: '#ffffff05'}}
                      contentStyle={{ background: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                    />
                    <Bar dataKey="goals" radius={[4, 4, 0, 0]}>
                      {PERFORMANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === PERFORMANCE_DATA.length - 1 ? '#D4AF37' : '#ffffff10'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase mb-1">
                  <TrendingUp size={14} /> Pic de forme
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                  Meilleure performance enregistrée en Décembre avec une moyenne de 2.2 buts par match.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Skill Matrix Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-8">
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-6">Radar d'Équipe</h3>
            <div className="space-y-6">
              {SKILL_DATA.map((skill) => (
                <div key={skill.subject} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>{skill.subject}</span>
                    <span className="text-primary">{Math.round((skill.A / 150) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(skill.A / 150) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary shadow-[0_0_10px_rgba(0,112,243,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 rounded-3xl bg-primary/10 text-primary">
              <BarChart3 size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold uppercase">Rapports IA Disponibles</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Générez des analyses prédictives pour votre prochain match contre le Bayern Munich.
              </p>
            </div>
            <button className="w-full py-3 rounded-xl glass glass-hover text-[10px] font-bold uppercase tracking-widest">
              Générer Rapport Tactique
            </button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
