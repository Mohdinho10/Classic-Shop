import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  // Validation
  if (!userId || !productId || !size || quantity <= 0) {
    res.status(400);
    throw new Error("Invalid data provided");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // Find existing item with same product AND size
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, size, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
});

export const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("User id is mandatory");
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image name price salePrice size",
  });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found!");
  }

  // Filter valid items (ensure product exists)
  const validItems = cart.items.filter((productItem) => productItem.productId);

  // Save only valid items back to the database if needed
  if (validItems.length < cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }

  // Format items for response
  const populateCartItems = validItems.map((item) => ({
    productId: item.productId._id,
    image: item.productId.image,
    name: item.productId.name,
    price: item.productId.price,
    salePrice: item.productId.salePrice || item.productId.price, // Use sale price if available
    quantity: item.quantity,
    size: item.size,
  }));

  res.status(200).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
});

// export const updateCartItemQty = asyncHandler(async (req, res) => {
//   const { userId, productId, size, quantity } = req.body;

//   const cart = await Cart.findOne({ userId });

//   if (!cart) {
//     res.status(404);
//     throw new Error("Cart not found");
//   }

//   const itemIndex = cart.items.findIndex(
//     (item) => item.productId.equals(productId) && item.size === size
//   );
//   console.log(itemIndex);

//   // if (itemIndex === -1) {
//   //   res.status(404);
//   //   throw new Error("Item not found in cart");
//   // }

//   // Update quantity
//   cart.items[itemIndex].quantity = quantity;

//   // Remove item if quantity is 0
//   if (quantity <= 0) {
//     cart.items.splice(itemIndex, 1);
//   }

//   const updatedCart = await cart.save();

//   // Populate results
//   const populatedCart = await Cart.populate(updatedCart, {
//     path: "items.productId",
//     select: "image name price salePrice",
//   });

//   res.status(200).json({
//     success: true,
//     data: populatedCart,
//   });
// });

export const updateCartItemQty = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity <= 0) {
    res.status(400);
    throw new Error("Invalid data provided!");
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const findCurrentProductIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  // Update the quantity
  cart.items[findCurrentProductIndex].quantity = quantity;

  if (findCurrentProductIndex === -1) {
    res.status(404);
    throw new Error("Cart item not present !");
  }

  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "image name price salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    name: item.productId ? item.productId.name : "Product not found",
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  res.status(200).json({
    ...cart._doc,
    items: populateCartItems,
  });
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  if (!userId || !productId) {
    res.status(400);
    throw new Error("Invalid data provided!");
  }

  const cart = await Cart.findOne({ userId }).populate({
    path: "items.productId",
    select: "image name price salePrice",
  });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found!");
  }

  cart.items = cart.items.filter(
    (item) => item.productId._id.toString() !== productId
  );

  await cart.save();

  await cart.populate({
    path: "items.productId",
    select: "image name price salePrice",
  });

  const populateCartItems = cart.items.map((item) => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    name: item.productId ? item.productId.name : "Product not found",
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity,
  }));

  res.status(200).json({
    success: true,
    data: {
      ...cart._doc,
      items: populateCartItems,
    },
  });
});
