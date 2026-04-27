import { Router } from "express";
import { medicalRepository } from "../repositories/medical.repository";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const records = await medicalRepository.findAll();
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const record = await medicalRepository.create(req.body);
    res.status(201).json(record);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await medicalRepository.delete(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
