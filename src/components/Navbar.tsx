import { Badge, Box, IconButton, Stack } from "@mui/material";
import { ShoppingCart, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import logo from "../assets/icons/basket.png";
import "./styles/Navbar.scss";

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleClick = (path: string) => navigate(path);

  return (
    <Box className="navbar">
      <Box
        component="img"
        className="navbar-img"
        alt="logo"
        src={logo}
        onClick={() => handleClick("/home")}
      />
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => handleClick("cartitem")}>
          <Badge badgeContent={cart?.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton color="primary">
          <Settings />
        </IconButton>
        <IconButton color="primary"></IconButton>
      </Stack>
    </Box>
  );
};

export default Navbar;
