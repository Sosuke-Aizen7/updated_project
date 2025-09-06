import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({})
const API_BASE_URL = 'http://localhost:3001';

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Authentication methods
  const signUp = async (email, password, fullName = '') => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token and set user
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      return { data: data.user, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and set user
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      return { data: data.user, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    } finally {
      setLoading(false);
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      localStorage.removeItem('authToken');
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    } finally {
      setLoading(false);
    }
  }

  const resetPassword = async (email) => {
    try {
      // For now, just return success - you can implement email sending later
      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Update failed');
      }

      setUser(data.user);
      return { data: data.user, error: null };
    } catch (error) {
      return { data: null, error: { message: error.message } };
    } finally {
      setLoading(false);
    }
  }

  // Role-based access control functions
  const getUserRole = () => {
    if (!user) return null;
    return user.role || 'user';
  }

  const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'administrator';
  }

  const isUser = () => {
    const role = getUserRole();
    return role === 'user' || role === 'student';
  }

  const hasRole = (requiredRole) => {
    const userRole = getUserRole();
    return userRole === requiredRole;
  }

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
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}