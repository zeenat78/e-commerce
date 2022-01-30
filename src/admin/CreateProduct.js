import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../authentication/helper/Index";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/AdminApiCall";
import NavBar from "../core/NavBar";
const CreateProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    formData,
    stock,
    categories,
    error,
    createdProduct,
  } = values;

  useEffect(() => {
    preLoad();
  }, []);

  const preLoad = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues((prevState) => {
          return { ...prevState, error: data.error };
        });
      } else {
        setValues((prevState) => {
          return { ...prevState, categories: data, formData: new FormData() };
        });
      }
    });
  };
  const successMassage = () => {
    if (createdProduct) {
      return (
        <h4 className="alert alert-success mt-2">Product Added successfully</h4>
      );
    }
  };
  const ErrorMassage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger mt-2">Failed to create Product</h4>
      );
    }
  };
  const onSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, formData, token).then((data) => {
      if (data.error) {
        setValues((prevState) => {
          return { ...prevState, error: data.error };
        });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",

          loading: false,

          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control my-1"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control  my-1"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control  my-1"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control my-1"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option value={cate._id} key={index}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control my-1"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <>
      <NavBar />
      <Base
        title="Add a Product here"
        description="Welcome to product creation section"
      >
        <div className="container bg-info offsetx-2 pb-2">
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 mt-2">
            Admin Home
          </Link>
          <div className="row bg-dark text-white rounded mx-2">
            <div className="col-md-8 offset-md-2 ">
              {successMassage()}
              {ErrorMassage()}
              {createProductForm()}
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

export default CreateProduct;
