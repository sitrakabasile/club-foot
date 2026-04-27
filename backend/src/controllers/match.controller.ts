import { Request, Response } from "express";
import { matchService } from "../services/match.service";

export class MatchController {
  async getAll(req: Request, res: Response) {
    try {
      const matches = await matchService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const match = await matchService.getMatchDetails(id as string);
      return res.status(200).json(match);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const match = await matchService.createMatch(req.body);
      return res.status(201).json(match);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const match = await matchService.updateMatch(id, req.body);
      return res.status(200).json(match);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await matchService.deleteMatch(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const matchController = new MatchController();
