import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./Slice/HomeSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
});
