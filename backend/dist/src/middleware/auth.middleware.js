"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
/**
 * AuthMiddleware — Middleware to protect routes and verify JWT.
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authentification requise" });
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "nextgen-football-hub-secret";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await user_repository_1.userRepository.findById(decoded.id);
        if (!user || !user.isActive) {
            return res.status(401).json({ error: "Utilisateur non trouvé ou inactif" });
        }
        // Attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
};
exports.authMiddleware = authMiddleware;
/**
 * roleMiddleware — Middleware to enforce Role-Based Access Control (RBAC).
 */
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: "Accès refusé : privilèges insuffisants" });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=auth.middleware.js.map