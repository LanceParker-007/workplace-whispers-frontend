import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptor/axiosInstance";

export const createNewPost = createAsyncThunk(
  "createNewPost",
  async (
    { title, companyName, companyLocation, content },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/posts/create-new", {
        title,
        companyName,
        companyLocation,
        content,
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

export const getAllPostsOfUser = createAsyncThunk(
  "getAllPostsOfUser",
  async ({ userId, page = 1, limit = 50 }, { rejectWithValue }) => {
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

export const deletePost = createAsyncThunk(
  "deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts/delete", {
        postId,
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
