import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

// global variables
const currency = "usd";
const deliveryCharge = 10;
const origin = "http://localhost:5173"; // Replace with your frontend base URL

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (!orders) {
    res.status(404);
    throw new Error("No orders found!");
  }

  res.json(orders);
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  await Order.findByIdAndUpdate(orderId, { status });

  res.json({ message: "Status updated" });
});

export const markAsPaid = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  await Order.findByIdAndUpdate(orderId, { payment: true });

  res.json({ message: "Payment marked as paid" });
});

export const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;

  if (!userId || !items || !amount || !address) {
    res.status(400);
    throw new Error("Missing order details");
  }

  const orderData = {
    userId,
    items,
    amount,
    address,
    amount,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await Order.create(orderData);

  await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    newOrder,
  });
});

export const placeOrderStripe = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;

  if (!userId || !items || !amount || !address) {
    res.status(400);
    throw new Error("Missing order details");
  }

  const orderData = {
    userId,
    items,
    amount,
    address,
    amount,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await Order.create(orderData);

  await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  const line_items = items.map((item) => {
    const imageUrl = `http://localhost:3000/${item.image[0]
      ?.replace("public", "")
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")}`; // Remove leading slash if any

    return {
      price_data: {
        currency,
        product_data: {
          name: item.name,
          images: [imageUrl],
        },
        unit_amount: item.price * 100, // cents
      },
      quantity: item.quantity,
    };
  });

  line_items.push({
    price_data: {
      currency,
      product_data: {
        name: "Delivery charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });

  res.status(200).json({ success: true, session_url: session.url });
});

export const verifyStripe = asyncHandler(async (req, res) => {
  const { userId, orderId, success } = req.body;

  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
  }
});

export const placeOrderPaypal = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;

  if (!userId || !items || !amount || !address) {
    res.status(400);
    throw new Error("Missing order details");
  }

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "PayPal",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await Order.create(orderData);

  await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );

  res.status(200).json({ success: true, order: newOrder });
});

export const verifyPaypal = asyncHandler(async (req, res) => {
  const { userId, orderId, success } = req.body;

  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
    res.status(200).json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
});

export const userOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });

  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found!");
  }

  res.json(orders);
});
