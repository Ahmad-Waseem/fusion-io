import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Persist login
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');  // Clear on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
