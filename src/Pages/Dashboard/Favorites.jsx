import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import AuthContext from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Removed from favorites!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to remove favorite.", error);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading favorites...</p>;

  if (favorites.length === 0) {
    return <p className="text-center py-10 text-gray-500">No favorites saved yet.</p>;
  }

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((item) => (
        <div key={item._id} className="bg-base-100 shadow-md rounded p-4 border">
          <img
            src={item.image}
            alt={item.donationTitle}
            className="h-40 w-full object-cover rounded mb-3"
          />
          <h3 className="text-xl font-semibold mb-1">{item.donationTitle}</h3>
          <p className="text-sm text-gray-500 mb-1">{item.restaurantName} | {item.location}</p>
          <p className="text-sm mb-1">Status: <span className="font-medium">{item.status}</span></p>
          <p className="text-sm mb-3">Quantity: <span className="font-medium">{item.quantity}</span></p>

          <div className="flex justify-between items-center mt-3">
            <Link to={`/donation-details/${item.donationId}`}>
              <button className="btn btn-sm btn-primary">Details</button>
            </Link>
            <button
              onClick={() => handleRemove(item._id)}
              className="btn btn-sm btn-error"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;