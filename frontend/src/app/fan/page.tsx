"use client";

import { motion, Variants } from "framer-motion";
import { 
  ShoppingBag, 
  Ticket, 
  Newspaper, 
  Users, 
  ChevronRight, 
  Sparkles,
  PlayCircle,
  Camera,
  MessageSquare,
  CheckCircle2,
  Star,
  Crown,
  Gift,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/shared/glass-card";
import { MagneticWrapper } from "@/components/shared/magnetic-wrapper";
import { CinematicBackground } from "@/components/shared/cinematic-background";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const FAN_MODULES = [
  {
    icon: ShoppingBag,
    title: "Boutique Officielle",
    description: "Portez les couleurs du club avec nos maillots et accessoires exclusifs.",
    href: "/shop",
    color: "text-primary",
    badge: "New Drop",
  },
  {
    icon: Ticket,
    title: "Billetterie & Abonnements",
    description: "Réservez vos places pour les prochains matchs et vibrez au stade.",
    href: "/tickets",
    color: "text-accent",
    badge: "Dispo",
  },
  {
    icon: Newspaper,
    title: "Actualités",
    description: "Restez au courant des dernières infos, transferts et coulisses du club.",
    href: "/news",
    color: "text-success",
  },
  {
    icon: MessageSquare,
    title: "Fan Club",
    description: "Rejoignez la communauté officielle et profitez d'avantages exclusifs.",
    href: "#",
    color: "text-purple-400",
    badge: "Bientôt",
  },
  {
    icon: PlayCircle,
    title: "Vidéos & Replays",
    description: "Revivez les meilleurs moments et les interviews exclusives.",
    href: "#",
    color: "text-destructive",
  },
  {
    icon: Camera,
    title: "Galerie Photos",
    description: "Les plus belles images de vos joueurs et des supporters.",
    href: "#",
    color: "text-blue-400",
  },
];

export default function FanZonePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBackground />

      <section className="relative z-10 px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link href="/">
              <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                Retour Accueil
              </button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent uppercase tracking-widest mb-6">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Expérience Supporter
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase mb-6 text-gradient-gold">
              FAN ZONE
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vivez votre passion à 100%. Accédez à tous les services dédiés aux supporters du club.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAN_MODULES.map((module) => (
              <motion.div key={module.title} variants={itemVariants}>
                <Link href={module.href}>
                  <GlassCard magnetic className="group h-full relative overflow-hidden neon-border">
                    {module.badge && (
                      <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/30">
                        {module.badge}
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center mb-6 ${module.color}`}>
                      <module.icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {module.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mt-auto">
                      Accéder <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured Section — Fan Club Details */}
          <motion.div variants={itemVariants} className="mt-24">
            <GlassCard className="p-8 md:p-12 overflow-hidden relative border-accent/30 bg-accent/5">
              <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black uppercase mb-4 tracking-tight">Le Fan Club Officiel</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Rejoignez la plus grande communauté de supporters et profitez d'une expérience VIP unique.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Benefits */}
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-8 flex items-center gap-2 text-accent">
                      <Star className="h-5 w-5" />
                      Vos Avantages Exclusifs
                    </h3>
                    <ul className="space-y-6">
                      {[
                        { title: "Priorité Billetterie", desc: "Accès aux préventes pour tous les matchs à domicile et à l'extérieur.", icon: Ticket },
                        { title: "Réductions Boutique", desc: "-15% sur toute la boutique officielle toute l'année.", icon: ShoppingBag },
                        { title: "Rencontres Joueurs", desc: "Participations exclusives aux séances de dédicaces et entraînements ouverts.", icon: Users },
                        { title: "Cadeau de Bienvenue", desc: "Recevez un pack exclusif (écharpe, pins et carte membre) lors de l'adhésion.", icon: Gift },
                      ].map((benefit, i) => (
                        <motion.li 
                          key={benefit.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                            <benefit.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                            <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Membership Cards */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Classic Plan */}
                    <GlassCard className="border-white/10 flex flex-col h-full bg-white/5 group hover:border-blue-500/50 transition-all duration-500">
                      <div className="relative h-32 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex flex-col p-4 shadow-2xl">
                         <div className="flex justify-between items-start">
                            <span className="text-[8px] font-bold opacity-50 uppercase">Classic Member</span>
                            <div className="w-6 h-4 bg-slate-700 rounded-sm" /> {/* Chip */}
                         </div>
                         <div className="mt-auto">
                            <div className="text-[10px] font-mono tracking-wider">**** **** **** 2024</div>
                            <div className="text-[8px] uppercase mt-1 opacity-50">SUPPORTER OFFICIEL</div>
                         </div>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                      </div>

                      <div className="mb-6 text-center">
                        <h4 className="text-2xl font-black uppercase tracking-tight">Classic</h4>
                        <div className="mt-2 flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-black text-foreground">29€</span>
                          <span className="text-xs text-muted-foreground">/an</span>
                        </div>
                      </div>
                      
                      <ul className="text-[11px] space-y-3 mb-8 flex-grow">
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Priorité Billetterie (Phase 2)</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> -10% Boutique Officielle</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Newsletter & Contenus Exclusifs</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Badge Digital Supporter</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Accès au Forum Privé</li>
                      </ul>
                      
                      <button className="w-full py-3 rounded-xl glass glass-hover font-bold text-[10px] uppercase tracking-widest text-foreground hover:bg-blue-500/20 transition-all">
                        Choisir Classic
                      </button>
                    </GlassCard>

                    {/* Elite Plan */}
                    <GlassCard className="border-accent/40 flex flex-col h-full bg-accent/5 relative overflow-hidden group hover:border-accent transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
                      <div className="absolute top-0 right-0 px-2 py-1 bg-accent text-accent-foreground text-[8px] font-bold uppercase tracking-widest rounded-bl-lg z-20">
                        BEST VALUE
                      </div>
                      
                      <div className="relative h-32 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 to-black border border-accent/20 flex flex-col p-4 shadow-2xl">
                         <div className="flex justify-between items-start">
                            <span className="text-[8px] font-bold text-accent uppercase">Elite VIP Member</span>
                            <div className="w-6 h-4 bg-accent/40 rounded-sm" /> {/* Chip */}
                         </div>
                         <div className="mt-auto">
                            <div className="text-[10px] font-mono tracking-wider text-accent">**** **** **** 7777</div>
                            <div className="text-[8px] uppercase mt-1 text-accent/70">MEMBRE PRIVILÈGE</div>
                         </div>
                         <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                      </div>

                      <div className="mb-6 text-center">
                        <h4 className="text-2xl font-black uppercase tracking-tight text-accent">Elite</h4>
                        <div className="mt-2 flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-black text-accent">79€</span>
                          <span className="text-xs text-muted-foreground">/an</span>
                        </div>
                      </div>
                      
                      <ul className="text-[11px] space-y-3 mb-8 flex-grow">
                        <li className="flex items-center gap-2 font-bold text-foreground"><Crown className="h-3.5 w-3.5 text-accent" /> Tous les avantages Classic</li>
                        <li className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Priorité Billetterie (Phase 1)</li>
                        <li className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> -20% Boutique & Flocage Offert</li>
                        <li className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Welcome Pack Premium (Box)</li>
                        <li className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> 1 Invitation Loge par Saison</li>
                        <li className="flex items-center gap-2 font-bold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Vote Joueur du Mois</li>
                      </ul>
                      
                      <button className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-widest shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all">
                        Devenir Membre Elite
                      </button>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
