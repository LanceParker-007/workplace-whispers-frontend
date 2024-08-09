import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
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
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setAccessToken, setIsLoading } = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
