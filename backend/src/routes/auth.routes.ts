import { Router } from "express";
import { authController } from "../controllers/auth.controller";

/**
 * AuthRoutes — Authentication endpoints.
 */

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgot-password", (req, res) => authController.forgotPassword(req, res));
router.post("/reset-password", (req, res) => authController.resetPassword(req, res));
router.get("/test", (req, res) => res.json({ message: "auth router working" }));

// Protected routes
router.get("/me", authMiddleware, (req, res) => {
  console.log("GET /me hit for user:", (req as any).user?.id);
  return authController.me(req, res);
});
router.put("/profile", authMiddleware, (req, res) => authController.updateProfile(req, res));
router.put("/password", authMiddleware, (req, res) => authController.changePassword(req, res));

export default router;
