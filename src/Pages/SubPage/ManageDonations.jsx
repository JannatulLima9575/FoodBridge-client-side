import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCheck, FaStar, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageDonations = () => {
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["admin-donations"],
    queryFn: async () => {
      const res = await axios.get("/donations");
      return res.data;
    },
  });
  const axios = useAxiosSecure();

  // ✅ Approve Donation
  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`/donations/${id}`, {
        isApproved: true,
        status: "Available",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Donation approved!");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to approve", err);
    }
  };

  // ⭐ Feature Donation
  const handleFeature = async (id) => {
    try {
      const res = await axios.put(`/donations/${id}`, {
        isFeatured: true,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Marked as featured!");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to feature", err);
    }
  };

  // ❌ Delete Donation
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`/donations/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Deleted successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🍽 Manage All Donations</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-green-100 text-gray-800">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Restaurant</th>
              <th>Status</th>
              <th>Approved</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={donation._id}>
                <td>{idx + 1}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.status}</td>
                <td>{donation.isApproved ? "✅" : "❌"}</td>
                <td>{donation.isFeatured ? "🌟" : "❌"}</td>
                <td className="space-x-2">
                  {!donation.isApproved && (
                    <button
                      onClick={() => handleApprove(donation._id)}
                      className="btn btn-sm btn-success"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {!donation.isFeatured && (
                    <button
                      onClick={() => handleFeature(donation._id)}
                      className="btn btn-sm btn-warning"
                      title="Feature"
                    >
                      <FaStar />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-sm btn-error"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {donations.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageDonations;