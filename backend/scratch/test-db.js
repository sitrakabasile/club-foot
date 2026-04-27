const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        player: true,
      },
    });
    console.log('Contracts found:', contracts.length);
    process.exit(0);
  } catch (err) {
    console.error('Error querying contracts:', err);
    process.exit(1);
  }
}

test();
