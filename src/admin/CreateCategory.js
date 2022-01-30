import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../authentication/helper/Index";
import Base from "../core/Base";
import { createCategory } from "./helper/AdminApiCall";
import NavBar from "../core/NavBar";
const CreateCategory = () => {
  const { user, token } = isAuthenticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");

  const goBack = () => {
    return (
      <>
        <div className="mt-5">
          <Link className="btn btn-sm btn-success mb-2" to="/admin/dashboard">
            Admin Home
          </Link>
        </div>
      </>
    );
  };
  const addCategoryHandler = (event) => {
    setName(event.target.value);
    setError("");
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setName("");
    setError("");
    setSuccess(false);
    createCategory({ name }, token, user._id).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess("true");
      }
    });
  };
  const successMassage = () => {
    if (success) {
      return (
        <h4 className="alert alert-success mt-2">
          Category Created successfully
        </h4>
      );
    }
  };
  const ErrorMassage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger mt-2">Failed to create Category</h4>
      );
    }
  };
  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="for Ex. Summer"
            onChange={addCategoryHandler}
            value={name}
          ></input>
          <button className="bttn btn-outline-info" onClick={submitHandler}>
            Create Caterory
          </button>
        </div>
      </form>
    );
  };
  return (
    <>
      <NavBar />
      <Base
        title="Create a category here"
        description="Add a new category for new t-shirts"
        className="container bg-info p-4 m-10"
      />
      <div className="row bg-info  m-5 offset-md-2">
        <div className="col-md-8 rounded bg-light mt-2 mb-2 offset-md-2">
          {successMassage()}
          {ErrorMassage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
