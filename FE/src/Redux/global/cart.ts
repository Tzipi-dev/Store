import { createSlice } from "@reduxjs/toolkit";
import type { Cart, Product } from "../../interfaces/interfaces";
import type { RootState } from "@reduxjs/toolkit/query";


const initialState: Cart = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    }
  },
});

export const { addProduct, clearCart } = cartSlice.actions;

// סלקטור מומלץ
export const selectCart = (state: Cart) => state.products;

export default cartSlice.reducer;