import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const fetchCitiesByIds = createAsyncThunk(
  "cities/fetchByIds",
  async (ids) => {
    const response = await Api.get(`${EndPointes.getCitiesDataById}/${ids}`);
    return response.data;
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState: {
    citiesList: [],
    currentCity: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCity: (state) => {
      state.currentCity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesByIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCitiesByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCity = action.payload;
      })
      .addCase(fetchCitiesByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentCity } = citySlice.actions;
export default citySlice.reducer;
