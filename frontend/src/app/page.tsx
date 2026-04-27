"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Trophy,
  Users,
  BarChart3,
  HeartPulse,
  Ticket,
  ShoppingBag,
  ChevronRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/shared/glass-card";
import { MagneticWrapper } from "@/components/shared/magnetic-wrapper";
import { APP_NAME } from "@/lib/constants";

import { CinematicBackground } from "@/components/shared/cinematic-background";

/** Animation variants for staggered entrance */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Feature card data for the modules showcase */
const FEATURES = [
  {
    icon: Users,
    title: "Gestion d'Effectif",
    description: "Suivi complet des joueurs, profils détaillés et statistiques individuelles.",
    href: "/dashboard/squad",
    color: "text-primary",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,112,243,0.15)]",
  },
  {
    icon: Trophy,
    title: "Match Center",
    description: "Score live, compositions d'équipe et analyses post-match en temps réel.",
    href: "/dashboard/matches",
    color: "text-accent",
    glow: "group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]",
  },
  {
    icon: HeartPulse,
    title: "Module Médical",
    description: "Dossiers médicaux, suivi des blessures et alertes de forme physique.",
    href: "/dashboard/medical",
    color: "text-destructive",
    glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
  },
  {
    icon: BarChart3,
    title: "Analytics Pro",
    description: "Data-visualisation avancée, KPIs et rapports de performance.",
    href: "/dashboard/stats",
    color: "text-success",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
  },
  {
    icon: Ticket,
    title: "Billetterie",
    description: "Achat de billets dynamique, QR codes et programme de fidélité.",
    href: "/tickets",
    color: "text-warning",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  {
    icon: ShoppingBag,
    title: "Boutique Officielle",
    description: "E-commerce intégré avec maillots, accessoires et produits dérivés.",
    href: "/shop",
    color: "text-purple-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]",
  },
];

/** Stats display for the hero section */
const HERO_STATS = [
  { value: "67+", label: "Joueurs", icon: Users },
  { value: "42", label: "Matchs", icon: Trophy },
  { value: "12K", label: "Supporters", icon: Globe },
  { value: "98%", label: "Uptime", icon: Zap },
];

/**
 * Landing Page — Hero section with animated statistics,
 * feature cards grid with magnetic hover, and CTA buttons.
 */
export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden cursor-default">
      {/* ---- Bespoke Cinematic Background (Realized by Code) ---- */}
      <CinematicBackground />

      {/* ---- Advanced Background Animations ---- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        {/* Mouse Spotlight Effect */}
        <motion.div
          animate={{
            x: mousePos.x - 400,
            y: mousePos.y - 400,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
          className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen opacity-50"
        />
      </div>

      {/* ---- Hero Section ---- */}
      <section className="relative z-10 px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Plateforme Next-Gen
            </span>
          </motion.div>

          {/* Main heading with Sekuya Style text reveal */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-10 animate-text-glow"
          >
            <div className="overflow-hidden py-2">
              <motion.span
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 }}
                className="inline-block text-foreground"
              >
                ÉVEILLEZ VOTRE RÊVE.
              </motion.span>
            </div>
            <div className="overflow-hidden py-2">
              <motion.span
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 }}
                className="inline-block text-foreground"
              >
                DOMINEZ LE
              </motion.span>
            </div>
            <div className="overflow-hidden py-2">
              <motion.span
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.6 }}
                className="inline-block text-foreground"
              >
                MULTIVERS.
              </motion.span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_NAME} centralise la gestion sportive, médicale, commerciale et
            l&apos;engagement des supporters dans une plateforme immersive et intelligente.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <MagneticWrapper strength={0.2}>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase flex items-center gap-2 shadow-[0_10px_30px_rgba(0,112,243,0.3)] hover:shadow-[0_15px_40px_rgba(0,112,243,0.5)] transition-all"
                >
                  Accéder au Dashboard
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper strength={0.2}>
              <Link href="/fan">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-xl glass glass-hover font-bold text-sm uppercase flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all"
                >
                  <Shield className="h-4 w-4 text-accent" />
                  Fan Zone
                </motion.button>
              </Link>
            </MagneticWrapper>
          </motion.div>

          {/* Hero Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {HERO_STATS.map((stat) => (
              <GlassCard key={stat.label} className="text-center py-4 px-3">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground tracking-wider mt-1">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ---- Features Grid ---- */}
      <section className="relative z-10 px-4 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section heading */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-3 uppercase">
              Modules Principaux
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Une suite complète d&apos;outils pour gérer chaque aspect de votre club.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Link href={feature.href}>
                  <GlassCard magnetic className={`group h-full ${feature.glow} neon-border transition-shadow duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color} mb-4`} />
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      explorer <ChevronRight className="h-3 w-3" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
