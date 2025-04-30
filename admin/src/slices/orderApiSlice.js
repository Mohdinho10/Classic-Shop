import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // For admin
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method: "GET",
        credentials: "include", // Required to send cookies/session
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/status`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    markOrderAsPaid: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/mark-paid`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useMarkOrderAsPaidMutation,
} = ordersApiSlice;
