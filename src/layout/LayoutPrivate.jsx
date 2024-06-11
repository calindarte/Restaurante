import { Navigate, Outlet } from "react-router-dom";
import { useOrderContext } from "../context/UseOrderContext";
import AdminHeader from "../components/AdminHeader";

const LayoutPrivate = () => {
  const { user } = useOrderContext();

  return user ? (
    <>
      <AdminHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default LayoutPrivate;
