"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Star, TrendingUp, User, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  rating: number;
  number: number;
  stats: {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
  };
  image?: string;
  className?: string;
  onDelete?: (id: string) => void;
}

/**
 * PlayerCard — FIFA Ultimate Team style card with radar stats.
 * Uses glassmorphism and gold accents for an "Elite" feel.
 */
export function PlayerCard({
  id,
  name,
  position,
  rating,
  number,
  stats,
  image,
  className,
  onDelete,
}: PlayerCardProps) {
  // Convert stats to Recharts format
  const radarData = [
    { subject: "PAC", A: stats.pac, fullMark: 100 },
    { subject: "SHO", A: stats.sho, fullMark: 100 },
    { subject: "PAS", A: stats.pas, fullMark: 100 },
    { subject: "DRI", A: stats.dri, fullMark: 100 },
    { subject: "DEF", A: stats.def, fullMark: 100 },
    { subject: "PHY", A: stats.phy, fullMark: 100 },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-64 h-96 group overflow-hidden rounded-[2rem]",
        "bg-gradient-to-br from-[#1a1a1a] to-[#050505]",
        "border border-white/10 hover:border-accent/40 shadow-2xl transition-all",
        className
      )}
    >
      {/* Card Header (Rating & Position) */}
      <div className="absolute top-6 left-6 z-10 flex flex-col items-center">
        <span className="text-4xl font-heading font-black text-gradient-gold leading-none">{rating}</span>
        <span className="text-xs font-bold tracking-widest text-muted-foreground">{position}</span>
        <div className="w-6 h-px bg-accent/30 my-2" />
        <Shield className="h-4 w-4 text-accent/60" />
      </div>

      {/* Delete Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(id);
        }}
        className="absolute top-6 right-6 z-30 h-8 w-8 rounded-xl bg-destructive/20 hover:bg-destructive/80 text-destructive hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <Trash2 size={16} />
      </button>

      {/* Player Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <User className="h-24 w-24 text-white/5" />
          </div>
        )}
      </div>

      {/* Player Number (Watermark) */}
      <div className="absolute top-4 right-6 z-0 opacity-10 font-heading text-8xl font-black italic">
        {number}
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-20 space-y-4">
        {/* Name */}
        <div className="text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">{name}</h3>
        </div>

        {/* Stats Radar */}
        <div className="h-32 w-full min-w-0 bg-white/5 rounded-2xl p-2 backdrop-blur-md border border-white/5 overflow-hidden">
          {mounted && (
            <ResponsiveContainer width="100%" height={128} minWidth={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 8, fontWeight: "bold" }} />
                <Radar
                  name="Stats"
                  dataKey="A"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Small Stats Row */}
        <div className="grid grid-cols-6 gap-1 text-[10px] font-bold text-center tracking-tighter">
          <div><div className="text-accent">{stats.pac}</div>PAC</div>
          <div><div className="text-accent">{stats.sho}</div>SHO</div>
          <div><div className="text-accent">{stats.pas}</div>PAS</div>
          <div><div className="text-accent">{stats.dri}</div>DRI</div>
          <div><div className="text-accent">{stats.def}</div>DEF</div>
          <div><div className="text-accent">{stats.phy}</div>PHY</div>
        </div>
      </div>

      {/* Gloss Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
