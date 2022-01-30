import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../authentication/helper/Index";
import Base from "../core/Base";
import NavBar from "../core/NavBar";
const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <>
        <div className="card">
          <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link
                className="nav-link text-success"
                to="/admin/create/category"
              >
                Create Categories
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link text-success" to="/admin/orders">
                Manage Orders
              </Link>
            </li>
            <li className="list-group-item">
              <Link
                className="nav-link text-success"
                to="/admin/create/product"
              >
                Create Product
              </Link>
            </li>

            <li className="list-group-item">
              <Link className="nav-link text-success" to="/admin/products">
                Manage Products
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };
  const adminRightSide = () => {
    return (
      <>
        <div className="card mb-4">
          <h4 className="card-header text-dark">Admin Information</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge mr-2 bg-success ">Name:</span>
              {name}
            </li>
            <li className="list-group-item">
              <span className="badge bg-success ">Email:</span>
              {email}
            </li>
            <li className="list-group-item">
              <span className="badge bg-danger ">Admin Area</span>
            </li>
          </ul>
        </div>
      </>
    );
  };
  return (
    <>
      <NavBar />
      <Base
        title="Welcome to Admin Area"
        description="Manage all your products here"
      >
        <div className="row bg-success p-4">
          <div className="col-3">{adminLeftSide()}</div>
          <div className="col-9"> {adminRightSide()}</div>
        </div>
      </Base>
    </>
  );
};

export default AdminDashboard;
