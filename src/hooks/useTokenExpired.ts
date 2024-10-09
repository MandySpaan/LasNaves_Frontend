import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useTokenExpired = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (authContext) {
        const isExpired = authContext.isTokenExpired();
        setShowModal(isExpired);
      }
    };

    checkTokenExpiration();
    window.addEventListener("click", checkTokenExpiration);
    window.addEventListener("keydown", checkTokenExpiration);

    return () => {
      window.removeEventListener("click", checkTokenExpiration);
      window.removeEventListener("keydown", checkTokenExpiration);
    };
  }, [authContext, authContext?.token]);

  const handleLogin = () => {
    setShowModal(false);
    authContext?.logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    setShowModal(false);
    localStorage.clear();
    authContext?.logout();
    navigate("/");
  };

  return { showModal, handleLogin, handleGoHome };
};

export default useTokenExpired;
