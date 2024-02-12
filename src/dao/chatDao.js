import { Chat } from '../models/mongoose/chatSchema.js'

export class ChatDao {
  async saveMessage(messageData) {
      try {
        // Utilizar el método create para guardar el mensaje en la base de datos
        const savedMessage = await Chat.create({
          user: messageData.user,
          message: messageData.message,
        });
  
        return savedMessage;
      } catch (error) {
        throw new Error('Error al enviar el mensaje. Intente de nuevo.');
      }
  }

}