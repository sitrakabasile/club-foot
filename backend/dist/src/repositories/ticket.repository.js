"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRepository = exports.TicketRepository = void 0;
const prisma_1 = require("../lib/prisma");
class TicketRepository {
    async findAllTickets() {
        return prisma_1.prisma.ticket.findMany({
            include: {
                match: {
                    include: {
                        homeTeam: true,
                        awayTeam: true
                    }
                },
                user: true
            },
            orderBy: { createdAt: "desc" }
        });
    }
    async findAvailableByMatch(matchId) {
        return prisma_1.prisma.ticket.findMany({
            where: { matchId, status: "AVAILABLE" }
        });
    }
    async createTickets(matchId, quantity, price, section) {
        const data = Array.from({ length: quantity }).map((_, i) => ({
            matchId,
            price,
            section,
            seat: `${section}-${i + 1}`,
            status: "AVAILABLE",
            qrCode: `TKT-${matchId}-${section}-${i + 1}-${Math.random().toString(36).substring(7)}`
        }));
        const result = await prisma_1.prisma.ticket.createMany({
            data
        });
        return result.count;
    }
    async purchaseTicket(ticketId, userId) {
        return prisma_1.prisma.ticket.update({
            where: { id: ticketId },
            data: {
                userId,
                status: "SOLD",
                purchasedAt: new Date()
            }
        });
    }
    async findUserTickets(userId) {
        return prisma_1.prisma.ticket.findMany({
            where: { userId },
            include: {
                match: {
                    include: {
                        homeTeam: true,
                        awayTeam: true
                    }
                }
            },
            orderBy: { purchasedAt: "desc" }
        });
    }
    async deleteTicket(id) {
        return prisma_1.prisma.ticket.delete({ where: { id } });
    }
    async deleteAllTickets() {
        await prisma_1.prisma.ticket.deleteMany();
    }
}
exports.TicketRepository = TicketRepository;
exports.ticketRepository = new TicketRepository();
//# sourceMappingURL=ticket.repository.js.map