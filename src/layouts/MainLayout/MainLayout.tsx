import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useTokenExpired from "../../hooks/useTokenExpired";
import TokenExpiredModal from "../../components/Modals/TokenExpiredModal/TokenExpiredModal";
import "./MainLayout.css";

const MainLayout = () => {
  const { showModal, handleLogin, handleGoHome } = useTokenExpired();
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />

      {showModal && (
        <TokenExpiredModal onConfirm={handleLogin} onCancel={handleGoHome} />
      )}
    </div>
  );
};

export default MainLayout;
