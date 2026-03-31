import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

const eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getCookie('vouch_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCookie('vouch_user');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        eraseCookie('vouch_user');
        setUser(null);
      }
    }
    setIsLoading(false);
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setCookie('vouch_token', authToken);
    setCookie('vouch_user', JSON.stringify(userData));
  };

  const register = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setCookie('vouch_token', authToken);
    setCookie('vouch_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    eraseCookie('vouch_token');
    eraseCookie('vouch_user');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
