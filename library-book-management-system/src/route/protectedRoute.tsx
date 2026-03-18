import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    console.log(localStorage.getItem("userId"));
    
  let auth = { token: localStorage.getItem("userId") };
  return auth.token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;