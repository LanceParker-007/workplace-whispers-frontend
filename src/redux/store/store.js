import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/authSlice";
import postsSliceReducer from "../slice/postsSlice";
import userSliceReducer from "../slice/userSlice";

const store = configureStore({
  reducer: {
    authSliceReducer,
    userSliceReducer,
    postsSliceReducer,
  },
});

export default store;
