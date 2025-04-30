// import Loader from "../component/Loader";
// import { useGetOrdersQuery } from "../slices/orderApiSlice";
// import parcelIcon from "/parcel_icon.svg";

// function OrdersPage() {
//   const { data: orders, isLoading, error } = useGetOrdersQuery();
//   // console.log(orders);

//   if (isLoading) return <Loader />;
//   if (error)
//     return (
//       <p className="py-10 text-center text-red-500">Failed to load orders</p>
//     );

//   return (
//     <div>
//       <h3>OrdersPage</h3>
//       <div>
//         {orders?.map((order, index) => (
//           <div key={index}>
//             <img src={parcelIcon} alt="" />
//             <div>
//               {orders?.items?.map((item, index) => {
//                 if (index === orders.items.length) {
//                   return (
//                     <p key={index}>
//                       {item.name} x {item.quantity}
//                     </p>
//                   );
//                 }
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default OrdersPage;
