import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./slices/stateSlice";
import citySlice from "./slices/citySlice";
import byIdsSlice from "./slices/byIdsSlice";
import placesSlice from "./slices/placesSlice";
import foodsSlice from "./slices/foodsSlice";
import calenderSlice from "./slices/calenderSlice";
import destinationSlice from "./slices/destinationSlice";
import experiencesSlice from "./slices/experienceSlice";
import videoSlice from "./slices/videoSlice";
import wondersSlice from "./slices/wondersSlice";

const store = configureStore({
  reducer: {
    states: stateSlice,
    city: citySlice,
    byIds: byIdsSlice,
    places: placesSlice,
    foods: foodsSlice,
    calender: calenderSlice,
    destinations: destinationSlice,
    experiences: experiencesSlice,
    video: videoSlice,
    wonders: wondersSlice,
  },
});

export default store;
