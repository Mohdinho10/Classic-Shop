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
  const [verifyStripePayment] = useVerifyStripePaymentMutation();
  const [verifyPaypalPayment] = useVerifyPaypalPaymentMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod"); // detect payment method!

    const verifyPayment = async () => {
      if (success === "true" && orderId) {
        try {
          if (paymentMethod === "paypal") {
            await verifyPaypalPayment({
              userId,
              orderId,
              success,
            });
          } else {
            await verifyStripePayment({
              userId,
              orderId,
              success,
            });
          }
          navigate("/orders");
        } catch (error) {
          console.error("Verification failed", error);
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
    verifyStripePayment,
    verifyPaypalPayment,
    userId,
  ]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Verifying payment, please wait...</h1>
    </div>
  );
};

export default VerifyPage;
