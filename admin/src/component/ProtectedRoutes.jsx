import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
