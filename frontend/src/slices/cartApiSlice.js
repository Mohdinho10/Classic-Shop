import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}/get/${userId}`,
        credentials: "include",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ userId, productId, size, quantity }) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        body: { userId, productId, size, quantity },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: `${CART_URL}/update`,
        method: "PUT",
        body: { userId, productId, quantity },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `${CART_URL}/${userId}/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useDeleteCartItemMutation,
} = cartApiSlice;
