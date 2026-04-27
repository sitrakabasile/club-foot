import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import process from "node:process";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin
  const adminPassword = await bcrypt.hash("admin1234", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@clubfoot.com" },
    update: {},
    create: {
      email: "admin@clubfoot.com",
      password: adminPassword,
      role: "ADMIN",
      profile: {
        create: {
          firstName: "Admin",
          lastName: "Principal",
        },
      },
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // Create some teams
  const team1 = await prisma.team.upsert({
    where: { id: "senior-a" },
    update: {},
    create: {
      id: "senior-a",
      name: "Équipe Première",
      category: "SENIOR",
    },
  });

  console.log(`✅ Team created: ${team1.name}`);
  // Create a rival team for matches
  const teamRival = await prisma.team.upsert({
    where: { id: "rival-fc" },
    update: {},
    create: {
      id: "rival-fc",
      name: "Rival Stars FC",
      category: "SENIOR",
    },
  });

  console.log(`✅ Rival team created: ${teamRival.name}`);

  // Create players
  const players = [
    { name: "Kylian Mbappé", position: "ST", number: 7, nationality: "France", status: "ACTIVE" },
    { name: "Jude Bellingham", position: "CM", number: 5, nationality: "England", status: "ACTIVE" },
    { name: "Vinícius Júnior", position: "LW", number: 7, nationality: "Brazil", status: "INJURED" },
    { name: "Federico Valverde", position: "CM", number: 15, nationality: "Uruguay", status: "ACTIVE" },
    { name: "Thibaut Courtois", position: "GK", number: 1, nationality: "Belgium", status: "ACTIVE" },
  ];

  for (const p of players) {
    const player = await prisma.player.create({
      data: {
        ...p,
        teamId: team1.id,
        statistics: {
          create: {
            goals: Math.floor(Math.random() * 3),
            assists: Math.floor(Math.random() * 2),
            minutesPlayed: 90,
            rating: 7.0 + Math.random() * 3,
            match: {
              create: {
                date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000), // Random past dates
                venue: "Stade de l'Élite",
                competition: "Ligue 1",
                status: "COMPLETED",
                scoreHome: 2,
                scoreAway: 1,
                homeTeamId: team1.id,
                awayTeamId: teamRival.id,
              }
            }
          }
        }
      },
    });
    console.log(`✅ Player created: ${player.name}`);
  }

  // Add an upcoming match
  await prisma.match.create({
    data: {
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      venue: "Stade de l'Élite",
      competition: "Ligue 1",
      status: "SCHEDULED",
      homeTeamId: team1.id,
      awayTeamId: teamRival.id,
    }
  });

  // Add dummy finances
  await prisma.finance.createMany({
    data: [
      { label: "Sponsor Royal", amount: 1000000, type: "INCOME", category: "SPONSORSHIP" },
      { label: "Ventes Merch", amount: 250000, type: "INCOME", category: "SHOP" },
      { label: "Salaires", amount: -400000, type: "EXPENSE", category: "SALARY" },
    ]
  });

  console.log(`✅ Seeding completed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
