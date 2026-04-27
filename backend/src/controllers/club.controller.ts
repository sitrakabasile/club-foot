import { Request, Response } from "express";
import { clubService } from "../services/club.service";

export class ClubController {
  async getSettings(req: Request, res: Response) {
    try {
      const settings = await clubService.getSettings();
      return res.json(settings);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const settings = await clubService.updateSettings(req.body);
      return res.json(settings);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const clubController = new ClubController();
