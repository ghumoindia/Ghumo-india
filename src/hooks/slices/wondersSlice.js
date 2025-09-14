import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";
import { act } from "react";

export const getWonders = createAsyncThunk("wonders/fetchAll", async () => {
  const result = await Api.get(EndPointes.fetchAllWonders);

  return result;
});

export const getSingleWonders = createAsyncThunk(
  "wonders/fetchSingle",
  async ({ id }) => {
    console.log("result data===> ", id);
    const result = await Api.get(`${EndPointes.fetchSingleWonders}/${id}`);

    return result;
  }
);

const wondersSlice = createSlice({
  name: "wonders",
  initialState: {
    wondersList: [],
    singleWonder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWonderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getWonders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWonders.fulfilled, (state, action) => {
        state.loading = false;
        state.wondersList = action.payload.wonder;
      })
      .addCase(getWonders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSingleWonders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleWonders.fulfilled, (state, action) => {
        state.loading = false;
        state.singleWonder = action.payload.wonder;
      })
      .addCase(getSingleWonders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearWonderError } = wondersSlice.actions;
export default wondersSlice.reducer;
