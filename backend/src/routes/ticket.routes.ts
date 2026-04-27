import { Router } from "express";
import { ticketRepository } from "../repositories/ticket.repository";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Get all tickets (Admin/Debug)
router.get("/", async (req, res) => {
  try {
    const tickets = await ticketRepository.findAllTickets();
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Generate tickets for a match
router.post("/generate", async (req, res) => {
  try {
    const { matchId, quantity, price, section } = req.body;
    const count = await ticketRepository.createTickets(matchId, quantity, price, section);
    res.status(201).json({ message: `${count} tickets générés`, count });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Purchase a ticket
router.post("/purchase/:id", authMiddleware, async (req: any, res) => {
  try {
    const ticket = await ticketRepository.purchaseTicket(req.params.id, req.user.id);
    res.json(ticket);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get current user's tickets
router.get("/my-tickets", authMiddleware, async (req: any, res) => {
  try {
    const tickets = await ticketRepository.findUserTickets(req.user.id);
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a ticket
router.delete("/:id", async (req, res) => {
  try {
    await ticketRepository.deleteTicket(req.params.id);
    res.json({ message: "Billet supprimé" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
