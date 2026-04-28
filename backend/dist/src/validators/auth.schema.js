"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schemas for strict input validation.
 */
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email invalide"),
    password: zod_1.z.string().min(8, "Le mot de passe doit faire au moins 8 caractères"),
    firstName: zod_1.z.string().min(2, "Prénom trop court"),
    lastName: zod_1.z.string().min(2, "Nom trop court"),
    role: zod_1.z.enum(["FAN", "PLAYER", "STAFF", "MEDICAL", "ADMIN"]).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email invalide"),
    password: zod_1.z.string().min(1, "Mot de passe requis"),
});
//# sourceMappingURL=auth.schema.js.map