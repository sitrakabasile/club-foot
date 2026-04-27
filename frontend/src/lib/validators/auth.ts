import { z } from "zod";

/**
 * Shared Zod schemas for frontend validation.
 * Must match backend schemas for consistency.
 */

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
  firstName: z.string().min(2, "Prénom trop court"),
  lastName: z.string().min(2, "Nom trop court"),
  role: z.enum(["FAN", "PLAYER", "STAFF", "MEDICAL", "ADMIN"]).default("FAN"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
