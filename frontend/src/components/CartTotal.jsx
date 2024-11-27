import { useShop } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { getCartAmount } = useShop();
  const delivery_fee = 10;
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="mt-2 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>$ {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>$ {delivery_fee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>$ {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
