import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  // Load stored theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Handle theme switch
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="navbar px-4 md:px-8 py-2 shadow bg-base-100 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1">
        <a className="flex items-center gap-2 text-xl font-bold poppins-thin">
          <span className="text-[#F9A825]">Food</span>
          <span className="text-[#81C784]">Bridge</span>
          <span className="text-2xl">🍽️</span>
        </a>
      </div>

      {/* Right: Nav Items */}
      <div className="flex items-center gap-4">
        <ul className="hidden md:flex gap-4 font-medium fonts-inter">
          <li><a className="hover:text-primary">Home</a></li>
          <li><a className="hover:text-primary">All Donations</a></li>
          <li><a className="hover:text-primary">Dashboard</a></li>
          <li><a className="hover:text-primary">Login</a></li>
        </ul>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* User Avatar */}
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img src="https://i.pravatar.cc/150?img=32" alt="user" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Home</a></li>
            <li><a>All Donations</a></li>
            <li><a>Dashboard</a></li>
            <li><a>Login</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;