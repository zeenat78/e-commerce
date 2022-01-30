import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../src/core/Home";
import SignUp from "../src/user/SignUp";
import SignIn from "./user/SignIn";
import PrivateRoute from "./authentication/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard"
import AdminRoute from "./authentication/AdminRoute";
import CreateCategory from "./admin/CreateCategory";

import CreateProduct from "./admin/CreateProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/cart" element={<Cart/>} />
        {/* protected routes */}
        <Route element={<PrivateRoute/>}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<AdminRoute/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/create/category" element={<CreateCategory/>}/>
          
            <Route path="/admin/create/product" element={<CreateProduct/>}/>
            <Route path="/admin/products" element={<ManageProduct/>}/>
            <Route path="/admin/product/update/:productId" element={<UpdateProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
