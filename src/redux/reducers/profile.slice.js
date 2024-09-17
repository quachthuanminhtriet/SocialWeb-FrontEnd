import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_ACTION_GET } from "../actions/profile.action";

const profileSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PROFILE_ACTION_GET.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PROFILE_ACTION_GET.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(PROFILE_ACTION_GET.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export default profileSlice;
