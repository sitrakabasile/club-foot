import { PrismaClient } from "@prisma/client";
/**
 * Prisma Client singleton.
 * Prevents multiple instances and circular dependency issues.
 */
declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export { prisma };
export default prisma;
//# sourceMappingURL=prisma.d.ts.map