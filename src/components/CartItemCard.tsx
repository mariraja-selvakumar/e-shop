import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispatch } from "../redux/store";
import { addItem, removeItem } from "../redux/reducer/slices/cartSlice";
import "./styles/CartItemCard.scss";

interface CartItemCardProps {
  id: string;
  name: string;
  img: string;
  rate: number;
  qty: number;
}

const CartItemCard = ({ id, name, img, rate, qty }: CartItemCardProps) => {
  const dispatch = useAppDispatch();

  const addAnItem = () => {
    dispatch(addItem({ id, name, img, rate }));
  };

  const removeAnItem = () => {
    dispatch(removeItem({ id, name, img, rate }));
  };

  return (
    <Box className="cart-item-card">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box className="info">
          <Box component="img" className="img" src={img} />
          <Stack direction="column">
            <Typography component="p">{name}</Typography>
            <Typography component="p">{rate}</Typography>
          </Stack>
        </Box>
        <Stack direction="row">
          <IconButton color="primary" size="small" onClick={addAnItem}>
            <Add />
          </IconButton>
          <Typography component="h6" variant="h6">
            {qty}
          </Typography>
          <IconButton color="primary" size="small" onClick={removeAnItem}>
            <Remove />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartItemCard;
