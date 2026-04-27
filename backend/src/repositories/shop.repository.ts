import { prisma } from "../lib/prisma";
import { Article, Order, OrderItem } from "@prisma/client";

export class ShopRepository {
  async findAllArticles(): Promise<Article[]> {
    return prisma.article.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findArticleById(id: string): Promise<Article | null> {
    return prisma.article.findUnique({ where: { id } });
  }

  async createArticle(data: any): Promise<Article> {
    return prisma.article.create({ data });
  }

  async updateArticle(id: string, data: any): Promise<Article> {
    return prisma.article.update({ where: { id }, data });
  }

  async deleteArticle(id: string): Promise<Article> {
    return prisma.article.update({ where: { id }, data: { isActive: false } });
  }

  async createOrder(userId: string, items: any[], total: number): Promise<Order> {
    return prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        items: {
          create: items.map(item => ({
            articleId: item.articleId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            size: item.size
          }))
        }
      },
      include: {
        items: true
      }
    });
  }

  async findOrdersByUserId(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            article: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }
}

export const shopRepository = new ShopRepository();
