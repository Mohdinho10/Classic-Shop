import { Router } from "express";
import { admin, isAuthenticated } from "../middleware/authMiddleware.js";
import {
  calculateTotalSales,
  calculateTotalSalesByDate,
  countTotalOrders,
  createOrder,
  getOrder,
  getOrders,
  getUserOrders,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controllers/orderController.js";

const router = Router();

router
  .route("/")
  .post(isAuthenticated, createOrder)
  .get(isAuthenticated, admin, getOrders);
router.get("mine", isAuthenticated, getUserOrders);
router.get("/total-orders", countTotalOrders);
router.get("/total-sales", calculateTotalSales);
router.get("/total-sales-by-date", calculateTotalSalesByDate);
router.get(":/id", isAuthenticated, getOrder);
router.put(":/id/pay", isAuthenticated, markOrderAsPaid);
router.put(":/id/deliver", isAuthenticated, admin, markOrderAsDelivered);

export default router;
