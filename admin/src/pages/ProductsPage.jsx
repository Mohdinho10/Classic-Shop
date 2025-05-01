import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice";
import { BASE_URL } from "../constants";
import { FaTrashAlt, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import ClipLoader from "react-spinners/ClipLoader";

// Optional: Static options (or fetch from backend)
const allCategories = ["Men", "Women", "Kids"];
const allSubCategories = ["topWear", "bottomWear", "winterWear"];

function ProductsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const limit = 10;

  const {
    data: productsData,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    category,
    subCategory,
    sortType,
    page,
    limit,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const handlePageChange = (newPage) => setPage(newPage);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      setShowModal(false);
      setSelectedProduct(null);
      toast.success("Product deleted");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const toggleFilter = (type, value) => {
    const list = type === "category" ? [...category] : [...subCategory];
    const setList = type === "category" ? setCategory : setSubCategory;

    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }

    setPage(1);
  };

  const filterSection = (
    <div className="mb-4 grid gap-4 md:grid-cols-3">
      <select
        value={sortType}
        onChange={(e) => {
          setSortType(e.target.value);
          setPage(1);
        }}
        className="rounded border p-2 text-sm"
      >
        <option value="relevant">Sort by Relevant</option>
        <option value="latest">Sort by Latest</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>

      <div>
        <p className="mb-1 text-sm font-medium">Category</p>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleFilter("category", cat)}
              className={`rounded border px-2 py-1 text-xs ${
                category.includes(cat)
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Sub Category</p>
        <div className="flex flex-wrap gap-2">
          {allSubCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => toggleFilter("subCategory", sub)}
              className={`rounded border px-2 py-1 text-xs ${
                subCategory.includes(sub)
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-2 md:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Products</h2>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 md:hidden"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className="hidden md:block">{filterSection}</div>
          {showFilter && <div className="md:hidden">{filterSection}</div>}

          {/* Product Table */}
          <div className="flex flex-col gap-2 overflow-x-auto text-sm">
            <div className="hidden min-w-[700px] grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 md:grid">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>

            {productsData?.products?.map((product, index) => (
              <>
                <div
                  key={index}
                  className="hidden min-w-[700px] grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
                >
                  <img
                    src={`${BASE_URL}${product?.image[0]?.replace("public", "")}`}
                    alt=""
                    className="w-12"
                  />
                  <p>{product?.name}</p>
                  <p>{product?.category}</p>
                  <p>${product?.price}</p>
                  <FaTrashAlt
                    onClick={() => handleDeleteClick(product)}
                    className="h-5 w-5 cursor-pointer text-lg text-red-500"
                  />
                </div>

                {/* Mobile Layout */}
                <div className="block w-full md:hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1 font-medium">{product?.name}</p>
                      <p className="text-sm text-gray-600">${product?.price}</p>
                    </div>
                    <img
                      src={`${BASE_URL}${product?.image[0]?.replace("public", "")}`}
                      alt=""
                      className="w-24"
                    />
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              disabled={productsData?.currentPage === 1}
              onClick={() => handlePageChange(productsData?.currentPage - 1)}
              className={`rounded px-3 py-1 ${
                productsData?.currentPage === 1
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            {/* Desktop view - show all page numbers */}
            <div className="hidden gap-2 md:flex">
              {[...Array(productsData?.totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`rounded px-3 py-1 ${
                    productsData?.currentPage === i + 1
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Mobile view - show only current page */}
            <div className="md:hidden">
              <button className="rounded bg-gray-900 px-3 py-1 text-white">
                {productsData?.currentPage}
              </button>
            </div>

            <button
              disabled={productsData?.currentPage === productsData?.totalPages}
              onClick={() => handlePageChange(productsData?.currentPage + 1)}
              className={`rounded px-3 py-1 ${
                productsData?.currentPage === productsData?.totalPages
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>

          {/* Delete Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
              <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
                <p className="mb-4 text-sm">
                  Are you sure you want to delete <b>{selectedProduct?.name}</b>
                  ?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteHandler(selectedProduct._id)}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    {loadingDelete ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductsPage;
