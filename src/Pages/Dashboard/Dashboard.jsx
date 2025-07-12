// src/Pages/Dashboard/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;