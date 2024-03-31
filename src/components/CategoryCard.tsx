import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./styles/CategoryCard.scss";
import { useAppDispatch } from "../redux/store";
import { updateCategory } from "../redux/reducer/slices/itemSlice";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  img: string;
  desc: string;
}

const CategoryCard = ({ name, img, desc }: CategoryCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const truncatedDesc =
    desc.length > 150 ? `${desc.substring(0, 150)}...` : desc;

  return (
    <Card
      component="button"
      className="category-card"
      onClick={() => {
        dispatch(updateCategory(name));
        navigate("/items");
      }}
    >
      <CardMedia sx={{ height: 140 }} image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            height: "100px",
          }}
        >
          {truncatedDesc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
