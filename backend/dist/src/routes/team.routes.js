"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_repository_1 = require("../repositories/team.repository");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const teams = await team_repository_1.teamRepository.findAll();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const { name, category } = req.body;
        const team = await team_repository_1.teamRepository.create(name, category);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=team.routes.js.map