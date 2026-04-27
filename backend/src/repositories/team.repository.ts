import { prisma } from "../lib/prisma";
import { Team } from "@prisma/client";

export class TeamRepository {
  async findAll(): Promise<Team[]> {
    return prisma.team.findMany({
      orderBy: { name: "asc" },
    });
  }

  async create(name: string, category: string = "SENIOR"): Promise<Team> {
    return prisma.team.create({
      data: { name, category },
    });
  }
}

export const teamRepository = new TeamRepository();
