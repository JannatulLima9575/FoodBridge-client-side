import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";

const CheckoutForm = ({ price, donationId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // ✅ Correctly initialize navigate
  const { user } = useAuth(); 

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Step 1: Get Client Secret from backend
  useEffect(() => {
    if (price > 0) {
      axios
        .post("http://localhost:5000/create-payment-intent", { amount: price * 100 })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  // ✅ Step 2: Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || "FoodBridge User",
          email: user?.email,
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSuccess("Payment successful!");

      const paymentData = {
        userEmail: user?.email,
        amount: price * 100,
        transactionId: paymentIntent.id,
        date: new Date(),
        donationItemId: donationId,
      };

      axios.post("http://localhost:5000/payments", paymentData)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Payment saved in database!");

            // ✅ Redirect with payment info
            navigate("/dashboard/payment-success", {
              state: {
                transactionId: paymentIntent.id,
                amount: price * 100,
              },
            });
          }
        });
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
      <CardElement className="p-3 border rounded" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;