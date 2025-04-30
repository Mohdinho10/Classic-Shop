import { useState } from "react";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { BASE_URL } from "../constants";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import TrackOrderModal from "./TrackOrderModel";

function OrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="py-10 text-center text-red-500">Failed to load orders</p>
    );

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders?.length === 0 ? (
        <p className="mt-6 text-center text-gray-500">
          You have no orders yet.
        </p>
      ) : (
        <div>
          {orders?.map((order, orderIndex) => (
            <div key={order?._id || orderIndex}>
              {order?.items.map((item, itemIndex) => (
                <div
                  className="flex flex-col gap-4 border-b border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
                  key={itemIndex}
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      src={`${BASE_URL}${item.image[0]?.replace("public", "").replace(/\\/g, "/")}`}
                      alt=""
                      className="w-16 md:w-20"
                    />
                    <div>
                      <p className="font-medium md:text-base">{item.name}</p>
                      <div className="mt-2 flex items-center gap-3 text-base text-gray-900">
                        <p className="text-lg">${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="mt-2">
                        Date:{" "}
                        <span className="text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p>
                        Payment:{" "}
                        <span className="text-gray-700">
                          {order.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between md:w-1/2">
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
                    {selectedOrder && (
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

/*

import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import Title from "../components/Title";
import { BASE_URL } from "../constants";

function OrdersPage() {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  if (isLoading) return <p className="py-10 text-center">Loading orders...</p>;
  if (error)
    return (
      <p className="py-10 text-center text-red-500">Failed to load orders</p>
    );

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orders.length === 0 ? (
          <p className="mt-6 text-center text-gray-500">
            You have no orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border-b border-t py-6">
              <p className="mb-2 text-sm text-gray-500">
                Order ID: <span className="text-gray-700">{order._id}</span>
              </p>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      src={`${BASE_URL}${item.image[0]?.replace("public", "").replace(/\\/g, "/")}`}
                      // src={`${BASE_URL}${image?.replace("public", "")}`}
                      alt={item.name}
                      className="w-16 md:w-20"
                    />
                    <div>
                      <p className="font-medium md:text-base">{item.name}</p>
                      <div className="mt-2 flex items-center gap-3 text-base text-gray-700">
                        <p className="text-lg">${item.salePrice}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>{order.status}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Date:{" "}
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Total:{" "}
                  <span className="font-semibold text-black">
                    ${order.amount}
                  </span>
                </div>
                <button className="mt-2 w-fit rounded-sm border px-4 py-2 text-sm font-medium md:mt-0">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
*/
