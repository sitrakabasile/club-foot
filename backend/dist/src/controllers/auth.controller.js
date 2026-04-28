"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_schema_1 = require("../validators/auth.schema");
/**
 * AuthController — Delivery layer for authentication.
 * Handles HTTP requests, input validation, and responses.
 */
class AuthController {
    async register(req, res) {
        try {
            // Validate input
            const validatedData = auth_schema_1.registerSchema.parse(req.body);
            const result = await auth_service_1.authService.register(validatedData);
            return res.status(201).json({
                message: "Utilisateur créé avec succès",
                ...result,
            });
        }
        catch (error) {
            if (error.name === "ZodError") {
                return res.status(400).json({ error: "Validation échouée", details: error.errors });
            }
            return res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            // Validate input
            const validatedData = auth_schema_1.loginSchema.parse(req.body);
            const result = await auth_service_1.authService.login(validatedData);
            return res.status(200).json({
                message: "Connexion réussie",
                ...result,
            });
        }
        catch (error) {
            if (error.name === "ZodError") {
                return res.status(400).json({ error: "Validation échouée", details: error.errors });
            }
            return res.status(401).json({ error: error.message });
        }
    }
    async me(req, res) {
        // This would be called after authMiddleware
        const user = req.user;
        return res.status(200).json({ user });
    }
    async updateProfile(req, res) {
        try {
            const user = req.user;
            const updatedUser = await auth_service_1.authService.updateProfile(user.id, req.body);
            return res.status(200).json({ user: updatedUser });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async changePassword(req, res) {
        try {
            const user = req.user;
            const result = await auth_service_1.authService.changePassword(user.id, req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await auth_service_1.authService.forgotPassword(email);
            return res.status(200).json(result);
        }
        catch (error) {
            // We often return 200 even if user not found for security, 
            // but here we follow the service logic.
            return res.status(200).json({ message: error.message });
        }
    }
    async resetPassword(req, res) {
        try {
            const result = await auth_service_1.authService.resetPassword(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map