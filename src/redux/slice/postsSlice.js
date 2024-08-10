import { createSlice, current } from "@reduxjs/toolkit";
import {
  createNewPost,
  getAllPosts,
  likeDislikePost,
} from "../action/postsAction";

const initialState = {
  posts: [],
  totalPages: 0,
  currentPage: 0,
  isLoading: "",
  message: "",
};

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
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
      .addCase(getAllPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload?.posts;
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setPosts, setTotalPages, setCurrentPage } = postsSlice.actions;
const postsSliceReducer = postsSlice.reducer;
export default postsSliceReducer;
