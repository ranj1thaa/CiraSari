const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const WrapAsync = require("../components/wraps/wrapAsync");
const Order = require("../models/Order");
const authCheck = require("../middlewares/authCheck");
const router = express.Router();
router.post("/create-payment-intent/:orderId", authCheck, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("saree");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const amount = Math.round(Number(order.saree.price) * 100);

if (amount < 50) {
  return res.status(400).json({
    message: "Order amount too small for Stripe payment",
  });
}

const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency: "inr",
  metadata: { orderId: order._id.toString() },
});


    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Payment Error:", err);
    res.status(500).json({ message: "Stripe Payment Failed", error: err.message });
  }
});



router.post("/webhook", express.raw({ type: "application/json" }), WrapAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    const order = await Order.findById(orderId);
    if (order) {
      order.payment.status = "succeeded";
      order.payment.paymentIntentId = paymentIntent.id;
      order.payment.amount = paymentIntent.amount;
      await order.save();
    }
  }

  res.json({ received: true });
}));

module.exports = router;
