import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: string | null;
  role: string | null;
  token: string | null;
  login: (user: string, role: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (user: string, role: string, token: string) => {
    setUser(user);
    setRole(role);
    setToken(token);
    localStorage.setItem('authToken', token); // Save token to local storage
    localStorage.setItem('authUser', user); // Save user info to local storage
    localStorage.setItem('authRole', role); // Save role info to local storage
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('authToken'); // Clear token from local storage
    localStorage.removeItem('authUser'); // Clear user info
    localStorage.removeItem('authRole'); // Clear role info
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    // Load session from localStorage when app starts
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    const storedRole = localStorage.getItem('authRole');
    if (storedToken && storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
