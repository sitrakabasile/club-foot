import { prisma } from "../lib/prisma";

export class ContractRepository {
  async findAll() {
    return prisma.contract.findMany({
      include: {
        player: true,
      },
      orderBy: {
        endDate: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      include: {
        player: true,
      },
    });
  }

  async create(data: {
    playerId: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    status?: string;
    type?: string;
    notes?: string;
  }) {
    return prisma.contract.create({
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

  async update(id: string, data: any) {
    return prisma.contract.update({
      where: { id },
      data,
      include: {
        player: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.contract.delete({
      where: { id },
    });
  }
}

export const contractRepository = new ContractRepository();
