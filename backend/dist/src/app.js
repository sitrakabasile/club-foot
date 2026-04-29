"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const player_routes_1 = __importDefault(require("./routes/player.routes"));
const match_routes_1 = __importDefault(require("./routes/match.routes"));
const contract_routes_1 = __importDefault(require("./routes/contract.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const medical_routes_1 = __importDefault(require("./routes/medical.routes"));
const shop_routes_1 = __importDefault(require("./routes/shop.routes"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const club_routes_1 = __importDefault(require("./routes/club.routes"));
const ticket_repository_1 = require("./repositories/ticket.repository");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const auth_middleware_1 = require("./middleware/auth.middleware");
/**
 * Express application setup and middleware configuration.
 */
const app = (0, express_1.default)();
// Middleware
const allowedOrigins = new Set([
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PREVIEW,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
].filter(Boolean));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.has(origin))
            return callback(null, true);
        if (/^https:\/\/.*\.vercel\.app$/.test(origin))
            return callback(null, true);
        return callback(new Error(`CORS not allowed for origin: ${origin}`));
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
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
app.get("/api/dashboard/stats", auth_middleware_1.authMiddleware, (req, res) => dashboard_controller_1.dashboardController.getStats(req, res));
// Force Bulk Delete for Tickets
app.delete("/api/tickets/bulk/delete-all", async (req, res) => {
    try {
        await ticket_repository_1.ticketRepository.deleteAllTickets();
        res.json({ message: "Success" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/players", player_routes_1.default);
app.use("/api/matches", match_routes_1.default);
app.use("/api/contracts", contract_routes_1.default);
app.use("/api/teams", team_routes_1.default);
app.use("/api/medical", medical_routes_1.default);
app.use("/api/shop", shop_routes_1.default);
app.use("/api/tickets", ticket_routes_1.default);
app.use("/api/club", club_routes_1.default);
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working", timestamp: new Date().toISOString() });
});
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map