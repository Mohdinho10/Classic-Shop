import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}/get`,
        credentials: "include",
        method: "POST",
        body: { userId },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ userId, itemId, size }) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        body: { userId, itemId, size },
        credentials: "include",
      }),
    }),
    updateCart: builder.mutation({
      query: ({ userId, itemId, size, quantity }) => ({
        url: `${CART_URL}/update`,
        method: "PUT",
        body: { userId, itemId, size, quantity },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
} = cartApiSlice;
