import { prisma } from "../lib/prisma";
import { Ticket } from "@prisma/client";

export class TicketRepository {
  async findAllTickets(): Promise<Ticket[]> {
    return prisma.ticket.findMany({
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

  async findAvailableByMatch(matchId: string): Promise<Ticket[]> {
    return prisma.ticket.findMany({
      where: { matchId, status: "AVAILABLE" }
    });
  }

  async createTickets(matchId: string, quantity: number, price: number, section: string): Promise<number> {
    const data = Array.from({ length: quantity }).map((_, i) => ({
      matchId,
      price,
      section,
      seat: `${section}-${i + 1}`,
      status: "AVAILABLE",
      qrCode: `TKT-${matchId}-${section}-${i + 1}-${Math.random().toString(36).substring(7)}`
    }));

    const result = await prisma.ticket.createMany({
      data
    });

    return result.count;
  }

  async purchaseTicket(ticketId: string, userId: string): Promise<Ticket> {
    return prisma.ticket.update({
      where: { id: ticketId },
      data: {
        userId,
        status: "SOLD",
        purchasedAt: new Date()
      }
    });
  }

  async findUserTickets(userId: string): Promise<Ticket[]> {
    return prisma.ticket.findMany({
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

  async deleteTicket(id: string): Promise<Ticket> {
    return prisma.ticket.delete({ where: { id } });
  }

  async deleteAllTickets(): Promise<void> {
    await prisma.ticket.deleteMany();
  }
}

export const ticketRepository = new TicketRepository();
