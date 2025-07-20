import React, { useState} from "react";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const RequestRole = () => {
  const { user } = useAuth();

  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to create checkout session and redirect user
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!orgName || !mission) {
      return toast.error("Organization name and mission are required");
    }

    setLoading(true);

    try {
      // Check if user already has a pending or approved role request
      const existingRequest = await axios.get(`https://food-bridge-server-side.vercel.app/role-requests?email=${user.email}`);
      if (existingRequest.data.some(r => r.status === "Pending" || r.status === "Approved")) {
        toast.error("You already have a pending or approved Charity role request.");
        setLoading(false);
        return;
      }

      // Create Stripe checkout session on backend
      const response = await axios.post("https://food-bridge-server-side.vercel.app/create-checkout-session", {
        email: user.email,
        name: user.displayName,
        orgName,
        mission,
        amount: 2500, // amount in cents ($25.00)
      });

      const stripe = await stripePromise;
      const { sessionId } = response.data;

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={user.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Organization Name</label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Mission Statement</label>
          <textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <p className="font-semibold">Payment Amount: $25.00</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Processing..." : "Pay & Request Role"}
        </button>
      </form>
    </div>
  );
};

export default RequestRole;