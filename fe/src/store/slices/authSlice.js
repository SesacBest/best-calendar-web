import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    kakaoLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { login, logout, kakaoLogin } = authSlice.actions;
export default authSlice.reducer;