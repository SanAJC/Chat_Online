import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (email: string, password: string ,displayName: string, photoURL?: string) => {
    setLoading(true);
    setError(null);
    try {
      await register(email, password, displayName,photoURL);
      navigate('/login');

    } catch (error: any) {
      setError(error.response?.data?.detail || "Registro falló");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};
