import { Router } from "express";
import { isAuthenticatedClient } from "../middleware/authMiddleware.js";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQty,
} from "../controllers/cartController.js";

const router = Router();

router.post("/add", isAuthenticatedClient, addToCart);
router.get("/get/:userId", isAuthenticatedClient, getCartItems);
router.put("/update", isAuthenticatedClient, updateCartItemQty);
router.delete("/:userId/:productId", isAuthenticatedClient, deleteCartItem);

export default router;
