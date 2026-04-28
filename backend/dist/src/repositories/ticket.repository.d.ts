import { Ticket } from "@prisma/client";
export declare class TicketRepository {
    findAllTickets(): Promise<Ticket[]>;
    findAvailableByMatch(matchId: string): Promise<Ticket[]>;
    createTickets(matchId: string, quantity: number, price: number, section: string): Promise<number>;
    purchaseTicket(ticketId: string, userId: string): Promise<Ticket>;
    findUserTickets(userId: string): Promise<Ticket[]>;
    deleteTicket(id: string): Promise<Ticket>;
    deleteAllTickets(): Promise<void>;
}
export declare const ticketRepository: TicketRepository;
//# sourceMappingURL=ticket.repository.d.ts.map