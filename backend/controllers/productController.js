import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Add Product
export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    subCategory,
    sizes: sizesString,
  } = req.body;

  // Validation
  if (!name) {
    throw new Error("Name is required");
  }
  if (!description) {
    throw new Error("Description is required");
  }
  if (!price) {
    throw new Error("Price is required");
  }
  if (!category) {
    throw new Error("Category is required");
  }
  if (!subCategory) {
    throw new Error("Sub Category is required");
  }
  if (!sizesString) {
    throw new Error("Sizes are required");
  }

  const uploads = req.files;

  const sizes = JSON.parse(sizesString); // Parse sizes to an array

  if (!uploads) {
    res.status(400);
    throw new Error("No file uploaded.");
  }

  const image = uploads.map((file) => file.path);

  const product = await Product.create({
    name,
    description,
    price,
    category,
    subCategory,
    image,
    sizes,
  });

  res.status(201).json(product);
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes } = req.body;

  // Validation
  if (!name) {
    throw new Error("Name is required");
  }
  if (!description) {
    throw new Error("Description is required");
  }
  if (!price) {
    throw new Error("Price is required");
  }
  if (!category) {
    throw new Error("Category is required");
  }
  if (!subCategory) {
    throw new Error("Sub Category is required");
  }
  if (!sizes) {
    throw new Error("Sizes are required");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  await product.save();

  res.status(200).json(product);
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) throw new Error("No Product found!");

  res.status(200).json(product);
});

// // Get All Products
// export const getAllProducts = asyncHandler(async (req, res) => {
//   // const products = await Product.find({}).limit(12).sort({ createAt: -1 });
//   const products = await Product.find({});

//   if (!products) throw new Error("No Product found!");

//   res.status(200).json(products);
// });

export const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    subCategory,
    sortType,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = { $in: category.split(",") };
  if (subCategory) filter.subCategory = { $in: subCategory.split(",") };

  let sort = {};
  if (sortType === "low-high") {
    sort.price = 1; // ascending
  } else if (sortType === "high-low") {
    sort.price = -1; //descending
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));
  const totalProducts = await Product.countDocuments(filter);

  if (!products) throw new Error("No Product found!");

  res.status(200).json({
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: parseInt(page),
  });
});

export const getLatestCollections = asyncHandler(async (req, res) => {
  const limit = 8;

  // Fetch latest products sorted by creation date
  const latestProducts = await Product.find({})
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(limit);

  if (latestProducts.length === 0) {
    res.status(404);
    throw new Error("No latest collections found!");
  }

  res.status(200).json(latestProducts);
});

export const getLatestBestsellers = asyncHandler(async (req, res) => {
  const limit = 8; // Default to 10 items if no limit provided

  // Fetch latest bestsellers sorted by creation date
  const bestsellers = await Product.find({ bestseller: true })
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(limit);

  if (bestsellers.length === 0) {
    res.status(404);
    throw new Error("No bestsellers found!");
  }

  res.status(200).json(bestsellers);
});

export const getRelatedProducts = asyncHandler(async (req, res) => {
  const { category, subCategory } = req.query;

  if (!category || !subCategory) {
    return res
      .status(400)
      .json({ message: "Category and subCategory are required." });
  }

  const relatedProducts = await Product.find({
    category,
    subCategory,
  }); // Adjust the limit as needed

  res.status(200).json(relatedProducts);
});

// export const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 6;

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//     : {};

//   const count = await Product.countDocuments({ ...keyword });
//   const products = await Product.find({ ...keyword }).limit(pageSize);

//   if (!products) throw new Error("No Product found!");

//   res.json({
//     products,
//     page: 1,
//     pages: Math.ceil(count / pageSize),
//     hasMore: false,
//   });
// });

// Get Product
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) throw new Error("No Product found!");

  res.status(200).json(product);
});

// Add Product Review
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Get Top Products
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);

  if (!products) throw new Error("No Product found!");

  res.status(200).json(products);
});

// Get New Products
export const getNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ _id: -1 }).limit(5);

  if (!products) throw new Error("No Product found!");

  res.status(200).json(products);
});
