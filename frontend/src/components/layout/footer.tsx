"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Globe, 
  Share2, 
  Video,
  ChevronRight,
  Send
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { motion } from "framer-motion";

/**
 * Footer — Premium, multi-column footer with glassmorphism and social integration.
 * Automatically hides on dashboard routes to maximize workspace.
 */
export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) return null;

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="font-heading font-bold text-2xl uppercase tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              L'excellence du football rencontre l'innovation technologique. 
              Gérez votre club, connectez-vous avec vos fans et dominez le terrain.
            </p>
            <div className="flex items-center gap-3">
              {[Camera, Globe, Share2, Video].map((Icon, i) => (
                <button 
                  key={i}
                  className="h-9 w-9 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 text-foreground">
              Le Club
            </h3>
            <ul className="space-y-4">
              {["Effectif Pro", "Calendrier", "Palmarès", "Histoire", "Billetterie"].map((link) => (
                <li key={link}>
                  <Link 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Fan Zone */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 text-foreground">
              Supporters
            </h3>
            <ul className="space-y-4">
              {["Boutique Officielle", "Abonnements", "Fan Club", "Actualités", "Photos & Vidéos"].map((link) => (
                <li key={link}>
                  <Link 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-4 text-foreground">
              Rejoindre l'élite
            </h3>
            <p className="text-xs text-muted-foreground">
              Inscrivez-vous pour recevoir les dernières actus et offres exclusives.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="votre@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button className="absolute right-2 top-1.5 h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
                <Send size={14} />
              </button>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Mail size={14} className="text-primary" /> contact@galaxyfc.com
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <MapPin size={14} className="text-primary" /> Stade de l'Élite, Paris
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} {APP_NAME}. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex items-center gap-8">
            {["Mentions Légales", "Confidentialité", "Cookies"].map((link) => (
              <Link 
                key={link} 
                href="#" 
                className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest font-medium transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent" />
    </footer>
  );
}
