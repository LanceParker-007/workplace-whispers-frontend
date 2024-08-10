import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptor/axiosInstance";

export const getAllPostsOfUser = createAsyncThunk(
  "getAllPostsOfUser",
  async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts/get-all", {
        userId,
        page,
        limit,
      });

      if (data.success) {
        return data;
      } else {
        rejectWithValue(data.message);
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
