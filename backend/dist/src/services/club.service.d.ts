export declare class ClubService {
    getSettings(): Promise<{
        name: string;
        id: string;
        updatedAt: Date;
        logo: string | null;
        primaryColor: string;
        accentColor: string;
    }>;
    updateSettings(data: any): Promise<{
        name: string;
        id: string;
        updatedAt: Date;
        logo: string | null;
        primaryColor: string;
        accentColor: string;
    }>;
}
export declare const clubService: ClubService;
//# sourceMappingURL=club.service.d.ts.map