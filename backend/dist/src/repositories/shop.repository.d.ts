import { Article, Order } from "@prisma/client";
export declare class ShopRepository {
    findAllArticles(): Promise<Article[]>;
    findArticleById(id: string): Promise<Article | null>;
    createArticle(data: any): Promise<Article>;
    updateArticle(id: string, data: any): Promise<Article>;
    deleteArticle(id: string): Promise<Article>;
    createOrder(userId: string, items: any[], total: number): Promise<Order>;
    findOrdersByUserId(userId: string): Promise<Order[]>;
}
export declare const shopRepository: ShopRepository;
//# sourceMappingURL=shop.repository.d.ts.map