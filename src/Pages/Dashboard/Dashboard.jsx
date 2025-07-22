import React, { useState } from "react";
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
import useAuth from "../../Provider/useAuth";
import useRestaurant from "../../hooks/useRestaurant";
import useCharity from "../../hooks/useCharity";
import useAdmin from "../../hooks/useAdmin";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const { isRestaurant, isRestaurantLoading } = useRestaurant();
  const { isCharity, isCharityLoading } = useCharity();
  const { isAdmin, isAdminLoading } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isRestaurantLoading || isCharityLoading || isAdminLoading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  // Optional fetch with token
  const token = localStorage.getItem("token");
  axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const isUser = !isAdmin && !isCharity && !isRestaurant;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-green-100 p-5 shadow-md  md:translate-x-0 
        fixed z-50 top-0 left-0 h-full transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          {/* 🍽 Restaurant Menu */}
          {isRestaurant && (
            <>
              <li>
                <Link to="/dashboard/analytics" className="flex items-center gap-2">
                  <FaChartPie /> Analytics
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-donation" className="flex items-center gap-2">
                  <FaEdit /> Add Donation
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-donations" className="flex items-center gap-2">
                  <FaList /> My Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/view-requests" className="flex items-center gap-2">
                  <FaClipboardList /> View Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/statistics" className="flex items-center gap-2">
                  📊 Donation Stats
                </Link>
              </li>
            </>
          )}

          {/* ❤️ Charity Menu */}
          {isCharity && (
            <>
              <li>
                <Link to="/dashboard/charity-profile" className="flex items-center gap-2">
                  <CgProfile /> Charity Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-requests" className="flex items-center gap-2">
                  <FaClipboardList /> My Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-pickups" className="flex items-center gap-2">
                  <FaBoxOpen /> My Pickups
                </Link>
              </li>
              <li>
                <Link to="/dashboard/received-donations" className="flex items-center gap-2">
                  <FaHandHoldingHeart /> Received Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transaction-history" className="flex items-center gap-2">
                  <FaHistory /> Transaction History
                </Link>
              </li>
            </>
          )}

          {/* 🔐 Admin Menu */}
          {isAdmin && (
            <>
              <li>
                <Link to="/dashboard/manage-users" className="flex items-center gap-2">
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-donations" className="flex items-center gap-2">
                  <FaUtensils /> Manage Donations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/reported-donations" className="flex items-center gap-2">
                  <MdReportProblem /> Reported Donations
                </Link>
              </li>
            </>
          )}

          {/* 👤 User Menu */}
          {isUser && (
            <>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2">
                  <FaUserAlt /> My Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/request-charity" className="flex items-center gap-2">
                  <FaHandHoldingHeart /> Request Charity Role
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user-favorites" className="flex items-center gap-2">
                  <FaStar /> Favorites
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-reviews" className="flex items-center gap-2">
                  <FaEdit /> My Reviews
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transactions" className="flex items-center gap-2">
                  <FaHistory /> Transaction History
                </Link>
              </li>
            </>
          )}

          {/* Common */}
          <li>
            <Link to="/" className="flex items-center gap-2">
              <FaHome /> Back to Home
            </Link>
          </li>

          {/* Profile Link for non-users */}
          {!isUser && (
            <li>
              <Link to="/dashboard/profile" className="flex items-center gap-2">
                <CgProfile /> Edit Profile
              </Link>
            </li>
          )}
        </ul>
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