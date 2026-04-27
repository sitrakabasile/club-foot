"use client";

import { motion } from "framer-motion";
import { Shield, Trash2, TrendingUp, User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerListRowProps {
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
  onDelete?: (id: string) => void;
}

/**
 * PlayerListRow — List view for players.
 * Compact, premium row for high-density management.
 */
export function PlayerListRow({
  id,
  name,
  position,
  rating,
  number,
  stats,
  image,
  onDelete,
}: PlayerListRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-accent/30 rounded-2xl p-4 flex items-center gap-6 transition-all duration-300"
    >
      {/* Number & Rating */}
      <div className="flex items-center gap-4 w-24">
        <span className="text-xs font-black text-muted-foreground w-6">#{number}</span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-2xl font-heading font-black text-gradient-gold">{rating}</span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase">{position}</span>
        </div>
      </div>

      {/* Photo & Name */}
      <div className="flex items-center gap-4 flex-1">
        <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User className="h-6 w-6 text-white/20" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-white group-hover:text-accent transition-colors">{name}</h3>
          <div className="flex items-center gap-2">
            <Activity size={10} className="text-success" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">En forme</span>
          </div>
        </div>
      </div>

      {/* Stats Inline */}
      <div className="hidden lg:flex items-center gap-8 px-8 border-x border-white/5">
        <StatItem label="PAC" value={stats.pac} />
        <StatItem label="SHO" value={stats.sho} />
        <StatItem label="PAS" value={stats.pas} />
        <StatItem label="DRI" value={stats.dri} />
        <StatItem label="DEF" value={stats.def} />
        <StatItem label="PHY" value={stats.phy} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onDelete?.(id)}
          className="h-10 w-10 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-destructive transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex flex-col items-center w-10">
      <span className="text-[8px] font-black text-muted-foreground tracking-tighter">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}
