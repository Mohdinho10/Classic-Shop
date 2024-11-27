import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
        credentials: "include",
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    // For admin
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
} = ordersApiSlice;
