import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import { BASE_URL } from "../constants";

function CartItem({ item }) {
  console.log(item);
  const { updateQuantity, removeFromCart } = useShop();

  const handleIncrease = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrease = () => {
    const newQty = item.quantity > 1 ? item.quantity - 1 : 0;
    updateQuantity(item.productId, newQty);
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className="flex items-center gap-4 border-b pb-4 last:border-none">
      <img
        src={`${BASE_URL}${item?.image[0]?.replace("public", "")}`}
        alt={item?.name}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="line-clamp-1 break-words font-medium text-gray-700">
          {item?.name}
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <FiMinus
            className={`h-5 w-5 rounded-full border text-black ${
              item.quantity === 1
                ? "cursor-not-allowed border-gray-300 text-gray-400"
                : "cursor-pointer border-black hover:text-gray-800"
            }`}
            onClick={item.quantity === 1 ? null : handleDecrease}
          />
          <span className="font-semibold">{item?.quantity}</span>
          <IoMdAdd
            className="h-5 w-5 cursor-pointer rounded-full border border-black text-black hover:text-gray-800"
            onClick={handleIncrease}
          />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">${item?.price}</p>
        <FaRegTrashAlt
          onClick={handleRemove}
          className="mt-1 h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default CartItem;
