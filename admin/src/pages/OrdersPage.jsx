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
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">All Orders</h1>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-md border border-gray-200 p-4 shadow-sm transition duration-200 hover:shadow-md"
          >
            <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <img src={parcelIcon} alt="parcel" className="w-10" />
                <div>
                  <p className="text-lg font-semibold">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{order.address.email}</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1 md:items-end">
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
                </p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="rounded border px-3 py-1 text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={`${BASE_URL}${item.image[0].replace("public", "")}`}
                    alt={item.name}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-2 border-t pt-4 text-sm md:flex-row md:items-center">
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
              <p>
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
