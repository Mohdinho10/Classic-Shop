import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";

const router = Router();

router.post("/get", isAuthenticated, getUserCart);
router.post("/add", isAuthenticated, addToCart);
router.put("/update", isAuthenticated, updateCart);

export default router;
