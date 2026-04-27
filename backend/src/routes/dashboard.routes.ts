import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Protected dashboard stats
router.get("/stats", authMiddleware, (req, res) => dashboardController.getStats(req, res));

export default router;
