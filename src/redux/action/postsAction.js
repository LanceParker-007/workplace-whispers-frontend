import { createAsyncThunk } from "@reduxjs/toolkit";
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

      console.log(data);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const likeDislikePost = createAsyncThunk(
  "likeDislikePost",
  async ({ postId, userAction }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/posts/like-dislike", {
        postId,
        userAction,
      });

      console.log(data);
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

      console.log(data);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
