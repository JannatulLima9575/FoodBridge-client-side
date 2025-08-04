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
    const confirmFeature = confirm("Feature this donation on homepage?");
    if (!confirmFeature) return;

    try {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Donation marked as featured!");
        refetch();
      }else{
        toast.success("Donation already marked as featured!");
      }
    } catch (error) {
      toast.error("Failed to mark as featured", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>

      {verifiedDonations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Restaurant Name</th>
                <th>Featured</th>
                <th>Feature Action</th>
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
                  <td className="font-semibold">{donation.title}</td>
                  <td>{donation.foodType || "N/A"}</td>
                  <td>{donation.restaurantName || "N/A"}</td>
                  <td className="text-center text-lg">
                    {donation.isFeatured? "✅" : "❌"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleFeature(donation._id)}
                      disabled={donation.isFeatured}
                      className={`btn btn-sm ${
                        donation.isFeatured
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {donation.isFeatured ? "Featured" : "Make Featured"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No verified donations found.</p>
      )}
    </div>
  );
};

export default FeatureDonations;