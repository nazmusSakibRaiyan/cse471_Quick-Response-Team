// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const baseURI = process.env.NODE_ENV === "development" ? "http://localhost:1197" : "";   //student Id: 21201197
      const res = await fetch(baseURI + '/api/auth/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
      toast.error("Failed to fetch user data.");
    }
  };

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate("/login");
    toast.success("Logged out successfully.");
  };

  const getUser = () => user;

  const getToken = () => token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getUser, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
