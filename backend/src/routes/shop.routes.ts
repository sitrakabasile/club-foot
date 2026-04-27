import { Router } from "express";
import { shopRepository } from "../repositories/shop.repository";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Article routes
router.get("/articles", async (req, res) => {
  try {
    const articles = await shopRepository.findAllArticles();
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/articles", async (req, res) => {
  try {
    const article = await shopRepository.createArticle(req.body);
    res.status(201).json(article);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Order routes
router.post("/orders", authMiddleware, async (req: any, res) => {
  try {
    const { items, total } = req.body;
    const order = await shopRepository.createOrder(req.user.id, items, total);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/my-orders", authMiddleware, async (req: any, res) => {
  try {
    const orders = await shopRepository.findOrdersByUserId(req.user.id);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
