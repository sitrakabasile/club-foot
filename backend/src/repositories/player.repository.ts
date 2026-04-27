import { PrismaClient, Player } from "@prisma/client";
import { prisma } from "../lib/prisma";

/**
 * PlayerRepository — Data access layer for Players.
 */
export class PlayerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findAll(): Promise<Player[]> {
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

  async findById(id: string): Promise<Player | null> {
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

  async create(data: any): Promise<Player> {
    return this.prisma.player.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<Player> {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Player> {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}

export const playerRepository = new PlayerRepository();
