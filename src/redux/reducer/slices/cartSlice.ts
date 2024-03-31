import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  rate: string;
  img: string;
  qty: number;
}

export type CartItems = CartItem[] | [];

const initialState: CartItems = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let product = action.payload;
      let exist = state.find((x) => x.id === product.id);
      if (exist) {
        let updatedProduct = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
        return updatedProduct;
      } else {
        const product = action.payload;
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
    },
    removeItem: (state, action) => {
      let product = action.payload;
      let exist = state.find((x) => x.id === product.id);
      if (exist?.qty === 1) return state.filter((x) => x.id !== exist?.id);
      else
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
    },
    resetCart: (state) => {
      state.splice(0);
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
