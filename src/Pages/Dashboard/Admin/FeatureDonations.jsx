// src/Pages/Dashboard/FeatureDonations.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeatureDonations = () => {
  const { data: verifiedDonations = [], refetch } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  const handleFeature = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Donation marked as featured!");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to mark as featured");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Verified Donations</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>Food Name</th>
              <th>Donor</th>
              <th>Location</th>
              <th>Featured</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {verifiedDonations.map((donation, idx) => (
              <tr key={donation._id}>
                <td>{idx + 1}</td>
                <td>{donation.foodName}</td>
                <td>{donation.donorEmail}</td>
                <td>{donation.location}</td>
                <td>{donation.featured ? "✅" : "❌"}</td>
                <td>
                  <button
                    onClick={() => handleFeature(donation._id)}
                    disabled={donation.featured}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                  >
                    {donation.featured ? "Featured" : "Make Featured"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;