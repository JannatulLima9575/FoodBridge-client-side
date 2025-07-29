import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";
import PaymentForm from './../Payments/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log("Stripe Key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      letterSpacing: "0.025em",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

 export const CheckoutForm = ({ orgName, mission }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosSecure();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please wait...");
      return;
    }

    if (!orgName || !mission) {
      toast.error("Organization name and mission are required");
      return;
    }

    setLoading(true);

    try {
      // ১. Create payment intent from backend
      const { data } = await axios.post(
        "/create-payment-intent",
        { amountInCents: 2500 }
      );

      const clientSecret = data.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get client secret from server");
      }

      // ২. Confirm card payment using Stripe.js
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        // ৩. Save charity role request to backend
        await axios.post("/charityRoleRequest", {
          email: user.email,
          organizationName: orgName,
          mission,
          transactionId: paymentResult.paymentIntent.id,
          amount: paymentResult.paymentIntent.amount / 100,
        });

        toast.success("Charity role requested successfully!");
      } else {
        toast.error("Payment did not succeed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Card Details</label>
        { <CardElement options={CARD_ELEMENT_OPTIONS} className="input input-bordered w-full" /> }
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Processing..." : "Pay & Request Role"}
      </button>
    </form>
  );
}; 

 const RequestRole = () => {
  const { user } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          value={user?.email || ""}
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

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}; 

export default  RequestRole;