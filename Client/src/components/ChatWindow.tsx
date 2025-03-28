import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../hooks/useMessages";

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}
type ChatWindowProps ={
    receiverId: string;
}

export const ChatWindow = ({ receiverId } : ChatWindowProps)  => {
    const { user } = useAuth();
    const { socket } = useSocket();
    const { messages: initialMessages, loading } = useMessages(receiverId);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
   
    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    useEffect(() => {
      if (!socket) return;
  
      const handleMessage = (newMessage: Message) => {
        if (
          (newMessage.senderId === receiverId && 
           newMessage.receiverId === user?.localId) ||
          (newMessage.receiverId === receiverId && 
           newMessage.senderId === user?.localId)
        ) {
          setMessages(prev => [...prev, newMessage]);
        }
      };
  
      socket.on("receive-message", handleMessage);
      return () => {
        socket.off("receive-message", handleMessage);
      };
    }, [socket, receiverId]);
  
    const sendMessage = () => {
      if (!newMessage.trim() || !user || !receiverId) return;
  
      const message: Message = {
        senderId: user.localId,
        receiverId: receiverId,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
  
      socket?.emit("send-message", message);
      setNewMessage("");
    };
  

  return (
    <div className="flex flex-col h-full">
      {loading && <span className="text-gray font-medium">Cargando el chat.....</span>}
      <div className="flex-1 overflow-y-auto p-4 m-h-[80%]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.senderId === user?.localId ? "text-right" : "text-left"}`}
          >
            <span className="inline-block p-2 rounded-lg bg-gray-200">
              {msg.content}
            </span>
            <small className="block text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-nowrap items-center justify-center  min-h-[10%] p-2 mt-9.5">
        <img src="/src/assets/img.svg" className="w-10 h-10 shrink-0" alt="Adjuntar" />
        <input
          type="text"
          className="rounded-4xl w-[100%] bg-white p-2 mx-2"
          placeholder="Escribe un mensaje"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <img
          src="/src/assets/send.svg"
          className="w-10 h-10 shrink-0 cursor-pointer"
          alt="Enviar"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};
