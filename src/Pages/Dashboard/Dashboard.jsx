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
import { MdReportProblem } from "react-icons/md";
// import useAuth from "../../Provider/useAuth";
/* import useRestaurant from "../../hooks/useRestaurant";
import useCharity from "../../hooks/useCharity";
import useAdmin from "../../hooks/useAdmin"; */
// import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import AuthContext from "../../Provider/AuthContext";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const axios = useAxiosSecure();

  /*   const { isRestaurant, isRestaurantLoading } = useRestaurant();
  const { isCharity, isCharityLoading } = useCharity();
  const { isAdmin, isAdminLoading } = useAdmin(); */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (/* isRestaurantLoading || isCharityLoading || isAdminLoading */ loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  // Optional fetch with token
  const token = localStorage.getItem("token");
  axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  /*  const isUser = !isAdmin && !isCharity && !isRestaurant; */
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-green-100 p-5 shadow-md flex flex-col h-full md:translate-x-0 
  fixed z-50 top-0 left-0 transform transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3 flex-1">
          {/* 🍽 Restaurant Menu */}
          {
            /* isRestaurant */ user.role === "restaurant" && (
              <>
                <li>
                  <Link
                    to="/dashboard/analytics"
                    className="flex items-center gap-2"
                  >
                    <FaChartPie /> Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/restaurant-profile"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaChartPie /> Restaurant Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-donation"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaEdit /> Add Donation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-donations"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaList /> My Donations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/view-requests"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaClipboardList /> View Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/statistics"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    📊 Donation Stats
                  </Link>
                </li>
              </>
            )
          }

          {/* ❤️ Charity Menu */}
          {
            /* isCharity */ user.role === "charity" && (
              <>
                <li>
                  <Link
                    to="/dashboard/charity-profile"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <CgProfile /> Charity Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-requests"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaClipboardList /> My Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-pickups"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaBoxOpen /> My Pickups
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/received-donations"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaHandHoldingHeart /> Received Donations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/transaction-history"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaHistory /> Transaction History
                  </Link>
                </li>
              </>
            )
          }

          {/* 🔐 Admin Menu */}
          {
            /* isAdmin */ user.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/admin-profile"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <CgProfile /> Admin Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-donations"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUtensils /> Manage Donations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUsers /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/role-requests"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaClipboardList /> Manage Role Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-requests"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaClipboardList /> Manage Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/feature-donations"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaStar /> Feature Donations
                  </Link>
                </li>
              </>
            )
          }

          {/* 👤 User Menu */}
          {
            /* isUser */ user.role === "user" && (
              <>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUserAlt /> My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/request-charity"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaHandHoldingHeart /> Request Charity Role
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user-favorites"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaStar /> Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-reviews"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaEdit /> My Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/transactions"
                    className="flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaHistory /> Transaction History
                  </Link>
                </li>
              </>
            )
          }
        </ul>
        {/* Common */}
        <div className="md:pt-80 md:pb-0 items-end">
          <Link
            to="/"
            className="flex items-center gap-2 mb-3"
            onClick={handleLinkClick}
          >
            <FaHome /> Back to Home
          </Link>

          {/* Profile Link for non-users */}
          {
            /* !isUser */ !user.role === "user" && (
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2"
                onClick={handleLinkClick}
              >
                <CgProfile /> Edit Profile
              </Link>
            )
          }
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 md:ml-64">
        {/* Top bar for small screens */}
        <button
          className="md:hidden mb-4 p-2 bg-green-500 text-white rounded"
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
