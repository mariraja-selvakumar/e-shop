import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import Navbar from "../components/Navbar";

const PrivateRoutes = () => {
  const { username, password } = useAppSelector((state) => state.login);

  return username === "Admin" && password === "Admin@123" ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
