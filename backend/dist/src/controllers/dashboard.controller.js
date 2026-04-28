"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.DashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
class DashboardController {
    async getStats(req, res) {
        try {
            const data = await dashboard_service_1.dashboardService.getDashboardData();
            return res.json(data);
        }
        catch (error) {
            console.error("Dashboard Stats Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.DashboardController = DashboardController;
exports.dashboardController = new DashboardController();
//# sourceMappingURL=dashboard.controller.js.map