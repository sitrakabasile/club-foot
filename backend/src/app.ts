import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.routes";
import playerRoutes from "./routes/player.routes";
import matchRoutes from "./routes/match.routes";
import contractRoutes from "./routes/contract.routes";
import teamRoutes from "./routes/team.routes";
import medicalRoutes from "./routes/medical.routes";
import shopRoutes from "./routes/shop.routes";
import ticketRoutes from "./routes/ticket.routes";
import clubRoutes from "./routes/club.routes";
import { ticketRepository } from "./repositories/ticket.repository";
import { dashboardController } from "./controllers/dashboard.controller";
import { authMiddleware } from "./middleware/auth.middleware";

/**
 * Express application setup and middleware configuration.
 */

const app: Express = express();

// Middleware
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PREVIEW,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ].filter(Boolean) as string[]
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return callback(null, true);
      return callback(new Error(`CORS not allowed for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - ${res.statusCode}`);
    if (res.statusCode >= 400 && (req.method === "POST" || req.method === "PUT")) {
      console.log("Request Body:", JSON.stringify(req.body, null, 2));
    }
  });
  next();
});

// Inline Dashboard Stats for debugging
app.get("/api/dashboard/stats", authMiddleware, (req, res) => dashboardController.getStats(req, res));

// Force Bulk Delete for Tickets
app.delete("/api/tickets/bulk/delete-all", async (req, res) => {
  try {
    await ticketRepository.deleteAllTickets();
    res.json({ message: "Success" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/club", clubRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Basic error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
