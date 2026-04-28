"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const prisma_1 = require("../lib/prisma");
/**
 * UserRepository — Data access layer for User entity.
 * Decouples database operations from business logic.
 */
class UserRepository {
    prisma;
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { profile: true },
        });
    }
    async create(data) {
        const { firstName, lastName, ...userData } = data;
        return this.prisma.user.create({
            data: {
                ...userData,
                profile: {
                    create: {
                        firstName,
                        lastName,
                    },
                },
            },
            include: { profile: true },
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async findByResetToken(token) {
        return this.prisma.user.findUnique({
            where: { resetToken: token },
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map