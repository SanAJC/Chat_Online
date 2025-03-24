import { Aside } from "../components/Aside";
import { Tag } from "../components/Tag";
import { UserModal} from "../components/UserModal";
import { Users } from "../hooks/useUsers";
import { useState } from "react";
import { useAuth  } from "../context/AuthContext";
import { ChatWindow } from "../components/ChatWindow";
import { UserWithLastMessage } from "../hooks/useConversations";

export const Home = () => {

  const {user} = useAuth()
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState("");
  const [userReceiver , setUserReceiver]=useState("")

  const handleSelectUser = (user : UserWithLastMessage) => {
    setUserReceiver(user.displayName)
    setSelectedReceiverId(user.localId);
  };

  const handleSelectUserNew = (selectedUser?: Users) => {
    setIsUserModalOpen(false);
    
    if (selectedUser) {
      setUserReceiver(selectedUser.displayName)
      setSelectedReceiverId(selectedUser.id);
    }
  };

  return (
    <>
      <div className=" flex h-screen overflow-hidden w-full">
        <Aside/>
        <div className="flex flex-col max-w-[30%] mr-3 ">
          <div className="flex flex-col items-center w-full h-[40%] ">
            <img src={user?.photoURL || "/avatar_1.png"}  alt="avatar" className=" rounded-full mt-15 mb-10 w-[120px] drop-shadow-md "/>
            <span className="text-black font-medium text-2xl">{user?.displayName || "Nombre de Usuario"}</span>
            <p className="text-[#C4C4C4] font-sans text-xs">{user?.email || "correo@ejemplo.com"}</p>
            <div className="w-3/4 border-b border-gray-300 mt-4 mx-auto"></div>
          </div>
          <h1 className="text-2xl text-black font-medium ml-10 mt-1.5 mb-0.5">Chats</h1>
          <div className="flex flex-col justify-between bg-[#FDEDBA] min-h-[53%] rounded-4xl ml-3 w-full drop-shadow-md">
            <Tag  onSelectUser={handleSelectUser}/>
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="bg-[#24252A] rounded-4xl flex flex-row items-center justify-center w-[80%] p-1.5 mt-0.5 ml-7 mb-5 gap-1.5">
              <span className="text-white font-medium ">Encuentra a nuevas personas</span>
              <img src="/src/assets/search.svg" className="size-6 shrink-0"/>
            </button>
          </div>
          {isUserModalOpen && (
            <UserModal onClose={handleSelectUserNew } />
          )}
        </div>

        <div className="flex flex-col w-[65%] h-screen   bg-[#DDF2F3] rounded-t-3xl p-10 ml-3 drop-shadow-md">
          <div className="flex flex-row  gap-2 items-center">
            <img src={"/avatar_1.png"} className="size-14 shrink-0" />
            <h1 className="font-medium text-black text-3xl  mt-4 pb-2">{userReceiver || "Seleciona un chat para iniciar"}</h1>
          </div>
          <div className=" h-full mt-5 min-h-[90%]">
            <ChatWindow receiverId={selectedReceiverId}/>
          </div>
        </div>
      </div>
    </>
  );
};
