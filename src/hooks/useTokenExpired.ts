import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useTokenExpired = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext) {
      const isExpired = authContext.isTokenExpired();
      if (isExpired) {
        setShowModal(true);
      }
    }
  }, [authContext]);

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleGoHome = () => {
    setShowModal(false);
    localStorage.clear();
    navigate("/");
  };

  return { showModal, handleLogin, handleGoHome };
};

export default useTokenExpired;
