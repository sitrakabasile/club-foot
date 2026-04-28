import { Request, Response } from "express";
import { playerService } from "../services/player.service";

/**
 * PlayerController — HTTP delivery layer for player data.
 */
export class PlayerController {
  
  async getAll(req: Request, res: Response) {
    try {
      const players = await playerService.getSquad();
      return res.status(200).json(players);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const player = await playerService.getPlayerDetails(id as string);
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async getRisk(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const risk = await playerService.analyzeInjuryRisk(id as string);
      return res.status(200).json({ playerId: id, riskLevel: risk });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const player = await playerService.createPlayer(req.body);
      return res.status(201).json(player);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await playerService.deletePlayer(id as string);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const playerController = new PlayerController();
