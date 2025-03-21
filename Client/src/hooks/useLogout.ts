import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      logout();
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.detail || "Registro falló");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
