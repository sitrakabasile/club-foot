"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchController = exports.MatchController = void 0;
const match_service_1 = require("../services/match.service");
class MatchController {
    async getAll(req, res) {
        try {
            const matches = await match_service_1.matchService.getAllMatches();
            return res.status(200).json(matches);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const match = await match_service_1.matchService.getMatchDetails(id);
            return res.status(200).json(match);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const match = await match_service_1.matchService.createMatch(req.body);
            return res.status(201).json(match);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const match = await match_service_1.matchService.updateMatch(id, req.body);
            return res.status(200).json(match);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await match_service_1.matchService.deleteMatch(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.MatchController = MatchController;
exports.matchController = new MatchController();
//# sourceMappingURL=match.controller.js.map