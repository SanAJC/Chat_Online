import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export const Register = () => {
  const { handleRegister, loading, error } = useRegister();

  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const avatars = [
    "http://localhost:5173/avatar_1.png", 
    "http://localhost:5173/avatar_2.png"
  ];

  const handleAvatarSelect = (url: string) => {
    setSelectedAvatar(url);
    if(!selectedAvatar){
      setSelectedAvatar('http://localhost:5173/avatar_1.png')
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(email, password, displayName, selectedAvatar);
  };

  
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[500px] bg-[#24252A] rounded-4xl text-center p-15 ">
          <h1 className="text-3xl text-white font-sans mt-1.5">Registrate</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e)=> setDisplayname(e.target.value)}
              placeholder="Ingrese su Nombre de Usuario"
              className="mt-10 block w-full p-3 bg-[#DDF2F3] rounded-3xl text-black"
            />

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Ingrese su Email"
              className="mt-5 block w-full p-3 bg-[#DDF2F3] rounded-3xl text-black"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Ingrese su Password"
              className="mt-5 block w-full p-3 bg-[#DDF2F3] rounded-3xl"
            />
            <div className="mt-5 flex justify-center space-x-4">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`cursor-pointer p-1 rounded-full border-4 ${
                    selectedAvatar === avatar
                      ? "border-[#FDEDBA]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              ))}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-10 block w-full p-3 bg-[#FDEDBA] rounded-3xl text-black mb-2.5 hover:bg-[#ffe388]">
              <span className="font-bold">{loading ? 'Ingresando':'Ingresar'}</span>
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
