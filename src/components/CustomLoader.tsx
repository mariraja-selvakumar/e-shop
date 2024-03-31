import { Box, CircularProgress } from "@mui/material";
import "./styles/CustomLoader.scss";

const CustomLoader = () => (
  <Box className="custom-loader">
    <CircularProgress />
  </Box>
);

export default CustomLoader;
