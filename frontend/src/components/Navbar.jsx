import logo from "../assets/images/logo.png";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { apiSlice } from "../slices/apiSlice";

function Navbar() {
  const {
    search,
    setSearch,
    getCartCount,
    cartItems,
    setCartItems,
    getCartAmount,
  } = useShop();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      setCartItems({}); // Clear cart on logout
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="flex flex-wrap items-center justify-between">
        <Link to="/">
          <img src={logo} alt="classic-logo" className="w-36" />
        </Link>

        {/* Search bar for medium and above screens */}
        {isSearchVisible && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${search}`);
                setIsSearchVisible(false);
              }
            }}
            placeholder="Search..."
            className="hidden w-[400px] rounded-full border border-gray-300 px-5 py-2 outline-none transition focus:border-black md:inline-flex"
          />
        )}

        {/* Icons section */}
        <div className="flex items-center gap-4">
          {!isSearchVisible ? (
            <IoIosSearch
              className="h-6 w-6 cursor-pointer sm:h-7 sm:w-7"
              onClick={toggleSearch}
            />
          ) : (
            <IoMdClose
              className="h-6 w-6 cursor-pointer sm:h-7 sm:w-7"
              onClick={toggleSearch}
            />
          )}

          <div className="group relative">
            <Link to={!userInfo ? "/login" : ""}>
              <FaRegUser className="h-6 w-6 cursor-pointer" />
            </Link>
            {userInfo && (
              <div className="dropdown-menu absolute right-0 z-50 hidden pt-4 group-hover:block">
                <div className="z-10 flex w-36 flex-col gap-2 bg-slate-100 px-5 py-3 text-gray-700">
                  <Link to="/profile">My profile</Link>
                  <Link to="/orders">Orders</Link>
                  <p onClick={logoutHandler} className="cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <IoMdCart
              className="h-6 w-6 cursor-pointer"
              onClick={() => setOpenCart(true)}
            />
            {getCartCount() > 0 && (
              <p className="absolute -bottom-1 -right-1 aspect-square w-4 rounded-full bg-gray-600 text-center text-[8px] leading-4 text-white">
                {getCartCount()}
              </p>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile search bar */}
      {isSearchVisible && (
        <div className="block px-4 pb-3 md:hidden">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${search}`);
                setIsSearchVisible(false);
              }
            }}
            placeholder="Search..."
            className="w-full rounded-full border border-gray-300 px-5 py-2 text-sm outline-none transition focus:border-black"
          />
        </div>
      )}

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
                    item={cartItems[productId]}
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
