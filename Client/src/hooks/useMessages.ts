import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export type Message ={
  conversationId?: string;
  senderId:string;
  receiverId:string;
  content:string;
  timestamp:string;

  fileUrl?:string;
  fileType?: 'image' | 'document' | 'video';
}

export const useMessages = (receiverId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.localId || !receiverId) return;
      
      try {
        const response = await fetch(
          `http://localhost:4000/api/messages/${user.localId}/${receiverId}`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user?.localId, receiverId]);

  return { messages, loading };
};