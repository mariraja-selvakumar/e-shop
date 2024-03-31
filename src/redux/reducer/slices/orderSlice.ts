import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItems } from "./cartSlice";

interface OrderType {
  orderID: number;
  orders: CartItems;
  total: number;
}

type InitialState = OrderType[];

const initialState: InitialState = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<OrderType>) => {
      state.push(action.payload);
    },
  },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
