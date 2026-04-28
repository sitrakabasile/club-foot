"use client";

import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShoppingCart, 
  Star,
  ChevronRight,
  TrendingUp,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";

const PRODUCTS = [
  {
    id: "1",
    name: "Maillot Domicile 24/25",
    category: "Tenues de Match",
    price: 89.99,
    rating: 4.9,
    image: "/images/jersey-home.png", // Mock
    isNew: true,
  },
  {
    id: "2",
    name: "Maillot Extérieur 24/25",
    category: "Tenues de Match",
    price: 89.99,
    rating: 4.8,
    image: "/images/jersey-away.png", // Mock
    isNew: true,
  },
  {
    id: "3",
    name: "Veste de Présentation",
    category: "Entraînement",
    price: 119.99,
    rating: 4.7,
    image: "/images/jacket.png",
  },
  {
    id: "4",
    name: "Écharpe 'Elite' Satinée",
    category: "Accessoires",
    price: 24.99,
    rating: 5.0,
    image: "/images/scarf.png",
  },
];

/**
 * ShopPage — E-commerce storefront for club merchandise.
 * Features:
 * - Product grid with premium cards
 * - Category filtering
 * - Animated cart feedback
 */
export default function ShopPage() {
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
              Boutique <span className="text-gradient-gold">Officielle</span>
            </h1>
            <p className="text-muted-foreground">Portez haut les couleurs du club. Produits exclusifs en édition limitée.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-3 rounded-2xl glass glass-hover">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">2</div>
            </button>
          </div>
        </div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
          
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em]">
              <TrendingUp size={14} /> Nouvelle Collection
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-lg leading-none">
              Inspiré par <span className="text-gradient-gold">l'Excellence</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm">Découvrez les nouvelles tenues officielles pour la saison 2024/2025.</p>
            <button className="mt-4 w-fit px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-2">
              Acheter Maintenant <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Shop Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {["Tous", "Maillots", "Entraînement", "Accessoires", "Lifestyle"].map((cat) => (
              <button key={cat} className="whitespace-nowrap px-4 py-2 rounded-xl glass glass-hover text-[10px] font-bold uppercase tracking-widest">
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-0 overflow-hidden group flex flex-col h-full">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-white/[0.02]">
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10 px-2 py-1 rounded-lg bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest">Nouveau</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="h-full w-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-500">
                    {/* Placeholder for real product images */}
                    <ShoppingBag className="h-24 w-24 text-white/5" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{product.category}</p>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className={cn(s <= Math.floor(product.rating) ? "text-accent fill-accent" : "text-white/10")} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">{product.rating}</span>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <span className="text-xl font-heading font-black">{product.price} €</span>
                    <button className="h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

import { cn } from "@/lib/utils";
