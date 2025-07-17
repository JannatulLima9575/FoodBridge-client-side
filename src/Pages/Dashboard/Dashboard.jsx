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
} from "react-icons/fa";
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
            </>
          )}

          {/* ❤️ Charity Menu */}
          {isCharity && (
            <>
              <li>
                <Link
                  to="/dashboard/my-payments"
                  className="flex items-center gap-2"
                >
                  <FaDonate /> My Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/favorites"
                  className="flex items-center gap-2"
                >
                  ❤️ Favorites
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
            </>
          )}

          {/* Common */}
          <li>
            <Link to="/" className="flex items-center gap-2">
              <FaHome /> Back to Home
            </Link>
          </li>
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
