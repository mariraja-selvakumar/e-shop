import { combineReducers } from "redux";
import loginSlice from "./slices/loginSlice";
import toastSlice from "./slices/toastSlice";
import categorySlice from "./slices/categorySlice";
import itemSlice from "./slices/itemSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import itemDetailsSlice from "./slices/itemDetailsSlice";

const rootReducer = combineReducers({
  login: loginSlice,
  toast: toastSlice,
  categories: categorySlice,
  items: itemSlice,
  cart: cartSlice,
  orders: orderSlice,
  item: itemDetailsSlice,
});

export default rootReducer;
