import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";
import { useShop } from "../context/ShopContext";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { BASE_URL } from "../constants";
import Loader from "../components/Loader";

function ProductPage() {
  const { addToCart } = useShop();
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    // refetch,
  } = useGetProductDetailsQuery(productId);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Once the product data is loaded, set the image state to the first image
    if (product) {
      setImage(product.image[0]);
    }
  }, [product]); // This will run whenever the product data changes

  const [size, setSize] = useState("");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
            {/* Product Data */}
            <div className="flex flex-col gap-12 md:flex-row">
              {/* Product Images */}
              <div className="flex flex-1 flex-col-reverse gap-3 md:flex-row">
                <div className="flex w-full justify-between overflow-x-auto md:w-[18.7%] md:flex-col md:justify-normal md:overflow-y-scroll">
                  {product.image.map((productImage, index) => (
                    <img
                      src={`${BASE_URL}${productImage?.replace("public", "")}`}
                      onClick={() => setImage(productImage)}
                      alt=""
                      className="w-[24%] flex-shrink-0 cursor-pointer md:mb-3 md:w-full"
                      key={index}
                    />
                  ))}
                </div>
                <div className="w-full sm:w-[80%]">
                  <img
                    src={`${BASE_URL}${image?.replace("public", "")}`}
                    className="h-auto w-full"
                    alt=""
                  />
                </div>
              </div>
              {/* Product Info */}
              <div className="flex-1">
                <h1 className="mt-2 text-2xl font-medium">{product.name} </h1>
                <div className="mt-2 flex items-center gap-1">
                  <FaStar className="w-7 text-yellow-400" />
                  <FaStar className="w-7 text-yellow-400" />
                  <FaStar className="w-7 text-yellow-400" />
                  <FaRegStar className="w-7 text-yellow-400" />
                  <FaRegStar className="w-7 text-yellow-400" />
                  <p className="pl-2">(122)</p>
                </div>
                <p className="mt-5 text-3xl font-medium">${product.price}</p>
                <p className="text-gray-5000 mt-5 md:w-4/5">
                  {product.description}
                </p>
                <div className="my-8 flex flex-col gap-4">
                  <p>Select Size</p>
                  <div className="flex gap-2">
                    {product?.sizes?.map((product, index) => (
                      <button
                        onClick={() => setSize(product)}
                        className={`border bg-gray-100 px-4 py-2 ${product === size ? "border-orange-500" : ""}`}
                        key={index}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product._id, size)}
                  className="bg-black px-8 py-3 text-sm text-white"
                >
                  ADD TO CART
                </button>
                <hr className="mt-8 md:w-4/5" />
                <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available on this product.</p>
                  <p>Easy return and exchange policy within 7 days.</p>
                </div>
              </div>
            </div>
            {/* Description and review section */}
            <div className="mt-20">
              <div className="flex">
                <b className="border px-5 py-3 text-sm">Description</b>
                <p className="border px-5 py-3 text-sm">Reviews (122)</p>
              </div>
              <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                <p>
                  An e-commerce website is an online platform that facilitates
                  the buying and selling of products or services over the
                  internet. It serves as a virtual marketplace where businesses
                  and individuals can showcase their products, interact with
                  customers, and conduct transactions without the need for a
                  physical presence. E-commerce websites have gained immense
                  popularity due to their convenience, accessibility, and the
                  global reach they offer.
                </p>
                <p>
                  E-commerce websites typically display products or services
                  along with detailed descriptions, images, prices, and any
                  available variations (e.g., sizes, colors). Each product
                  usually has its own dedicated page with relevant information.
                </p>
              </div>
            </div>
            {/* Related Products */}
            <RelatedProducts
              category={product?.category}
              subCategory={product?.subCategory}
            />
          </div>
          <div className="opacity-0"></div>
        </>
      )}
    </>
  );
}

export default ProductPage;
