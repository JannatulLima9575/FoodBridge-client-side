import React from "react";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access 🚫</h1>
      <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
      <Link to="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 duration-200">
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;