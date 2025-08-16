import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthContext from "../Provider/AuthContext";
import { toast } from "react-hot-toast";

const FeatureDonations = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Fetch ONLY featured + approved + available donations
  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axios.get("/featured-donations");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-800 dark:text-gray-100">
        Loading...
      </p>
    );

  // ✅ Click handler to check user login before navigate
  const handleViewDetails = (id) => {
    if (!user) {
      toast.error("Please login to view details");
      navigate("/login");
      return;
    }
    navigate(`/donations/${id}`);
  };

  return (
    <section className="py-14 px-4 md:px-8 bg-[#FFFBE6] dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#257429] dark:text-orange-400 font-[Poppins] transition-colors duration-500">
          🍽️ Featured Donations
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 md:mb-12 fonts-inter transition-colors duration-500">
          Browse through our highlighted food donations, ready to be shared with those in need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden transition hover:shadow-xl duration-300"
            >
              <img
                src={donation.image}
                alt={donation.foodType}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2 fonts-inter">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-500">
                  {donation.foodType}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-500">
                  <span className="font-medium">Restaurant:</span>{" "}
                  {donation.restaurantName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-500">
                  <span className="font-medium">Location:</span>{" "}
                  {donation.location}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500">
                    Status:
                  </span>{" "}
                  <span
                    className={`font-bold ${
                      donation.status === "Available"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {donation.status}
                  </span>
                </p>
                <button
                  onClick={() => handleViewDetails(donation._id)}
                  className="inline-block mt-3 px-4 py-2 bg-[#F9A825] dark:bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureDonations;
