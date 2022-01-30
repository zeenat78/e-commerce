import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "./helper/Index";
const PrivateRoute = (props) => {
  return <>{isAuthenticated() ? <Outlet /> : <Navigate to="/signIn" />}</>;
};

export default PrivateRoute;
