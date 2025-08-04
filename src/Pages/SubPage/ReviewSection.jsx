import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewSection = ({ donationId }) => {
  const [reviews, setReviews] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    axios.get(`/reviewsByid/${donationId}`).then((res) => {
      setReviews(res.data);
    });
  }, [donationId]);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-3 text-primary">📝 Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="bg-base-200 rounded p-4 mb-2">
            <h4 className="font-bold">{r.reviewerName}</h4>
            <p>{r.description}</p>
            <p className="text-yellow-500">⭐ {r.rating}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;