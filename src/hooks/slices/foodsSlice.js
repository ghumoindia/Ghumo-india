import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const getFoodsByIds = createAsyncThunk(
  "byIds/fetchFoods",
  async (ids) => {
    const response = await Api.get(`${EndPointes.getFoodsDataById}/${ids}`);
    return response.data;
  }
);
const foodsSlice = createSlice({
  name: "foods",
  initialState: {
    foods: [],
    currentFood: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoodsByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoodsByIds.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFood = action.payload;
      })
      .addCase(getFoodsByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodsSlice.reducer;
