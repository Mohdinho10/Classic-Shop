import { useState } from "react";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { BASE_URL } from "../constants";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import TrackOrderModal from "./TrackOrderModel";
import { Link } from "react-router-dom";

function OrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load your orders. Please try again later.
      </p>
    );

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders?.length === 0 ? (
        <div className="mt-10 text-center text-gray-600">
          <p className="mb-4 text-lg">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            to={"/products"}
            className="inline-block rounded-md bg-black px-6 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          {orders.map((order, orderIndex) => (
            <div
              key={order._id || orderIndex}
              className="mb-6 border-b border-t py-4"
            >
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col gap-4 py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      src={`${BASE_URL}${item.image[0]?.replace("public", "").replace(/\\/g, "/")}`}
                      alt={item.name}
                      className="w-16 md:w-20"
                    />
                    <div>
                      <p className="font-medium md:text-base">{item.name}</p>
                      <div className="mt-2 flex items-center gap-3 text-base text-gray-900">
                        <p className="text-lg">${item.price}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="mt-2 text-sm">
                        Date:{" "}
                        <span className="text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-sm">
                        Payment:{" "}
                        <span className="text-gray-700">
                          {order.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-2 text-sm md:w-1/2 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-500"
                            : order.status === "Shipped"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      ></span>
                      <p className="text-sm md:text-base">{order.status}</p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-sm border px-4 py-2 text-sm font-medium"
                    >
                      Track Order
                    </button>

                    {selectedOrder && selectedOrder._id === order._id && (
                      <TrackOrderModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
