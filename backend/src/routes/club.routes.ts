import { Router } from "express";
import { clubController } from "../controllers/club.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/settings", (req, res) => clubController.getSettings(req, res));
router.put("/settings", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => clubController.updateSettings(req, res));

export default router;
