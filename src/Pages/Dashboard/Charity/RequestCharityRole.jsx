import React, { useContext, useState } from "react";
// import { AuthContext } from "../../../Provider/AuthContext";
import  AuthContext  from "../../../Provider/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";


// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const RequestCharityRole = () => {
  const { user } = useContext(AuthContext);
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Payment Intent
      const { data: clientSecret } = await axios.post("/api/create-payment-intent", { amount: 25 });

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_XXXXXXX', quantity: 1 }], // price id from stripe
        mode: 'payment',
        successUrl: window.location.origin + "/dashboard/request-charity-role-success",
        cancelUrl: window.location.origin + "/dashboard/request-charity-role",
        customerEmail: user.email,
      });

      if (result.error) {
        toast.error(result.error.message);
      }

      // 2. You can optionally trigger backend request on the success page
    } catch (error) {
      toast.error("Payment failed. Try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input type="text" value={user?.displayName} readOnly className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">User Email</label>
          <input type="text" value={user?.email} readOnly className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Organization Name</label>
          <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Mission Statement</label>
          <textarea value={mission} onChange={(e) => setMission(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Payment Amount</label>
          <input type="text" value="$25" readOnly className="w-full border rounded p-2" />
        </div>
        <button disabled={loading} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? "Processing..." : "Pay & Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;