import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );
      const maxQuantity = product.price > 100000 ? 5 : 15;

      if (existingProduct) {
        state.products = state.products.map((item) => {
          if (item.id === product.id && item.quantity < maxQuantity) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.products = [...state.products, { ...product, quantity: 1 }];
      }

      state.totalPrice = state.products.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      const product = action.payload;
      state.products = state.products.filter((item) => item.id !== product.id);
      state.totalPrice = state.totalPrice - product.price * product.quantity;
    },

    increaseQuantity: (state, action) => {
      const product = action.payload;
      const maxQuantity = product.price > 100000 ? 5 : 15;

      state.products = state.products.map((item) => {
        if (item.id === product.id && item.quantity < maxQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // Only increase total price if quantity was actually increased
      const updatedProduct = state.products.find(
        (item) => item.id === product.id
      );
      if (updatedProduct && updatedProduct.quantity > product.quantity) {
        state.totalPrice = state.totalPrice + product.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = action.payload;
      if (product.quantity <= 1) return;

      state.products = state.products.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      state.totalPrice = state.totalPrice - product.price;
    },

    clearCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
