"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRepository = exports.ContractRepository = void 0;
const prisma_1 = require("../lib/prisma");
class ContractRepository {
    async findAll() {
        return prisma_1.prisma.contract.findMany({
            include: {
                player: true,
            },
            orderBy: {
                endDate: "asc",
            },
        });
    }
    async findById(id) {
        return prisma_1.prisma.contract.findUnique({
            where: { id },
            include: {
                player: true,
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.contract.create({
            data: {
                ...data,
                status: data.status || "ACTIVE",
                type: data.type || "PLAYER",
            },
            include: {
                player: true,
            },
        });
    }
    async update(id, data) {
        return prisma_1.prisma.contract.update({
            where: { id },
            data,
            include: {
                player: true,
            },
        });
    }
    async delete(id) {
        return prisma_1.prisma.contract.delete({
            where: { id },
        });
    }
}
exports.ContractRepository = ContractRepository;
exports.contractRepository = new ContractRepository();
//# sourceMappingURL=contract.repository.js.map