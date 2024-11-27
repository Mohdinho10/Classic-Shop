import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import stripe from "../assets/images/stripe_logo.png";
import razorpay from "../assets/images/razorpay_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  return (
    <div className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 md:flex-row md:pt-14">
      {/* Left side */}
      <div className="flex w-full flex-col gap-4 md:max-w-[480px]">
        <div className="my-3 text-xl md:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="First Name"
          />
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Email Address"
        />
        <input
          type="text"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="City"
          />
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Zip code"
          />
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            placeholder="Country"
          />
        </div>
        <input
          type="number"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          placeholder="Phone"
        />
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment method selection */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img src={stripe} className="mx-4 h-5" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === "razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img src={razorpay} className="mx-4 h-5" alt="" />
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
              onClick={() => navigate("/orders")}
              className="bg-black px-16 py-3 text-sm text-white"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
