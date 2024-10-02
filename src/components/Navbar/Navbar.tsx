import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const role = authContext?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Las Naves</h1>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {(role === "admin" || role === "superAdmin") && (
          <NavLink to="/admin" className="admin-link" onClick={closeMenu}>
            Go to Admin view
          </NavLink>
        )}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Rooms
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeMenu}
            >
              Profile
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
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeMenu}
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeMenu}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
