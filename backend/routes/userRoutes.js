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
import { admin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// For admin login
router.post("/admin/login", adminLogin);

// The following routes are only for authenticated users
router.use(isAuthenticated);
router.post("/logout", logout);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.use(admin);
router.route("/:id").delete(deleteUser).get(getUser).put(updateUser);
router.get("/", getUsers);

export default router;
