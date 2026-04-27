import { prisma } from "../lib/prisma";

export class DashboardRepository {
  async getOverviewStats() {
    const [
      totalPlayers,
      injuredPlayers,
      nextMatch,
      recentMatches,
      topPerformers,
      totalRevenue,
      totalExpenses,
      revenueHistory
    ] = await Promise.all([
      prisma.player.count(),
      prisma.player.count({ where: { status: "INJURED" } }),
      prisma.match.findFirst({
        where: { status: "SCHEDULED", date: { gte: new Date() } },
        orderBy: { date: "asc" },
        include: { homeTeam: true, awayTeam: true }
      }),
      prisma.match.findMany({
        where: { status: "COMPLETED" },
        orderBy: { date: "desc" },
        take: 5,
        include: { homeTeam: true, awayTeam: true }
      }),
      prisma.statistics.findMany({
        orderBy: { rating: "desc" },
        take: 3,
        include: { player: true }
      }),
      prisma.finance.aggregate({
        _sum: { amount: true },
        where: { type: "INCOME" }
      }),
      prisma.finance.aggregate({
        _sum: { amount: true },
        where: { type: "EXPENSE" }
      }),
      prisma.finance.findMany({
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

export const dashboardRepository = new DashboardRepository();
