import { useConversations } from "../hooks/useConversations";


type SelecUserProps ={
  onSelectUser: (receiverId:string) => void;
}

export const Tag = ({ onSelectUser } : SelecUserProps) => {
  const { users, loading } = useConversations();

  return (
    <div>
      {loading ? (
        <p className="text-black font-medium ml-5 mt-5">
          Cargando conversaciones...
        </p>
      ) : (
        <>
          {users.map((convUser) => (  
              <div key={convUser.localId}  onClick={() => onSelectUser(convUser.localId)} className="flex min-w-[300px] items-center gap-x-4 mt-10 ml-4">
                <img
                  src={convUser.photoURL || "/avatar_1.png"}
                  className="size-12 shrink-0"
                />
                <div>
                  <div className="text-xl font-medium text-black flex justify-between ">
                    <span className="text-[15px]">
                      {convUser.displayName || "Usuario"}
                    </span>
                    <span className="text-[#C4C4C4] text-xs mt-1 ml-30 ">
                      {convUser.lastMessage?.formattedTime || ""}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px]">
                    {convUser.lastMessage?.text || "No hay mensajes aún"}
                  </p>
                  <div className="border-b border-gray-300 mt-4 mx-auto"></div>
                </div>
              </div>
          ))}
        </>
      )}

      {users.length === 0 && (
        <p className="text-black font-bold ml-5 mt-5 min-w-[300px] ">
          No tienes chats aun, busca amigos
        </p>
      )}
    </div>
  );
};
