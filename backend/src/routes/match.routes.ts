import { Router } from "express";
import { matchController } from "../controllers/match.controller";

const router = Router();

router.get("/", (req, res) => matchController.getAll(req, res));
router.get("/:id", (req, res) => matchController.getOne(req, res));
router.post("/create", (req, res) => matchController.create(req, res));
router.put("/:id", (req, res) => matchController.update(req, res));
router.delete("/:id", (req, res) => matchController.delete(req, res));

export default router;
