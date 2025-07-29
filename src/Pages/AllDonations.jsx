import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../src/hooks/useAxiosSecure";

const AllDonations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
    const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();


  const { data: donations = [], refetch } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/donations/${id}/approve`);
      toast.success("Approved!");
      refetch();
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleFeature = async (id) => {
    try {
      await axiosSecure.patch(`/donations/${id}/feature`);
      toast.success("Featured!");
      refetch();
    } catch {
      toast.error("Failed to mark as featured.");
    }
  };

  const filteredDonations = donations
    .filter((donation) =>
      donation.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "quantity") return b.quantity - a.quantity;
      if (sortBy === "pickupTime")
        return new Date(a.pickupTime) - new Date(b.pickupTime);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">🍱 All Donations</h2>

      {/* 🔍 Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by city or zip code"
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
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
            className="p-4 bg-white shadow rounded-lg space-y-2"
          >
            {donation.image && (
              <img
                src={donation.image}
                alt={donation.foodType}
                className="w-full h-48 object-cover rounded"
              />
            )}

            <h3 className="text-xl font-semibold">{donation.foodType}</h3>
            <p>
              <strong>Location:</strong> {donation.location}
            </p>
            <p>
              <strong>Pickup Time:</strong> {donation.pickupTime}
            </p>
            <p>
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p>
              <strong>Status:</strong> {donation.status}
            </p>
            <p>
              <strong>Restaurant:</strong> {donation.restaurantName || "N/A"}
            </p>
            <p>
              <strong>Charity:</strong> {donation.charityName || "Not Assigned"}
            </p>
            <p>
              <strong>Approved:</strong> {donation.isApproved ? "✅" : "❌"}
            </p>
            <p>
              <strong>Featured:</strong> {donation.isFeatured ? "⭐" : "❌"}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {!donation.isApproved && (
                <button
                  onClick={() => handleApprove(donation._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
              {donation.isApproved && !donation.isFeatured && (
                <button
                  onClick={() => handleFeature(donation._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Feature
                </button>
              )}
              <button
                onClick={() => navigate(`/donations/${donation._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
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