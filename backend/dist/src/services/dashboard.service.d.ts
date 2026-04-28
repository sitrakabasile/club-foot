export declare class DashboardService {
    getDashboardData(): Promise<{
        overview: {
            totalPlayers: number;
            healthRate: number;
            injuredCount: number;
        };
        nextMatch: ({
            homeTeam: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                category: string;
                logo: string | null;
            };
            awayTeam: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                category: string;
                logo: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            date: Date;
            venue: string;
            competition: string | null;
            scoreHome: number;
            scoreAway: number;
            attendance: number | null;
            referee: string | null;
            notes: string | null;
            homeTeamId: string;
            awayTeamId: string;
        }) | null;
        recentMatches: {
            id: string;
            opponent: string;
            score: string;
            date: Date;
            result: string;
        }[];
        topPlayers: {
            name: string;
            goals: number;
            rating: number | null;
        }[];
        finances: {
            totalRevenue: number;
            totalExpenses: number;
            balance: number;
            trend: string;
            history: {
                name: string;
                value: number;
            }[];
        };
    }>;
}
export declare const dashboardService: DashboardService;
//# sourceMappingURL=dashboard.service.d.ts.map