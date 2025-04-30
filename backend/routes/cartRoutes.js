import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQty,
} from "../controllers/cartController.js";

const router = Router();

router.post("/add", isAuthenticated, addToCart);
router.get("/get/:userId", isAuthenticated, getCartItems);
router.put("/update", isAuthenticated, updateCartItemQty);
router.delete("/:userId/:productId", isAuthenticated, deleteCartItem);

export default router;
