import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: null,
  },
  reducers: {
    setOrderStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
