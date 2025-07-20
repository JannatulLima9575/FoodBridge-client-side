import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from './../../Provider/useAuth';

const AddDonation = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const donationData = {
      title: data.title,
      foodType: data.foodType,
      quantity: data.quantity,
      pickupTime: data.pickupTime,
      location: data.location,
      image: data.image,
      restaurantName: user?.displayName || "Unknown",
      restaurantEmail: user?.email,
      status: "Pending",
      isFeatured: false,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("https://food-bridge-server-side.vercel.app/donations", donationData);
      if (res.data.insertedId || res.status === 201) {
        toast.success("Donation added successfully!");
        reset();
      }
    } catch (error) {
      toast.error("Failed to add donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Donation</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="font-medium">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Surplus Rice / Bread"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        {/* Food Type */}
        <div>
          <label className="font-medium">Food Type</label>
          <input
            type="text"
            {...register("foodType", { required: true })}
            className="input input-bordered w-full"
            placeholder="E.g., Bakery, Produce"
          />
          {errors.foodType && <p className="text-red-500 text-sm">Food type is required</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium">Quantity</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className="input input-bordered w-full"
            placeholder="E.g., 10 kg"
          />
          {errors.quantity && <p className="text-red-500 text-sm">Quantity is required</p>}
        </div>

        {/* Pickup Time */}
        <div>
          <label className="font-medium">Pickup Time Window</label>
          <input
            type="text"
            {...register("pickupTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="E.g., 5pm - 7pm"
          />
          {errors.pickupTime && <p className="text-red-500 text-sm">Pickup time is required</p>}
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="E.g., 123 Main Street"
          />
          {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
          {errors.image && <p className="text-red-500 text-sm">Image URL is required</p>}
        </div>

        {/* Readonly Name + Email */}
        <div>
          <label className="font-medium">Restaurant Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.displayName}
            readOnly
          />
        </div>

        <div>
          <label className="font-medium">Restaurant Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={user?.email}
            readOnly
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Donation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;