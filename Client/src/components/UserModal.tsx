import { useUsers , User } from '../hooks/useUsers';
import { useState } from 'react';

type UserModalProps ={
    onClose: (selectedUser?: User) => void;
}

export const UserModal = ({ onClose }:UserModalProps) => {
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };
  const handleConfirm = () => {
    onClose(selectedUser || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
          <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul>
          {users.map((user) => (
            <li 
              key={user.id} 
              className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer ${
                selectedUser?.id === user.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
              <span>{user.displayName}</span>
            </li>
          ))}
        </ul>
        )}
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleConfirm} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!selectedUser}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
