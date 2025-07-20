import React from "react";

const MyReviews = () => {
  const reviews = [
    {
      id: 1,
      donationTitle: "Fresh Bread Donation",
      restaurant: "Foodies Bakery",
      time: "2 days ago",
      description: "Very fresh and good quality!",
    },
    // ... more dummy data
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded p-4 flex flex-col gap-2"
          >
            <h3 className="font-semibold">{review.donationTitle}</h3>
            <p>Restaurant: {review.restaurant}</p>
            <p>{review.description}</p>
            <p className="text-sm text-gray-600">Reviewed: {review.time}</p>
            <button className="bg-red-600 text-white px-3 py-1 rounded self-start">
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;