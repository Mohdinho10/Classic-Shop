import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useMarkOrderAsPaidMutation,
} from "../slices/orderApiSlice";
import Loader from "../component/Loader";
import parcelIcon from "/parcel_icon.svg";
import { format } from "date-fns";
import { BASE_URL } from "../constants";

const statusOptions = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function OrdersPage() {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  console.log(orders);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [markOrderAsPaid] = useMarkOrderAsPaidMutation();

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus({ orderId, status });
    refetch();
  };

  const handleMarkAsPaid = async (orderId) => {
    await markOrderAsPaid({ orderId });
    refetch();
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="py-10 text-center text-red-500">Failed to load orders</p>
    );

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-6 text-xl font-bold md:text-2xl">All Orders</h1>

      <div className="flex flex-col gap-4 md:gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-md border border-gray-200 p-3 shadow-sm transition duration-200 hover:shadow-md md:p-4"
          >
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <img src={parcelIcon} alt="parcel" className="w-8 md:w-10" />
                <div>
                  <p className="text-base font-semibold md:text-lg">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-500 md:text-sm">
                    {order.address.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:flex-col md:items-end">
                <p className="text-xs text-gray-500 md:text-sm">
                  {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
                </p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="rounded border px-2 py-1 text-xs md:px-3 md:text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <img
                    src={`${BASE_URL}${item.image[0].replace("public", "")}`}
                    alt={item.name}
                    className="h-12 w-12 rounded-md object-cover md:h-14 md:w-14"
                  />
                  <div>
                    <p className="text-sm font-medium md:text-base">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600 md:text-sm">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t pt-3 text-xs md:mt-4 md:pt-4 md:text-sm">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <p>
                  <strong>Total:</strong> ${order.amount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}{" "}
                  {!order.payment ? (
                    <button
                      onClick={() => handleMarkAsPaid(order._id)}
                      className="ml-2 text-xs text-blue-500 underline"
                    >
                      Mark as Paid
                    </button>
                  ) : (
                    <span className="ml-2 text-green-600">(Paid)</span>
                  )}
                </p>
              </div>
              <p className="break-words">
                <strong>Shipping:</strong> {order.address.street},{" "}
                {order.address.city}, {order.address.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
