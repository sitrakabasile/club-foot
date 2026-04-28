"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRepository = exports.PlayerRepository = void 0;
const prisma_1 = require("../lib/prisma");
/**
 * PlayerRepository — Data access layer for Players.
 */
class PlayerRepository {
    prisma;
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async findAll() {
        return this.prisma.player.findMany({
            include: {
                team: true,
                statistics: {
                    take: 5,
                    orderBy: { createdAt: "desc" },
                },
            },
        });
    }
    async findById(id) {
        return this.prisma.player.findUnique({
            where: { id },
            include: {
                team: true,
                statistics: true,
                medicalRecords: true,
                contracts: true,
            },
        });
    }
    async create(data) {
        return this.prisma.player.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.player.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.player.delete({
            where: { id },
        });
    }
}
exports.PlayerRepository = PlayerRepository;
exports.playerRepository = new PlayerRepository();
//# sourceMappingURL=player.repository.js.map