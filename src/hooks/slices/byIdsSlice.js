// src/hooks/slice/byIdsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

// Thunks
export const fetchPlaceDataByIds = createAsyncThunk(
  "byIds/fetchPlaces",
  async (ids) => {
    const response = await Api.post(EndPointes.getPlacesByIds, ids);
    return response.data;
  }
);

export const fetchCitiesDataByIds = createAsyncThunk(
  "byIds/fetchCities",
  async (ids) => {
    const response = await Api.post(EndPointes.getCitiesByIds, ids);
    return response.data;
  }
);

export const fetchFoodsDataByIds = createAsyncThunk(
  "byIds/fetchFoods",
  async (ids) => {
    const response = await Api.post(EndPointes.getFoodsByIds, ids);
    return response.data;
  }
);

export const fetchActivitiesDataByIds = createAsyncThunk(
  "byIds/fetchActivities",
  async (ids) => {
    const response = await Api.post(EndPointes.getActivitiesByIds, ids);
    console.log("Activities response:", response);
    return response.data;
  }
);

export const fetchHotelsDataByIds = createAsyncThunk(
  "byIds/fetchHotels",
  async (ids) => {
    const response = await Api.post(EndPointes.getHotelsByIds, ids);
    return response.data;
  }
);

// Slice
const byIdsSlice = createSlice({
  name: "byIds",
  initialState: {
    places: [],
    cities: [],
    foods: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Places
      .addCase(fetchPlaceDataByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaceDataByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaceDataByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Cities
      .addCase(fetchCitiesDataByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesDataByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCitiesDataByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Foods
      .addCase(fetchFoodsDataByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodsDataByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoodsDataByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default byIdsSlice.reducer;
