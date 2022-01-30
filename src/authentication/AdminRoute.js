import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../core/NavBar";
import { isAuthenticated } from "./helper/Index";
const AdminRoute = () => {
  return (
    <>
      {isAuthenticated().user.role === 1 ? (
        <Outlet />
      ) : (
        <div>
          <NavBar />
          <h1 className="text-white d-flex justify-content-center mt-5 ">
            Ooops! you're not Admin.{" "}
          </h1>
        </div>
      )}
    </>
  );
};

export default AdminRoute;
