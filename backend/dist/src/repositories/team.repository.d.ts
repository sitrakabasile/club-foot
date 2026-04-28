import { Team } from "@prisma/client";
export declare class TeamRepository {
    findAll(): Promise<Team[]>;
    create(name: string, category?: string): Promise<Team>;
}
export declare const teamRepository: TeamRepository;
//# sourceMappingURL=team.repository.d.ts.map