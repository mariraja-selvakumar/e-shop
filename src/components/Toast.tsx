import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateToast } from "../redux/reducer/slices/toastSlice";
import { useAppSelector } from "../redux/store";

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

const Toast = () => {
  const dispatch = useDispatch();
  let { show, severity, message } = useAppSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(updateToast({ show: false, severity, message }));
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
