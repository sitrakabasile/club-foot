import { Router } from "express";
import { playerController } from "../controllers/player.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Publicly accessible for now (can be restricted later)
router.get("/", (req, res) => playerController.getAll(req, res));
router.post("/create", (req, res) => {
  return playerController.create(req, res);
});
router.get("/:id", (req, res) => playerController.getOne(req, res));
router.delete("/:id", (req, res) => {
  return playerController.delete(req, res);
});

// Restricted to medical and coach staff
router.get("/:id/risk", 
  authMiddleware, 
  roleMiddleware(["MEDICAL", "COACH", "ADMIN"]), 
  (req, res) => playerController.getRisk(req, res)
);

export default router;
