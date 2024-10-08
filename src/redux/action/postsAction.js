import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptor/axiosInstance";

export const likeDislikePost = createAsyncThunk(
  "likeDislikePost",
  async ({ postId, userAction }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts/like-dislike", {
        postId,
        userAction,
      });

      if (data.success) {
        return data;
      } else {
        rejectWithValue(data);
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "getAllPosts",
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
