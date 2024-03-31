import { SetStateAction, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addItem, removeItem } from "../redux/reducer/slices/cartSlice";
import "./styles/ItemCard.scss";

interface ItemCardProps {
  id: string;
  name: string;
  img: string;
  rate: number;
  setSelectedItem: SetStateAction<any>;
}

const ItemCard = ({ id, name, img, rate, setSelectedItem }: ItemCardProps) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(0);

  const words = name.split(" ");
  const updatedTitle = words.slice(0, 1).join(" ");

  const addToCart = () => {
    dispatch(addItem({ id, name, img, rate }));
  };

  const addAnItem = () => {
    dispatch(addItem({ id, name, img, rate }));
  };

  const removeAnItem = () => {
    dispatch(removeItem({ id, name, img, rate }));
  };

  useEffect(() => {
    const item = cart.find((item) => item.id === id);
    if (item && item?.qty > 0) setQuantity(item.qty);
    else setQuantity(0);
  }, [cart, id]);

  return (
    <Card
      component="button"
      className="item-card"
      onClick={() => setSelectedItem({ id, name, img, rate })}
    >
      <CardMedia sx={{ height: 140 }} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {updatedTitle}
        </Typography>
        <Typography gutterBottom variant="h6" component="h6">
          {`₹${rate} /-`}
        </Typography>
        {quantity > 0 ? (
          <Stack
            className="stack"
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <IconButton color="primary" size="small" onClick={addAnItem}>
              <Add />
            </IconButton>
            <Typography component="h6" variant="h6">
              {quantity}
            </Typography>
            <IconButton color="primary" size="small" onClick={removeAnItem}>
              <Remove />
            </IconButton>
          </Stack>
        ) : (
          <CustomButton
            category="Add to Cart"
            fullWidth={true}
            onClick={addToCart}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
