import React from "react";
import { Link } from "react-router";

const featuredDonations = [
  {
    id: 1,
    image: "https://i.ibb.co/4ZRsdMMP/image.png",
    foodType: "Bakery",
    restaurant: "Fresh Bites",
    location: "Dhaka, Bangladesh",
    status: "Available",
  },
  {
    id: 2,
    image: "https://i.ibb.co/hFJq6fj3/image.png",
    foodType: "Produce",
    restaurant: "Green Valley",
    location: "Sylhet, Bangladesh",
    status: "Picked Up",
  },
  {
    id: 3,
    image: "https://i.ibb.co/QvTRrL11/image.png",
    foodType: "Prepared Meals",
    restaurant: "Daily Dine",
    location: "Chittagong, Bangladesh",
    status: "Available",
  },
  {
    id: 4,
    image: "https://i.ibb.co/PvMQ3xGQ/image.png",
    foodType: "Dairy",
    restaurant: "Milk & More",
    location: "Rajshahi, Bangladesh",
    status: "Available",
  },
];

const FeaturedDonations = () => {
  return (
    <section className="py-14 px-4 md:px-8 bg-[#fffceb] dark:bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#257429] dark:text-[#c8facc] font-[Poppins]">
          🍽️ Featured Donations
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 md:mb-12 fonts-inter">
          Browse through our highlighted food donations, ready to be shared with
          those in need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white dark:bg-[#2b2b2b] shadow-md rounded-xl overflow-hidden transition hover:shadow-xl"
            >
              <img
                src={donation.image}
                alt={donation.foodType}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2 fonts-inter">
                <h3 className="text-xl font-semibold text-[#1e1e1e] dark:text-white">
                  {donation.foodType}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Restaurant:</span>{" "}
                  {donation.restaurant}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Location:</span>{" "}
                  {donation.location}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
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
                <Link
                  to={`/donation-details/${donation.id}`}
                  className="inline-block mt-3 px-4 py-2 bg-[#F9A825] text-white rounded-lg hover:bg-[#f57f17] transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDonations;
