import { Router } from "express";
import { teamRepository } from "../repositories/team.repository";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const teams = await teamRepository.findAll();
    res.json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category } = req.body;
    const team = await teamRepository.create(name, category);
    res.status(201).json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
