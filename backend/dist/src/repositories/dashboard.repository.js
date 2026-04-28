"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRepository = exports.DashboardRepository = void 0;
const prisma_1 = require("../lib/prisma");
class DashboardRepository {
    async getOverviewStats() {
        const [totalPlayers, injuredPlayers, nextMatch, recentMatches, topPerformers, totalRevenue, totalExpenses, revenueHistory] = await Promise.all([
            prisma_1.prisma.player.count(),
            prisma_1.prisma.player.count({ where: { status: "INJURED" } }),
            prisma_1.prisma.match.findFirst({
                where: { status: "SCHEDULED", date: { gte: new Date() } },
                orderBy: { date: "asc" },
                include: { homeTeam: true, awayTeam: true }
            }),
            prisma_1.prisma.match.findMany({
                where: { status: "COMPLETED" },
                orderBy: { date: "desc" },
                take: 5,
                include: { homeTeam: true, awayTeam: true }
            }),
            prisma_1.prisma.statistics.findMany({
                orderBy: { rating: "desc" },
                take: 3,
                include: { player: true }
            }),
            prisma_1.prisma.finance.aggregate({
                _sum: { amount: true },
                where: { type: "INCOME" }
            }),
            prisma_1.prisma.finance.aggregate({
                _sum: { amount: true },
                where: { type: "EXPENSE" }
            }),
            prisma_1.prisma.finance.findMany({
                where: {
                    type: "INCOME",
                    date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                },
                orderBy: { date: "asc" }
            })
        ]);
        return {
            totalPlayers,
            injuredPlayers,
            nextMatch,
            recentMatches,
            topPerformers,
            totalRevenue: totalRevenue._sum.amount || 0,
            totalExpenses: totalExpenses?._sum?.amount || 0,
            revenueHistory
        };
    }
}
exports.DashboardRepository = DashboardRepository;
exports.dashboardRepository = new DashboardRepository();
//# sourceMappingURL=dashboard.repository.js.map