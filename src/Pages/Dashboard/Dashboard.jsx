import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaChartPie,
  FaList,
  FaEdit,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";
import useAuth from "../../Provider/useAuth";
import useRestaurant from "../../hooks/useRestaurant";

const Dashboard = () => {
  const { user } = useAuth();
  const isRestaurant = useRestaurant();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-100 p-5 shadow-md">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-3">
          {user?.role === "restaurant" && (
            <>
              <li>
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center gap-2"
                >
                  <FaChartPie /> Analytics
                </Link>
              </li>
              {isRestaurant && (
                <li>
                  <Link to="/dashboard/add-donation">Add Donation</Link>
                </li>
              )}
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
                <Link to="/" className="flex items-center gap-2">
                  <FaHome /> Back to Home
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
