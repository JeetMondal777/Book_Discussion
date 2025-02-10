import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: "", // Initially, no user is logged in
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Store user data in state
    },
    clearUser(state) {
      state.user = ""; // Clear user data on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

