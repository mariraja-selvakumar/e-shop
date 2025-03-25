import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";

const CustomLoader = lazy(() => import("./components/CustomLoader"));
const PrivateRoutes = lazy(() => import("./routes/PrivateRoutes"));
const Home = lazy(() => import("./pages/home/Home"));
const Toast = lazy(() => import("./components/Toast"));
const Items = lazy(() => import("./pages/items/Items"));
const CartItem = lazy(() => import("./pages/cartitem/CartItem"));
const Orders = lazy(() => import("./pages/orders/Orders"));
const Login = lazy(() => import("./pages/login/Login"));

const App = () => (
  <Suspense fallback={<CustomLoader />}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="home"></Route>
            <Route element={<Items />} path="items" />
            <Route element={<CartItem />} path="cartitem" />
            <Route element={<Orders />} path="orders" />
          </Route>
          <Route element={<Login />} path="/"></Route>
        </Routes>
        <Toast />
      </BrowserRouter>
    </Provider>
  </Suspense>
);

export default App;
