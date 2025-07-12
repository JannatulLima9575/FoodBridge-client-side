// src/Pages/Dashboard/Sidebar.jsx
import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-5">
      <h2 className="text-xl font-bold mb-6 text-center">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard/my-donations" className="block hover:underline">
            My Donations
          </Link>
        </li>
        <li>
          <Link to="/dashboard/summary" className="block hover:underline">
            Donation Summary
          </Link>
        </li>
        <li>
          <Link to="/" className="block hover:underline">
            Back to Home
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;