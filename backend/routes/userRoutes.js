import { Router } from "express";
import {
  adminLogin,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  login,
  logout,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  isAuthenticatedAdmin,
  isAuthenticatedClient,
} from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);

// Authenticated client routes
router.post("/logout", isAuthenticatedClient, logout);
router
  .route("/profile")
  .get(isAuthenticatedClient, getUserProfile)
  .put(isAuthenticatedClient, updateUserProfile);

// Admin routes
router
  .route("/:id")
  .delete(isAuthenticatedAdmin, deleteUser)
  .get(isAuthenticatedAdmin, getUser)
  .put(isAuthenticatedAdmin, updateUser);

router.get("/", isAuthenticatedAdmin, getUsers);

export default router;
