"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medical_repository_1 = require("../repositories/medical.repository");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const records = await medical_repository_1.medicalRepository.findAll();
        res.json(records);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const record = await medical_repository_1.medicalRepository.create(req.body);
        res.status(201).json(record);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await medical_repository_1.medicalRepository.delete(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=medical.routes.js.map