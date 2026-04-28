import { Match } from "@prisma/client";
export declare class MatchRepository {
    findAll(): Promise<Match[]>;
    findById(id: string): Promise<Match | null>;
    create(data: any): Promise<Match>;
    update(id: string, data: any): Promise<Match>;
    delete(id: string): Promise<Match>;
}
export declare const matchRepository: MatchRepository;
//# sourceMappingURL=match.repository.d.ts.map