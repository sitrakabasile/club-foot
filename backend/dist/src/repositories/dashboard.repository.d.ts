export declare class DashboardRepository {
    getOverviewStats(): Promise<{
        totalPlayers: number;
        injuredPlayers: number;
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
        recentMatches: ({
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
        })[];
        topPerformers: ({
            player: {
                number: number;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: string;
                position: string;
                height: number | null;
                weight: number | null;
                foot: string | null;
                nationality: string | null;
                marketValue: number | null;
                trainingLoad: number;
                joinedAt: Date;
                teamId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            playerId: string;
            matchId: string;
            goals: number;
            assists: number;
            minutesPlayed: number;
            yellowCards: number;
            redCards: number;
            saves: number;
            passAccuracy: number | null;
            distance: number | null;
            rating: number | null;
        })[];
        totalRevenue: number;
        totalExpenses: number;
        revenueHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            date: Date;
            category: string | null;
            userId: string | null;
            amount: number;
            label: string;
            contractId: string | null;
        }[];
    }>;
}
export declare const dashboardRepository: DashboardRepository;
//# sourceMappingURL=dashboard.repository.d.ts.map