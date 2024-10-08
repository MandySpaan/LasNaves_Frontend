import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useTokenExpired = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext) {
      const checkTokenExpiration = () => {
        const isExpired = authContext.isTokenExpired();
        if (isExpired) {
          setShowModal(true);
          window.removeEventListener("click", checkTokenExpiration);
          window.removeEventListener("keydown", checkTokenExpiration);
        }
      };
      checkTokenExpiration();
      window.addEventListener("click", checkTokenExpiration);
      window.addEventListener("keydown", checkTokenExpiration);

      return () => {
        window.removeEventListener("click", checkTokenExpiration);
        window.removeEventListener("keydown", checkTokenExpiration);
      };
    }
  }, [authContext]);

  const handleLogin = () => {
    setShowModal(false);
    authContext?.logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    setShowModal(false);
    authContext?.logout();
    navigate("/");
  };

  return { showModal, handleLogin, handleGoHome };
};

export default useTokenExpired;
