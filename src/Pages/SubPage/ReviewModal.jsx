import React, { useState, useContext } from "react";
import AuthContext from "../Provider/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewModal = ({ donationId, close }) => {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      donationId,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      description,
      rating,
    };
    await axios.post("https://food-bridge-server-side.vercel.app/reviews", review);
    toast.success("Review Submitted!");
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-base-100 rounded shadow">
      <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your review..."
        className="textarea textarea-bordered w-full mb-4"
      />
      <input
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ReviewModal;