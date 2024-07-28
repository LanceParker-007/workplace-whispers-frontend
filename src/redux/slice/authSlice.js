import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setAccessToken } = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
