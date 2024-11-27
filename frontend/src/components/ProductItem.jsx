import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <Link
      className="cursor-pointer text-gray-700"
      to={`/products/${product._id}`}
    >
      <div className="overflow-hidden">
        <img
          src={product.image[0]}
          alt=""
          className="transition ease-in-out hover:scale-110"
        />
      </div>
      <p className="pb-1 pt-3 text-sm">{product.name}</p>
      <p className="text-sm font-medium">${product.price} </p>
    </Link>
  );
}

export default ProductItem;
