import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getCategories } from "../../redux/reducer/slices/categorySlice";
import CategoryCard from "../../components/CategoryCard";
import CustomLoader from "../../components/CustomLoader";
import "./Home.scss";
import constants from "../../constants/constants";

const Home = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) return <CustomLoader />;

  return (
    <Box className="home">
      <Typography variant="h5" component="h5" my={2}>
        {constants.categories}
      </Typography>
      <Grid container spacing={1}>
        {data?.map(
          ({
            idCategory,
            strCategory,
            strCategoryDescription,
            strCategoryThumb,
          }) => (
            <Grid key={idCategory} item xl={2} md={3} sm={6} xs={12}>
              <CategoryCard
                name={strCategory}
                img={strCategoryThumb}
                desc={strCategoryDescription}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default Home;
