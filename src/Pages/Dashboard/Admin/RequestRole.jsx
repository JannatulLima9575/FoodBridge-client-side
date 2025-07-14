import { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const RequestRole = () => {
  const { user } = useContext(AuthContext);

  const handleRequest = async (requestedRole) => {
    const stripe = await stripePromise;

    // 1. Create payment intent
    const { data: clientSecret } = await axios.post("http://localhost:5000/create-payment-intent", {
      email: user.email,
      amount: 1000, // 💳 $10
    });

    // 2. Create temporary role request
    await axios.post("http://localhost:5000/role-requests", {
      email: user.email,
      name: user.displayName,
      requestedRole,
    });

    // 3. Redirect to Stripe
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        { price: import.meta.env.VITE_STRIPE_PRICE_ID, quantity: 1 },
      ],
      mode: "payment",
      customerEmail: user.email,
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/request-role`,
    });

    if (error) toast.error("Stripe Error: " + error.message);
  };

  return (
    <div className="max-w-lg mx-auto text-center py-10">
      <h2 className="text-3xl font-bold mb-4">Request a Role</h2>
      <p className="mb-8 text-gray-600">Pay one-time fee to request a role upgrade</p>

      <button
        onClick={() => handleRequest("charity")}
        className="btn btn-primary mb-4 w-full"
      >
        Request Charity Role ($10)
      </button>

      <button
        onClick={() => handleRequest("restaurant")}
        className="btn btn-success w-full"
      >
        Request Restaurant Role ($10)
      </button>
    </div>
  );
};

export default RequestRole;