import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    deleteStatus: null,
  },
  reducers: {
    setDeleteStatus: (state, action) => {
      state.deleteStatus = action.payload;
    },
  },
});

export const { setDeleteStatus } = productSlice.actions;

export default productSlice.reducer;
