"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchService = exports.MatchService = void 0;
const match_repository_1 = require("../repositories/match.repository");
class MatchService {
    async getAllMatches() {
        return match_repository_1.matchRepository.findAll();
    }
    async getMatchDetails(id) {
        return match_repository_1.matchRepository.findById(id);
    }
    async createMatch(data) {
        return match_repository_1.matchRepository.create(data);
    }
    async updateMatch(id, data) {
        return match_repository_1.matchRepository.update(id, data);
    }
    async deleteMatch(id) {
        return match_repository_1.matchRepository.delete(id);
    }
}
exports.MatchService = MatchService;
exports.matchService = new MatchService();
//# sourceMappingURL=match.service.js.map