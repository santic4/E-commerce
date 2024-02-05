import { Chat } from '../models/chatSchema.js'

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
          throw error;
        }
    }
}