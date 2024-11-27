import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// Protected routes
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  // console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.userId).select("-password");
      req.userId = decoded.id;
      req.role = decoded.role;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware

export const restrict = (roles) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) user = patient;

    if (doctor) user = doctor;

    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "You're not authorized" });
    }
    next();
  });
