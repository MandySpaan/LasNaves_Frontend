import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/Admin/AdminNavbar/AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="layout-container">
      <AdminNavbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
