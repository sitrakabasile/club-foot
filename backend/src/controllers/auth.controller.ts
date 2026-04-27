import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.schema";

/**
 * AuthController — Delivery layer for authentication.
 * Handles HTTP requests, input validation, and responses.
 */
export class AuthController {
  
  async register(req: Request, res: Response) {
    try {
      // Validate input
      const validatedData = registerSchema.parse(req.body);
      
      const result = await authService.register(validatedData);
      
      return res.status(201).json({
        message: "Utilisateur créé avec succès",
        ...result,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Validation échouée", details: error.errors });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Validate input
      const validatedData = loginSchema.parse(req.body);
      
      const result = await authService.login(validatedData);
      
      return res.status(200).json({
        message: "Connexion réussie",
        ...result,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Validation échouée", details: error.errors });
      }
      return res.status(401).json({ error: error.message });
    }
  }

  async me(req: Request, res: Response) {
    // This would be called after authMiddleware
    const user = (req as any).user;
    return res.status(200).json({ user });
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const updatedUser = await authService.updateProfile(user.id, req.body);
      return res.status(200).json({ user: updatedUser });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const result = await authService.changePassword(user.id, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      return res.status(200).json(result);
    } catch (error: any) {
      // We often return 200 even if user not found for security, 
      // but here we follow the service logic.
      return res.status(200).json({ message: error.message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const result = await authService.resetPassword(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
