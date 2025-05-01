import { Router } from "express";
import {
  isAuthenticatedAdmin,
  isAuthenticatedClient,
} from "../middleware/authMiddleware.js";
import {
  getOrders,
  markAsPaid,
  placeOrder,
  placeOrderPaypal,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyPaypal,
  verifyStripe,
} from "../controllers/orderController.js";

const router = Router();

// Admin Features
router.get("/", isAuthenticatedAdmin, getOrders);
router.post("/status", isAuthenticatedAdmin, updateStatus);
router.post("/mark-paid", isAuthenticatedAdmin, markAsPaid);

// Payment Features
router.post("/place", isAuthenticatedClient, placeOrder);
router.post("/stripe", isAuthenticatedClient, placeOrderStripe);
router.post("/paypal", isAuthenticatedClient, placeOrderPaypal);

// Verify payment
router.post("/verify-stripe", isAuthenticatedClient, verifyStripe);
router.post("/verify-paypal", isAuthenticatedClient, verifyPaypal);

// User Feature
router.get("/user", isAuthenticatedClient, userOrders);

export default router;
