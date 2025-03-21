import { useState, useEffect } from 'react';
import axios from 'axios';

export type User ={
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/users');
        setUsers(response.data.users);
        setLoading(false);
        
      } catch (err: any) {
        setError(err.message || 'Error al cargar usuarios');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
