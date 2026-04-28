"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerService = exports.PlayerService = void 0;
const player_repository_1 = require("../repositories/player.repository");
/**
 * PlayerService — Business logic for players.
 * Handles performance analysis, injury risk calculation, etc.
 */
class PlayerService {
    async getSquad() {
        return player_repository_1.playerRepository.findAll();
    }
    async getPlayerDetails(id) {
        const player = await player_repository_1.playerRepository.findById(id);
        if (!player)
            throw new Error("Joueur non trouvé");
        // Add business logic: Calculate average rating from last matches
        const avgRating = player.statistics?.reduce((acc, curr) => acc + (curr.rating || 0), 0) / player.statistics?.length || 0;
        return {
            ...player,
            avgRating: parseFloat(avgRating.toFixed(1)),
        };
    }
    async analyzeInjuryRisk(id) {
        const player = await player_repository_1.playerRepository.findById(id);
        if (!player)
            throw new Error("Joueur non trouvé");
        // Logic to calculate injury risk based on medical history and training load
        const medicalCount = player.medicalRecords?.length || 0;
        const risk = medicalCount > 3 ? "HIGH" : medicalCount > 1 ? "MEDIUM" : "LOW";
        return { playerId: id, riskLevel: risk };
    }
    async createPlayer(data) {
        return player_repository_1.playerRepository.create(data);
    }
    async deletePlayer(id) {
        const player = await player_repository_1.playerRepository.findById(id);
        if (!player)
            throw new Error("Joueur non trouvé");
        return player_repository_1.playerRepository.delete(id);
    }
}
exports.PlayerService = PlayerService;
exports.playerService = new PlayerService();
//# sourceMappingURL=player.service.js.map