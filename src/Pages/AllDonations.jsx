import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
/* import toast from "react-hot-toast"; */
import { useNavigate } from "react-router";
import useAxiosSecure from "../../src/hooks/useAxiosSecure";

const AllDonations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: donations = [] } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const filteredDonations = donations
    .filter(
      (donation) =>
        donation.location?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        donation.status === "approved"
    )
    .sort((a, b) => {
      if (sortBy === "quantity") return b.quantity - a.quantity;
      if (sortBy === "pickupTime")
        return new Date(a.pickupTime) - new Date(b.pickupTime);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#257429] dark:text-[#F9A825] transition-colors duration-500">
        🍱 All Donations
      </h2>

      {/* 🔍 Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or zip code"
          className="input input-bordered w-full md:w-1/2 text-black dark:text-white dark:bg-neutral transition-colors duration-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4 text-black dark:text-white dark:bg-neutral transition-colors duration-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="quantity">Quantity (High → Low)</option>
          <option value="pickupTime">Pickup Time (Soonest)</option>
        </select>
      </div>

      {/* 🧾 Donation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDonations.map((donation) => (
          <div
            key={donation._id}
            className="p-4 bg-white dark:bg-neutral-800 shadow rounded-lg space-y-2 transition-colors duration-500"
          >
            {donation.image && (
              <img
                src={donation.image}
                alt={donation.foodType}
                className="w-full h-48 object-cover rounded"
              />
            )}

            <h3 className="text-xl font-semibold text-[#1e1e1e] dark:text-white transition-colors duration-500">
              {donation.foodType}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Location:</strong> {donation.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Pickup Time:</strong> {donation.pickupTime}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Status:</strong> {donation.status}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Restaurant:</strong> {donation.restaurantName || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Charity:</strong> {donation.charityName || "Not Assigned"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Approved:</strong> {donation.isApproved ? "✅" : "❌"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              <strong>Featured:</strong> {donation.isFeatured ? "⭐" : "❌"}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => navigate(`/donations/${donation._id}`)}
                className="bg-[#F9A825] hover:bg-[#f57f17] text-white px-3 py-1 rounded transition-colors duration-300"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
