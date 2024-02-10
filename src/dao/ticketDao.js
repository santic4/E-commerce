import { Ticket } from '../models/mongoose/ticketSchema.js'

export class TicketDao{

    async createTicket(ticketData) {
      try {
        const ticket = await Ticket.create(ticketData);
        return ticket;
      } catch (error) {
        throw new Error('Error saving ticket');
      }
    }
}