import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import "./styles/CustomButton.scss";

interface CustomButtonProps {
  category: string;
  loading?: boolean;
  type?: string;
  fullWidth?: boolean;
  onClick?: any;
}

const CustomButton = ({
  category,
  loading = false,
  type,
  fullWidth = false,
  onClick,
}: CustomButtonProps & LoadingButtonProps) => (
  <LoadingButton
    className="custom-button"
    variant="contained"
    size="small"
    loading={loading}
    type={type}
    fullWidth={fullWidth}
    onClick={onClick}
  >
    {category}
  </LoadingButton>
);

export default CustomButton;
