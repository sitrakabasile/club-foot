"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRepository = exports.ShopRepository = void 0;
const prisma_1 = require("../lib/prisma");
class ShopRepository {
    async findAllArticles() {
        return prisma_1.prisma.article.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async findArticleById(id) {
        return prisma_1.prisma.article.findUnique({ where: { id } });
    }
    async createArticle(data) {
        return prisma_1.prisma.article.create({ data });
    }
    async updateArticle(id, data) {
        return prisma_1.prisma.article.update({ where: { id }, data });
    }
    async deleteArticle(id) {
        return prisma_1.prisma.article.update({ where: { id }, data: { isActive: false } });
    }
    async createOrder(userId, items, total) {
        return prisma_1.prisma.order.create({
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
    async findOrdersByUserId(userId) {
        return prisma_1.prisma.order.findMany({
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
exports.ShopRepository = ShopRepository;
exports.shopRepository = new ShopRepository();
//# sourceMappingURL=shop.repository.js.map