import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../lib/axios";
import EndPointes from "../../lib/endPoints";
export const fetchAllExperiences = createAsyncThunk(
  "experiences/fetchAll",
  async () => {
    const res = await Api.get(EndPointes.getAllExperiences);
    return res.data;
  }
);

export const fetchExperienceById = createAsyncThunk(
  "experiences/fetchById",
  async (id) => {
    const res = await Api.get(`${EndPointes.getExperienceById}/${id}`);
    return res.data;
  }
);

const experienceSlice = createSlice({
  name: "experiences",
  initialState: {
    experiencesList: [],
    currentExperience: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiencesList = action.payload;
      })
      .addCase(fetchAllExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExperienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentExperience = action.payload;
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default experienceSlice.reducer;
