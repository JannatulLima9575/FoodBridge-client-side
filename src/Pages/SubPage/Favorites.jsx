import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const Favorites = () => {
  const { user } = useContext(AuthContext);

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/favorites?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading favorites...</p>;

  return (
    <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div key={fav._id} className="bg-base-100 shadow-md rounded p-4">
          <img src={fav.image} alt={fav.donationTitle} className="h-40 w-full object-cover rounded mb-3" />
          <h3 className="text-xl font-semibold">{fav.donationTitle}</h3>
          <p className="text-sm text-gray-500">{fav.restaurantName}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;