import { Router } from "express";
import { admin, isAuthenticated } from "../middleware/authMiddleware.js";
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
router.get("/", isAuthenticated, admin, getOrders);
router.post("/status", isAuthenticated, admin, updateStatus);
router.post("/mark-paid", isAuthenticated, admin, markAsPaid);

// Payment Features
router.post("/place", isAuthenticated, placeOrder);
router.post("/stripe", isAuthenticated, placeOrderStripe);
router.post("/paypal", isAuthenticated, placeOrderPaypal);

// Verify payment
router.post("/verify-stripe", isAuthenticated, verifyStripe);
router.post("/verify-paypal", isAuthenticated, verifyPaypal);

// User Feature
router.get("/user", isAuthenticated, userOrders);

export default router;
