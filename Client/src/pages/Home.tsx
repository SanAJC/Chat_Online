import { Aside } from "../components/Aside";
import { Tag } from "../components/Tag";
import { UserModal } from "../components/UserModal";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ChatWindow } from "../components/ChatWindow";


export const Home = () => {

  const {user} = useAuth()

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [selectedReceiverId, setSelectedReceiverId] = useState("");

  const handleSelectUser = (userId : string) => {
    setSelectedReceiverId(userId);
  };

  return (
    <>
      <div className=" flex h-screen overflow-hidden w-full">
        <Aside/>
        <div className="flex flex-col max-w-[40%] mr-3 ">
          <div className="flex flex-col items-center w-full h-[40%] ">
            <img src={user?.photoURL || "/avatar_1.png"}  alt="avatar" className=" rounded-full mt-15 mb-10 w-[120px] "/>
            <span className="text-black font-sans text-2xl">{user?.displayName || "Nombre de Usuario"}</span>
            <p className="text-[#C4C4C4] font-sans text-xs">{user?.email || "correo@ejemplo.com"}</p>
            <div className="w-3/4 border-b border-gray-300 mt-4 mx-auto"></div>
          </div>
          <h1 className="text-2xl text-black font-medium ml-10 mt-1.5 mb-0.5">Chats</h1>
          <div className="flex flex-col justify-between bg-[#FDEDBA] min-h-[53%] rounded-4xl ml-3 w-full">
            <Tag  onSelectUser={handleSelectUser}/>
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="bg-[#24252A] rounded-4xl flex flex-row items-center justify-center w-[80%] p-1.5 mt-1 ml-7 mb-5 gap-1.5">
              <span className="text-white font-medium ">Encuentra a nuevas personas</span>
              <img src="/src/assets/search.svg" className="size-6 shrink-0"/>
            </button>
          </div>
          {isUserModalOpen && (
            <UserModal onClose={() => setIsUserModalOpen(false)} />
          )}
        </div>

        <div className="flex flex-col w-[50%] h-screen   bg-[#DDF2F3] rounded-t-3xl p-10 ml-3">
          <h1 className="font-medium text-black text-3xl border-b border-gray-400 mt-4 pb-2">Conectado</h1>

          <div className="flex flex-col justify-between gap-y-4 min-h-[90%] ">

            <div className=" h-full mt-5">
              <ChatWindow receiverId={selectedReceiverId}/>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
