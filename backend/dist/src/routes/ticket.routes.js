"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_repository_1 = require("../repositories/ticket.repository");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Get all tickets (Admin/Debug)
router.get("/", async (req, res) => {
    try {
        const tickets = await ticket_repository_1.ticketRepository.findAllTickets();
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Generate tickets for a match
router.post("/generate", async (req, res) => {
    try {
        const { matchId, quantity, price, section } = req.body;
        const count = await ticket_repository_1.ticketRepository.createTickets(matchId, quantity, price, section);
        res.status(201).json({ message: `${count} tickets générés`, count });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Purchase a ticket
router.post("/purchase/:id", auth_middleware_1.authMiddleware, async (req, res) => {
    try {
        const ticket = await ticket_repository_1.ticketRepository.purchaseTicket(req.params.id, req.user.id);
        res.json(ticket);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get current user's tickets
router.get("/my-tickets", auth_middleware_1.authMiddleware, async (req, res) => {
    try {
        const tickets = await ticket_repository_1.ticketRepository.findUserTickets(req.user.id);
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Delete a ticket
router.delete("/:id", async (req, res) => {
    try {
        await ticket_repository_1.ticketRepository.deleteTicket(req.params.id);
        res.json({ message: "Billet supprimé" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=ticket.routes.js.map