import { Router } from "express";
import { contractController } from "../controllers/contract.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Routes (Temporarily public for testing)
router.get("/", (req, res) => contractController.getAll(req, res));
router.get("/:id", (req, res) => contractController.getOne(req, res));
router.post("/", (req, res) => contractController.create(req, res));
router.put("/:id", (req, res) => contractController.update(req, res));
router.delete("/:id", (req, res) => contractController.delete(req, res));

export default router;
