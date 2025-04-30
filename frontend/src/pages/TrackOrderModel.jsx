const statusSteps = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function TrackOrderModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Order Status</h2>
        <ol className="relative ml-4 border-l border-gray-200">
          {statusSteps.map((step, idx) => (
            <li key={step} className="mb-4 ml-6">
              <span
                className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                  order.status === step ||
                  statusSteps.indexOf(order.status) > idx
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {idx + 1}
              </span>
              <p className="text-sm">{step}</p>
            </li>
          ))}
        </ol>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TrackOrderModal;
