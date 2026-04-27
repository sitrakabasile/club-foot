import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";

/**
 * AuthService — Business logic layer for authentication.
 * Handles password hashing, token generation, and credential validation.
 */
export class AuthService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "nextgen-football-hub-secret";
  }

  /**
   * Register a new user with hashed password.
   */
  async register(data: any) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  /**
   * Login user and validate credentials.
   */
  async login(credentials: any) {
    const user = await userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Identifiants invalides.");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new Error("Identifiants invalides.");
    }

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  /**
   * Update user profile (name, email).
   */
  async updateProfile(userId: string, data: any) {
    const user = await userRepository.update(userId, {
      email: data.email,
      profile: {
        upsert: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            photo: data.photo,
          },
          update: {
            firstName: data.firstName,
            lastName: data.lastName,
            photo: data.photo,
          }
        }
      }
    });
    return this.sanitizeUser(user);
  }

  /**
   * Change user password.
   */
  async changePassword(userId: string, data: any) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Utilisateur non trouvé");

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) throw new Error("Le mot de passe actuel est incorrect");

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);
    await userRepository.update(userId, { password: hashedPassword });
    
    return { message: "Mot de passe mis à jour avec succès" };
  }

  /**
   * Request password reset token.
   */
  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Si cet email existe, un lien de réinitialisation sera envoyé.");

    // Generate a simple 6-digit token for demo or a hex string
    const token = crypto.randomBytes(20).toString("hex");
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1); // 1 hour validity

    await userRepository.update(user.id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });

    // MOCK: In production, send email here. 
    // In development, log the token to the console.
    console.log(`[AUTH] Password reset requested for ${email}. Token: ${token}`);
    
    return { message: "Si cet email existe, un lien de réinitialisation sera envoyé." };
  }

  /**
   * Reset password using token.
   */
  async resetPassword(data: any) {
    const user = await userRepository.findByResetToken(data.token);
    
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new Error("Le jeton de réinitialisation est invalide ou a expiré.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    await userRepository.update(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return { message: "Votre mot de passe a été réinitialisé avec succès." };
  }

  /**
   * Generate a signed JWT token.
   */
  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, role: user.role },
      this.secret,
      { expiresIn: "7d" }
    );
  }

  /**
   * Remove sensitive data from user object.
   */
  private sanitizeUser(user: any) {
    const { password, twoFactorSecret, ...sanitized } = user;
    return sanitized;
  }
}

export const authService = new AuthService();
