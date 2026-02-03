import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../../utils/axios";
import "../../style/stripeCheckout.css";

const stripePromise = loadStripe(
  "pk_test_51S39jxHmKWaCqgYVvQKgG7ecE8t2vDPNvMEtXZWXyMhWgsZ6rHH9cnIC5HbzxTFNXqJ5ir87MVK3PbiQ8Trm2Nl500smP0DHeY"
);

const CheckOutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await api.post(
        `/stripe/create-payment-intent/${orderId}`
      );
      setClientSecret(res.data.clientSecret);
    };
    createPaymentIntent();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful!");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2 className="checkout-title">Secure Payment</h2>
        <p className="checkout-subtitle">
          Complete your purchase safely
        </p>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="card-element-wrapper">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "#aaa",
                    },
                  },
                  invalid: {
                    color: "#ff6b6b",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            className="pay-btn"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <p className="secure-text">🔒 100% Secure • Powered by Stripe</p>
      </div>
    </div>
  );
};

export default function StripeCheckout({ orderId }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm orderId={orderId} />
    </Elements>
  );
}
