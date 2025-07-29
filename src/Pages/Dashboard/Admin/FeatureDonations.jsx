import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: verifiedDonations = [], refetch } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  const handleFeature = async (id) => {
    if (!confirm("Feature this donation on homepage?")) return;

    try {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Donation marked as featured!");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to mark as featured", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Verified Donations</h2>

      {verifiedDonations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Image</th>
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
                  <td>
                    <img
                      src={donation.image || "https://via.placeholder.com/60"}
                      alt="food"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{donation.foodName}</td>
                  <td>{donation.donorEmail}</td>
                  <td>{donation.location}</td>
                  <td>{donation.featured ? "✅" : "❌"}</td>
                  <td>
                    <button
                      onClick={() => handleFeature(donation._id)}
                      disabled={donation.featured}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                    >
                      {donation.featured ? "Featured" : "Make Featured"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No verified donations found.</p>
      )}
    </div>
  );
};

export default FeatureDonations;