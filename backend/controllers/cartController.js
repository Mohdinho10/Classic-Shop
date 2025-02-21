import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size } = req.body;
  const userData = await User.findById(userId);
  let cartData = await userData.cartData;

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  await User.findByIdAndUpdate(userId, { cartData });

  res.json({ success: true, message: "Added to cart" });
});

export const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;

  const userData = await User.findById(userId);
  let cartData = await userData.cartData;

  cartData[itemId][size] = quantity;
  await User.findByIdAndUpdate(userId, { cartData });
  res.json({ success: true, message: "Updated to cart" });
});

export const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userData = await User.findById(userId);
  let cartData = await userData.cartData;

  res.status(200).json(cartData);
});
