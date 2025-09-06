import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserRoleIndicator = () => {
  const { user, getUserRole, isAdmin } = useAuth();

  if (!user) return null;

  const role = getUserRole();
  const roleColor = isAdmin() ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${roleColor} shadow-lg border`}>
        Role: {role || 'user'}
      </div>
    </div>
  );
};

export default UserRoleIndicator;
