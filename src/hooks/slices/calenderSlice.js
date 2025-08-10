import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const getMonthCalendar = createAsyncThunk(
  "calendar/getMonthCalendar",
  async ({ year = new Date().getFullYear(), monthNumber }) => {
    try {
      const response = await Api.get(
        `${EndPointes.fetchAllCalendar}/month/${year}/${monthNumber}`
      );
      return response || {};
    } catch (error) {
      // If month doesn't exist, return empty structure
      if (error.response?.status === 404) {
        return { success: false, calendar: null };
      }
      throw error;
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    monthCalendar: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.monthCalendar = action.payload;
      })
      .addCase(getMonthCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default calendarSlice.reducer;
