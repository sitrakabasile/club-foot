import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";

export class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const data = await dashboardService.getDashboardData();
      return res.json(data);
    } catch (error: any) {
      console.error("Dashboard Stats Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export const dashboardController = new DashboardController();
