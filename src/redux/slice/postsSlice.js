import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  getAllPosts,
  likeDislikePost,
} from "../action/postsAction";

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
      // Handle create new post
      .addCase(createNewPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Handle like dislike of a post
      .addCase(likeDislikePost.pending, (state, action) => {})
      .addCase(likeDislikePost.fulfilled, (state, action) => {})
      .addCase(likeDislikePost.rejected, (state, action) => {})

      // Get all posts
      .addCase(getAllPosts.pending, (state, action) => {})
      .addCase(getAllPosts.fulfilled, (state, action) => {})
      .addCase(getAllPosts.rejected, (state, action) => {});
  },
});

export const { setAllPosts } = postsSlice.actions;
const postsSliceReducer = postsSlice.reducer;
export default postsSliceReducer;
