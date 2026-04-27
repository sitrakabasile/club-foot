"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User as UserIcon, 
  Shield, 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Camera,
  Save,
  Lock,
  Mail,
  Palette,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { PageTransition } from "@/components/layout/page-transition";
import { apiFetch } from "@/lib/api";

const TABS = [
  { id: "profile", label: "Profil", icon: UserIcon },
  { id: "security", label: "Sécurité", icon: Shield },
  { id: "club", label: "Configuration Club", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "" as string | null,
  });

  const [clubData, setClubData] = useState({
    name: "",
    primaryColor: "",
    accentColor: "",
    logo: "" as string | null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [userData, clubDataResponse] = await Promise.all([
          apiFetch("/auth/me"),
          apiFetch("/club/settings")
        ]);

        if (userData.user) {
          setProfileData({
            firstName: userData.user.profile?.firstName || "",
            lastName: userData.user.profile?.lastName || "",
            email: userData.user.email,
            photo: userData.user.profile?.photo || null,
          });
        }

        if (clubDataResponse) {
          setClubData({
            name: clubDataResponse.name || "",
            primaryColor: clubDataResponse.primaryColor || "#0070f3",
            accentColor: clubDataResponse.accentColor || "#D4AF37",
            logo: clubDataResponse.logo || null,
          });
        }
      } catch (err) {
        console.error("Failed to load settings data", err);
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image est trop volumineuse (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClubLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClubData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await apiFetch("/auth/profile", {
        method: "PUT",
        body: profileData,
      });
      setSuccess("Profil mis à jour !");
      // Refresh page or update local state if needed
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await apiFetch("/auth/password", {
        method: "PUT",
        body: passwordData,
      });
      setSuccess("Mot de passe mis à jour !");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClubUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await apiFetch("/club/settings", {
        method: "PUT",
        body: clubData,
      });
      setSuccess("Configuration du club enregistrée !");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="p-6 space-y-8 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black tracking-tight text-sekuya uppercase">
            Paramètres
          </h1>
          <p className="text-muted-foreground">Gérez votre profil, vos préférences et la configuration de votre club.</p>
        </div>

        {/* Status Messages */}
        {(success || error) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${
              success ? "bg-success/10 border-success/20 text-success" : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}
          >
            {success ? <CheckCircle2 size={16} /> : <Lock size={16} />}
            {success || error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSuccess(null); setError(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <GlassCard className="p-8 space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                      <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        {profileData.photo ? (
                          <img src={profileData.photo} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          <UserIcon size={40} className="text-muted-foreground" />
                        )}
                      </div>
                      <label className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-primary text-white shadow-xl hover:scale-110 transition-transform cursor-pointer">
                        <Camera size={14} />
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                      </label>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-xl font-bold uppercase tracking-tight">Avatar du Profil</h3>
                      <p className="text-xs text-muted-foreground">JPG, PNG ou GIF. Max 5MB.</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Prénom</label>
                      <input 
                        type="text" 
                        value={profileData.firstName} 
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom</label>
                      <input 
                        type="text" 
                        value={profileData.lastName} 
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Adresse Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="email" 
                          value={profileData.email} 
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                        />
                      </div>
                    </div>

                    <div className="pt-4 sm:col-span-2 border-t border-white/5 flex justify-end">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={14} />}
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <GlassCard className="p-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-warning/10 text-warning">
                      <Lock size={20} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Modifier le mot de passe</h3>
                  </div>

                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Mot de passe actuel</label>
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nouveau mot de passe</label>
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirmer le nouveau mot de passe</label>
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-warning text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-warning/20 flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock size={14} />}
                        Mettre à jour
                      </button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "club" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <GlassCard className="p-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                      <Palette size={20} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Configuration Visuelle</h3>
                  </div>

                  <form onSubmit={handleClubUpdate} className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
                      <div className="relative group">
                        <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {clubData.logo ? (
                            <img src={clubData.logo} alt="Logo" className="h-full w-full object-contain p-2" />
                          ) : (
                            <Shield size={32} className="text-muted-foreground" />
                          )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-accent text-black shadow-xl hover:scale-110 transition-transform cursor-pointer">
                          <Camera size={12} />
                          <input type="file" className="hidden" accept="image/*" onChange={handleClubLogoChange} />
                        </label>
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h4 className="text-sm font-bold uppercase tracking-tight">Logo du Club</h4>
                        <p className="text-[10px] text-muted-foreground">S'affiche sur les rapports et le dashboard.</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom du Club</label>
                      <input 
                        type="text" 
                        value={clubData.name} 
                        onChange={(e) => setClubData({...clubData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Couleur Primaire</label>
                        <div className="flex gap-2">
                          <div className="h-10 w-10 rounded-xl border border-white/20" style={{ backgroundColor: clubData.primaryColor }} />
                          <input 
                            type="text" 
                            value={clubData.primaryColor} 
                            onChange={(e) => setClubData({...clubData, primaryColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Couleur Accent</label>
                        <div className="flex gap-2">
                          <div className="h-10 w-10 rounded-xl border border-white/20" style={{ backgroundColor: clubData.accentColor }} />
                          <input 
                            type="text" 
                            value={clubData.accentColor} 
                            onChange={(e) => setClubData({...clubData, accentColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={14} />} 
                        Appliquer
                      </button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <GlassCard className="p-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Bell size={20} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Préférences de Notification</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: "email", label: "Notifications par Email", desc: "Alertes de matchs et mises à jour de contrats" },
                      { id: "push", label: "Notifications Push", desc: "Résultats en direct et alertes médicales" },
                      { id: "sms", label: "Alertes SMS", desc: "Urgences et changements de planning de dernière minute" },
                    ].map((pref) => (
                      <div key={pref.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold uppercase tracking-tight">{pref.label}</p>
                          <p className="text-[10px] text-muted-foreground">{pref.desc}</p>
                        </div>
                        <div className="h-6 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center px-1 cursor-pointer">
                          <div className="h-4 w-4 rounded-full bg-primary shadow-lg" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button 
                      onClick={() => setSuccess("Préférences mises à jour !")}
                      className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                      Sauvegarder les préférences
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
