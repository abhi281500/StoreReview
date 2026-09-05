import { createContext, useContext, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth.service.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (data) => {
    const response = await loginUser(data);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setUser(response.user);

    return response;
  };

  const register = async (data) => {
    return await registerUser(data);
  };

  const logout = async () => {
    await logoutUser();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);