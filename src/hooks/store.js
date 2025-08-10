import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./slices/stateSlice";
import citySlice from "./slices/citySlice";
import byIdsSlice from "./slices/byIdsSlice";
import placesSlice from "./slices/placesSlice";
import foodsSlice from "./slices/foodsSlice";
import calenderSlice from "./slices/calenderSlice";

const store = configureStore({
  reducer: {
    states: stateSlice,
    city: citySlice,
    byIds: byIdsSlice,
    places: placesSlice,
    foods: foodsSlice,
    calender: calenderSlice,
  },
});

export default store;
