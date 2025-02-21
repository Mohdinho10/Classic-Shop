import { Router } from "express";
// import formidable from "express-formidable";
import multer from "multer";
import { admin, isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addProduct,
  addProductReview,
  deleteProduct,
  getLatestBestsellers,
  getLatestCollections,
  getProduct,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();
/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(getProducts)
  .post(
    isAuthenticated,
    admin,
    upload.array("images"),
    addProduct
  );

router.post("/:id/reviews", isAuthenticated, addProductReview);

router.get("/related", getRelatedProducts);
router.get("/bestsellers", getLatestBestsellers);
router.get("/latest", getLatestCollections);

// router.route("/filter").post(filterProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(isAuthenticated, admin,  updateProduct)
  .delete(isAuthenticated, admin, deleteProduct);

export default router;
