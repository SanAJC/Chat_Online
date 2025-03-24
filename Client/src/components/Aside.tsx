import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
export const Aside = () => {
  const { handleLogout } = useLogout();

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logout button clicked");
    handleLogout();
  };
  return (
    <>
      <div className="bg-[#24252A] w-[80px] h-[99%] ml-3.5 rounded-3xl flex flex-col justify-between mt-1 drop-shadow-lg">

        <div className="flex flex-col items-center gap-4 mt-20">
          <Link to={"/chats"}>
            <img src="/src/assets/chat-online.svg" alt="mensajes" className="w-[30px]" />
          </Link>
          <Link to={"/user"}>
            <img src="/src/assets/user.svg" alt="usuarios" className="w-[30px]" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 mb-15">
          <button onClick={handleClick}>
            <img src="/src/assets/logout.svg" alt="cerrar_session" className="w-[30px]" />
          </button>
        </div>
      </div>
    </>
  );
};
