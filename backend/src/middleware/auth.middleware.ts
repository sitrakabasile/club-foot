import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";

/**
 * AuthMiddleware — Middleware to protect routes and verify JWT.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentification requise" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "nextgen-football-hub-secret";

    const decoded = jwt.verify(token, secret) as { id: string; role: string };
    
    const user = await userRepository.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Utilisateur non trouvé ou inactif" });
    }

    // Attach user to request
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

/**
 * roleMiddleware — Middleware to enforce Role-Based Access Control (RBAC).
 */
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Accès refusé : privilèges insuffisants" });
    }
    next();
  };
};
