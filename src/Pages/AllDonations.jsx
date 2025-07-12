import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const AllDonations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("latest"); // 👈 sort state

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/donations");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  // ✅ Filter and Search
  let filteredDonations = donations
    .filter((donation) => donation.status === "Verified")
    .filter((donation) =>
      donation.foodType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((donation) => {
      if (filterStatus === "All") return true;
      return donation.status === filterStatus;
    });

  // ✅ Sort Donations
  if (sortBy === "latest") {
    filteredDonations.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortBy === "quantity") {
    filteredDonations.sort((a, b) => b.quantity - a.quantity);
  }

  return (
    <section className="min-h-screen bg-white dark:bg-neutral-900 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#257429] text-center mb-6">
          🥗 All Available Donations
        </h2>

        {/* 🔍 Search + Filter + Sort */}
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by food type"
            className="input input-bordered w-full md:max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered w-full md:max-w-xs"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Requested">Requested</option>
            <option value="Picked Up">Picked Up</option>
          </select>

          <select
            className="select select-bordered w-full md:max-w-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">🕒 Latest</option>
            <option value="quantity">🏋️ Highest Quantity</option>
          </select>
        </div>

        {/* 💡 Filter Result */}
        {filteredDonations.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No donations found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <div
                key={donation._id}
                className="bg-base-100 dark:bg-neutral p-5 rounded-xl shadow-md"
              >
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{donation.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Restaurant:</strong> {donation.restaurantName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Location:</strong> {donation.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-medium ${
                      donation.status === "Available"
                        ? "text-green-600"
                        : donation.status === "Picked Up"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {donation.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <strong>Quantity:</strong> {donation.quantity} kg
                </p>
                <Link
                  to={`/donations/${donation._id}`}
                  className="btn btn-outline btn-sm btn-success"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllDonations;