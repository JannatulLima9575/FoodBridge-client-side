import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out!"))
      .catch(() => toast.error("Logout failed!"));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/donations">All Donations</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="md:px-8 px-4 py-2 shadow bg-base-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-[#F9A825]">Food</span>
          <span className="text-[#81C784]">Bridge</span>
          <span className="text-2xl">🍽️</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-4 font-medium">
            {navLinks}
          </ul>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="font-semibold text-sm">{user.displayName || "User"}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm mt-2 bg-[#F9A825] text-white hover:bg-[#f57f17]"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm bg-[#F9A825] text-white hover:bg-[#f57f17]">
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
              {user ? (
                <li><button onClick={handleLogout}>Logout</button></li>
              ) : (
                <li><NavLink to="/login">Login</NavLink></li>
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;