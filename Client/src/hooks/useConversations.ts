import { useEffect, useState } from 'react';
import { useAuth , User } from '../context/AuthContext';

type LastMessage = {
  text: string;
  timestamp: number; 
  formattedTime: string; 
}

type UserWithLastMessage = User & {
  lastMessage?: LastMessage;
}

export const useConversations = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithLastMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLastMessage = async (currentUserId: string, targetUserId: string): Promise<LastMessage | undefined> => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/messages/${currentUserId}/${targetUserId}`
      );
      const { messages } = await response.json();
      
      if (messages && messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        const msgDate = new Date(lastMsg.timestamp);
        const formattedTime = msgDate.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit'
        });
        
        return {
          text: lastMsg.content,
          timestamp: lastMsg.timestamp,
          formattedTime
        };
      }
      
      return undefined;
    } catch (error) {
      console.error(`Error fetching messages for user ${targetUserId}:`, error);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.localId) return;
      
      try {
        const response = await fetch(`http://localhost:4000/api/messages/conversations/${user.localId}`);
        const data = await response.json();
        
        
        const lastMessagePromises = data.users.map(async (conversationUser: User) => {
          const userId = conversationUser.localId;
          const lastMessage = await handleLastMessage(user.localId, userId);
          
          return {
            ...conversationUser,
            lastMessage
          };
        });
        const usersWithMessages = await Promise.all(lastMessagePromises);
        
        setUsers(usersWithMessages); 

      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return { users, loading };
};