"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubController = exports.ClubController = void 0;
const club_service_1 = require("../services/club.service");
class ClubController {
    async getSettings(req, res) {
        try {
            const settings = await club_service_1.clubService.getSettings();
            return res.json(settings);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateSettings(req, res) {
        try {
            const settings = await club_service_1.clubService.updateSettings(req.body);
            return res.json(settings);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ClubController = ClubController;
exports.clubController = new ClubController();
//# sourceMappingURL=club.controller.js.map