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
