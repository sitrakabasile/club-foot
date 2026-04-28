"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRepository = exports.TeamRepository = void 0;
const prisma_1 = require("../lib/prisma");
class TeamRepository {
    async findAll() {
        return prisma_1.prisma.team.findMany({
            orderBy: { name: "asc" },
        });
    }
    async create(name, category = "SENIOR") {
        return prisma_1.prisma.team.create({
            data: { name, category },
        });
    }
}
exports.TeamRepository = TeamRepository;
exports.teamRepository = new TeamRepository();
//# sourceMappingURL=team.repository.js.map