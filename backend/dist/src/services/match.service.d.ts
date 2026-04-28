export declare class MatchService {
    getAllMatches(): Promise<{
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
    }[]>;
    getMatchDetails(id: string): Promise<{
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
    } | null>;
    createMatch(data: any): Promise<{
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
    }>;
    updateMatch(id: string, data: any): Promise<{
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
    }>;
    deleteMatch(id: string): Promise<{
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
    }>;
}
export declare const matchService: MatchService;
//# sourceMappingURL=match.service.d.ts.map