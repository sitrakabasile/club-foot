"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalRepository = exports.MedicalRepository = void 0;
const prisma_1 = require("../lib/prisma");
class MedicalRepository {
    async findAll() {
        return prisma_1.prisma.medicalRecord.findMany({
            include: {
                player: true,
            },
            orderBy: {
                dateOccurred: "desc",
            },
        });
    }
    async findByPlayerId(playerId) {
        return prisma_1.prisma.medicalRecord.findMany({
            where: { playerId },
            orderBy: { dateOccurred: "desc" },
        });
    }
    async create(data) {
        return prisma_1.prisma.medicalRecord.create({
            data: {
                playerId: data.playerId,
                type: data.type,
                diagnosis: data.diagnosis,
                description: data.description,
                severity: data.severity,
                dateOccurred: new Date(data.dateOccurred),
                dateReturn: data.dateReturn ? new Date(data.dateReturn) : null,
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.medicalRecord.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma_1.prisma.medicalRecord.delete({
            where: { id },
        });
    }
}
exports.MedicalRepository = MedicalRepository;
exports.medicalRepository = new MedicalRepository();
//# sourceMappingURL=medical.repository.js.map