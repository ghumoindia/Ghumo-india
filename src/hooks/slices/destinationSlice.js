import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const fetchAllDestinations = createAsyncThunk(
  "fetchDestination",
  async () => {
    const res = await Api.get(EndPointes.getAllDestinations);
    console.log("Fetched destinations:", res);
    return res.data;
  }
);
export const fetchDestinationById = createAsyncThunk(
  "fetchDestinationById",
  async (id) => {
    const res = await Api.get(`${EndPointes.getDestinationById}/${id}`);
    console.log("response destination by id:", res);
    return res.data;
  }
);

const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    destinationsList: [],
    currentDestination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinationsList = action.payload;
      })
      .addCase(fetchAllDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDestinationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDestination = action.payload;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default destinationSlice.reducer;
