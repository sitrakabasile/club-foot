"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ChevronRight, 
  TrendingUp,
  MessageSquare,
  Share2,
  Plus,
  ArrowLeft
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import Link from "next/link";

const ARTICLES = [
  {
    id: "1",
    title: "Transferts : L'arrivée de Bellingham confirmée",
    excerpt: "Le milieu de terrain anglais rejoint le club pour un contrat de 6 ans. Une signature historique pour le projet NextGen.",
    category: "Transferts",
    date: "Il y a 2 heures",
    author: "Marc Rivet",
    comments: 124,
    image: "/hero-bg.png",
    featured: true,
  },
  {
    id: "2",
    title: "Analyse Tactique : Le nouveau pressing du Coach",
    excerpt: "Comment l'équipe a dominé le milieu de terrain lors du dernier match grâce à un système hybride innovant.",
    category: "Tactique",
    date: "Hier",
    author: "Sophie Durand",
    comments: 45,
    image: "/training_jacket.png",
  },
  {
    id: "3",
    title: "Le nouveau centre d'entraînement est prêt",
    excerpt: "Découvrez les installations ultra-modernes qui accueilleront l'équipe première dès la semaine prochaine.",
    category: "Club",
    date: "Il y a 2 jours",
    author: "Jean Pierre",
    comments: 18,
    image: "/ball.png",
  },
  {
    id: "4",
    title: "Mbappé : 'Nous visons le triplé cette saison'",
    excerpt: "Entretien exclusif avec le capitaine sur les ambitions du club dans toutes les compétitions.",
    category: "Interview",
    date: "Il y a 3 jours",
    author: "Marc Rivet",
    comments: 256,
    image: "/jersey_home.png",
  },
  {
    id: "5",
    title: "Dossier Médical : Point sur l'infirmerie",
    excerpt: "Les dernières nouvelles concernant la récupération de nos joueurs cadres avant le choc de dimanche.",
    category: "Club",
    date: "Il y a 4 jours",
    author: "Dr. Elena V.",
    comments: 32,
    image: "/bottle.png",
  },
  {
    id: "6",
    title: "Académie : Les jeunes talents brillent",
    excerpt: "Retour sur la victoire écrasante des U19 en Coupe Gambardella et les joueurs à suivre.",
    category: "Club",
    date: "Il y a 5 jours",
    author: "Sophie Durand",
    comments: 89,
    image: "/scarf.png",
  },
];

const CATEGORIES = ["Tous", "Matchs", "Transferts", "Club", "Tactique", "Interview"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesCategory = activeCategory === "Tous" || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <PageTransition>
      <div className="p-6 space-y-8">
        {/* Back Button */}
        <Link href="/">
          <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-4">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Accueil
          </button>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Actualités <span className="text-gradient-gold">du Club</span>
            </h1>
            <p className="text-muted-foreground">Suivez les dernières annonces, transferts et analyses tactiques.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-10 px-4 rounded-xl glass glass-hover text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Les plus lus
            </button>
          </div>
        </div>

        {/* Featured Article (Always show first unless filtered out) */}
        {activeCategory === "Tous" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-0 overflow-hidden border-primary/20 relative group">
              <div className="flex flex-col lg:flex-row h-full min-h-[400px]">
                {/* Image Side */}
                <div className="lg:w-1/2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                  <img 
                    src={ARTICLES[0].image} 
                    alt={ARTICLES[0].title} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">À la une</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">{ARTICLES[0].category}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {ARTICLES[0].date}</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {ARTICLES[0].title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                    {ARTICLES[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">MR</div>
                      <span className="text-xs font-bold">{ARTICLES[0].author}</span>
                    </div>
                    <Link href={`/news/${ARTICLES[0].id}`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:translate-x-2 transition-transform">
                      Lire la suite <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "glass glass-hover text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-1 w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une actu..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredArticles.slice(activeCategory === "Tous" && searchQuery === "" ? 1 : 0, visibleCount).map((article, i) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-0 overflow-hidden flex flex-col h-full group">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={10} /> {article.comments}</span>
                    </div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold">SD</div>
                        <span className="text-[10px] font-medium text-muted-foreground">{article.author}</span>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Section */}
        {visibleCount < filteredArticles.length && (
          <div className="flex justify-center pt-8">
            <button 
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 rounded-xl glass glass-hover text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-50"
            >
              {loadingMore ? (
                <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus size={14} className="text-primary" />
              )}
              {loadingMore ? "Chargement..." : "Voir plus d'actualités"}
            </button>
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground italic uppercase tracking-widest text-xs">Aucun article ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
