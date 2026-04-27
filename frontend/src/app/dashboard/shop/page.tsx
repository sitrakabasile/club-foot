"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  X, 
  CreditCard,
  CheckCircle2,
  Package,
  Star
} from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { BentoCard } from "@/components/dashboard/bento-card";
import { apiFetch } from "@/lib/api";

import { AddProductModal } from "@/components/dashboard/add-product-modal";

/**
 * ShopHub — Premium E-commerce experience for the football club.
 */
export default function ShopHubPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const data = await apiFetch("/shop/articles");
      setArticles(data);
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  }

  const addToCart = (article: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === article.id);
      if (exists) {
        return prev.map(item => item.id === article.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...article, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setOrderStatus('PROCESSING');
    try {
      await apiFetch("/shop/orders", {
        method: "POST",
        body: JSON.stringify({
          items: cart.map(item => ({
            articleId: item.id,
            quantity: item.quantity,
            unitPrice: item.price
          })),
          total: cartTotal
        })
      });
      setOrderStatus('SUCCESS');
      setCart([]);
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
        setOrderStatus('IDLE');
      }, 3000);
    } catch (err) {
      console.error("Checkout failed", err);
      setOrderStatus('IDLE');
    }
  };

  const categories = ["Tous", "Maillots", "Entraînement", "Accessoires", "Souvenirs"];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="p-6 space-y-8 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight uppercase">
              Boutique <span className="text-gradient-gold">Officielle</span>
            </h1>
            <p className="text-muted-foreground">Équipez-vous aux couleurs du club. Produits authentiques et exclusifs.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative h-12 w-12 rounded-2xl glass glass-hover flex items-center justify-center text-white"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-black flex items-center justify-center text-accent-foreground animate-bounce-subtle">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="h-12 px-6 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              Admin Shop
            </button>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
          <div className="relative z-20 h-full p-10 flex flex-col justify-center max-w-lg space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-widest">Nouvelle Collection</span>
            <h2 className="text-4xl font-heading font-black text-white leading-none uppercase">Kit Domicile <br /> <span className="text-gradient-gold">Saison 2025/26</span></h2>
            <p className="text-white/60 text-sm">Portez les couleurs de la victoire. Disponible en édition limitée.</p>
            <button className="w-fit px-8 py-3 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors">Découvrir</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  selectedCategory === cat ? "bg-white text-black" : "glass glass-hover text-muted-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArticles.length > 0 ? filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <GlassCard className="p-4 flex flex-col gap-4 overflow-hidden border-white/5 hover:border-accent/30 transition-all duration-500">
                <div className="relative aspect-square rounded-[1.5rem] bg-white/[0.03] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {article.image ? (
                      <img 
                        src={`/${article.image}`} 
                        alt={article.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <ShoppingBag size={64} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  {article.stock < 5 && (
                    <span className="absolute top-4 left-4 px-2 py-1 rounded-lg bg-destructive/20 text-destructive text-[8px] font-black uppercase tracking-widest border border-destructive/30">Stock Limité</span>
                  )}
                  <button 
                    onClick={() => addToCart(article)}
                    className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{article.category}</p>
                    <p className="text-sm font-black text-accent">{article.price}€</p>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-accent transition-colors">{article.name}</h3>
                </div>
              </GlassCard>
            </motion.div>
          )) : !loading ? (
            <div className="col-span-full py-24 text-center space-y-4">
              <Package size={48} className="mx-auto text-muted-foreground opacity-20" />
              <p className="text-muted-foreground text-sm uppercase font-black tracking-widest">Aucun produit disponible</p>
              <button 
                onClick={() => {setSearchQuery(""); setSelectedCategory("Tous")}}
                className="text-accent text-[10px] font-black uppercase tracking-widest hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
             <div className="col-span-full h-64 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
             </div>
          )}
        </div>

        {/* Shopping Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#050505] border-l border-white/10 shadow-2xl h-full flex flex-col"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                      <ShoppingCart size={24} />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold uppercase">Panier</h2>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{cart.length} articles sélectionnés</p>
                    </div>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {cart.length > 0 ? cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center">
                        <ShoppingBag size={24} className="text-white/20" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-white">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.price}€ x {item.quantity}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )) : (
                    <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                      <ShoppingCart size={64} />
                      <p className="text-xs font-black uppercase tracking-widest">Votre panier est vide</p>
                    </div>
                  )}
                </div>

                <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground uppercase font-black tracking-widest">Total estimé</span>
                    <span className="text-2xl font-heading font-black text-white">{cartTotal}€</span>
                  </div>
                  <button 
                    disabled={cart.length === 0}
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-5 rounded-[1.5rem] bg-accent text-accent-foreground font-black uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    Passer à la caisse
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Checkout Modal */}
        <AnimatePresence>
          {isCheckoutOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-lg bg-gradient-to-br from-[#222] to-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 overflow-hidden"
              >
                {orderStatus === 'IDLE' && (
                  <div className="space-y-8">
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-heading font-black uppercase">Finalisation</h2>
                      <p className="text-sm text-muted-foreground">Paiement sécurisé via Hub Football Pay</p>
                    </div>

                    <div className="space-y-4">
                      <GlassCard className="p-6 space-y-4">
                        <div className="flex items-center gap-4 text-white">
                          <CreditCard size={20} className="text-accent" />
                          <span className="text-sm font-bold">**** **** **** 4589</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground uppercase font-bold">Total à payer</span>
                          <span className="font-black text-white">{cartTotal}€</span>
                        </div>
                      </GlassCard>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsCheckoutOpen(false)}
                        className="flex-1 py-4 rounded-2xl glass glass-hover text-xs font-black uppercase tracking-widest"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={handleCheckout}
                        className="flex-1 py-4 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest shadow-xl"
                      >
                        Confirmer {cartTotal}€
                      </button>
                    </div>
                  </div>
                )}

                {orderStatus === 'PROCESSING' && (
                  <div className="py-20 flex flex-col items-center gap-6">
                    <div className="h-16 w-16 rounded-full border-4 border-white/10 border-t-accent animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest animate-pulse">Traitement de la transaction...</p>
                  </div>
                )}

                {orderStatus === 'SUCCESS' && (
                  <div className="py-20 flex flex-col items-center gap-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-20 w-20 rounded-full bg-success/20 text-success flex items-center justify-center"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-heading font-black uppercase">Merci !</h3>
                      <p className="text-sm text-muted-foreground">Votre commande a été validée avec succès.</p>
                    </div>
                    <p className="text-[10px] text-accent font-black uppercase tracking-widest">+50 Points de Fidélité gagnés</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AddProductModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={loadArticles}
        />
      </div>
    </PageTransition>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
