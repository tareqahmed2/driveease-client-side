import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/driveease.jpeg";
import useAuth from "../hooks/useAuth";
import {
  FaHome,
  FaCar,
  FaSignInAlt,
  FaPlusCircle,
  FaCarAlt,
  FaClipboardList,
} from "react-icons/fa";

/* DaisyUI themes */
const daisyThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  /* apply daisyUI theme */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const getNavLinkClass = (isActive) =>
    `flex items-center gap-2 font-semibold transition-colors ${
      isActive
        ? "text-primary"
        : "text-base-content hover:text-primary"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
          <FaHome /> Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/available-cars"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <FaCar /> Available Cars
        </NavLink>
      </li>

      {!user && (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <FaSignInAlt /> Login
          </NavLink>
        </li>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/add-car"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FaPlusCircle /> Add Car
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-cars"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FaCarAlt /> My Cars
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FaClipboardList /> My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-6">
        {/* Left */}
        <div className="navbar-start gap-3">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <img
            src={logo}
            alt="DriveEase logo"
            className="w-10 h-10 rounded-full cursor-pointer ring ring-primary ring-offset-base-100 ring-offset-2"
            onClick={() => navigate("/")}
          />
          <h2 className="text-xl font-bold hidden md:block">
            DriveEase
          </h2>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {/* Theme switcher */}
          <select
            className="select select-bordered select-sm"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {daisyThemes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
              >
                <p className="text-sm font-semibold text-center mb-2">
                  {user?.displayName}
                </p>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary btn-sm"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
