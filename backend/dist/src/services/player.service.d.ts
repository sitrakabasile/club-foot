/**
 * PlayerService — Business logic for players.
 * Handles performance analysis, injury risk calculation, etc.
 */
export declare class PlayerService {
    getSquad(): Promise<{
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
    }[]>;
    getPlayerDetails(id: string): Promise<{
        avgRating: number;
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
    }>;
    analyzeInjuryRisk(id: string): Promise<{
        playerId: string;
        riskLevel: string;
    }>;
    createPlayer(data: any): Promise<{
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
    }>;
    deletePlayer(id: string): Promise<{
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
    }>;
}
export declare const playerService: PlayerService;
//# sourceMappingURL=player.service.d.ts.map