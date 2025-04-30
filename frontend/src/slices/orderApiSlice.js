import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/place`,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user`,
        method: "GET",
        credentials: "include", // Required to send cookies/session
      }),
    }),
    placeStripeOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/stripe`,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    placePaypalOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/paypal`,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    verifyStripePayment: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/verify-stripe`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    verifyPaypalPayment: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/verify-paypal`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  usePlaceStripeOrderMutation,
  usePlacePaypalOrderMutation,
  useVerifyStripePaymentMutation,
  useVerifyPaypalPaymentMutation,
} = ordersApiSlice;
