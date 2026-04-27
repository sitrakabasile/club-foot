import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.player.count();
  console.log(`Player count: ${count}`);
  const players = await prisma.player.findMany();
  console.log(JSON.stringify(players, null, 2));
}
main().finally(() => prisma.$disconnect());
