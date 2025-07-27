import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const fetchPlaceDataByIds = createAsyncThunk(
  "fetchPlaces",
  async (ids) => {
    const response = await Api.get(`${EndPointes.getPlaceDataByIds}/${ids}`);
    return response.data;
  }
);

const placesSlice = createSlice({
  name: "places",
  initialState: {
    placesList: [],
    currentPlace: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceDataByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaceDataByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlace = action.payload;
      })
      .addCase(fetchPlaceDataByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default placesSlice.reducer;
