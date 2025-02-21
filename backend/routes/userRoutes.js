import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUserProfile,
  login,
  logout,
  register,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// The following routes are only for authenticated users
router.use(isAuthenticated);
router.post("/logout", logout);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.use(admin);
router.route("/:id").delete(deleteUser).get(getUser).put(updateUser);

export default router;
