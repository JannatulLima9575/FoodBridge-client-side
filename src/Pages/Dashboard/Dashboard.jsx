import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaChartPie,
  FaList,
  FaEdit,
  FaClipboardList,
  FaHome,
  FaUsers,
  FaUtensils,
  FaDonate,
  FaStar,
  FaHistory,
  FaUserAlt,
  FaHandHoldingHeart,
  FaBoxOpen,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdReportProblem } from "react-icons/md";
import useAuth from "../../Provider/useAuth";
import useRestaurant from "./../../hooks/useRestaurant";
import useCharity from "./../../hooks/useCharity";
import useAdmin from "./../../hooks/useAdmin";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const { isRestaurant, isRestaurantLoading } = useRestaurant();
  const { isCharity, isCharityLoading } = useCharity();
  const { isAdmin, isAdminLoading } = useAdmin();

  // 🕐 Loading state handle
  if (isRestaurantLoading || isCharityLoading || isAdminLoading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  // Optional: fetch users with token if you want (as in your original code)
  const token = localStorage.getItem("token");
  axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("This is Restaurant", isRestaurant);
  console.log("This is useCharity", isCharity);
  console.log("This is useAdmin", isAdmin);
  console.log("This is user", user);

  // Identify if current user is a normal user (no special role)
  const isUser = !isAdmin && !isCharity && !isRestaurant;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-100 p-5 shadow-md">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          {/* 🍽 Restaurant Menu */}
          {isRestaurant && (
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
                  to="/dashboard/add-donation"
                  className="flex items-center gap-2"
                >
                  <FaEdit /> Add Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-donations"
                  className="flex items-center gap-2"
                >
                  <FaList /> My Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/view-requests"
                  className="flex items-center gap-2"
                >
                  <FaClipboardList /> View Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/statistics"
                  className="flex items-center gap-2"
                >
                  📊 Donation Stats
                </Link>
              </li>
            </>
          )}

          {/* ❤️ Charity Menu */}
          {isCharity && (
            <>
              <li>
                <Link
                  to="/dashboard/charity-profile"
                  className="flex items-center gap-2"
                >
                  <CgProfile /> Charity Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-requests"
                  className="flex items-center gap-2"
                >
                  <FaClipboardList /> My Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-pickups"
                  className="flex items-center gap-2"
                >
                  <FaBoxOpen /> My Pickups
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/received-donations"
                  className="flex items-center gap-2"
                >
                  <FaHandHoldingHeart /> Received Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/transaction-history"
                  className="flex items-center gap-2"
                >
                  <FaHistory /> Transaction History
                </Link>
              </li>
            </>
          )}

          {/* 🔐 Admin Menu */}
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manage-donations"
                  className="flex items-center gap-2"
                >
                  <FaUtensils /> Manage Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/reported-donations"
                  className="flex items-center gap-2"
                >
                  <MdReportProblem /> Reported Donations
                </Link>
              </li>
            </>
          )}

          {/* 👤 User Menu (Normal User Role) */}
          {isUser && (
            <>
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2"
                >
                  <FaUserAlt /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/request-charity"
                  className="flex items-center gap-2"
                >
                  <FaHandHoldingHeart /> Request Charity Role
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user-favorites"
                  className="flex items-center gap-2"
                >
                  <FaStar /> Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-2"
                >
                  <FaEdit /> My Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/transactions"
                  className="flex items-center gap-2"
                >
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
          {/* Profile Link for non-users (restaurant, charity, admin) */}
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
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
