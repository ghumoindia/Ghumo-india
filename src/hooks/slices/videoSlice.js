import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";

export const fetchHeroVideo = createAsyncThunk("hero/fetchVideo", async () => {
  const result = await Api.get(EndPointes.fetchAllVideo);
  console.log("video data", result);
  return result.video;
});

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroVideo.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchHeroVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videoList = action.payload || [];
      })
      .addCase(fetchHeroVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videoSlice.reducer;
