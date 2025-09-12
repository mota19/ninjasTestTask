import { createSlice } from "@reduxjs/toolkit";
import type { IHero } from "../../types/herotypes";
import { heroApi } from "../sevices/heroApi";

interface IinitialState {
  heroes: IHero[];
}

const initialState: IinitialState = {
  heroes: [],
};

export const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      heroApi.endpoints.getHeroes.matchFulfilled,
      (state, action) => {
        state.heroes = action.payload;
      }
    );
  },
});
