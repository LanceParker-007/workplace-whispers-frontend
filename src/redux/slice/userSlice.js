import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsOfUser } from "../action/userAction";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsOfUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPostsOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload?.posts;
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(getAllPostsOfUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, setPost, setPosts, setTotalPages, setCurrentPage } =
  userSlice.actions;
const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
