import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const API_BASE_URL = 'http://localhost:3001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token and get user info
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          fullName: userData.full_name || ''
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { data, error: null };
      } else {
        return { data: null, error: { message: data.error } };
      }
    } catch (error) {
      return { data: null, error: { message: 'Network error' } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { data, error: null };
      } else {
        return { data: null, error: { message: data.error } };
      }
    } catch (error) {
      return { data: null, error: { message: 'Network error' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('authToken');
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error: { message: 'Error signing out' } };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      // For SQLite backend, we would need to implement password reset
      // For now, return a mock response
      return { error: { message: 'Password reset not implemented in SQLite version' } };
    } catch (error) {
      return { error: { message: 'Network error' } };
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (response.ok) {
        // Update local user state
        setUser(prev => ({ ...prev, ...updates }));
        return { data, error: null };
      } else {
        return { data: null, error: { message: data.error } };
      }
    } catch (error) {
      return { data: null, error: { message: 'Network error' } };
    } finally {
      setLoading(false);
    }
  };

  // Role-based access control functions
  const getUserRole = () => {
    if (!user) return null;
    return user.role || 'user';
  };

  const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'administrator';
  };

  const isUser = () => {
    const role = getUserRole();
    return role === 'user' || role === 'student';
  };

  const hasRole = (requiredRole) => {
    const userRole = getUserRole();
    return userRole === requiredRole;
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    getUserRole,
    isAdmin,
    isUser,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
