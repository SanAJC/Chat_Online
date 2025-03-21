// Ejemplo en useLogin.ts
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/home');
      
    } catch (error: any) {
      setError(error.response?.data?.detail || "Login falló");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
