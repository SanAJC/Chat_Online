import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export type User ={
  localId: string;
  email: string;
  displayName: string;
  photoURL:string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}


type AuthContextData ={
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, photoURL?: string) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });
      const userData: User = response.data.data;
      console.log("userData recibido:", userData); 
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      
    } catch (error) {
      console.error("Error en el login", error);
      throw error;
    }
  };

 
  const register = async (email: string, password: string, displayName: string, photoURL?: string) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", { email, password, displayName, photoURL });
      const userData: User = response.data.data;
      console.log("userData recibido:", userData); 
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      
    } catch (error) {
      console.error("Error en el registro", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
