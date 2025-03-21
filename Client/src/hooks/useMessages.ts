import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useMessages = (receiverId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.localId || !receiverId) return;
      
      try {
        const response = await fetch(
          `http://localhost:4000/api/messages/${user.localId}/${receiverId}`
        );
        const { messages } = await response.json();
        setMessages(messages);
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