import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import  AuthContext  from "../Provider/AuthContext";

import { toast } from "react-hot-toast";
import Logo from "../../src/assets/Food.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [isSticky, setIsSticky] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handling
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
    <div className={`md:px-8 px-4 py-2 bg-base-100 sticky top-0 z-50 transition-shadow duration-300 ${isSticky ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img src={Logo} alt="Logo" className="w-20 h-auto object-contain" />
          <span className="text-[#257429] text-xl md:text-2xl">Bridge</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-4 fonts-inter font-medium">
            {navLinks}
          </ul>

          {/* Theme + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className="text-xl">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

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
                    <button onClick={handleLogout} className="btn btn-sm mt-2 bg-[#F9A825] text-white hover:bg-[#f57f17]">
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
          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 space-y-2">
              {navLinks}
              <hr />
              <li>
                <button onClick={toggleTheme} className="flex items-center gap-2">
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                  <span>Toggle Theme</span>
                </button>
              </li>
              {user ? (
                <>
                  <li className="text-sm font-semibold text-center">{user.displayName}</li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-sm w-full bg-[#F9A825] text-white hover:bg-[#f57f17]">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
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