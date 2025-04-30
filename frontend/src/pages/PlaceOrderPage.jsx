import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import stripe from "../assets/images/stripe_logo.png";
import paypal from "../assets/images/paypal.png";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  usePlaceStripeOrderMutation,
  usePlacePaypalOrderMutation,
} from "../slices/orderApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { toast } from "react-toastify";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [method, setMethod] = useState("cod");
  const { getCartAmount, setCartItems, cartItems, delivery } = useShop();
  const [createOrder] = useCreateOrderMutation();
  const [placeStripeOrder] = usePlaceStripeOrderMutation();
  const [placePaypalOrder] = usePlacePaypalOrderMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const stripePromise = loadStripe(
    "pk_test_51NND9uK93Bpmf1Ua9s9WZJbymZhl4b33hZq2seKWHmtazYtPXKuUoxKHHNK8CCFGwg1NK9FUytwNfiW52UlCedCB00wovd7qgv",
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [...cartItems];

      const orderData = {
        userId: userInfo?._id,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery,
      };

      switch (method) {
        case "cod": {
          const response = await createOrder(orderData).unwrap();
          if (response.success) {
            setCartItems([]);
            navigate("/orders");
          }
          break;
        }
        case "stripe": {
          const response = await placeStripeOrder(orderData).unwrap();
          if (response.success && response.session_url) {
            await stripePromise;
            window.location.href = response.session_url;
          }
          break;
        }
        case "paypal": {
          toast.info("Scroll down to complete your PayPal payment.");
          break;
        }
        default: {
          toast.error("Select a valid payment method.");
          break;
        }
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong while placing the order.",
      );
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 md:flex-row md:pt-14"
    >
      {/* Left side */}
      <div className="flex w-full flex-col gap-4 md:max-w-[480px]">
        <div className="my-3 text-xl md:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={changeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="First Name"
            required
          />
          <input
            onChange={changeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          onChange={changeHandler}
          name="email"
          value={formData.email}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Email Address"
          required
        />
        <input
          type="text"
          onChange={changeHandler}
          name="street"
          value={formData.street}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            onChange={changeHandler}
            name="city"
            value={formData.city}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="City"
            required
          />
          <input
            type="text"
            onChange={changeHandler}
            name="state"
            value={formData.state}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            onChange={changeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            onChange={changeHandler}
            name="country"
            value={formData.country}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Country"
            required
          />
        </div>
        <input
          type="number"
          onChange={changeHandler}
          name="phone"
          value={formData.phone}
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Phone"
          required
        />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img src={stripe} className="mx-4 h-5" alt="stripe" />
            </div>
            <div
              onClick={() => setMethod("paypal")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "paypal" ? "bg-green-400" : ""}`}
              ></p>
              <img src={paypal} className="mx-4 h-5" alt="paypal" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              className="bg-black px-16 py-3 text-sm text-white"
            >
              PLACE ORDER
            </button>
          </div>

          {method === "paypal" && (
            <div className="mt-6">
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async (data, actions) => {
                  const orderItems = [...cartItems];
                  const orderData = {
                    userId: userInfo?._id,
                    address: formData,
                    items: orderItems,
                    amount: getCartAmount() + delivery,
                  };

                  try {
                    const res = await placePaypalOrder(orderData).unwrap();
                    if (res.success) {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: String(orderData.amount),
                            },
                          },
                        ],
                      });
                    } else {
                      throw new Error("Server rejected PayPal order.");
                    }
                  } catch (err) {
                    toast.error("PayPal order creation failed.");
                    console.error(err);
                    return null;
                  }
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  toast.success(
                    `Transaction completed by ${details.payer.name.given_name}`,
                  );
                  setCartItems([]);
                  navigate("/orders");
                }}
                onError={(err) => {
                  console.error(err);
                  toast.error("Something went wrong with PayPal.");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default PlaceOrderPage;
