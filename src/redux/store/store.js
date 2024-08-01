import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/authSlice";

const store = configureStore({
  reducer: {
    authSliceReducer,
  },
});

export default store;
