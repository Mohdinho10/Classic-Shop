import logo from "../assets/images/logo.png";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { products } from "../assets/assets";

function Navbar() {
  const { search, setSearch, getCartCount, cartItems } = useShop();
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to manage search visibility
  const [openCart, setOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { getCartAmount } = useShop();
  const navigate = useNavigate();
  const user = false;

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev); // Toggle search visibility
  };

  return (
    <>
      <navbar className="flex items-center justify-between gap-3">
        <Link to="/">
          <img src={logo} alt="classic-logo" className="w-36" />
        </Link>
        <div>
          {" "}
          {isSearchVisible && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="mb-1 hidden w-[400px] items-center justify-center rounded-full border border-gray-400 p-2 px-5 py-2 md:inline-flex"
              // className="mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2 md:w-full"
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          {!isSearchVisible ? (
            <IoIosSearch
              className="h-7 w-7 cursor-pointer"
              onClick={toggleSearch}
            />
          ) : (
            <IoMdClose
              className="h-7 w-7 cursor-pointer"
              onClick={toggleSearch}
            />
          )}

          <div className="group relative">
            <Link to={!user ? "/login" : ""}>
              <FaRegUser className="h-6 w-6 cursor-pointer" />
            </Link>
            <div className="dropdown-menu absolute right-0 z-50 hidden pt-4 group-hover:block">
              {user && (
                <div className="z-10 flex w-36 flex-col gap-2 bg-slate-100 px-5 py-3 text-gray-700">
                  <p className="cursor-pointer hover:text-balance">
                    My profile
                  </p>
                  <p className="cursor-pointer hover:text-balance">Orders</p>
                  <p className="cursor-pointer hover:text-balance">Logout</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <IoMdCart
              className="h-6 w-6 cursor-pointer"
              onClick={() => setOpenCart(true)}
            />
            <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-gray-600 text-center text-[8px] leading-4 text-white">
              {getCartCount()}
            </p>
          </div>
        </div>
      </navbar>
      {/* Search Bar for small screens */}
      <div>
        {" "}
        {isSearchVisible && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="mt-2 block w-[300px] rounded-full border border-gray-300 p-2 px-5 py-2 outline-none md:hidden"
          />
        )}
      </div>
      {/* Cart Drawer */}
      {openCart && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setOpenCart(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 h-full w-[300px] bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <IoMdClose
                className="h-6 w-6 cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="flex flex-col gap-3">
              {cartItems && cartItems.length > 0 ? (
                <p className="text-gray-600">Your cart is currently empty.</p>
              ) : (
                cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id,
                  );

                  return (
                    <CartItem key={index} item={productData} size={item.size} />
                  );
                })
              )}
              <div className="mt-6">
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total: </p>${getCartAmount()}
                </div>
                <button
                  onClick={() => navigate("/place-order")}
                  className="mt-4 w-full rounded bg-black px-3 py-2 text-white"
                  // onClick={onCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
