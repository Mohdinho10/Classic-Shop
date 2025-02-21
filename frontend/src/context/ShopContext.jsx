import { createContext, useContext, useEffect, useState } from "react";
import {
  useGetUserCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
} from "../slices/cartApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { products } from "../assets/assets";

const ShopContext = createContext({
  getCartCount: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  getCartAmount: () => {},
});

export function ShopProvider({ children }) {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { data: cartData, isLoading, refetch } = useGetUserCartQuery(userId);
  console.log(cartData);

  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    try {
      await addToCartApi({ userId, itemId, size });
      refetch(); // Refetch cart data after adding item
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      await updateCart({ userId, itemId, size, quantity });
      refetch(); // Refetch cart data after updating quantity
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      console.log(itemInfo);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
            console.log(totalAmount);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
    }
  }, [cartData]);

  return (
    <ShopContext.Provider
      value={{
        search,
        cartItems,
        setSearch,
        // setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
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
