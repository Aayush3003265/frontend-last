import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import cartReducer from "./cart/cartSlice.js";
import productReducer from "./product/productSlice.js";
import orderReducer from "./order/orderSlice.js";
import userPreferenceReducer from "./userPreference/userPreferenceSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
  userPreference: userPreferenceReducer,
});

export default rootReducer;
