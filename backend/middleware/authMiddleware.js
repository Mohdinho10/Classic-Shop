import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Middleware for regular user (client)
export const isAuthenticatedClient = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt_client;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware for admin user
export const isAuthenticatedAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt_admin;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (user && user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(403);
        throw new Error("Not authorized as admin");
      }
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
