export declare class ContractService {
    getAllContracts(): Promise<({
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
    getContractById(id: string): Promise<{
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
    createContract(data: any): Promise<{
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
    updateContract(id: string, data: any): Promise<{
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
    deleteContract(id: string): Promise<{
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
export declare const contractService: ContractService;
//# sourceMappingURL=contract.service.d.ts.map