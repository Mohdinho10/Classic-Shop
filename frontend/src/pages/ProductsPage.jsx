import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProductItem from "../components/ProductItem";
import { useShop } from "../context/ShopContext";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Title from "../components/Title";
import Loader from "../components/Loader";

function ProductsPage() {
  const { search } = useShop();
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: productsData,
    isLoading,
    // isError,
  } = useGetProductsQuery({
    search,
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
          {/* Filter options */}
          <div className="min-w-60">
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 flex cursor-pointer items-center gap-1 text-xl"
            >
              FILTERS
              <MdKeyboardArrowRight
                className={`h-6 w-6 md:hidden ${showFilter ? "rotate-90" : ""} transition-all duration-75`}
              />
            </p>
            {/* CATEGORY FILTER */}
            <div
              className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} md:block`}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Men"}
                    onChange={toggleCategory}
                  />{" "}
                  Men
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Women"}
                    onChange={toggleCategory}
                  />{" "}
                  Women
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"Kids"}
                    onChange={toggleCategory}
                  />{" "}
                  Kids
                </p>
              </div>
            </div>
            {/* SubCategory Filter */}
            <div
              className={`my-5 mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm:block`}
            >
              <p className="mb-3 text-sm font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"topWear"}
                    onChange={toggleSubCategory}
                  />{" "}
                  Top Wear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"bottomWear"}
                    onChange={toggleSubCategory}
                  />{" "}
                  Bottom Wear
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3 cursor-pointer"
                    value={"winterWear"}
                    onChange={toggleSubCategory}
                  />{" "}
                  Winter Wear
                </p>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between text-base md:text-2xl">
              <Title text1={"ALL"} text2={"COLLECTION"} />
              {/* Product sort */}
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 px-2 text-sm"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
            {/* Products */}
            <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsData?.products?.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </div>
            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={productsData?.currentPage === 1}
                onClick={() => handlePageChange(productsData?.currentPage - 1)}
                className={`mx-1 rounded px-3 py-1 ${
                  productsData?.currentPage === 1
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "cursor-pointer bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>
              {[...Array(productsData?.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`mx-1 px-3 py-1 ${
                    productsData?.currentPage === i + 1
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={
                  productsData?.currentPage === productsData?.totalPages
                }
                onClick={() => handlePageChange(productsData?.currentPage + 1)}
                className={`mx-1 rounded px-3 py-1 ${
                  productsData?.currentPage === productsData?.totalPages
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "cursor-pointer bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsPage;
