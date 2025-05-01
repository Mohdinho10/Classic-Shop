import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";

function ProductItem({ product }) {
  return (
    <Link
      className="block cursor-pointer text-gray-700"
      to={`/products/${product?._id}`}
    >
      <div className="flex justify-center overflow-hidden">
        <img
          src={`${BASE_URL}${product?.image[0]?.replace("public", "")}`}
          alt=""
          className="h-[300px] w-full transition ease-in-out hover:scale-110"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="truncate pb-1 text-sm font-medium">{product?.name}</p>
        <p className="text-sm font-medium">${product?.price}</p>
      </div>
    </Link>
  );
}

export default ProductItem;
