import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../authentication/helper/Index";
import Base from "../core/Base";
import NavBar from "../core/NavBar";
import {
  updateProduct,
  getAllCategories,
  getaProduct,
} from "./helper/AdminApiCall";
const UpdateProduct = () => {
  const { productId } = useParams();

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
    updatedProduct: "",
    getaRedirect: false,
  });

  const { name, description, price, stock, categories, error, createdProduct } =
    values;
  const formData = new FormData();
  const preLoad = (productId) => {
    getaProduct(productId).then((data) => {
      if (data.error) {
        setValues((prevState) => {
          return { ...prevState, error: data.error };
        });
      } else {
        setValues((prevState) => {
          getProductCategory();
          return {
            ...prevState,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,

            category: data.category._id,
          };
        });
      }
    });
  };

  const getProductCategory = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues((prevState) => {
          return { ...prevState, error: data.error };
        });
      } else {
        setValues((prevState) => {
          return { ...prevState, categories: data };
        });
      }
    });
  };
  useEffect(() => {
    preLoad(productId);
  }, []);
  const successMassage = () => {
    if (createdProduct) {
      return (
        <h4 className="alert alert-success mt-2">
          Product updated successfully
        </h4>
      );
    }
  };
  const ErrorMassage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger mt-2">Failed to update Product</h4>
      );
    }
  };
  //setting values to form Data
  const setFormData = () => {
    for (let val in values) {
      if (val !== "category") {
        formData.set(String(val), values[val]);
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormData();

    setValues({ ...values, error: "", loading: true });
    updateProduct({
      userId: user._id,
      token: token,
      product: formData,
      productId: productId,
    }).then((data) => {
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

          updatedProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const updateProductForm = () => (
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
        Update Product
      </button>
    </form>
  );

  return (
    <>
      <NavBar />
      <Base
        title="Update a Product here"
        description="Welcome to product updation section"
      >
        <div className="container bg-info offsetx-2 pb-2">
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 mt-2">
            Admin Home
          </Link>
          <div className="row bg-dark text-white rounded mx-2">
            <div className="col-md-8 offset-md-2 ">
              {successMassage()}
              {ErrorMassage()}
              {updateProductForm()}
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

export default UpdateProduct;
