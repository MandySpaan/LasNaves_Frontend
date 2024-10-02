import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

interface DecodedToken {
  role: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setRole(decodedToken.role);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    const decodedToken = jwtDecode<DecodedToken>(token);
    setRole(decodedToken.role);

    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
