import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Box, Grid } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { updateToast } from "../../redux/reducer/slices/toastSlice";
import CustomButton from "../../components/CustomButton";
import logo from "../../assets/icons/basket.png";
import { updateLogin } from "../../redux/reducer/slices/loginSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (data?.username === "Admin" && data?.password === "Admin@123") {
      dispatch(
        updateLogin({ username: data?.username, password: data?.password })
      );
      dispatch(
        updateToast({
          show: true,
          message: "Successfully Logged In",
          severity: "success",
        })
      );
      setTimeout(() => {
        window.location.replace("/home");
      }, 1500);
    } else {
      dispatch(
        updateToast({
          show: true,
          message: "Authentication Failed!",
          severity: "error",
        })
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Box
          p={4}
          boxShadow={3}
          borderRadius={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            alt="logo"
            src={logo}
            height="50px"
            width="50px"
          />
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username")}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <CustomButton type="submit" fullWidth={true} category="Login" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
