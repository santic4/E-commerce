import { TicketDao } from '../dao/ticketDao.js'
import { emailService } from './email/emailServiceGmail.js';

export class TicketService {
  static async generateTicket(code, purchaseDatetime, amount, purchaser) {
    try {
      const ticketData = {
        code,
        purchase_datetime: purchaseDatetime,
        amount,
        purchaser,
      };
      const newTicket = await TicketDao.createTicket(ticketData)

      await emailService.send(
        user.email,
        'pedido recibido',
        `Le informamos que su orden ha sido registrada con éxito.Nro de ticket: ${order.number}`
      )

      return newTicket;

    } catch (error) {
      console.error(error);
      throw new Error('Error generating ticket');
    }
  }
}