"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const dashboard_repository_1 = require("../repositories/dashboard.repository");
class DashboardService {
    async getDashboardData() {
        const rawStats = await dashboard_repository_1.dashboardRepository.getOverviewStats();
        // Transform data for frontend charts/widgets if needed
        return {
            overview: {
                totalPlayers: rawStats.totalPlayers,
                healthRate: rawStats.totalPlayers > 0
                    ? Math.round(((rawStats.totalPlayers - rawStats.injuredPlayers) / rawStats.totalPlayers) * 100)
                    : 100,
                injuredCount: rawStats.injuredPlayers,
            },
            nextMatch: rawStats.nextMatch,
            recentMatches: rawStats.recentMatches.map(m => ({
                id: m.id,
                opponent: m.homeTeam.name === "Équipe Première" ? m.awayTeam.name : m.homeTeam.name,
                score: `${m.scoreHome} - ${m.scoreAway}`,
                date: m.date,
                result: (m.scoreHome > m.scoreAway && m.homeTeam.name === "Équipe Première") ||
                    (m.scoreAway > m.scoreHome && m.awayTeam.name === "Équipe Première") ? "WIN" : "LOSS"
            })),
            topPlayers: rawStats.topPerformers.map(s => ({
                name: s.player.name,
                goals: s.goals,
                rating: s.rating
            })),
            finances: {
                totalRevenue: rawStats.totalRevenue,
                totalExpenses: rawStats.totalExpenses,
                balance: rawStats.totalRevenue - rawStats.totalExpenses,
                trend: rawStats.totalRevenue > rawStats.totalExpenses ? "+5.8%" : "-2.1%",
                history: formatRevenueHistory(rawStats.revenueHistory)
            }
        };
    }
}
exports.DashboardService = DashboardService;
function formatRevenueHistory(history) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            day: days[d.getDay()],
            fullDate: d.toISOString().split('T')[0],
            value: 0
        };
    });
    history.forEach(h => {
        const dateStr = new Date(h.date).toISOString().split('T')[0];
        const dayEntry = last7Days.find(d => d.fullDate === dateStr);
        if (dayEntry)
            dayEntry.value += h.amount;
    });
    return last7Days.map(d => ({ name: d.day, value: d.value }));
}
exports.dashboardService = new DashboardService();
//# sourceMappingURL=dashboard.service.js.map