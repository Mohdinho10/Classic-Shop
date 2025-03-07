import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Check if the product exists
  const product = await Product.findById(itemId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Find existing cart item
  const existingItem = user.cartData.find(
    (item) => item.product.toString() === itemId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cartData.push({ product: itemId, size, quantity: 1 });
  }

  await user.save();
  console.log(user.cartData);
  res.json({ success: true, message: "Added to cart", cart: user.cartData });
});

// export const updateCart = asyncHandler(async (req, res) => {
//   const { userId, itemId, size, quantity } = req.body;

//   const userData = await User.findById(userId);
//   let cartData = await userData.cartData;

//   cartData[itemId][size] = quantity;
//   await User.findByIdAndUpdate(userId, { cartData });
//   res.json({ success: true, message: "Updated to cart" });
// });

export const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData;
    let itemIndex = cartData.findIndex(
      (item) => item.product.toString() === itemId && item.size === size
    );

    if (itemIndex !== -1) {
      if (quantity > 0) {
        //  Update quantity
        cartData[itemIndex].quantity = quantity;
      } else {
        //  Remove item if quantity is 0
        cartData.splice(itemIndex, 1);
      }
    }

    user.cartData = cartData;
    await user.save();

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
});

export const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId).populate("cartData.product");

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user.cartData);
});
