import { db } from '../services/firebase';
import { Message } from '../types/type';
import { Request, Response, NextFunction } from 'express';

export const saveMessage = async(message: Message) => {
  const conversationId = [message.senderId, message.receiverId].sort().join('_');
  
  const messageToSave: Message = {
    ...message,
    conversationId,
    timestamp: new Date().toISOString()
  };

  await db.collection('messages').add(messageToSave);
}

export const getMessagesBetween = async(req : Request , res:Response, next:NextFunction) => {

    const { senderId, receiverId } = req.params;
    const conversationId = [senderId, receiverId].sort().join('_');

    try {
        const snapshot = await db.collection('messages').where('conversationId', '==', conversationId).orderBy('timestamp', 'desc').get();

        const messages: Message[] = [];
        snapshot.forEach(doc => {
            messages.push(doc.data() as Message);
        });
        res.status(200).json({ messages });
    } catch (error) {
        next(error);
    }   
}

export const getConversations = async (req: Request, res: Response) => { 
  const { userId } = req.params; 
 
  try { 
    const sentMessages = await db.collection('messages') 
      .where('senderId', '==', userId) 
      .get(); 
 
    const receivedMessages = await db.collection('messages') 
      .where('receiverId', '==', userId) 
      .get(); 
 
    const allUserIds = new Set<string>(); 
     
    
    sentMessages.docs.forEach(doc => {
      const msg = doc.data() as Message;
      allUserIds.add(msg.receiverId);
    });
    
    receivedMessages.docs.forEach(doc => {
      const msg = doc.data() as Message;
      allUserIds.add(msg.senderId);
    });
 
    // Solo continuar si hay usuarios con los que se ha conversado
    if (allUserIds.size === 0) {
      res.status(200).json({ users: [] });
      return
    }

    // Obtener datos de usuarios 
    const usersPromises = Array.from(allUserIds).map(async (id) => {
      const userDoc = await db.collection('users').doc(id).get();
      if (!userDoc.exists) {
        return null;
      }
      const userData = userDoc.data();
      return { id, ...userData };
    }); 
 
    const usersWithData = await Promise.all(usersPromises);
    
    const users = usersWithData.filter(user => user !== null);
    
    res.status(200).json({ users }); 
     
  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    res.status(500).json({ error: 'Error obteniendo conversaciones' }); 
  } 
};

