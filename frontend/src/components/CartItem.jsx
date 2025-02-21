import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

function CartItem({ item, size }) {
  console.log(item);
  const { updateQuantity } = useShop();
  return (
    <div className="flex items-center gap-4 border-b pb-4 last:border-none">
      {/* Image */}

      <img
        src={item?.image[0]}
        alt={item?.name}
        className="h-20 w-20 rounded object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="line-clamp-1 break-words font-medium text-gray-700">
          {item?.name}
        </h3>
        {/* Tooltip */}

        <div className="mt-2 flex items-center gap-3">
          {/* Quantity Control */}
          <FiMinus className="h-5 w-5 cursor-pointer rounded-full border border-black text-black hover:text-gray-800" />
          <span className="font-semibold">{item?.quantity || 1}</span>
          <IoMdAdd className="h-5 w-5 cursor-pointer rounded-full border border-black text-black hover:text-gray-800" />
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end">
        <p className="font-semibold">${item?.price}</p>
        <FaRegTrashAlt
          onClick={() => updateQuantity(item?._id, size, 0)}
          className="mt-1 h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default CartItem;
