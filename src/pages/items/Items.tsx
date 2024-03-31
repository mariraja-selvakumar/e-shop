import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getItems } from "../../redux/reducer/slices/itemSlice";
import CustomLoader from "../../components/CustomLoader";
import { Box, Grid, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import "./Items.scss";
import { getItemDetails } from "../../redux/reducer/slices/itemDetailsSlice";

const Items = () => {
  const { selectedCategory, isLoading, data } = useAppSelector(
    (state) => state.items
  );

  const dispatch = useAppDispatch();

  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    dispatch(getItems(selectedCategory));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (selectedItem?.id) {
      dispatch(getItemDetails(selectedItem?.id));
    }
  }, [selectedItem, dispatch]);

  if (isLoading) return <CustomLoader />;

  return (
    <Box className="items">
      <Typography variant="h5" component="h5" my={2}>
        {selectedCategory}
      </Typography>
      <Grid container spacing={1}>
        {data?.map(({ strMeal, strMealThumb, idMeal }) => {
          return (
            <Grid key={idMeal} item xl={2} md={3} sm={6} xs={12}>
              <ItemCard
                id={idMeal}
                name={strMeal}
                img={strMealThumb}
                rate={500}
                setSelectedItem={setSelectedItem}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Items;
