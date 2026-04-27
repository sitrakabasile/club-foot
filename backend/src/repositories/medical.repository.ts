import { PrismaClient, MedicalRecord } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class MedicalRepository {
  async findAll(): Promise<MedicalRecord[]> {
    return prisma.medicalRecord.findMany({
      include: {
        player: true,
      },
      orderBy: {
        dateOccurred: "desc",
      },
    });
  }

  async findByPlayerId(playerId: string): Promise<MedicalRecord[]> {
    return prisma.medicalRecord.findMany({
      where: { playerId },
      orderBy: { dateOccurred: "desc" },
    });
  }

  async create(data: {
    playerId: string;
    type: string;
    diagnosis: string;
    description?: string;
    severity?: string;
    dateOccurred: string;
    dateReturn?: string;
  }): Promise<MedicalRecord> {
    return prisma.medicalRecord.create({
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

  async update(id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord> {
    return prisma.medicalRecord.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<MedicalRecord> {
    return prisma.medicalRecord.delete({
      where: { id },
    });
  }
}

export const medicalRepository = new MedicalRepository();
