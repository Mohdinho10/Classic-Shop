import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, category, subCategory, sortType, page, limit }) => ({
        url: PRODUCTS_URL,
        params: {
          search,
          category: category.join(","),
          subCategory: subCategory.join(","),
          sortType,
          page,
          limit,
        },
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getLatestCollections: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/latest`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getLatestBestsellers: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/bestsellers`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getRelatedProducts: builder.query({
      query: ({ category, subCategory }) => ({
        url: `${PRODUCTS_URL}/related`,
        params: { category, subCategory },
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetTopProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetRelatedProductsQuery,
  useGetLatestCollectionsQuery,
  useGetLatestBestsellersQuery,
} = productApiSlice;
