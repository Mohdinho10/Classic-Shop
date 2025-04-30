import { createContext, useContext, useEffect, useState } from "react";
import {
  useGetUserCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useDeleteCartItemMutation,
} from "../slices/cartApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ShopContext = createContext({
  getCartCount: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  getCartAmount: () => {},
  removeFromCart: () => {},
  setCartItems: () => {},
});

export function ShopProvider({ children }) {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { data: cartData, refetch } = useGetUserCartQuery(userId);
  const [addToCartApi] = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const delivery = 10;

  const addToCart = async (productId, size) => {
    // Changed param name from itemId
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    try {
      await addToCartApi({
        userId,
        productId,
        size,
        quantity: 1, // Default to adding 1 item
      });

      // Refresh cart data from server
      const { data: updatedCart } = await refetch();
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.data?.message || "Failed to add item to cart");
    }
  };

  const getCartCount = () => {
    return Array.isArray(cartItems) ? cartItems.length : 0;
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      // Optimistic update
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );

      await updateCart({
        userId,
        productId,
        quantity: newQuantity,
      }).unwrap();

      await refetch();
    } catch (error) {
      refetch();
      console.error("Update failed:", error);
      toast.error(error.data?.message || "Failed to update quantity");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await deleteCartItem({ userId, productId }).unwrap();
      const { data: updatedCart } = await refetch();
      setCartItems(updatedCart.items);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error(error.data?.message || "Error removing item");
    }
  };

  const getCartAmount = () => {
    return cartItems?.reduce((total, item) => {
      return total + (item.salePrice || item.price) * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (cartData?.data?.items) {
      setCartItems(cartData?.data?.items);
    }
  }, [cartData]);

  return (
    <ShopContext.Provider
      value={{
        delivery,
        search,
        cartItems,
        setSearch,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        removeFromCart,
        getCartAmount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("ShopContext was used outside the ShopProvider");
  }
  return context;
}
