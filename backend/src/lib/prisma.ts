import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client singleton.
 * Prevents multiple instances and circular dependency issues.
 */
const prisma = new PrismaClient();

export { prisma };
export default prisma;
