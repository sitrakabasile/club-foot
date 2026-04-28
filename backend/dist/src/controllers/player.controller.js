"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerController = exports.PlayerController = void 0;
const player_service_1 = require("../services/player.service");
/**
 * PlayerController — HTTP delivery layer for player data.
 */
class PlayerController {
    async getAll(req, res) {
        try {
            const players = await player_service_1.playerService.getSquad();
            return res.status(200).json(players);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const player = await player_service_1.playerService.getPlayerDetails(id);
            return res.status(200).json(player);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async getRisk(req, res) {
        try {
            const { id } = req.params;
            const risk = await player_service_1.playerService.analyzeInjuryRisk(id);
            return res.status(200).json({ playerId: id, riskLevel: risk });
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const player = await player_service_1.playerService.createPlayer(req.body);
            return res.status(201).json(player);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await player_service_1.playerService.deletePlayer(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.PlayerController = PlayerController;
exports.playerController = new PlayerController();
//# sourceMappingURL=player.controller.js.map