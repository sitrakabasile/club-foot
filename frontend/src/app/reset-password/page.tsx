"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { Lock, ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/constants";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="font-heading text-xl font-bold uppercase mb-4">Jeton Manquant</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Le lien de réinitialisation est invalide ou expiré.
        </p>
        <Link href="/forgot-password" className="text-primary hover:underline font-bold text-xs uppercase tracking-widest">
          Demander un nouveau lien
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isSuccess ? (
        <>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">
              Nouveau <span className="text-gradient-blue">Mot de Passe</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Créez un mot de passe sécurisé pour votre compte.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 mt-4"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Réinitialiser
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border border-success/20 mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h2 className="font-heading text-2xl font-bold uppercase mb-4">Réussi !</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Votre mot de passe a été mis à jour. Vous allez être redirigé vers la page de connexion.
          </p>
        </div>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 md:p-10">
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </GlassCard>
      </motion.div>
    </div>
  );
}
