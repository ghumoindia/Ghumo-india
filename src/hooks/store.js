import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./slices/stateSlice";

const store = configureStore({
  reducer: {
    states: stateSlice,
  },
});

export default store;
