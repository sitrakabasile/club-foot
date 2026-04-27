import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../lib/prisma";

/**
 * UserRepository — Data access layer for User entity.
 * Decouples database operations from business logic.
 */
export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async create(data: any): Promise<User> {
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

  async update(id: string, data: any): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { resetToken: token },
    });
  }
}

export const userRepository = new UserRepository();
