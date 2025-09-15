import { configureStore } from "@reduxjs/toolkit";
import { heroApi } from "../sevices/heroApi";
import { heroSlice } from "../slices/heroSlice";

export const store = configureStore({
  reducer: {
    heroes: heroSlice.reducer,
    [heroApi.reducerPath]: heroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
