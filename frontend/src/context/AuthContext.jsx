import { createContext, useContext, useState } from "react";
import { storeToken, clearToken, getToken } from "../utils/tokenUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  try {
    const token = getToken();
    const userData = localStorage.getItem("user");
    return token && userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Failed to load user from storage:", err);
    return null;
  }
});


  const login = (userData, token) => {
    setUser(userData);
    storeToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    clearToken();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
