import { createSlice } from "@reduxjs/toolkit";
import { createNewPost } from "../action/postsAction";

const initialState = {
  allPosts: [],
  isLoading: "",
  message: "",
};

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: initialState,
  reducers: {
    setAllPosts(state, action) {
      state.allPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setAllPosts } = postsSlice.actions;
const postsSliceReducer = postsSlice.reducer;
export default postsSliceReducer;
