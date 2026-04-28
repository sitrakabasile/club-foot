import { Player } from "@prisma/client";
/**
 * PlayerRepository — Data access layer for Players.
 */
export declare class PlayerRepository {
    private prisma;
    constructor();
    findAll(): Promise<Player[]>;
    findById(id: string): Promise<Player | null>;
    create(data: any): Promise<Player>;
    update(id: string, data: any): Promise<Player>;
    delete(id: string): Promise<Player>;
}
export declare const playerRepository: PlayerRepository;
//# sourceMappingURL=player.repository.d.ts.map