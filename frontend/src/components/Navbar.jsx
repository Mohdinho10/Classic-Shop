import logo from "../assets/images/logo.png";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { apiSlice } from "../slices/apiSlice";

function Navbar() {
  const { search, setSearch, getCartCount, cartItems, setCartItems } =
    useShop();
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to manage search visibility
  const [openCart, setOpenCart] = useState(false);
  const { getCartAmount } = useShop();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      setCartItems({}); // Reset cart items on logout
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/products?search=${search}`);
                  setIsSearchVisible(false); // Hide search after navigating
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/products?search=${search}`);
                  setIsSearchVisible(false);
                }
              }}
            />
          ) : (
            <IoMdClose
              className="h-7 w-7 cursor-pointer"
              onClick={toggleSearch}
            />
          )}

          <div className="group relative">
            <Link to={!userInfo ? "/login" : ""}>
              <FaRegUser className="h-6 w-6 cursor-pointer" />
            </Link>
            <div className="dropdown-menu absolute right-0 z-50 hidden pt-4 group-hover:block">
              {userInfo && (
                <div className="z-10 flex w-36 flex-col gap-2 bg-slate-100 px-5 py-3 text-gray-700">
                  <Link
                    to={"/profile"}
                    className="cursor-pointer hover:text-balance"
                  >
                    My profile
                  </Link>
                  <Link
                    to={"/orders"}
                    className="cursor-pointer hover:text-balance"
                  >
                    Orders
                  </Link>
                  <p
                    onClick={logoutHandler}
                    className="cursor-pointer hover:text-balance"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <IoMdCart
              className="h-6 w-6 cursor-pointer"
              onClick={() => setOpenCart(true)}
            />
            {getCartCount() > 0 && (
              <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-gray-600 text-center text-[8px] leading-4 text-white">
                {getCartCount()}
              </p>
            )}
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
              {Object.keys(cartItems).length > 0 ? (
                Object.keys(cartItems).map((productId, index) => (
                  <CartItem
                    key={index}
                    item={cartItems[productId]} // Pass entire product details
                    quantity={cartItems[productId].quantity}
                  />
                ))
              ) : (
                <p className="text-gray-600">Your cart is currently empty.</p>
              )}

              {getCartCount() > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total:</p>${getCartAmount()}
                  </div>
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      navigate("/place-order");
                    }}
                    className="mt-4 w-full rounded bg-black px-3 py-2 text-white"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
