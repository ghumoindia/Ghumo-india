import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const fetchAllStates = createAsyncThunk("states/fetchAll", async () => {
  const res = await Api.get(EndPointes.getAllStates);
  console.log("Fetched states:", res.data);
  return res.data;
});

export const fetchStateById = createAsyncThunk(
  "states/fetchById",
  async (id) => {
    const res = await Api.get(`${EndPointes.getStateById}/${id}`);
    console.log("response state by id:", res);
    return res.data;
  }
);

const stateSlice = createSlice({
  name: "states",
  initialState: {
    statesList: [],
    currentState: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentState: (state) => {
      state.currentState = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStates.fulfilled, (state, action) => {
        state.loading = false;
        state.statesList = action.payload;
      })
      .addCase(fetchAllStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchStateById
      .addCase(fetchStateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStateById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentState = action.payload;
      })
      .addCase(fetchStateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentState } = stateSlice.actions;
export default stateSlice.reducer;
