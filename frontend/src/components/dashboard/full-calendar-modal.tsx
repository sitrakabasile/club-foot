"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Search, Filter, MapPin, ChevronRight, Trophy } from "lucide-react";
import { GlassCard } from "../shared/glass-card";
import { cn } from "@/lib/utils";

interface FullCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: any[];
}

export function FullCalendarModal({ isOpen, onClose, matches }: FullCalendarModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("Tous");

  const filteredMatches = matches.filter((m) => {
    const matchesSearch = 
      m.homeTeamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.awayTeamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.competition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesComp = selectedCompetition === "Tous" || m.competition === selectedCompetition;
    
    return matchesSearch && matchesComp;
  });

  const competitions = ["Tous", ...Array.from(new Set(matches.map(m => m.competition)))];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-br from-[#121212] to-[#080808] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">Calendrier Complet</h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Saison 2023 / 2024</p>
                </div>
              </div>

              <div className="flex flex-1 max-w-md items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un match..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <button onClick={onClose} className="h-10 w-10 rounded-xl glass glass-hover flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="px-8 py-4 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <Filter size={14} className="text-muted-foreground mr-2 shrink-0" />
              {competitions.map((comp: any) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompetition(comp)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                    selectedCompetition === comp 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  )}
                >
                  {comp}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
              {filteredMatches.length > 0 ? (
                <div className="grid gap-4">
                  {filteredMatches.map((match) => (
                    <div 
                      key={match.id} 
                      className="group relative flex flex-col md:flex-row items-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all cursor-pointer"
                    >
                      {/* Date Column */}
                      <div className="flex flex-col items-center justify-center w-24 text-center md:border-r md:border-white/5 md:pr-8 mb-4 md:mb-0">
                        <span className="text-sm font-black uppercase text-white">{match.displayDate}</span>
                        <span className="text-[10px] font-bold text-muted-foreground tracking-widest">{match.displayTime}</span>
                      </div>

                      {/* Teams & Score */}
                      <div className="flex-1 flex items-center justify-center gap-8 w-full px-0 md:px-12">
                        {/* Home */}
                        <div className="flex-1 flex items-center justify-end gap-4 text-right">
                          <span className="text-sm font-bold uppercase tracking-tight hidden sm:block">{match.homeTeamName}</span>
                          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/20">
                            <Trophy className="h-5 w-5 text-primary/40" />
                          </div>
                        </div>

                        {/* Score */}
                        <div className={cn(
                          "px-6 py-2 rounded-xl text-lg font-heading font-black tracking-tighter min-w-[100px] text-center shadow-inner",
                          match.status === "LIVE" ? "bg-success/20 text-success animate-pulse" : "bg-white/5 text-white"
                        )}>
                          {match.score}
                        </div>

                        {/* Away */}
                        <div className="flex-1 flex items-center justify-start gap-4 text-left">
                          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/20">
                            <Trophy className="h-5 w-5 text-destructive/40" />
                          </div>
                          <span className="text-sm font-bold uppercase tracking-tight hidden sm:block">{match.awayTeamName}</span>
                        </div>
                      </div>

                      {/* Info Column */}
                      <div className="flex items-center gap-6 md:pl-8 md:border-l md:border-white/5 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-start">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{match.competition}</span>
                          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                            <MapPin size={10} /> {match.venue}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/10 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground mb-4">
                    <Calendar size={32} />
                  </div>
                  <h3 className="text-xl font-bold uppercase">Aucun match trouvé</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">Ajustez vos filtres ou votre recherche pour trouver d'autres rencontres.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedCompetition("Tous"); }}
                    className="mt-6 text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Réinitialiser tout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
