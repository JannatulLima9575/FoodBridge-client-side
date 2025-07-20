import React from "react";

const Favorites = () => {
  // Example data
  const favoriteDonations = [
    {
      id: 1,
      title: "Fresh Bread Donation",
      restaurant: "Foodies Bakery",
      location: "Sylhet",
      quantity: "5 kg",
      status: "Available",
    },
    // ... more dummy data
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteDonations.map((donation) => (
          <div
            key={donation.id}
            className="border rounded shadow p-4 flex flex-col"
          >
            <h3 className="font-semibold">{donation.title}</h3>
            <p>Restaurant: {donation.restaurant}</p>
            <p>Location: {donation.location}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Status: {donation.status}</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Details
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;