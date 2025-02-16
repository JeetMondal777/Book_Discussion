import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDiscussionPanelOpen: false, // Initially, false
};

const isDiscusionPanelOpenSlice = createSlice({
  name: 'isDiscussionPanelOpen',
  initialState,
  reducers: {
    setIsDiscussionPanelOpenTrue(state) {
      state.isDiscussionPanelOpen = true; 
    },
    setIsDiscussionPanelOpenFalse(state) {
      state.isDiscussionPanelOpen = false; 
    },
  },
});

export const { setIsDiscussionPanelOpenTrue, setIsDiscussionPanelOpenFalse } = isDiscusionPanelOpenSlice.actions;

export default isDiscusionPanelOpenSlice.reducer;
