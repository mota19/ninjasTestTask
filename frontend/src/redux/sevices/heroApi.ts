import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IHero, PostHero } from "../../types/herotypes";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5175/",
  }),
  tagTypes: ["Hero"],
  endpoints: (builder) => ({
    getHeroes: builder.query<
      { heroes: IHero[]; totalPages: number },
      { page: number }
    >({
      query: ({ page }) => `/heroes?page=${page}`,
      keepUnusedDataFor: 10,
      providesTags: ["Hero"],
    }),
    getHeroById: builder.query<IHero, { id: number }>({
      query: ({ id }) => `/hero/${id}`,
      providesTags: ["Hero"],
    }),
    addHero: builder.mutation<IHero, PostHero>({
      query: (hero) => ({ url: "/heroes", method: "POST", body: hero }),
      invalidatesTags: ["Hero"],
    }),
    deleteHero: builder.mutation<void, number>({
      query: (id) => ({ url: `/heroes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Hero"],
    }),
    updateHero: builder.mutation<
      IHero,
      { id: number; data: Partial<PostHero> }
    >({
      query: ({ id, data }) => ({
        url: `/heroes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useGetHeroByIdQuery,
  useAddHeroMutation,
  useDeleteHeroMutation,
  useUpdateHeroMutation,
} = heroApi;
