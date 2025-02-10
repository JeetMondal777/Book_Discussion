import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isProfileOpen: false, // Initially, false
};

const isProfileOpenSlice = createSlice({
  name: 'isProfileOpen',
  initialState,
  reducers: {
    setIsProfileOpenTrue(state) {
      ; // Debug log
      state.isProfileOpen = true; 
    },
    setIsProfileOpenFalse(state) {
         // Debug log
      state.isProfileOpen = false; 
    },
  },
});

export const { setIsProfileOpenTrue, setIsProfileOpenFalse } = isProfileOpenSlice.actions;

export default isProfileOpenSlice.reducer;

