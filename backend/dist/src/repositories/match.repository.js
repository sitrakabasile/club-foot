"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRepository = exports.MatchRepository = void 0;
const prisma_1 = require("../lib/prisma");
class MatchRepository {
    async findAll() {
        return prisma_1.prisma.match.findMany({
            include: {
                homeTeam: true,
                awayTeam: true,
            },
            orderBy: { date: "asc" },
        });
    }
    async findById(id) {
        return prisma_1.prisma.match.findUnique({
            where: { id },
            include: {
                homeTeam: true,
                awayTeam: true,
                statistics: true,
            },
        });
    }
    async create(data) {
        return prisma_1.prisma.match.create({
            data: {
                date: new Date(data.date),
                venue: data.venue,
                competition: data.competition,
                status: data.status || "SCHEDULED",
                scoreHome: data.scoreHome || 0,
                scoreAway: data.scoreAway || 0,
                homeTeamId: data.homeTeamId,
                awayTeamId: data.awayTeamId,
                attendance: data.attendance ? parseInt(data.attendance) : null,
                referee: data.referee,
                notes: data.notes,
            },
            include: {
                homeTeam: true,
                awayTeam: true,
            }
        });
    }
    async update(id, data) {
        return prisma_1.prisma.match.update({
            where: { id },
            data: {
                date: data.date ? new Date(data.date) : undefined,
                venue: data.venue,
                competition: data.competition,
                status: data.status,
                scoreHome: data.scoreHome,
                scoreAway: data.scoreAway,
                attendance: data.attendance ? parseInt(data.attendance) : undefined,
                referee: data.referee,
                notes: data.notes,
            },
        });
    }
    async delete(id) {
        return prisma_1.prisma.match.delete({
            where: { id },
        });
    }
}
exports.MatchRepository = MatchRepository;
exports.matchRepository = new MatchRepository();
//# sourceMappingURL=match.repository.js.map