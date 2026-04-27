import { matchRepository } from "../repositories/match.repository";

export class MatchService {
  async getAllMatches() {
    return matchRepository.findAll();
  }

  async getMatchDetails(id: string) {
    return matchRepository.findById(id);
  }

  async createMatch(data: any) {
    return matchRepository.create(data);
  }

  async updateMatch(id: string, data: any) {
    return matchRepository.update(id, data);
  }

  async deleteMatch(id: string) {
    return matchRepository.delete(id);
  }
}

export const matchService = new MatchService();
