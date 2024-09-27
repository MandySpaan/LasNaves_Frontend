import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Las Naves</h1>
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
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
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
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
