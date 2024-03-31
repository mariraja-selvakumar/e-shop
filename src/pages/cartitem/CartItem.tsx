import { Box, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CartItemCard from "../../components/CartItemCard";
import CustomButton from "../../components/CustomButton";
import { updateOrder } from "../../redux/reducer/slices/orderSlice";
import { resetCart } from "../../redux/reducer/slices/cartSlice";
import { updateToast } from "../../redux/reducer/slices/toastSlice";
import "./CartItem.scss";
import constants from "../../constants/constants";

const CartItem = () => {
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let total: number = 0;

  const handlePlaceOrder = () => {
    dispatch(
      updateOrder({
        orderID: Math.floor(Date.now() / 1000),
        orders: cart,
        total,
      })
    );
    dispatch(resetCart());
    dispatch(
      updateToast({
        show: true,
        message: "Order Placed Successfully!",
        severity: "success",
      })
    );
    navigate("/orders");
  };

  if (cart?.length === 0)
    return (
      <Typography component="h5" variant="h5" my={2} textAlign="center">
        {constants.no_items}
      </Typography>
    );

  return (
    <Box className="cart-item">
      <Box>
        <Typography component="h5" variant="h5" my={2}>
          {constants.cart_items}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={9} px={1}>
            <Grid container spacing={1} p={0}>
              {cart?.map(({ id, img, name, qty, rate }) => (
                <Grid key={id} item md={12}>
                  <CartItemCard
                    id={id}
                    name={name}
                    img={img}
                    qty={qty}
                    rate={Number(rate)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={3} className="summary">
            <Typography component="h6" variant="h6">
              {constants.summary}
            </Typography>
            {cart?.map(({ id, name, qty, rate }) => {
              total += qty * Number(rate);
              return (
                <Stack key={id} direction="row" justifyContent="space-between">
                  <Typography component="h6" variant="body2">
                    {name}
                  </Typography>
                  <Typography component="h6" variant="body2" pr={1}>
                    {`${qty} X ${rate} = ${qty * Number(rate)}`}
                  </Typography>
                </Stack>
              );
            })}
            <Typography className="total" component="h6" variant="body2" my={1}>
              {`Total: ${total} /-`}
            </Typography>
            <Box my={1} pr={1}>
              <CustomButton
                category="Place Order"
                fullWidth={true}
                onClick={handlePlaceOrder}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CartItem;
