"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
/**
 * Prisma Client singleton.
 * Prevents multiple instances and circular dependency issues.
 */
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
exports.default = prisma;
//# sourceMappingURL=prisma.js.map