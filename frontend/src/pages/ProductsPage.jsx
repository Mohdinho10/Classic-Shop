import { useState } from "react";
import ProductItem from "../components/ProductItem";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Title from "../components/Title";
import Loader from "../components/Loader";

const categoryOptions = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
  { label: "Kids", value: "Kids" },
];

const subCategoryOptions = [
  { label: "Top Wear", value: "topWear" },
  { label: "Bottom Wear", value: "bottomWear" },
  { label: "Winter Wear", value: "winterWear" },
];

function ProductsPage() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: productsData, isLoading } = useGetProductsQuery({
    category,
    subCategory,
    sortType,
    page,
    limit,
  });

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="border-t px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Title text1="ALL" text2="COLLECTION" />
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="rounded border px-2 py-1 text-sm text-black"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters */}
        <div className="w-full lg:w-1/4">
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="rounded border p-4">
              <p className="mb-2 text-sm font-semibold text-black">
                CATEGORIES
              </p>
              <div className="flex flex-col gap-2 text-sm text-black">
                {categoryOptions.map((categoryOption) => (
                  <label
                    key={categoryOption.label}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={categoryOption.value}
                      onChange={toggleCategory}
                      checked={category.includes(categoryOption.value)}
                      className="h-4 w-4 accent-black"
                    />
                    {categoryOption.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div className="rounded border p-4">
              <p className="mb-2 text-sm font-semibold text-black">TYPE</p>
              <div className="flex flex-col gap-2 text-sm text-black">
                {subCategoryOptions.map((subCategoryOption) => (
                  <label
                    key={subCategoryOption.label}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={subCategoryOption.value}
                      onChange={toggleSubCategory}
                      checked={subCategory.includes(subCategoryOption.value)}
                      className="h-4 w-4 accent-black"
                    />
                    {subCategoryOption.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {productsData?.products?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              disabled={productsData?.currentPage === 1}
              onClick={() => handlePageChange(productsData?.currentPage - 1)}
              className={`rounded border px-3 py-1 ${
                productsData?.currentPage === 1
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              Previous
            </button>
            {[...Array(productsData?.totalPages || 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`rounded border px-3 py-1 ${
                  productsData?.currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={productsData?.currentPage === productsData?.totalPages}
              onClick={() => handlePageChange(productsData?.currentPage + 1)}
              className={`rounded border px-3 py-1 ${
                productsData?.currentPage === productsData?.totalPages
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
