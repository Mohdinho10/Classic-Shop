import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Serve static files
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Serve frontend build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads in development
}

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => err);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
