export declare class ContractRepository {
    findAll(): Promise<({
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
        updatedAt: Date;
        type: string;
        status: string;
        notes: string | null;
        salary: number;
        bonuses: number | null;
        releaseClause: number | null;
        startDate: Date;
        endDate: Date;
        playerId: string;
    })[]>;
    findById(id: string): Promise<({
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
        updatedAt: Date;
        type: string;
        status: string;
        notes: string | null;
        salary: number;
        bonuses: number | null;
        releaseClause: number | null;
        startDate: Date;
        endDate: Date;
        playerId: string;
    }) | null>;
    create(data: {
        playerId: string;
        salary: number;
        startDate: Date;
        endDate: Date;
        status?: string;
        type?: string;
        notes?: string;
    }): Promise<{
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
        updatedAt: Date;
        type: string;
        status: string;
        notes: string | null;
        salary: number;
        bonuses: number | null;
        releaseClause: number | null;
        startDate: Date;
        endDate: Date;
        playerId: string;
    }>;
    update(id: string, data: any): Promise<{
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
        updatedAt: Date;
        type: string;
        status: string;
        notes: string | null;
        salary: number;
        bonuses: number | null;
        releaseClause: number | null;
        startDate: Date;
        endDate: Date;
        playerId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        status: string;
        notes: string | null;
        salary: number;
        bonuses: number | null;
        releaseClause: number | null;
        startDate: Date;
        endDate: Date;
        playerId: string;
    }>;
}
export declare const contractRepository: ContractRepository;
//# sourceMappingURL=contract.repository.d.ts.map