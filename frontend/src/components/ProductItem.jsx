import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";

function ProductItem({ product }) {
  return (
    <Link
      className="cursor-pointer text-gray-700"
      to={`/products/${product?._id}`}
    >
      <div className="overflow-hidden">
        <img
          src={`${BASE_URL}${product?.image[0]?.replace("public", "")}`}
          alt=""
          className="h-[300px] w-[300px] transition ease-in-out hover:scale-110"
        />
      </div>
      <p className="pb-1 pt-3 text-sm">{product?.name}</p>
      <p className="text-sm font-medium">${product?.price} </p>
    </Link>
  );
}

export default ProductItem;
