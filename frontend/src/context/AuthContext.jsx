import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { storeToken, clearToken, getToken } from "../utils/tokenUtils";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = getToken();
      const storedUser = localStorage.getItem("user");
      return token && storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Auth init failed:", e);
      return null;
    }
  });

  const login = (userData, token) => {
    storeToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  // Optional: auto-logout if token disappears
  useEffect(() => {
    if (!getToken() && user) {
      logout();
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
