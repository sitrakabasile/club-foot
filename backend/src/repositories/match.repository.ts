import { prisma } from "../lib/prisma";
import { Match } from "@prisma/client";

export class MatchRepository {
  async findAll(): Promise<Match[]> {
    return prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: { date: "asc" },
    });
  }

  async findById(id: string): Promise<Match | null> {
    return prisma.match.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        statistics: true,
      },
    });
  }

  async create(data: any): Promise<Match> {
    return prisma.match.create({
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

  async update(id: string, data: any): Promise<Match> {
    return prisma.match.update({
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

  async delete(id: string): Promise<Match> {
    return prisma.match.delete({
      where: { id },
    });
  }
}

export const matchRepository = new MatchRepository();
