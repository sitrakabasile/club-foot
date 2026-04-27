import { playerRepository } from "../repositories/player.repository";

/**
 * PlayerService — Business logic for players.
 * Handles performance analysis, injury risk calculation, etc.
 */
export class PlayerService {
  
  async getSquad() {
    return playerRepository.findAll();
  }

  async getPlayerDetails(id: string) {
    const player = await playerRepository.findById(id);
    if (!player) throw new Error("Joueur non trouvé");
    
    // Add business logic: Calculate average rating from last matches
    const avgRating = (player as any).statistics?.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) / (player as any).statistics?.length || 0;
    
    return {
      ...player,
      avgRating: parseFloat(avgRating.toFixed(1)),
    };
  }

  async analyzeInjuryRisk(id: string) {
    const player = await playerRepository.findById(id);
    if (!player) throw new Error("Joueur non trouvé");
    
    // Logic to calculate injury risk based on medical history and training load
    const medicalCount = (player as any).medicalRecords?.length || 0;
    const risk = medicalCount > 3 ? "HIGH" : medicalCount > 1 ? "MEDIUM" : "LOW";
    
    return { playerId: id, riskLevel: risk };
  }

  async createPlayer(data: any) {
    return playerRepository.create(data);
  }

  async deletePlayer(id: string) {
    const player = await playerRepository.findById(id);
    if (!player) throw new Error("Joueur non trouvé");
    return playerRepository.delete(id);
  }
}

export const playerService = new PlayerService();
