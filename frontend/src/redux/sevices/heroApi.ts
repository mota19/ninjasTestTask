import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IHero } from "../../types/herotypes";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5173/" }),
  endpoints: (builder) => ({
    getHeroes: builder.query<IHero[], void>({ query: () => "getHeroes" }),
  }),
});

export const { useGetHeroesQuery } = heroApi;
