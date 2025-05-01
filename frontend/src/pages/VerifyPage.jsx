import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useVerifyPaypalPaymentMutation,
  useVerifyStripePaymentMutation,
} from "../slices/orderApiSlice";

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const [verifyStripePayment, { isLoading: isStripeVerifying }] =
    useVerifyStripePaymentMutation();
  const [verifyPaypalPayment, { isLoading: isPaypalVerifying }] =
    useVerifyPaypalPaymentMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod");

    const verifyPayment = async () => {
      if (success && orderId && paymentMethod && userId) {
        try {
          if (paymentMethod === "paypal") {
            await verifyPaypalPayment({ userId, orderId, success }).unwrap();
          } else if (paymentMethod === "stripe") {
            await verifyStripePayment({ userId, orderId, success }).unwrap();
          }
          navigate("/orders");
        } catch (error) {
          console.error("Payment verification failed:", error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    verifyPayment();
  }, [
    location.search,
    navigate,
    userId,
    verifyPaypalPayment,
    verifyStripePayment,
  ]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-center text-2xl font-bold">
        {isStripeVerifying || isPaypalVerifying
          ? "Verifying payment, please wait..."
          : "Preparing verification..."}
      </h1>
    </div>
  );
};

export default VerifyPage;
