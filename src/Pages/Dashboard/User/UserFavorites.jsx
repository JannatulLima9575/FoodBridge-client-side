import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";
import { Link } from "react-router";

const UserFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `/favorites?email=${user.email}`
        );
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load favorites");
      }
    };

    if (user?.email) {
      fetchFavorites();
    }
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/favorites/${id}`);
      setFavorites(favorites.filter((fav) => fav._id !== id));
      toast.success("Removed from favorites");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-gray-800 lg:grid-cols-3 gap-4">
          {favorites.map((donation) => (
            <div
              key={donation._id}
              className="border rounded shadow p-4 flex flex-col bg-white dark:bg-gray-800"
            >
              <h3 className="font-semibold">{donation.donationTitle}</h3>
              <p>Restaurant: {donation.restaurantName}</p>
              <p>Location: {donation.location}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>Status: {donation.status}</p>
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/donations/${donation.donationId}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-center"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleRemove(donation._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;