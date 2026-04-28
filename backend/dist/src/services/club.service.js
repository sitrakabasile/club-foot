"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubService = exports.ClubService = void 0;
const prisma_1 = require("../lib/prisma");
class ClubService {
    async getSettings() {
        let settings = await prisma_1.prisma.clubSettings.findUnique({
            where: { id: "default" }
        });
        if (!settings) {
            settings = await prisma_1.prisma.clubSettings.create({
                data: { id: "default" }
            });
        }
        return settings;
    }
    async updateSettings(data) {
        const { name, primaryColor, accentColor, logo } = data;
        return prisma_1.prisma.clubSettings.upsert({
            where: { id: "default" },
            update: { name, primaryColor, accentColor, logo },
            create: { id: "default", name, primaryColor, accentColor, logo }
        });
    }
}
exports.ClubService = ClubService;
exports.clubService = new ClubService();
//# sourceMappingURL=club.service.js.map