// src/Pages/Dashboard/AdminProfile.jsx
import React from "react";
import { useContext } from "react";
import AuthContext from "../../../Provider/AuthContext";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/2Y3r5Yk/default-user.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Name: {user?.displayName || "N/A"}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Email: {user?.email || "N/A"}
        </p>
        <p className="text-green-600 mt-2">Role: Admin</p>
      </div>
    </div>
  );
};

export default AdminProfile;