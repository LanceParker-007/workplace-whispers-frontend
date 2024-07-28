import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInWithGoogle = createAsyncThunk(
  "signInWithGoogle",
  async ({}, { rejectWithValue }) => {}
);
