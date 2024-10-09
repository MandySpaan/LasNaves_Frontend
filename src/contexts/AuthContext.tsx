import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, useCallback } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

interface DecodedToken {
  role: string;
  exp: number;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const isTokenExpired = useCallback(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.exp * 1000 < Date.now();
      } catch (error) {
        console.error("Invalid token:", error);
        return true;
      }
    }
    return false;
  }, [token]);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setRole(null);
    } else if (isTokenExpired()) {
      setIsLoggedIn(false);
      setRole(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setToken(null);
    } else {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setRole(decodedToken.role);
    }
  }, [token, isTokenExpired]);

  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);

    const decodedToken = jwtDecode<DecodedToken>(token);
    setRole(decodedToken.role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, token, login, logout, isTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};
