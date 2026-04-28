import { MedicalRecord } from "@prisma/client";
export declare class MedicalRepository {
    findAll(): Promise<MedicalRecord[]>;
    findByPlayerId(playerId: string): Promise<MedicalRecord[]>;
    create(data: {
        playerId: string;
        type: string;
        diagnosis: string;
        description?: string;
        severity?: string;
        dateOccurred: string;
        dateReturn?: string;
    }): Promise<MedicalRecord>;
    update(id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord>;
    delete(id: string): Promise<MedicalRecord>;
}
export declare const medicalRepository: MedicalRepository;
//# sourceMappingURL=medical.repository.d.ts.map