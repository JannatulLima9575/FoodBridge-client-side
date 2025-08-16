import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "../Provider/AuthContext";

import { toast } from "react-hot-toast";
import Logo from "../../src/assets/Food.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out!"))
      .catch(() => toast.error("Logout failed!"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink className="hover:text-orange-500 dark:hover:text-orange-400" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-orange-500 dark:hover:text-orange-400" to="/donations">
          All Donations
        </NavLink>
      </li>
      <li>
        <NavLink className="hover:text-orange-500 dark:hover:text-orange-400" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`md:px-8 px-4 py-2 sticky top-0 z-50 transition-shadow duration-300 
                  bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                  ${isSticky ? "shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src={Logo} alt="Logo" className="w-20 h-auto object-contain" />
          <span className="text-[#257429] dark:text-orange-400 text-xl md:text-2xl">Bridge</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-4 font-medium">
            {navLinks}
          </ul>

          {/* Theme + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content 
                             bg-white dark:bg-gray-800 rounded-box w-52"
                >
                  <li className="font-semibold text-sm">{user.displayName || "User"}</li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm mt-2 bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow 
                         bg-white dark:bg-gray-800 rounded-box w-52 space-y-2"
            >
              {navLinks}
              <hr className="border-gray-300 dark:border-gray-600" />
              <li>
                <ThemeToggle />
              </li>
              {user ? (
                <>
                  <li className="text-sm font-semibold text-center">{user.displayName}</li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm w-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink className="hover:text-orange-500 dark:hover:text-orange-400" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
