import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router";
import {
  FaBars,
  FaChartPie,
  FaList,
  FaEdit,
  FaClipboardList,
  FaHome,
  FaUsers,
  FaUtensils,
  FaStar,
  FaHistory,
  FaUserAlt,
  FaHandHoldingHeart,
  FaBoxOpen,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import AuthContext from "../../Provider/AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return <div className="p-10 text-gray-700 dark:text-gray-300">Loading dashboard...</div>;
  }

  // Optional fetch with token
  const token = localStorage.getItem("token");
  axios.get("/users", { headers: { Authorization: `Bearer ${token}` } });

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-green-100 dark:bg-gray-800 p-5 shadow-md flex flex-col h-full fixed z-50 top-0 left-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Dashboard</h2>
        <ul className="space-y-3 flex-1">
          {/* Restaurant Menu */}
          {user.role === "restaurant" && (
            <>
              <li>
                <Link to="/dashboard/analytics" className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400">
                  <FaChartPie /> Analytics
                </Link>
              </li>
              <li>
                <Link to="/dashboard/restaurant-profile" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaChartPie /> Restaurant Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-donation" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaEdit /> Add Donation
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-donations" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaList /> My Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/view-requests" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaClipboardList /> View Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/statistics" className="flex items-center gap-2" onClick={handleLinkClick}>
                  📊 Donation Stats
                </Link>
              </li>
            </>
          )}

          {/* Charity Menu */}
          {user.role === "charity" && (
            <>
              <li>
                <Link to="/dashboard/charity-profile" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <CgProfile /> Charity Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-requests" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaClipboardList /> My Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-pickups" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaBoxOpen /> My Pickups
                </Link>
              </li>
              <li>
                <Link to="/dashboard/received-donations" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaHandHoldingHeart /> Received Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transaction-history" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaHistory /> Transaction History
                </Link>
              </li>
            </>
          )}

          {/* Admin Menu */}
          {user.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/admin-profile" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <CgProfile /> Admin Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-donations" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaUtensils /> Manage Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-users" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/role-requests" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaClipboardList /> Manage Role Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-requests" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaClipboardList /> Manage Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/feature-donations" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaStar /> Feature Donations
                </Link>
              </li>
            </>
          )}

          {/* User Menu */}
          {user.role === "user" && (
            <>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaUserAlt /> My Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/request-charity" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaHandHoldingHeart /> Request Charity Role
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user-favorites" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaStar /> Favorites
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-reviews" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaEdit /> My Reviews
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transactions" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <FaHistory /> Transaction History
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Common Links */}
        <div className="md:pt-80 md:pb-0 items-end">
          <Link to="/" className="flex items-center gap-2 mb-3 hover:text-green-600 dark:hover:text-green-400" onClick={handleLinkClick}>
            <FaHome /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 md:ml-64">
        {/* Top bar for small screens */}
        <button
          className="md:hidden mb-4 p-2 bg-green-500 text-white dark:bg-green-700 rounded"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
