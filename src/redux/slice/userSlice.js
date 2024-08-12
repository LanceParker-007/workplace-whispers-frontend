import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  deletePost,
  getAllPostsOfUser,
} from "../action/userAction";

const initialState = {
  // User info
  user: null,

  //   Handling a single post
  post: null,

  //  Handling a users all posts
  posts: [],
  totalPages: 0,
  currentPage: 1,

  isLoading: false,
  success: "",
  message: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setMessageEmpty(state, action) {
      state.message = "";
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
        // const createdPost = action.payload.createdPost;
        // if (createdPost) {
        //   state.posts = [createdPost, ...state.posts];
        // }
        state.message = action.payload?.message || "Post created successfully";
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message || "Failed creating post!";
      })

      // Get all posts of user
      .addCase(getAllPostsOfUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPostsOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload?.posts;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(getAllPostsOfUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Handle delete post
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedPost = action.payload.deletedPost;
        state.posts = state.posts.filter(
          (post) => post._id !== deletedPost._id
        );
        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      });
  },
});

export const {
  setUser,
  setPost,
  setPosts,
  setTotalPages,
  setCurrentPage,
  setMessageEmpty,
} = userSlice.actions;
const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
