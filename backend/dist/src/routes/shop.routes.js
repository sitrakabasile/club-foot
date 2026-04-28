"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shop_repository_1 = require("../repositories/shop.repository");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Article routes
router.get("/articles", async (req, res) => {
    try {
        const articles = await shop_repository_1.shopRepository.findAllArticles();
        res.json(articles);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post("/articles", async (req, res) => {
    try {
        const article = await shop_repository_1.shopRepository.createArticle(req.body);
        res.status(201).json(article);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Order routes
router.post("/orders", auth_middleware_1.authMiddleware, async (req, res) => {
    try {
        const { items, total } = req.body;
        const order = await shop_repository_1.shopRepository.createOrder(req.user.id, items, total);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get("/my-orders", auth_middleware_1.authMiddleware, async (req, res) => {
    try {
        const orders = await shop_repository_1.shopRepository.findOrdersByUserId(req.user.id);
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=shop.routes.js.map