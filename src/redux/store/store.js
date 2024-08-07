import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/authSlice";
import postsSliceReducer from "../slice/postsSlice";

const store = configureStore({
  reducer: {
    authSliceReducer,
    postsSliceReducer,
  },
});

export default store;
