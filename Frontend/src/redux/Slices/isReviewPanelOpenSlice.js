import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isReviewPanelOpen: false,
};

const isReviewPanelOpenSlice = createSlice({
  name: "isReviewPanelOpen",
  initialState,
  reducers: {
    setIsReviewPanelOpenTrue: (state) => {
      state.isReviewPanelOpen = true;
    },
    setIsReviewPanelOpenFalse: (state) => {
      state.isReviewPanelOpen = false;
    },
  },
});

export const { setIsReviewPanelOpenTrue, setIsReviewPanelOpenFalse } = isReviewPanelOpenSlice.actions;
export default isReviewPanelOpenSlice.reducer;
