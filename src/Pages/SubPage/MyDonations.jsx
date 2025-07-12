import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router";

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
      const res = await axios.get(
        `http://localhost:5000/api/my-donations?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to delete?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/donations/${id}`);
        refetch(); // ✅ Refresh after deletion
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-[#257429] mb-6">
        🥘 My Posted Donations
      </h2>

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
            <p>
              <strong>Status:</strong> {donation.status}
            </p>
            <p>
              <strong>Quantity:</strong> {donation.quantity} kg
            </p>
            <p>
              <strong>Location:</strong> {donation.location}
            </p>

            {/* ✅ Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleDelete(donation._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>

              <Link
                to={`/dashboard/edit-donation/${donation._id}`}
                className="btn btn-info btn-sm"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyDonations;