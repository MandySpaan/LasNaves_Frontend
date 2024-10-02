import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="admin-navbar">
      <h1 className="admin-navbar-title">Las Naves Admin</h1>
      <button className="admin-menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`admin-nav-links ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/" className="admin-leave" onClick={closeMenu}>
          Leave Admin View
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/rooms"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Rooms
        </NavLink>
        <NavLink
          to="/admin/access-history"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Access History
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Reports
        </NavLink>
        <NavLink
          to="/"
          onClick={() => {
            authContext?.logout();
            closeMenu();
          }}
        >
          Log Out
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
