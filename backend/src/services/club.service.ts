import { prisma } from "../lib/prisma";

export class ClubService {
  async getSettings() {
    let settings = await prisma.clubSettings.findUnique({
      where: { id: "default" }
    });

    if (!settings) {
      settings = await prisma.clubSettings.create({
        data: { id: "default" }
      });
    }

    return settings;
  }

  async updateSettings(data: any) {
    const { name, primaryColor, accentColor, logo } = data;
    return prisma.clubSettings.upsert({
      where: { id: "default" },
      update: { name, primaryColor, accentColor, logo },
      create: { id: "default", name, primaryColor, accentColor, logo }
    });
  }
}

export const clubService = new ClubService();
