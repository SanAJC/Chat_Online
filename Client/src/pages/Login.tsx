import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

export const Login = () => {
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  return (
    <>
      <div className="flex justify-between flex-row items-center gap-1 p-10 ">
        <div className=" bg-[#24252A]  w-1/3  rounded-4xl text-center ml-35 p-15 drop-shadow-lg">
          <h1 className="text-3xl text-white font-sans mt-1.5">
            Inicio de Session
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Ingrese su Email"
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-10 block w-full p-3 bg-[#DDF2F3] rounded-3xl text-black"
              required
            />
            <input
              type="password"
              id="passwrod"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su Password"
              className="mt-5 block w-full p-3 bg-[#DDF2F3] rounded-3xl"
              required
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-10 block w-full p-3 bg-[#FDEDBA] rounded-3xl text-black mb-2.5 hover:bg-[#ffe388]">
              <span className="font-bold">{loading ? 'Ingresando':'Ingresar'}</span>
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <span className=" text-white font-sans">
            Si no tienes cuenta{" "}
            <Link to={"/register"}>
              <span className="text-[#FDEDBA] font-bold">registrate</span>
            </Link>
          </span>
        </div>

        <img
          src="/src/assets/login-me.png"
          alt="imagen-login"
          className="w-[45%] h-[90%]"
        />
      </div>
    </>
  );
};
