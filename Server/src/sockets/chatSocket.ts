import { Server as SocketIOServer } from 'socket.io';
import { saveMessage } from '../handlers/messageHandlers';
import { Message } from '../types/type';

export function initializeChatSocket(io: SocketIOServer) {
  io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId as string;
    if (userId) {
      
      socket.join(userId);
      console.log(`Usuario ${userId} se ha unido a su room`);
    } else {
      console.warn('Conexión sin userId');
    }

    // Escucha el evento de envío de mensajes
    socket.on('send-message', async (data: Message) => {
      try {
        await saveMessage(data);
        
        io.to(data.senderId).emit('receive-message', data);
        io.to(data.receiverId).emit('receive-message', data);
        console.log(`Mensaje enviado a ${data.senderId} y ${data.receiverId}`);
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} desconectado`);
    });
  });
}

