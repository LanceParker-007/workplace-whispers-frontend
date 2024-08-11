import { createSlice, current } from "@reduxjs/toolkit";
import {
  createNewPost,
  getAllPosts,
  likeDislikePost,
} from "../action/postsAction";

const initialState = {
  posts: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
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
      .addCase(likeDislikePost.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        const updatedPosts = state.posts.map((post) => {
          if (post._id === updatedPost._id) {
            post = updatedPost;
          }
          return post;
        });
        state.posts = updatedPosts;
      })
      .addCase(likeDislikePost.rejected, (state, action) => {})

      // Get all posts
      .addCase(getAllPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // eslint-disable-next-line no-unsafe-optional-chaining
        state.posts = [...state.posts, ...action.payload?.posts];
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setPosts, setTotalPages, setCurrentPage } = postsSlice.actions;
const postsSliceReducer = postsSlice.reducer;
export default postsSliceReducer;
