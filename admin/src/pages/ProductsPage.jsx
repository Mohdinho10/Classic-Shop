import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice";
import { BASE_URL } from "../constants";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../../frontend/src/components/Loader";
import ClipLoader from "react-spinners/ClipLoader";

function ProductsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct);

  const limit = 10;

  const {
    data: productsData,
    isLoading,
    refetch,
    // isError,
  } = useGetProductsQuery({
    category,
    subCategory,
    sortType,
    page,
    limit,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // console.log(productsData);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    try {
      console.log(id);
      await deleteProduct(id);
      setShowModal(false);
      setSelectedProduct(null);
      toast.success("product deleted");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="mb-2">All Products</p>
          <div className="flex flex-col gap-2">
            {/* List table title */}
            <div className="hidden grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm md:grid">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {/* Products */}
            {productsData?.products?.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
              >
                <img
                  src={`${BASE_URL}${product?.image[0]?.replace("public", "")}`}
                  alt=""
                  className="w-12"
                />
                <p> {product?.name}</p>
                <p>{product?.category}</p>
                <p>${product?.price}</p>
                <FaTrashAlt
                  onClick={() => handleDeleteClick(product)}
                  className="h-5 w-5 cursor-pointer text-right text-lg text-red-500 md:text-center"
                />
              </div>
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
                className={`mx-1 hidden px-3 py-1 md:block ${
                  productsData?.currentPage === i + 1
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={productsData?.currentPage === productsData?.totalPages}
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
          {/* Delete Confirmation Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded bg-white p-6 shadow-lg">
                <p className="mb-4">
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
                    {isLoading ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProductsPage;
