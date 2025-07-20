import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyDonations = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myDonations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://food-bridge-server-side.vercel.app/donations?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this donation?");
    if (!confirmed) return;

    try {
      await axios.delete(`https://food-bridge-server-side.vercel.app/donations/${id}`);
      toast.success("Donation deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete donation");
      console.error(err);
    }
  };

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-[#257429] mb-6">
        🥘 My Posted Donations
      </h2>

      {myDonations.length === 0 ? (
        <p className="text-center text-gray-500">You haven't posted any donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-neutral p-4 rounded-lg shadow"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold">{donation.title}</h3>
              <p><strong>Food Type:</strong> {donation.foodType}</p>
              <p><strong>Quantity:</strong> {donation.quantity} {donation.unit || "kg"}</p>
              <p><strong>Location:</strong> {donation.location}</p>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>

              {/* Status Badge */}
              <div className="mt-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    donation.status === "Verified"
                      ? "bg-green-200 text-green-800"
                      : donation.status === "Rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {donation.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(donation._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

                {donation.status !== "Rejected" && (
                  <Link
                    to={`/dashboard/edit-donation/${donation._id}`}
                    className="btn btn-info btn-sm"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyDonations;