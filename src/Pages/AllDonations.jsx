import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AllDonations = () => {
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/donations");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/donations/${id}/approve`);
      toast.success("Approved!");
      refetch();
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleFeature = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/donations/${id}/feature`);
      toast.success("Featured!");
      refetch();
    } catch {
      toast.error("Failed to mark as featured.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍱 All Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donations.map((donation) => (
          <div key={donation._id} className="p-4 rounded bg-white shadow-md space-y-2">
            <h3 className="text-xl font-semibold">{donation.foodType}</h3>
            <p><strong>Status:</strong> {donation.status}</p>
            <p><strong>Approved:</strong> {donation.isApproved ? "✅" : "❌"}</p>
            <p><strong>Featured:</strong> {donation.isFeatured ? "⭐" : "❌"}</p>
            {!donation.isApproved && (
              <button
                onClick={() => handleApprove(donation._id)}
                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;