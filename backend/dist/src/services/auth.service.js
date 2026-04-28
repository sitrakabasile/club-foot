"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
/**
 * AuthService — Business logic layer for authentication.
 * Handles password hashing, token generation, and credential validation.
 */
class AuthService {
    secret;
    constructor() {
        this.secret = process.env.JWT_SECRET || "nextgen-football-hub-secret";
    }
    /**
     * Register a new user with hashed password.
     */
    async register(data) {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Cet email est déjà utilisé.");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        const user = await user_repository_1.userRepository.create({
            ...data,
            password: hashedPassword,
        });
        const token = this.generateToken(user);
        return { user: this.sanitizeUser(user), token };
    }
    /**
     * Login user and validate credentials.
     */
    async login(credentials) {
        const user = await user_repository_1.userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new Error("Identifiants invalides.");
        }
        const isMatch = await bcryptjs_1.default.compare(credentials.password, user.password);
        if (!isMatch) {
            throw new Error("Identifiants invalides.");
        }
        const token = this.generateToken(user);
        return { user: this.sanitizeUser(user), token };
    }
    /**
     * Update user profile (name, email).
     */
    async updateProfile(userId, data) {
        const user = await user_repository_1.userRepository.update(userId, {
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
    async changePassword(userId, data) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user)
            throw new Error("Utilisateur non trouvé");
        const isMatch = await bcryptjs_1.default.compare(data.currentPassword, user.password);
        if (!isMatch)
            throw new Error("Le mot de passe actuel est incorrect");
        const hashedPassword = await bcryptjs_1.default.hash(data.newPassword, 12);
        await user_repository_1.userRepository.update(userId, { password: hashedPassword });
        return { message: "Mot de passe mis à jour avec succès" };
    }
    /**
     * Request password reset token.
     */
    async forgotPassword(email) {
        const user = await user_repository_1.userRepository.findByEmail(email);
        if (!user)
            throw new Error("Si cet email existe, un lien de réinitialisation sera envoyé.");
        // Generate a simple 6-digit token for demo or a hex string
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1); // 1 hour validity
        await user_repository_1.userRepository.update(user.id, {
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
    async resetPassword(data) {
        const user = await user_repository_1.userRepository.findByResetToken(data.token);
        if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            throw new Error("Le jeton de réinitialisation est invalide ou a expiré.");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 12);
        await user_repository_1.userRepository.update(user.id, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        });
        return { message: "Votre mot de passe a été réinitialisé avec succès." };
    }
    /**
     * Generate a signed JWT token.
     */
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, this.secret, { expiresIn: "7d" });
    }
    /**
     * Remove sensitive data from user object.
     */
    sanitizeUser(user) {
        const { password, twoFactorSecret, ...sanitized } = user;
        return sanitized;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map