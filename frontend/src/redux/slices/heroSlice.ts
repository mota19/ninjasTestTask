import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IHero } from "../../types/herotypes";
import { heroApi } from "../sevices/heroApi";

interface IinitialState {
  heroes: IHero[];
  totalPages: number;
  hero: IHero | null;
}

const initialState: IinitialState = {
  heroes: [],
  totalPages: 0,
  hero: null,
};

export const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      heroApi.endpoints.getHeroes.matchFulfilled,
      (state, action) => {
        state.heroes = action.payload.heroes;
        state.totalPages = action.payload.totalPages;
      }
    );
    builder.addMatcher(
      heroApi.endpoints.getHeroById.matchFulfilled,
      (state, action: PayloadAction<IHero>) => {
        state.hero = action.payload;
      }
    );
  },
});
